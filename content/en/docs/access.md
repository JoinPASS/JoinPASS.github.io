+++
title = "Access Plan"
description = "How the public website, Google Drive documents, and future private webpages will be handled."
icon = "lock"
weight = 200
toc = true
+++

The first version of this website contains public information for PASS only. Internal non-public materials will be handled differently depending on their format.

## Public Website

The public website is generated from this repository with Hugo and Lotus Docs, then deployed through Vercel.

Public content includes:

- Group positioning
- Initial ground rules
- External-facing notes
- Future access planning

## Internal Non-Web Documents

Private documents that are not webpages will remain in Google Drive, where access can be managed through Google accounts or Google Workspace permissions.

These files should not be committed directly into the public website repository.

## Private Webpages

Private webpages require Google account authentication and Supabase-backed whitelist authorization. The first internal area provides entry links for Calendar and Documents; actual Google Calendar and Google Drive access remains controlled on the Google side.

The initial roles are:

- `admin`: Can add, remove, and update whitelist users.
- `member`: Can access approved private pages.

Authorization decisions must be based on protected server-side or Supabase data, not on user-editable metadata.

## Current Status

This first version is adding Google account authentication, Supabase whitelist checks, and the administrator interface. Calendar and Documents are currently protected external links only; the site does not integrate with the Google Calendar or Google Drive APIs.
