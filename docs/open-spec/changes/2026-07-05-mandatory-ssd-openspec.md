# Change Spec: Mandatory SSD and OpenSpec Workflow

## Status

Accepted

## Scope

Establish a repository-level requirement that all future changes use SSD
(Specification-Driven Development) and keep OpenSpec documents current.

## Non-Goals

- This change does not implement the Hugo site.
- This change does not configure Vercel deployment.
- This change does not implement Supabase authentication or authorization.

## User-Visible Behavior

Future contributors and agents must update the OpenSpec documents before making
repository changes. Final work summaries must cite the OpenSpec documents that
were updated.

## Data, Auth, or Deployment Impact

No runtime data, authentication, authorization, or deployment behavior changes
are introduced by this change. It only establishes the project workflow and
documentation structure.

## Acceptance Criteria

- A repository-level instruction file requires SSD and OpenSpec for every
  change.
- The OpenSpec directory exists and defines the required documentation flow.
- The project spec records the current high-level product, deployment, and auth
  direction.
- A change spec records this workflow decision.

## Verification Notes

Created `AGENTS.md`, `docs/open-spec/README.md`,
`docs/open-spec/project-spec.md`, this change spec, and a reusable change-spec
template.

