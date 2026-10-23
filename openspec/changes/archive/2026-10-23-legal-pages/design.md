## Context

The site stores accounts (name, email, a hashed password), sign-in sessions (including the network address and device description Better Auth records), and votes. It sends email through Resend, is hosted on Vercel with its database on Railway, and shows photos loaded from Wikimedia's servers. It sets one cookie (the sign-in session) and has no analytics, ads or tracking. The pages must say this and nothing that is untrue.

## Goals / Non-Goals

**Goals:**

- Accuracy first: every statement matches the code as it is today.
- Plain words a parent and a teenager can read.

**Non-Goals:**

- Legal certainty. These are drafts in plain language for the owner to review; they are not legal advice.
- Describing features that do not exist (a newsletter, analytics, payments). They are added when those features ship.

## Decisions

**Content as components, not a database or Markdown pipeline.** Each page is a small server component using a shared `LegalPage` wrapper for width, headings and the "last updated" line. Alternative: Markdown files. Rejected: it needs a Markdown renderer for two short pages.

**Owner details come from `content/site.ts`.** A `contactEmail` (empty for now) and a `legalUpdated` date. The contact section renders only when `contactEmail` is set, because `hello@sharkly.ca` sends mail but does not receive any. The README lists "set a receiving contact address" as a pre-launch step.

**Wording about the owner is kept generic** ("the person who runs Sharkly") so the page does not state a name, address or jurisdiction the owner has not chosen. The owner can add these when reviewing.

**What the privacy page says about outside services**, because each sees some data: Vercel (hosting; sees visitors' network addresses in the course of serving pages), Railway (the database), Resend (sends our email, sees the recipient's address), and Wikimedia (photos load from its servers, so its servers see the visitor's network address). Fonts are served by the site itself.

**Deletion** is by request for now: members ask the owner by email and the account and its votes are removed, since votes are deleted with the account.

**Join form line**, not a checkbox. "By joining you agree to the Terms and Privacy page" with links, because a checkbox adds a blocking step for children's parents and the pages are short.

**Testing.** None beyond type, lint and build: the pages are static text, and the conditional contact section is a one-line check. Visual check at 360px.

## Risks / Trade-offs

- [The text becomes untrue when features are added] → the README and the project rules say to update these pages when a feature changes what is collected (the newsletter and payments are the next ones).
- [No contact address yet] → flagged as a launch blocker; the pages omit the section rather than invent one.
- [Draft legal text is not legally reviewed] → stated plainly in the proposal and the final report.
