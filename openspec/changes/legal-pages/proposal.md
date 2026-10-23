## Why

Sharkly collects names, email addresses, passwords and votes, and sends email. Before it is shown to the public, visitors need to be told plainly what is collected and why, and members need simple terms of use. This is the main gap between "working demo" and "ready to invite people".

## What Changes

- Add a plain-language **/privacy** page that says only what is true of the site as built: what is collected (name, email, a scrambled password, sign-in records, votes), what is not (no ads, no analytics, no tracking cookies), who handles data for us (hosting, database, email, and the photo host), how long it is kept, how to ask for deletion, and that accounts are for grown-ups.
- Add a plain-language **/terms** page: using the site, accounts, votes, facts and photos, and the usual limits.
- Link both from the **footer** of every page and from the **join** form.
- Add a place for the owner's **contact address**; the contact section appears only once an address is set, so the page never promises a mailbox that does not exist yet.
- Record the date each page was last updated.

Not in this change: cookie banners (the site sets only the sign-in cookie and no tracking), account deletion screens (requests go by email for now), and a lawyer's review.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `legal-pages`: the privacy and terms pages, their links, and the conditional contact section.

### Modified Capabilities

<!-- None. -->

## Impact

- **Code:** two new pages, a shared layout for them, the footer, and a line on the join form.
- **Database and dependencies:** none.
- **Safety locks touched:** none loosened.
- **Robin to decide or provide:**
  - A **contact address that receives mail** for the pages (`hello@sharkly.ca` does not receive mail yet, so it is not used). Set it in `content/site.ts`.
  - A read of both pages. They are drafts in plain language and are **not legal advice**; a short review by a lawyer is wise before launch, especially since children may visit.
