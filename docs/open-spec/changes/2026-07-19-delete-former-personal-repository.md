# Change Spec: Delete Former Personal Repository

## Status

Approved for execution

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

Verification pending permanent deletion.
