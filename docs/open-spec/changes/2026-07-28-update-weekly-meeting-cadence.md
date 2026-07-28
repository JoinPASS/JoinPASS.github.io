# Change Spec: Update Weekly Meeting Cadence

## Status

Accepted

## Decision

Update the approved public meeting cadence from three Google Meet sessions per
week to two Google Meet sessions per week.

## Scope

- Change the visible cadence metric from `3× / week` to `2× / week` on both
  language pages.
- Update the Traditional Chinese operating text from three meetings to two.
- Update the English operating text from three sessions to two.
- Update the durable project specification's approved public content.
- Preserve the 40-minute presentation plus 20-minute discussion format and all
  other approved public information.

Historical OpenSpec records remain unchanged when they document the cadence
that was approved at the time of those earlier changes.

## Acceptance Criteria

- The Traditional Chinese page states that meetings occur twice per week.
- The English page states that two Google Meet sessions occur each week.
- Both visible cadence metrics read `2× / week`.
- Current content and the durable project specification contain no active
  three-meetings-per-week statement.
- The 40-plus-20-minute meeting format remains unchanged in both languages.
- A clean Hugo production build succeeds for `https://joinpass.github.io/`.
- Production deployment succeeds and both language pages display the revised
  cadence.

## Verification Notes

Local verification completed on 2026-07-28:

- A clean minified Hugo production build completed successfully for
  `https://joinpass.github.io/` with no warnings.
- Both generated language pages display `2× / week`.
- The Traditional Chinese page states that Google Meet occurs twice per week,
  and the English page states that two sessions occur each week.
- Current content, the durable specification, and generated HTML contain no
  active three-meetings-per-week statement.
- The 40-minute presentation plus 20-minute discussion format remains present
  and unchanged in both languages.

Deployment verification completed on 2026-07-28:

- Commit `991eaf3` deployed successfully in GitHub Actions run
  `30323577784`.
- Both production language pages return HTTP 200 and display `2× / week` with
  the corresponding twice-weekly Google Meet wording.
- Neither production language page contains the former three-meetings cadence.
- Both production language pages retain the 40-minute presentation plus
  20-minute questions-and-discussion format.
