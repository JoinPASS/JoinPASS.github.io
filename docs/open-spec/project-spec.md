# JoinPASS Project Spec

## Purpose

JoinPASS is the public website for PASS, the Platform for AI Sovereignty Study.
It presents approved public information about the study group in Traditional
Chinese and English.

The repository and every file generated from it must be treated as public.
Non-public information, member information, meeting access details, documents,
and private resource links must not be stored in the repository or published
on the website. Such information is shared separately through email.

## Public Website

- Static website generated with Hugo.
- Hugo theme: `colinwilson/lotusdocs`.
- Source hosted in the public GitHub repository `cclljj/JoinPASS`.
- Built with GitHub Actions and hosted with GitHub Pages.
- No application backend, database, authentication, authorization, forms, or
  protected web routes.
- No runtime dependency on Supabase, Vercel, analytics providers, application
  APIs, or other non-GitHub application services.
- Google Fonts is an approved exception and may be used as a public static font
  resource without application credentials or private data exchange.
- Public content must be polished, concise, professional, and suitable for an
  academic or professional study group audience.

## Approved Public Content

The public site may include:

- PASS / Platform for AI Sovereignty Study name, logo, and mission.
- The Academia Sinica label currently used on the homepage.
- The meeting cadence of three Google Meet sessions per week.
- The meeting format of a roughly 40-minute presentation followed by roughly
  20 minutes of questions and discussion.
- Member participation expectations, non-attribution norms, and the public
  summary rhythm currently described by the public ground rules.
- Public summaries and other material explicitly approved for publication.

Naming Google Meet in public copy does not make it part of the website runtime
architecture.

## Prohibited Repository and Website Content

The repository and generated site must not contain:

- Member lists, personal email addresses, whitelist records, or account roles.
- Private meeting URLs, calendar entries, document links, or internal resource
  identifiers.
- Private presentations, notes, discussion records, or unpublished summaries.
- Authentication credentials, API secrets, service-role keys, or private
  configuration.
- Pages described as internal, hidden, members-only, or protected.

Removing a page from navigation, robots files, or sitemaps does not make it
private. Content is eligible for this repository only when it is safe to make
public permanently.

## Internationalization

- Required languages: Traditional Chinese and English.
- Traditional Chinese is the primary language for Taiwan audiences.
- Language switching must be visible and preserve the corresponding page when
  a translation exists.
- URLs must remain stable and language-aware under `/zh-tw/` and `/en/`.
- New public content must define whether it is bilingual or intentionally
  language-specific.

## Public Information Architecture

The site includes:

- A bilingual homepage introducing PASS and its approved operating model.
- A bilingual public ground-rules page.
- Future bilingual public summaries or resources only after explicit approval.

There is no internal website area. Private communication and resource sharing
take place by email outside the website. A public contact address may be added
only after a role-based address is explicitly approved; personal addresses
must not be used by default.

## Deployment

- GitHub Actions is the only deployment workflow.
- GitHub Pages is the only website host.
- The Hugo build must use the GitHub Pages base URL so project-site subpaths
  work correctly.
- The deployed artifact is the generated `public/` directory.
- Application assets must be served from the Pages deployment. The approved
  Google Fonts stylesheets and font files may be loaded from Google's public
  static font hosts.

## Required Development Process

All repository work must follow SSD and OpenSpec:

- Update `docs/open-spec/` before implementation.
- Keep specifications synchronized with implementation decisions.
- Define and verify explicit acceptance criteria before considering work done.
