# JoinPASS Project Spec

## Purpose

JoinPASS is a professional website for PASS, the Platform for AI Sovereignty
Study. The public site will be built from this repository and deployed through
Vercel. Private internal documents that are not webpages will remain in Google
Drive. Private internal webpages will require Google account authentication and
whitelist authorization.

## Public Website

- Static documentation site generated with Hugo.
- Preferred Hugo theme: `colinwilson/lotusdocs`.
- Deployed through the existing Vercel project connected to the GitHub
  repository `cclljj/JoinPASS`.
- Public content should be polished, concise, and suitable for an academic or
  professional study group audience.
- The initial public content is based on the uploaded one-page ground rules
  DOCX `PASS_Ground_Rules_1page.docx`.
- The public information architecture should keep core study group rules in a
  documentation-style section rather than a marketing-heavy landing page.

## Internationalization

The website must support internationalization from the beginning.

- Required languages: Traditional Chinese and English.
- Traditional Chinese should be treated as the primary language for Taiwan
  audiences.
- English content should be available for public-facing pages and navigation.
- The Hugo implementation must use a multilingual structure that keeps content,
  navigation labels, and UI strings translatable.
- Language switching must be visible and easy to use on public pages.
- URLs should use stable language-aware paths, such as `/zh-tw/` and `/en/`, or
  the closest equivalent supported cleanly by the selected Hugo theme.
- New content must define whether it is available in both languages or
  intentionally language-specific.

## Initial Content Model

The first website iteration should include:

- A bilingual homepage introducing PASS / Platform for AI Sovereignty Study.
- A bilingual ground rules page covering meeting cadence, presentation format,
  member participation, internal sharing, and public summaries.
- A bilingual access page explaining that private non-web documents will remain
  in Google Drive and private web pages will later require Google account
  authentication plus Supabase whitelist authorization.

## Private Website Area

Private web content must require:

- Google account authentication.
- Supabase-backed authorization.
- Whitelist membership before access is granted.
- Role separation between administrators and regular users.

## Authorization Model

The whitelist must distinguish at least:

- `admin`: Can add, remove, and update whitelist users.
- `member`: Can access approved private pages.

Authorization decisions must not rely on user-editable metadata. Durable role
and whitelist state should live in Supabase tables protected by RLS policies or
server-side checks.

## Private Non-Web Documents

Internal non-public files should remain in Google Drive so access can be managed
through Google Workspace or Google account permissions.

## Required Development Process

All repository work must follow SSD and OpenSpec:

- Update `docs/open-spec/` before implementation.
- Keep specs synchronized with implementation decisions.
- Verify against explicit acceptance criteria before considering work done.
