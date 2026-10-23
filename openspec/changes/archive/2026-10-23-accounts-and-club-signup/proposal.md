## Why

Sharkly's sign-in backend (Better Auth, magic links, roles, email) was copied from Monkeyback, but there are no pages to use it. The Shark of the Month club, voting, badges and the newsletter all need a member to exist first, so joining and signing in is the first thing to build.

## What Changes

- Add a free **Join the club** page: name, email and password, with email verification before first sign-in.
- Add **Sign in** with either a password or an emailed one-time link, plus **forgot / reset password**, a **check your email** page, and sign-out.
- Add a simple **/account** page showing the member's name and email, with sign-out.
- Add a **header user menu**: "Join the club" and "Sign in" when signed out; the member's menu when signed in. On phones it sits with the scrollable site menu.
- Offer a "Who is this for?" choice on the join form. A young reader never gets their own account: a parent or guardian signs up, and the page says so in plain words.
- Collect only what the club needs (name, email). No ages, birthdays or photos.
- Wording is friendly and plain for both children and adults. Every page is designed for a phone first.

Nothing here touches payments. No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `club-accounts`: joining the club for free, email verification, signing in (password or emailed link), password reset, the account page, sign-out, and the header menu.

### Modified Capabilities

<!-- None. This is the first spec in the project. -->

## Impact

- **Code:** new pages under `apps/web/app` (join, sign-in, check-email, forgot-password, reset-password, account, auth/continue), new components (auth forms, user menu, sign-out hook), a shared site header and footer used by the public pages.
- **Reused as-is:** `lib/auth.ts`, `lib/session.ts`, `lib/roles.ts`, the auth emails, and the rate limiter. No schema change and no new database migration.
- **Dependencies:** none new.
- **Safety locks touched:** none are loosened. Search indexing stays off. Production still needs `RESEND_API_KEY` so verification emails can be sent.
- **Robin to decide or provide:** the wording of the "young reader" note (a draft is in the design), and later a Cloudflare Turnstile key if sign-up spam appears.
