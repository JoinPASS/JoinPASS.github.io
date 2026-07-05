drop policy if exists "Members can read own active member record" on public.joinpass_members;
drop policy if exists "Admins can read all members" on public.joinpass_members;
drop policy if exists "Active members can read internal resources" on public.joinpass_internal_resources;
drop policy if exists "Admins can manage internal resources" on public.joinpass_internal_resources;

alter table public.joinpass_members
  alter column email type text using lower(email::text),
  alter column created_by_email type text using lower(created_by_email::text);

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
  new.email = lower(trim(new.email::text));

  if new.display_name is null or btrim(new.display_name) = '' then
    new.display_name = split_part(new.email::text, '@', 1);
  end if;

  if tg_op = 'INSERT' then
    new.created_at = coalesce(new.created_at, now());
    new.created_by_user_id = coalesce(auth.uid(), new.created_by_user_id);
    new.created_by_email = coalesce(actor_email, new.created_by_email);
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

create policy "Members can read own record or admins read all members"
  on public.joinpass_members
  for select
  to authenticated
  using (
    (
      status = 'active'
      and lower(email::text) = joinpass_private.current_email()
    )
    or joinpass_private.is_admin()
  );

create policy "Active members can read internal resources"
  on public.joinpass_internal_resources
  for select
  to authenticated
  using (
    enabled = true
    and joinpass_private.is_active_member()
  );

create policy "Admins can insert internal resources"
  on public.joinpass_internal_resources
  for insert
  to authenticated
  with check (joinpass_private.is_admin());

create policy "Admins can update internal resources"
  on public.joinpass_internal_resources
  for update
  to authenticated
  using (joinpass_private.is_admin())
  with check (joinpass_private.is_admin());

create policy "Admins can delete internal resources"
  on public.joinpass_internal_resources
  for delete
  to authenticated
  using (joinpass_private.is_admin());

drop index if exists public.joinpass_members_role_status_idx;

do $$
begin
  if exists (
    select 1
    from pg_extension extensions
    join pg_namespace namespaces
      on namespaces.oid = extensions.extnamespace
    where extensions.extname = 'citext'
      and namespaces.nspname = 'public'
  ) then
    create schema if not exists extensions;
    alter extension citext set schema extensions;
  end if;
end $$;
