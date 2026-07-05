# OpenSpec

This directory is the required specification source for JoinPASS.

Every change to this repository must update an OpenSpec document before the
implementation is changed. The spec should describe what is changing, why it is
changing, the expected behavior, and how the change will be verified.

## Required Structure

- `project-spec.md`: Current product, architecture, security, and deployment
  specification.
- `changes/`: One document per meaningful change, decision, or implementation
  increment.
- `templates/change-spec.md`: Template for future change specifications.

## Required Change Flow

1. Identify the relevant existing spec.
2. Create or update a change spec in `docs/open-spec/changes/`.
3. Implement the change.
4. Update `project-spec.md` when the change affects durable behavior,
   architecture, data model, auth, deployment, content model, or user workflow.
5. Verify the acceptance criteria.

## Minimum Acceptance Criteria

Each change spec must include:

- Scope
- Non-goals
- User-visible behavior
- Data, auth, or deployment impact
- Acceptance criteria
- Verification notes

