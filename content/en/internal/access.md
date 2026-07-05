+++
title = "Access Plan"
description = "How PASS separates public information, private documents, and protected internal webpages."
eyebrow = "Members only"
lead = "This document explains how PASS currently handles public information, private non-web files, and private webpages that require sign-in."
internalMode = "document"
outputs = ["HTML"]

[sitemap]
disable = true

[build]
list = "never"
+++

PASS manages different kinds of content within different boundaries so that public communication, day-to-day collaboration, and access governance each stay clear.

## Public Website

The public website is generated from this repository with Hugo and Lotus Docs, then deployed through Vercel.

The public homepage is mainly responsible for:

- Explaining PASS and the community plan
- Presenting the operating principles that can be shared externally
- Serving as the entry point for future public summaries and outward-facing information

## Private Non-Web Documents

Private documents that are not webpages remain in Google Drive.

That keeps things practical because it:

- Uses Google account or Google Workspace permissions for access control
- Supports collaborative editing and ongoing document maintenance
- Keeps private files out of the public website repository

## Private Webpages

Webpages that require sign-in use Google account authentication together with Supabase whitelist authorization.

The current baseline roles are:

- `admin`: can add, disable, and update whitelist accounts and roles
- `member`: can read authorized internal pages and link entries

## Current Internal Entry Points

The internal area currently provides:

- A Google Calendar entry
- A Google Drive documents entry
- An account-management page for administrators

Actual file and calendar permissions are still controlled on the Google side; the website only provides a protected path to those resources.
