# Change Spec: GitHub Pages Public Static Site

## Status

Accepted

## Scope

Migrate JoinPASS from Vercel plus Supabase to a public-only static website on
GitHub Pages.

This change will:

- Keep Hugo and Lotus Docs as the static-site build toolchain.
- Build and deploy the site with GitHub Actions and GitHub Pages.
- Use current official Pages workflow action major versions that run on the
  supported GitHub Actions Node.js runtime without deprecation warnings.
- Remove the Supabase authentication, whitelist, admin, and internal-resource
  implementation.
- Remove all generated internal routes and internal navigation.
- Remove Vercel-specific deployment configuration.
- Remove runtime requests to non-GitHub application services. Google Fonts is
  the explicitly approved exception as a public static font resource.
- Keep the approved public statements about Academia Sinica, three weekly
  Google Meet sessions, and the 40-minute presentation plus 20-minute
  discussion format.
- Treat email as an off-site communication channel for non-public information;
  no private information or private resource link will be stored in this
  repository or published site.

## Non-Goals

- This change does not provide login, authorization, membership management,
  forms, calendars, document storage, or other server-side behavior.
- This change does not publish a contact address until a role-based address has
  been explicitly approved.
- This change does not remove historical change specifications; superseded
  specifications remain as implementation history.
- This change does not rewrite Git history because the repository audit found
  placeholders rather than real member addresses, private resource URLs, or
  committed secrets.
- Google Meet may be named in public content, but it is not a runtime website
  dependency.

## User-Visible Behavior

- Visitors can browse the existing Traditional Chinese and English public
  homepage and ground rules.
- The approved meeting cadence, format, and Academia Sinica label remain
  public.
- The internal-area navigation and call to action are removed.
- The former `/zh-tw/internal/`, `/en/internal/`, and admin/access descendants
  are not produced by the build.
- The site loads its pages, application scripts, and images from the GitHub
  Pages deployment without contacting Supabase, Vercel, or a third-party
  application service. It may load the approved font families from Google
  Fonts.

## Data, Auth, or Deployment Impact

Data and authentication:

- The Supabase schema, client dependency, setup documentation, authentication
  UI, and authorization UI are removed from the current repository tree.
- No database, user session, whitelist, or protected web content remains.
- Any private PASS information must be exchanged outside the website by email.

Deployment:

- GitHub Actions builds Hugo with the GitHub Pages base URL.
- The official GitHub Pages actions configure, upload, and deploy the static
  artifact.
- Vercel configuration and its specialized build script are removed.
- Repository administrators must enable GitHub Pages with GitHub Actions as the
  source. Vercel and Supabase should be decommissioned after the Pages site is
  verified.

## Acceptance Criteria

- `docs/open-spec/project-spec.md` defines GitHub Pages as the durable hosting
  architecture and states that the site contains public information only.
- A GitHub Actions workflow builds Hugo and deploys `public/` with official
  GitHub Pages actions.
- The workflow uses Node.js 24-compatible official action major versions and
  completes without Node.js runtime deprecation annotations.
- The Hugo build succeeds with the deployment base URL
  `https://cclljj.github.io/JoinPASS/`.
- Traditional Chinese and English homepages and ground-rules pages are built
  with correct repository-subpath URLs.
- The approved Academia Sinica, three-meetings-per-week, and 40-plus-20-minute
  statements remain in both languages.
- No internal content, templates, scripts, styles, menus, or generated routes
  remain.
- No Supabase client dependency, migrations, configuration, setup guide, or
  generated Supabase URL remains.
- No Vercel configuration or Vercel-specific build behavior remains.
- Generated HTML does not request third-party runtime services other than the
  explicitly approved Google Fonts static resources.
- Repository and generated-output scans find no real member email address,
  private Calendar/Drive URL, authentication secret, or private resource link.
- `README.md` documents the GitHub Pages deployment and public-only boundary.

## Verification Notes

Verified locally on 2026-07-19 with:

- `hugo build --gc --minify --baseURL https://cclljj.github.io/JoinPASS/`
- `hugo build --gc --minify --cleanDestinationDir --baseURL
  https://cclljj.github.io/JoinPASS/`
- Ruby YAML parsing of `.github/workflows/hugo.yml`.
- Generated-link and asset resolution checks for `/JoinPASS/` paths.
- Repository and generated-output searches for internal routes, Supabase,
  Vercel, unapproved runtime URLs, email addresses, and private resource URLs.
- `git diff --check`.

Local verification results:

- The Hugo build completed successfully in Traditional Chinese and English.
- No generated file exists under an `internal` path.
- No Supabase, Vercel, Google Calendar, Google Drive, or `/internal/`
  reference exists in generated output.
- No current implementation file outside historical OpenSpec records and the
  repository policy contains a removed-service reference.
- No email-shaped value exists outside historical OpenSpec records.
- All generated `/JoinPASS/` links and asset references resolve to files in the
  generated artifact.
- Inline logo and favicon image references work under the GitHub Pages project
  subpath.
- Runtime URL hosts are limited to the GitHub Pages site, the public GitHub
  repository, and the explicitly approved `fonts.googleapis.com` and
  `fonts.gstatic.com` resources.
- The approved Academia Sinica, three-weekly-meetings, and 40-plus-20-minute
  statements remain in both languages.

Verified on GitHub after pushing commit `02b800f`:

- Enabled GitHub Pages with GitHub Actions as the publishing source.
- GitHub Actions run `29677784009` completed both the Hugo build and Pages
  deployment jobs successfully.
- GitHub reports the public Pages URL as
  `https://cclljj.github.io/JoinPASS/`, with HTTPS enforcement enabled.
- The root URL, both language homepages, both ground-rules pages, and the logo
  asset returned HTTP `200`.
- `/zh-tw/internal/` and `/en/internal/admin/` returned HTTP `404`.
- Production homepage checks found the approved Academia Sinica, meeting
  cadence, and 40-plus-20-minute statements in both languages, with no
  internal-area, Supabase, or Vercel text.
- Updated the GitHub repository homepage URL from the former Vercel address to
  the GitHub Pages URL.

The repository and public website no longer use Vercel or Supabase. Deleting
or archiving the now-unused external Vercel and Supabase projects is an
external administrative cleanup and is not performed by this repository
change.

Maintenance verification:

- The first two successful deployments reported that some official action
  versions still targeted the deprecated Node.js 20 action runtime.
- Updated Checkout to `actions/checkout@v7`, Configure Pages to
  `actions/configure-pages@v6`, and Upload Pages Artifact to
  `actions/upload-pages-artifact@v5`.
- GitHub Actions run `29677868335` completed the build and deployment jobs
  successfully without the Node.js runtime deprecation annotation.
