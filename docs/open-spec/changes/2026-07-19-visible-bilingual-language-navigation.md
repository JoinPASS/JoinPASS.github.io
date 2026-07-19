# Change Spec: Visible Bilingual Language Navigation

## Status

Implemented; pending GitHub Pages deployment verification

## Scope

Make both existing language editions immediately visible and directly
accessible from every landing page. Replace the current-language dropdown,
which can make the alternate edition appear absent, with a persistent
Traditional Chinese and English language selector.

## Non-Goals

- No change to the approved bilingual page content, routes, visual direction,
  public facts, privacy boundary, or GitHub Pages architecture.
- No automatic language detection or browser-language redirection.

## User-Visible Behavior

- The header displays both `繁中` and `EN` at the same time.
- Selecting either option opens the corresponding one-page edition.
- The active language is visually distinct and programmatically identified.
- The selector remains compact and usable alongside the mobile menu.

## Acceptance Criteria

- Both `/zh-tw/` and `/en/` continue to be generated with complete localized
  content.
- Both generated pages contain visible direct links to `/zh-tw/` and `/en/`.
- The current-language link uses `aria-current="page"` and the switch has an
  accessible language-selection label.
- The language selector does not depend on a dropdown interaction or
  JavaScript.
- A clean Hugo production build succeeds with the GitHub Pages base URL.
- Production checks confirm both language routes and reciprocal links.

## Verification Notes

Local verification completed on 2026-07-19:

- A clean minified Hugo production build completed successfully with the
  GitHub Pages base URL and no warnings.
- Both generated language pages contain complete localized content and a
  visible two-option `繁中` / `EN` selector.
- Automated HTML checks confirmed reciprocal language URLs, exactly one
  `aria-current="page"` state on each page, and no dropdown dependency.
- The approved operating facts remain present in both language editions.

Pending verification after push:

- Successful GitHub Actions deployment.
- Production checks for both language routes and reciprocal selector links.
