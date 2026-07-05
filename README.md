# JoinPASS

Public website source for PASS, the Platform for AI Sovereignty Study.

The site is built with Hugo and Lotus Docs, supports Traditional Chinese and
English, and is prepared for Vercel deployment.

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

Vercel uses `vercel.json` and `build.sh` to install the required Linux build
tools and generate the static site into `public/`.

## Required Process

All changes must follow SSD and OpenSpec. Read `AGENTS.md` and update
`docs/open-spec/` before implementation changes.
