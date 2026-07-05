# Project Instructions

## Mandatory Workflow: SSD + OpenSpec

This repository must be developed with SSD, interpreted here as
Specification-Driven Development.

For every repository change, including small code, content, config, deployment,
or documentation changes, the agent must:

1. Read the relevant files under `docs/open-spec/` before editing.
2. Create or update the relevant OpenSpec document before implementation work.
3. Keep the OpenSpec document in sync while implementing.
4. Define or update acceptance criteria for the change.
5. Verify the implementation against those acceptance criteria.
6. Mention the updated OpenSpec document path in the final response.

No implementation change is considered complete unless the matching OpenSpec
document has been created or updated.

## Project Quality Bar

- Keep the site professional, restrained, and suitable for a study group.
- Prefer clear information architecture over decorative presentation.
- Treat authentication, authorization, and whitelist administration as security
  sensitive work.
- Never expose Supabase service-role or secret keys in browser code.
- Any Supabase schema exposed to public clients must use RLS with explicit,
  role-aware policies.

