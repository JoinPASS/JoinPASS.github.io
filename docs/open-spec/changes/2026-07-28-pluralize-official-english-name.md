# Change Spec: Pluralize Official English Name

## Status

Implemented; pending GitHub Pages deployment verification

## Decision

Use `Platform for AI Sovereignty Studies` as the official expanded English
name of PASS throughout the public website and current project documentation.

## Scope

- Update visible Traditional Chinese and English homepage references.
- Update the English page title, site metadata, author and copyright text.
- Update the header logo's accessible label and rendered subtitle.
- Update the shared footer, README, and durable project specification.
- Preserve the acronym `PASS`, bilingual content, routes, layout, and all
  approved public facts.

Historical OpenSpec change records remain unchanged when they document the
name that was in use at the time of those earlier changes.

## Acceptance Criteria

- All current website source and generated HTML use
  `Platform for AI Sovereignty Studies`.
- The former singular phrase does not remain in current content, configuration,
  layout, logo, README, or durable project specification.
- The header logo displays the pluralized name and its accessible label matches.
- Traditional Chinese and English pages retain their existing content and
  reciprocal language navigation.
- A clean Hugo production build succeeds for `https://joinpass.github.io/`.
- Production deployment succeeds and both language pages display the new name.

## Verification Notes

Local verification completed on 2026-07-28:

- A clean minified Hugo production build completed successfully for
  `https://joinpass.github.io/` with no warnings.
- Both generated language pages contain the pluralized official name and no
  current singular-name occurrence.
- Generated output contains the pluralized logo accessible label, site title,
  and footer copyright.
- Reciprocal Traditional Chinese and English navigation remains present on
  both generated pages.

Pending verification after push:

- Successful GitHub Actions deployment.
- Production checks for both language pages, metadata, logo label, and footer.
