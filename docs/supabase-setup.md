# Supabase Setup for JoinPASS

This project uses Supabase Auth and Postgres RLS for the PASS internal web
area.

## Project

- Supabase project URL: `https://lkdidspebzhqjlleyfep.supabase.co`
- Supabase project ref: `lkdidspebzhqjlleyfep`

## Vercel Environment Variables

Set this variable for Production and Preview deployments:

```text
HUGO_PARAMS_SUPABASE_PUBLISHABLEKEY=sb_publishable_...
```

The Supabase URL is already committed in `hugo.toml`. It can also be overridden
if needed:

```text
HUGO_PARAMS_SUPABASE_URL=https://lkdidspebzhqjlleyfep.supabase.co
```

Do not expose or commit a Supabase service-role key.

## Supabase Auth Settings

In Supabase Dashboard, configure:

- Site URL: `https://joinpass.vercel.app`
- Additional redirect URLs:
  - `https://joinpass.vercel.app/zh-tw/internal/`
  - `https://joinpass.vercel.app/en/internal/`
  - `https://joinpass.vercel.app/zh-tw/internal/admin/`
  - `https://joinpass.vercel.app/en/internal/admin/`
  - `http://localhost:1313/zh-tw/internal/`
  - `http://localhost:1313/en/internal/`
  - `http://localhost:1313/zh-tw/internal/admin/`
  - `http://localhost:1313/en/internal/admin/`

Enable the Google provider and add the Google OAuth client ID and secret.

## Google OAuth Settings

Create a Google OAuth Client ID with application type `Web application`.

Authorized JavaScript origins:

- `https://joinpass.vercel.app`
- `http://localhost:1313`

Authorized redirect URI:

- `https://lkdidspebzhqjlleyfep.supabase.co/auth/v1/callback`

Required scopes:

- `openid`
- `email`
- `profile`

## Initial Admin

After applying the migrations, seed the first administrator from the Supabase
SQL Editor. Replace the email and display name before running:

```sql
insert into public.joinpass_members (
  email,
  display_name,
  role,
  status,
  created_by_email,
  created_by_name
) values (
  'your-google-account@example.com',
  'Your Name',
  'admin',
  'active',
  'bootstrap@joinpass.local',
  'Bootstrap'
)
on conflict (email) do update set
  display_name = excluded.display_name,
  role = 'admin',
  status = 'active';
```

## Internal Resource Links

The Calendar and Documents entries are protected link-out resources. Google
Calendar and Google Drive permissions are managed outside the website.

Update the placeholder URLs with:

```sql
update public.joinpass_internal_resources
set url = 'https://calendar.google.com/calendar/u/0/r?cid=your-calendar-id'
where resource_key = 'calendar';

update public.joinpass_internal_resources
set url = 'https://drive.google.com/drive/folders/your-folder-id'
where resource_key = 'drive';
```

## Advisor Notes

The JoinPASS migrations were checked with Supabase security and performance
advisors. The remaining security warning observed during setup is for an
existing `public.rls_auto_enable()` security-definer function, not for the
JoinPASS tables or functions.

If that function is not intentionally exposed as an RPC endpoint, revoke direct
execution after confirming it is not used by another workflow:

```sql
revoke execute on function public.rls_auto_enable() from public, anon, authenticated;
```
