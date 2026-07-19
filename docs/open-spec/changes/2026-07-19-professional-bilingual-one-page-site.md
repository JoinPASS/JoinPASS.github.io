# Change Spec: Professional Bilingual One-Page Site

## Status

Accepted

## Scope

Redesign the public JoinPASS site as one focused landing page per language so
the experience remains professional, visually coherent, and easy to follow
from the first viewport through the footer.

This change will:

- Consolidate the public homepage and ground-rules content into one Traditional
  Chinese page and one English page.
- Remove repeated statements by giving each section a distinct communication
  role.
- Replace the document-site navigation with anchored one-page navigation.
- Introduce a restrained institutional visual system with strong typography,
  generous spacing, varied section composition, subtle depth, and deliberate
  scroll transitions.
- Preserve the existing PASS logo, approved Google Fonts, bilingual language
  switch, and approved public content.
- Keep Hugo and Lotus Docs as the build toolchain while using project-owned
  homepage, header, and footer presentation.
- Maintain the GitHub Pages-only application architecture established by the
  preceding migration.

## Non-Goals

- This change does not add animation-heavy effects, decorative stock imagery,
  a carousel, a blog, forms, authentication, analytics, or application APIs.
- This change does not add a public email address until a role-based address is
  approved.
- This change does not alter the approved facts about Academia Sinica, the
  three-meetings-per-week cadence, the 40-plus-20-minute meeting format,
  non-attribution, or the six-month public-summary rhythm.
- This change does not remove Hugo or the Lotus Docs module dependency.

## User-Visible Behavior

- `/zh-tw/` presents all approved Traditional Chinese public content on one
  page; `/en/` presents the corresponding English content.
- Visitors use the header navigation to jump to the purpose, operating format,
  and sharing-principles sections on the same language page.
- The former public docs and ground-rules routes are no longer part of the
  normal information architecture.
- The hero gives a concise positioning statement and key operating facts.
- Subsequent sections use different layouts and visual rhythms rather than a
  repeated grid of similar cards.
- The complete ground rules remain available within the one-page narrative
  without repeating the hero facts as separate promotional content.
- The layout remains readable and polished on desktop and mobile widths,
  including touch-sized navigation controls and visible keyboard focus.

## Data, Auth, or Deployment Impact

- No data, authentication, authorization, or secrets are introduced.
- GitHub Actions and GitHub Pages remain unchanged as the deployment path.
- Google Fonts remains the only approved non-GitHub runtime static resource.
- Removing the public docs content reduces the generated route set but does not
  affect the two stable language homepage URLs.

## Acceptance Criteria

- The durable project spec defines a bilingual one-page information
  architecture.
- The Hugo build produces one primary content page at `/zh-tw/` and one at
  `/en/`, plus supporting system output such as 404 and feeds where generated
  by Hugo.
- Header navigation links resolve to valid same-page section IDs in both
  languages.
- The standalone public docs and ground-rules content files are removed.
- Every major public fact appears in one intentional section rather than being
  repeated across hero, highlights, and operation cards.
- The page has a clear visual progression from hero to purpose, operating
  format, trust principles, public-summary callout, and footer.
- Desktop and mobile presentation preserve readable line lengths, hierarchy,
  spacing, and accessible controls without horizontal overflow.
- Reduced-motion preferences disable nonessential transition behavior.
- The approved Academia Sinica, Google Meet cadence, 40-plus-20-minute format,
  non-attribution rule, restricted-slide-content rule, and six-month public
  summary rhythm remain available in both languages.
- No internal route, private information, Supabase, Vercel, Calendar, Drive,
  or unapproved email address is introduced.
- A clean Hugo production build succeeds with the GitHub Pages base URL.
- The deployed GitHub Pages site passes desktop and mobile browser checks.

## Verification Notes

Local verification completed on 2026-07-19:

- `hugo build --gc --minify --cleanDestinationDir --baseURL
  https://cclljj.github.io/JoinPASS/` completed without warnings.
- The generated site contains the two language landing pages and supporting
  root/404 output; the former docs and ground-rules pages are absent.
- Automated checks confirmed the three section IDs in both languages, valid
  local links and assets, valid workflow YAML, reduced-motion CSS, and no
  email-shaped value or removed-service/private-route reference in the public
  HTML.
- Browser inspection at 1440 by 1000 pixels confirmed a coherent full-scroll
  progression across the hero, purpose, format, principles, six-month summary,
  and footer in both languages, with no horizontal overflow.
- Browser inspection at 390 by 844 pixels confirmed responsive typography,
  a usable mobile menu, working same-page anchor navigation, readable content
  sections, and no horizontal overflow.
- Browser console inspection reported no errors or warnings.

Deployment verification completed on 2026-07-19:

- Commit `3d093b6` deployed successfully in GitHub Actions run
  `29678467962`.
- The production root, Traditional Chinese page, and English page each return
  HTTP 200 from GitHub Pages.
- The former docs, ground-rules, and internal routes return HTTP 404 in both
  languages.
- Production HTML contains the expected section anchors, Academia Sinica and
  Google Meet public facts, and no email-shaped value or removed-service/private
  reference.
