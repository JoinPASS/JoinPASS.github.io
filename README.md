# JoinPASS

Public website source for PASS, the Platform for AI Sovereignty Study.

The site is built with Hugo and Lotus Docs, supports Traditional Chinese and
English, and is deployed as a public-only static site with GitHub Actions and
GitHub Pages.

Everything in this repository and in the generated site must be safe to make
public. Member information, meeting access details, documents, and private
resource links are shared separately by email and must not be committed here.

## Development

Install local tools:

```sh
brew install hugo go dart-sass
```

Run the local server:

```sh
hugo server -D
```

Build locally:

```sh
hugo build --gc --minify
```

GitHub Actions uses `.github/workflows/hugo.yml` to build the site into
`public/` and deploy the artifact to GitHub Pages. Repository administrators
must select **GitHub Actions** as the Pages source in the repository settings.

## Required Process

All changes must follow SSD and OpenSpec. Read `AGENTS.md` and update
`docs/open-spec/` before implementation changes.
