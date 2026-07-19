# Change Spec: Migrate to JoinPASS Organization Site

## Status

Accepted

## Scope

Move the complete JoinPASS public website source and Git history to the public
repository `JoinPASS/JoinPASS.github.io` and publish it as the JoinPASS
organization website at `https://joinpass.github.io/`.

This change will:

- Make `JoinPASS/JoinPASS.github.io` the canonical source repository.
- Preserve the existing `master` branch history when pushing to the new
  repository.
- Update repository identity and documentation from the former personal
  project repository to the organization-site repository.
- Build the site for the GitHub Pages root URL rather than the former
  `/JoinPASS/` project-site subpath.
- Enable GitHub Pages with GitHub Actions in the new repository and verify the
  production site.

## Non-Goals

- This migration does not delete, archive, rewrite, or otherwise modify the
  former `cclljj/JoinPASS` repository.
- This migration does not change public content, the bilingual one-page
  information architecture, visual design, privacy boundary, or approved
  Google Fonts exception.
- This migration does not add a custom domain.

## Repository and Deployment Impact

- The local `origin` remote will point to
  `https://github.com/JoinPASS/JoinPASS.github.io.git`.
- The previous remote will be retained locally under a clearly identified
  legacy name for reference.
- The target repository default branch will be `master`, matching the existing
  GitHub Actions workflow trigger.
- GitHub Pages will publish from GitHub Actions at the organization root site.
- Generated language URLs will be `/zh-tw/` and `/en/`, without a repository
  subpath prefix.

## Acceptance Criteria

- The durable project spec identifies `JoinPASS/JoinPASS.github.io` as the
  canonical public source and `https://joinpass.github.io/` as the only site
  URL.
- The Go module path and README use the new repository identity and production
  URL.
- A clean Hugo production build succeeds with base URL
  `https://joinpass.github.io/`.
- Generated internal links and assets resolve from the organization-site root
  and contain no `/JoinPASS/` project-site prefix.
- The full existing `master` branch is pushed to the target public repository
  and becomes its default branch.
- GitHub Pages is configured to use GitHub Actions in the target repository.
- The target workflow completes its build and deployment jobs successfully.
- The root site, both language pages, and a representative local asset return
  HTTP 200 at `joinpass.github.io`.
- Both production language pages retain reciprocal language navigation and the
  approved public content.
- Production checks find no private information, unapproved email address, or
  removed-service runtime reference.

## Verification Notes

Local verification completed on 2026-07-19:

- A clean minified Hugo production build completed successfully with base URL
  `https://joinpass.github.io/` and no warnings.
- Workflow YAML parsed successfully.
- Generated local links and assets resolve from the organization-site root.
- Both generated pages contain reciprocal `/zh-tw/` and `/en/` language links.
- Current configuration and generated URLs contain no former personal-site
  URL or `/JoinPASS/` project-site asset prefix.
- Generated-output privacy scans found no email-shaped value, private route,
  or removed-service reference.

Repository and deployment verification completed on 2026-07-19:

- Commit `605f1d7` and all 23 commits reachable from `master` were pushed to
  `JoinPASS/JoinPASS.github.io`; the local and remote branch heads match.
- The target is public, non-empty, uses `master` as its default branch, and
  identifies `https://joinpass.github.io/` as its homepage.
- GitHub Pages uses the workflow build type with HTTPS enforcement enabled.
- GitHub Actions run `29678958655` completed both build and deployment jobs
  successfully.
- The production root, `/zh-tw/`, `/en/`, and a generated stylesheet return
  HTTP 200.
- Both production language pages contain complete localized content, visible
  reciprocal language navigation, and root-relative site URLs without the old
  `/JoinPASS/` prefix.
- Production privacy checks found no email-shaped value, private route, or
  removed-service reference.
- The local `origin` now points to the organization repository. The former
  personal repository remains unchanged and is retained locally as
  `legacy-origin`.
