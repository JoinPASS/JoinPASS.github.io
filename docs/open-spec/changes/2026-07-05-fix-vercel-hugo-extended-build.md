# Change Spec: Fix Vercel Hugo Extended Build

## Status

Accepted

## Scope

Fix the Vercel production deployment failure for the PASS Hugo site.

Vercel build logs show that the Linux build downloads the non-extended Hugo
binary, then fails when Lotus Docs SCSS is compiled:

`you need the extended version to build SCSS/SASS`

The build script must install Hugo Extended on Vercel.

## Non-Goals

- This change does not alter public content.
- This change does not implement private authentication.
- This change does not change the Hugo theme.
- This change does not configure a custom domain unless deployment verification
  shows it is required as a separate step.

## User-Visible Behavior

After the fix is pushed, Vercel should be able to build a READY production
deployment for the PASS site.

## Data, Auth, or Deployment Impact

Deployment-only change:

- `build.sh` should download the Hugo Extended Linux binary.
- The generated output directory remains `public/`.

## Acceptance Criteria

- `build.sh` references the Hugo Extended release asset.
- Local Hugo build still succeeds.
- The fix is committed and pushed to GitHub.
- Vercel production deployment reaches READY or any remaining blocker is
  recorded.

## Verification Notes

Implemented by changing `build.sh` to download
`hugo_extended_${HUGO_VERSION}_linux-amd64.tar.gz` instead of the non-extended
Linux binary.

Verified with:

- `bash -n build.sh`
- `hugo build --gc --minify`
- `curl -fsSI` against the Hugo Extended release asset URL

After pushing this change, Vercel should create a new production deployment.
