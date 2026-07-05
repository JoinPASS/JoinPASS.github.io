# Change Spec: Supabase Google Auth Internal Area

## Status

Implemented, pending external OAuth and Vercel environment configuration.

## Scope

Implement the first private internal web area for PASS.

This change adds:

- Supabase-backed Google account authentication for the internal area.
- Whitelist-based authorization using Supabase tables and RLS.
- `member` and `admin` roles.
- A bilingual internal dashboard with Google Calendar and Google Drive link
  entries.
- A bilingual account menu showing login state, account type, admin navigation,
  and logout.
- A bilingual admin member-management page with a batch email input.
- A Supabase migration file defining the database schema, helper functions,
  grants, and RLS policies.

The Supabase project URL is:

`https://lkdidspebzhqjlleyfep.supabase.co`

## Non-Goals

- This change does not integrate with the Google Calendar API.
- This change does not integrate with the Google Drive API.
- This change does not manage Google Calendar or Google Drive permissions.
- This change does not move internal files into the website repository.
- This change does not implement server-rendered private pages.
- This change does not create fine-grained document or event permissions.

Google Calendar and Google Drive remain externally managed resources. The site
only provides protected link-out navigation to those resources.

## User-Visible Behavior

Public users can still access the existing bilingual Hugo site.

Internal users can visit:

- `/zh-tw/internal/`
- `/en/internal/`

If Supabase is configured and the user is not logged in, the internal area shows
a Google login prompt.

After Google login:

- A whitelisted active `member` can see the internal dashboard.
- The dashboard shows link cards for Calendar and Documents.
- The account menu shows the user's email and account type.
- A whitelisted active `admin` sees an additional account-management option.

Admin users can visit:

- `/zh-tw/internal/admin/`
- `/en/internal/admin/`

The admin page shows:

- A batch input for one email per line.
- A role selector for newly added accounts.
- A member table with name, email, role, status, joined date, and the
  administrator who added the account.
- Controls for role updates and member activation/deactivation.

Non-whitelisted users can authenticate but cannot see internal resources.

## Data, Auth, or Deployment Impact

Supabase:

- Requires Google provider setup in Supabase Auth.
- Requires a publishable key configured for the Hugo build.
- Adds `public.joinpass_members`.
- Adds `public.joinpass_internal_resources`.
- Adds helper functions in `joinpass_private`.
- Enables RLS on all public tables added by this change.
- Grants only the required Data API privileges to `authenticated`.
- Does not grant table access to `anon`.

Deployment:

- Adds a pinned `@supabase/supabase-js` dependency.
- Adds `package-lock.json`.
- Updates `build.sh` to run `npm ci` when a lockfile exists.
- Requires Vercel environment variable
  `HUGO_PARAMS_SUPABASE_PUBLISHABLEKEY`.

Authorization:

- Role and whitelist state live in Supabase tables.
- Authorization does not use user-editable metadata.
- The frontend may hide or show controls, but RLS is the durable permission
  boundary.

## Acceptance Criteria

- The repo contains a Supabase migration for whitelist members, internal
  resources, helper functions, explicit grants, and RLS policies.
- The Hugo build produces bilingual internal dashboard pages.
- The Hugo build produces bilingual admin member-management pages.
- The internal dashboard does not expose Calendar or Drive URLs unless the
  logged-in user is an active member.
- The account menu shows login state, account type, admin link for admins, and
  logout for logged-in users.
- The admin page lets admins batch add multiple emails, one per line.
- The admin page lists member name, email, role, status, joined date, and
  adding admin information.
- Non-admin members cannot access the member list through RLS.
- `@supabase/supabase-js` is pinned and committed with a lockfile.
- Local Hugo build succeeds.

## Verification Notes

Implemented in this repository with:

- `supabase/migrations/20260705024343_joinpass_internal_access.sql`
- `supabase/migrations/20260705024542_joinpass_internal_access_advisor_fixes.sql`
- `content/zh-tw/internal/`
- `content/en/internal/`
- `layouts/internal/`
- `layouts/partials/internal/`
- `assets/css/joinpass-internal.css`
- `assets/js/joinpass-internal.js`
- `docs/supabase-setup.md`

Verified locally with:

- `npm view @supabase/supabase-js version`
- `npm install`
- `npm ci`
- `node --check assets/js/joinpass-internal.js`
- `bash -n build.sh`
- `hugo build --gc --minify`
- HTTP smoke tests against `http://localhost:1313/zh-tw/internal/`,
  `http://localhost:1313/en/internal/`, and
  `http://localhost:1313/zh-tw/internal/admin/`

Verified static output:

- Bilingual internal dashboard pages are generated.
- Bilingual admin pages are generated.
- The internal HTML includes the Supabase project URL and page config.
- Calendar and Drive placeholder URLs are not present in the generated internal
  HTML; they are loaded from Supabase after authorization.

Applied Supabase migrations to project `lkdidspebzhqjlleyfep`:

- `20260705024343 joinpass_internal_access`
- `20260705024542 joinpass_internal_access_advisor_fixes`

Verified Supabase state with SQL:

- `joinpass_internal_resources` contains `calendar` and `drive` placeholder
  resources.
- `joinpass_members.email` and `joinpass_members.created_by_email` are `text`
  columns normalized by trigger logic.
- RLS policies exist for member self-read, admin member management, active
  member resource reads, and admin resource management.

Supabase advisors after fixes:

- JoinPASS-added `citext` and multiple-permissive-policy warnings were resolved.
- Remaining security warnings are for an existing
  `public.rls_auto_enable()` security-definer function, not for JoinPASS
  objects.
- Remaining performance INFO is Supabase Auth connection strategy, not a
  JoinPASS schema issue.

Browser visual verification with `agent-browser` was not completed because the
`agent-browser` command and Playwright are not installed in this environment.

External configuration still required before production login works:

- Set Vercel `HUGO_PARAMS_SUPABASE_PUBLISHABLEKEY`.
- Configure Supabase Google provider.
- Configure Supabase redirect URLs.
- Seed the first admin account.
