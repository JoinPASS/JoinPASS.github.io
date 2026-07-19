# Change Spec: Delete Former Personal Repository

## Status

Accepted

## Decision

Permanently delete the former public repository `cclljj/JoinPASS` now that the
canonical repository and organization site have been migrated and verified at
`JoinPASS/JoinPASS.github.io` and `https://joinpass.github.io/`.

This decision supersedes only the prior migration change's temporary non-goal
of leaving the former repository unchanged.

## Scope

- Permanently delete `cclljj/JoinPASS` from GitHub.
- Remove the obsolete local `legacy-origin` remote after deletion.
- Preserve `origin` as `JoinPASS/JoinPASS.github.io`.
- Confirm the canonical repository, deployment workflow, and production site
  remain healthy after deletion.

## Consequences

- The former repository URL and its project-site GitHub Pages deployment will
  no longer be available.
- GitHub-hosted repository settings, Actions history, and other metadata that
  existed only in the former repository will be permanently removed.
- The complete website source and migrated Git commit history remain available
  in the canonical organization repository.

## Acceptance Criteria

- `gh` reports `cclljj/JoinPASS` as not found after deletion.
- The local repository has only the canonical organization repository as a Git
  remote.
- The local `master` branch continues to track `origin/master` in
  `JoinPASS/JoinPASS.github.io`.
- The canonical repository remains public and uses `master` as its default
  branch.
- The latest canonical GitHub Pages workflow remains successful.
- `https://joinpass.github.io/`, `/zh-tw/`, and `/en/` continue to return HTTP
  200 after the former repository is deleted.

## Verification Notes

Deletion and verification completed on 2026-07-19:

- GitHub permanently deleted `cclljj/JoinPASS`; subsequent repository lookup
  reports it as not found.
- The former project-site URL `https://cclljj.github.io/JoinPASS/` returns HTTP
  404.
- The obsolete local `legacy-origin` remote was removed. `origin` is the only
  remaining remote and points to `JoinPASS/JoinPASS.github.io`.
- Local `master` continues to track `origin/master`.
- The canonical repository remains public, uses `master` as its default
  branch, and retains `https://joinpass.github.io/` as its homepage.
- Canonical GitHub Actions run `29679173895` completed successfully for the
  deletion-decision commit.
- The canonical production root, `/zh-tw/`, and `/en/` each continue to return
  HTTP 200 after deletion.
