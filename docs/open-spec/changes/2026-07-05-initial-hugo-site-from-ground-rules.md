# Change Spec: Initial Hugo Site from Ground Rules DOCX

## Status

Accepted

## Scope

Create the first public website iteration from
`Taiwan_Sovereign_AI_Study_Group_Ground_Rules_1page.docx`.

The site must:

- Use Hugo with the `colinwilson/lotusdocs` theme.
- Support Traditional Chinese and English from the first version.
- Present the study group as a professional, invitation-only community focused
  on sovereign AI in Taiwan.
- Include bilingual public content derived from the DOCX:
  - Study group overview
  - Meeting format
  - Internal sharing norms
  - External sharing rhythm
  - Private resource access direction
- Include Vercel build configuration for the existing GitHub-connected Vercel
  project.

## Non-Goals

- This change does not deploy to Vercel.
- This change does not implement Supabase authentication.
- This change does not implement the whitelist admin UI.
- This change does not migrate Google Drive documents.
- This change does not publish private study group materials.

## User-Visible Behavior

Public visitors can browse an initial JoinPASS / Taiwan Sovereign AI Study Group
website in Traditional Chinese or English.

The first version should feel calm, credible, and suitable for academia,
industry, and government participants. It should avoid a marketing-heavy tone
and instead use clear study group information architecture.

## Data, Auth, or Deployment Impact

No runtime database or authentication behavior is introduced.

Deployment impact:

- Add Hugo configuration.
- Add Vercel configuration that builds Hugo output into `public/`.
- Use Hugo modules for Lotus Docs and Bootstrap SCSS dependencies.

Auth impact:

- The public site may describe that private pages and documents will be
  protected later.
- No private authorization gate is implemented in this change.

## Acceptance Criteria

- Hugo project files exist at repository root.
- Lotus Docs is configured as the Hugo theme.
- Traditional Chinese and English are configured as required languages.
- The site has language-aware URLs for both languages.
- The DOCX ground rules are represented as public pages in both languages.
- The homepage provides a professional entry point into the study group.
- Vercel can build the project with a committed `vercel.json` and `build.sh`.
- Local build succeeds or any blocker is recorded clearly.

## Verification Notes

Implemented the initial Hugo site and verified it with:

- `hugo mod tidy`
- `bash -n build.sh`
- `hugo build --gc --minify`
- Local Hugo server at `http://localhost:1313/`
- Browser checks for:
  - Root redirect to `/zh-tw/`
  - Traditional Chinese homepage content
  - English homepage content
  - Traditional Chinese ground rules page
  - English access planning page
  - Desktop screenshots
  - Mobile screenshots
  - No browser console errors

The site currently implements public bilingual pages only. Google account
authentication, Supabase whitelist checks, and whitelist administration remain
future work.
