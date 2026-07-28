# JoinPASS Project Spec

## Purpose

JoinPASS is the public website for PASS, the Platform for AI Sovereignty
Studies.
It presents approved public information about the study group in Traditional
Chinese and English.

The repository and every file generated from it must be treated as public.
Non-public information, member information, meeting access details, documents,
and private resource links must not be stored in the repository or published
on the website. Such information is shared separately through email.

## Public Website

- Static website generated with Hugo.
- Hugo theme: `colinwilson/lotusdocs`.
- Canonical source hosted in the public GitHub repository
  `JoinPASS/JoinPASS.github.io`.
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

- PASS / Platform for AI Sovereignty Studies name, logo, and mission.
- The Academia Sinica label currently used on the homepage.
- The meeting cadence of two Google Meet sessions per week.
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

- One Traditional Chinese landing page at `/zh-tw/` and one corresponding
  English landing page at `/en/`.
- A single-page narrative covering PASS positioning, operating format,
  participation, sharing boundaries, and the public-summary rhythm without
  repeating the same facts in multiple sections.
- Same-page anchored navigation for the main content sections.
- Future public summaries only after explicit approval and integration into a
  deliberate public information architecture.

The visual experience must remain professional and coherent throughout the
full scroll. It should use restrained institutional color, strong typography,
clear section hierarchy, varied but consistent layouts, generous whitespace,
responsive behavior, visible keyboard focus, and reduced-motion support. It
must avoid repetitive card grids, decorative excess, and marketing-heavy
presentation.

There is no internal website area. Private communication and resource sharing
take place by email outside the website. A public contact address may be added
only after a role-based address is explicitly approved; personal addresses
must not be used by default.

## Deployment

- GitHub Actions is the only deployment workflow.
- GitHub Pages is the only website host.
- The only production site URL is `https://joinpass.github.io/`.
- The Hugo build must use the GitHub Pages organization-site base URL, with
  language pages and assets served from the site root rather than a repository
  subpath.
- The deployed artifact is the generated `public/` directory.
- Application assets must be served from the Pages deployment. The approved
  Google Fonts stylesheets and font files may be loaded from Google's public
  static font hosts.

## Required Development Process

All repository work must follow SSD and OpenSpec:

- Update `docs/open-spec/` before implementation.
- Keep specifications synchronized with implementation decisions.
- Define and verify explicit acceptance criteria before considering work done.
