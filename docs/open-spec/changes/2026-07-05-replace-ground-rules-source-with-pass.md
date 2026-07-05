# Change Spec: Replace Ground Rules Source with PASS Version

## Status

Accepted

## Scope

Replace the original ground rules reference document with
`PASS_Ground_Rules_1page.docx`.

The content is substantially the same as the previous source, but the public
title and naming should change from "Taiwan Sovereign AI Study Group" to:

- Full English name: `Platform for AI Sovereignty Study`
- Short name: `PASS`

The website should update public branding, page titles, descriptions, and
ground rules wording accordingly while preserving the existing bilingual site
structure.

## Non-Goals

- This change does not alter the meeting cadence or sharing rules.
- This change does not implement private authentication.
- This change does not deploy to Vercel.
- This change does not change the GitHub repository name.

## User-Visible Behavior

Visitors should see the study group presented as PASS / Platform for AI
Sovereignty Study. Public pages should no longer use "Taiwan Sovereign AI Study
Group" as the primary title.

Traditional Chinese pages should use a professional local-language rendering of
the new name while keeping `PASS` visible.

## Data, Auth, or Deployment Impact

No data, authentication, authorization, or deployment behavior changes are
introduced. This is a public content and branding update.

## Acceptance Criteria

- The project spec identifies `PASS_Ground_Rules_1page.docx` as the current
  source document.
- Public site titles and homepage copy use PASS / Platform for AI Sovereignty
  Study.
- Ground rules pages reflect the updated PASS wording from the new DOCX.
- Traditional Chinese and English pages still build under `/zh-tw/` and `/en/`.
- Local Hugo build succeeds.

## Verification Notes

Implemented and verified with:

- Extracted paragraphs from `PASS_Ground_Rules_1page.docx` and compared them
  against the previous source document.
- Updated the current project spec to identify
  `PASS_Ground_Rules_1page.docx` as the active source.
- Ran `hugo build --gc --minify` successfully.
- Verified with browser automation that:
  - `/zh-tw/` title is `AI 主權研究平台`.
  - `/en/` title is `Platform for AI Sovereignty Study`.
  - Public homepages no longer use `Taiwan Sovereign AI Study Group` as the
    primary title.
  - English ground rules include the updated `everyone in PASS` wording.
  - No browser console errors were detected.
