create extension if not exists citext with schema public;
create extension if not exists pgcrypto with schema public;

do $$
begin
  create type public.joinpass_member_role as enum ('member', 'admin');
exception
  when duplicate_object then null;
end $$;

do $$
begin
  create type public.joinpass_member_status as enum ('active', 'disabled');
exception
  when duplicate_object then null;
end $$;

create schema if not exists joinpass_private;
revoke all on schema joinpass_private from public;
grant usage on schema joinpass_private to authenticated;

create table if not exists public.joinpass_members (
  id uuid primary key default gen_random_uuid(),
  email public.citext not null unique,
  display_name text,
  role public.joinpass_member_role not null default 'member',
  status public.joinpass_member_status not null default 'active',
  created_at timestamptz not null default now(),
  created_by_user_id uuid,
  created_by_email public.citext,
  created_by_name text,
  updated_at timestamptz not null default now(),
  updated_by_user_id uuid,
  last_seen_at timestamptz
);

create index if not exists joinpass_members_role_status_idx
  on public.joinpass_members (role, status);

create table if not exists public.joinpass_internal_resources (
  resource_key text primary key,
  resource_type text not null,
  title_zh_tw text not null,
  title_en text not null,
  description_zh_tw text not null,
  description_en text not null,
  url text not null,
  icon text not null default 'link',
  display_order integer not null default 100,
  enabled boolean not null default true,
  updated_at timestamptz not null default now(),
  constraint joinpass_internal_resources_known_key
    check (resource_key in ('calendar', 'drive')),
  constraint joinpass_internal_resources_known_type
    check (resource_type in ('calendar', 'document'))
);

create or replace function joinpass_private.current_email()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select nullif(lower(auth.jwt() ->> 'email'), '')
$$;

revoke all on function joinpass_private.current_email() from public;
grant execute on function joinpass_private.current_email() to authenticated;

create or replace function joinpass_private.current_display_name()
returns text
language sql
stable
security definer
set search_path = ''
as $$
  select coalesce(
    nullif(auth.jwt() -> 'user_metadata' ->> 'full_name', ''),
    nullif(auth.jwt() -> 'user_metadata' ->> 'name', ''),
    nullif(auth.jwt() -> 'user_metadata' ->> 'email', ''),
    joinpass_private.current_email()
  )
$$;

revoke all on function joinpass_private.current_display_name() from public;
grant execute on function joinpass_private.current_display_name() to authenticated;

create or replace function joinpass_private.is_active_member()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    auth.uid() is not null
    and exists (
      select 1
      from public.joinpass_members members
      where lower(members.email::text) = joinpass_private.current_email()
        and members.status = 'active'
    )
$$;

revoke all on function joinpass_private.is_active_member() from public;
grant execute on function joinpass_private.is_active_member() to authenticated;

create or replace function joinpass_private.is_admin()
returns boolean
language sql
stable
security definer
set search_path = ''
as $$
  select
    auth.uid() is not null
    and exists (
      select 1
      from public.joinpass_members members
      where lower(members.email::text) = joinpass_private.current_email()
        and members.status = 'active'
        and members.role = 'admin'
    )
$$;

revoke all on function joinpass_private.is_admin() from public;
grant execute on function joinpass_private.is_admin() to authenticated;

create or replace function public.joinpass_set_member_audit()
returns trigger
language plpgsql
security definer
set search_path = ''
as $$
declare
  actor_email text := joinpass_private.current_email();
  actor_name text := joinpass_private.current_display_name();
begin
  new.email = lower(trim(new.email::text))::public.citext;

  if new.display_name is null or btrim(new.display_name) = '' then
    new.display_name = split_part(new.email::text, '@', 1);
  end if;

  if tg_op = 'INSERT' then
    new.created_at = coalesce(new.created_at, now());
    new.created_by_user_id = coalesce(auth.uid(), new.created_by_user_id);
    new.created_by_email = coalesce(actor_email::public.citext, new.created_by_email);
    new.created_by_name = coalesce(actor_name, new.created_by_name);
  end if;

  new.updated_at = now();
  new.updated_by_user_id = coalesce(auth.uid(), new.updated_by_user_id);

  return new;
end;
$$;

revoke all on function public.joinpass_set_member_audit() from public;
revoke all on function public.joinpass_set_member_audit() from anon;
revoke all on function public.joinpass_set_member_audit() from authenticated;

drop trigger if exists joinpass_members_set_audit on public.joinpass_members;
create trigger joinpass_members_set_audit
  before insert or update on public.joinpass_members
  for each row execute function public.joinpass_set_member_audit();

alter table public.joinpass_members enable row level security;
alter table public.joinpass_internal_resources enable row level security;

drop policy if exists "Members can read own active member record" on public.joinpass_members;
create policy "Members can read own active member record"
  on public.joinpass_members
  for select
  to authenticated
  using (
    status = 'active'
    and lower(email::text) = joinpass_private.current_email()
  );

drop policy if exists "Admins can read all members" on public.joinpass_members;
create policy "Admins can read all members"
  on public.joinpass_members
  for select
  to authenticated
  using (joinpass_private.is_admin());

drop policy if exists "Admins can insert members" on public.joinpass_members;
create policy "Admins can insert members"
  on public.joinpass_members
  for insert
  to authenticated
  with check (joinpass_private.is_admin());

drop policy if exists "Admins can update members" on public.joinpass_members;
create policy "Admins can update members"
  on public.joinpass_members
  for update
  to authenticated
  using (joinpass_private.is_admin())
  with check (joinpass_private.is_admin());

drop policy if exists "Active members can read internal resources" on public.joinpass_internal_resources;
create policy "Active members can read internal resources"
  on public.joinpass_internal_resources
  for select
  to authenticated
  using (
    enabled = true
    and joinpass_private.is_active_member()
  );

drop policy if exists "Admins can manage internal resources" on public.joinpass_internal_resources;
create policy "Admins can manage internal resources"
  on public.joinpass_internal_resources
  for all
  to authenticated
  using (joinpass_private.is_admin())
  with check (joinpass_private.is_admin());

revoke all on public.joinpass_members from anon;
revoke all on public.joinpass_internal_resources from anon;
revoke all on public.joinpass_members from authenticated;
revoke all on public.joinpass_internal_resources from authenticated;

grant select, insert, update on public.joinpass_members to authenticated;
grant select, insert, update, delete on public.joinpass_internal_resources to authenticated;

insert into public.joinpass_internal_resources (
  resource_key,
  resource_type,
  title_zh_tw,
  title_en,
  description_zh_tw,
  description_en,
  url,
  icon,
  display_order,
  enabled
) values
  (
    'calendar',
    'calendar',
    'Calendar',
    'Calendar',
    '連結到 PASS 的 Google Calendar。實際權限由 Google Calendar 控管。',
    'Link to the PASS Google Calendar. Access is controlled in Google Calendar.',
    'https://calendar.google.com/calendar/u/0/r?cid=pass-placeholder',
    'calendar_month',
    10,
    true
  ),
  (
    'drive',
    'document',
    '文件區',
    'Documents',
    '連結到 PASS 的 Google Drive 文件區。實際權限由 Google Drive 控管。',
    'Link to the PASS Google Drive folder. Access is controlled in Google Drive.',
    'https://drive.google.com/drive/folders/pass-placeholder',
    'folder',
    20,
    true
  )
on conflict (resource_key) do update set
  resource_type = excluded.resource_type,
  title_zh_tw = excluded.title_zh_tw,
  title_en = excluded.title_en,
  description_zh_tw = excluded.description_zh_tw,
  description_en = excluded.description_en,
  url = excluded.url,
  icon = excluded.icon,
  display_order = excluded.display_order,
  enabled = excluded.enabled,
  updated_at = now();

comment on table public.joinpass_members is
  'PASS internal area whitelist. Role and status are protected by RLS.';

comment on table public.joinpass_internal_resources is
  'Protected link-out resources for PASS internal members. Google-side permissions remain authoritative for linked resources.';
