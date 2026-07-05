# Change Spec: Logo Refresh from User Artwork

## Status

Accepted

## Scope

Refresh the JoinPASS / PASS logo system using the user-provided artwork
`ChatGPT Image Jul 5, 2026, 02_38_38 PM.png`.

This change adds:

- A cropped square mark derived from the supplied artwork.
- A header-friendly wordmark layout that combines the cropped mark with
  cleaner text placement for website use.
- A favicon set derived from the same cropped mark for browser tabs and
  bookmarks.
- Updated logo assets that propagate across the public site, docs area, and
  internal area through the existing shared logo references.

## Non-Goals

- This change does not alter the site's information architecture.
- This change does not redesign page layouts beyond the logo presentation.
- This change does not introduce a new asset pipeline or image CDN strategy.

## User-Visible Behavior

- The site uses the supplied PASS artwork instead of the earlier placeholder
  lettermark.
- Small logo placements use a cropped visual mark.
- Larger logo placements use a composed PASS wordmark that is more legible in
  navigation bars and documentation sidebars than the raw full image.

## Data, Auth, or Deployment Impact

No data or auth impact.

Deployment impact:

- Adds new static logo image assets.
- Updates shared SVG logo wrappers used by existing templates.

## Acceptance Criteria

- The header logo reflects the new supplied PASS artwork.
- The docs sidebar and docs top header also reflect the new artwork.
- The internal area inherits the updated logo through shared layout assets.
- Browser tab and bookmark icons reflect the supplied artwork.
- The new logo remains legible at small and medium navigation sizes.
- Local Hugo build succeeds.

## Verification Notes

Implementation should be verified with:

- `hugo build --gc --minify --cleanDestinationDir`
- Visual inspection of the homepage, docs pages, and internal pages
