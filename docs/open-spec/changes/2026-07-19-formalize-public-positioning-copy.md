# Change Spec: Formalize Public Positioning Copy

## Status

Accepted

## Scope

Revise the bilingual homepage positioning copy so PASS is described in a
formal, institutionally appropriate, and externally defensible manner.

The change removes language that frames limited scale as a virtue or contrasts
PASS with growth. It instead states the platform's professional purpose,
cross-domain participation, and sustained exchange directly and neutrally.

## Non-Goals

- No approved operating fact, sharing principle, route, layout, visual style,
  or deployment configuration changes.
- No new public contact information or non-public information.

## Acceptance Criteria

- The Traditional Chinese homepage no longer uses wording equivalent to
  "規模刻意保持小" or "重點不是擴張".
- The English homepage no longer uses "small", "intentionally small", or
  "not designed around scale" as positioning language.
- The hero description and purpose section use formal, neutral language in
  both languages and remain semantically aligned.
- The revised copy accurately describes professional cross-domain exchange
  without making claims beyond the approved public information.
- A clean Hugo production build succeeds with the GitHub Pages base URL.
- Generated public HTML contains the revised copy and none of the superseded
  positioning phrases.

## Verification Notes

Local verification completed on 2026-07-19:

- A clean minified Hugo production build completed successfully with the
  GitHub Pages base URL and no warnings.
- Generated Traditional Chinese and English HTML contains the revised formal
  positioning copy.
- Source and generated HTML no longer contain the superseded scale-oriented
  phrases in either language.
- Approved Academia Sinica and Google Meet public facts remain present in both
  generated language pages.

Deployment verification completed on 2026-07-19:

- Commit `fc70c62` deployed successfully in GitHub Actions run
  `29678612528`.
- Both production language pages return HTTP 200 and contain their revised
  formal positioning statement.
- Neither production language page contains the superseded scale-oriented
  positioning phrases.
