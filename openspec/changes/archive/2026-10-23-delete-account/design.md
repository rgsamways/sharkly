## Context

Better Auth can delete a user and, with `sendDeleteAccountVerification`, emails a link first. Its own link goes to a callback that deletes the account on a plain GET as soon as the link is opened (it does require the member's own session, which protects against scanners without cookies, but a signed-out member sees a raw error). Deleting a user already cascades to sessions, accounts and votes because those foreign keys are set to delete with the user. See proposal.md.

## Goals / Non-Goals

**Goals:**

- Deletion that cannot happen by accident: an email, then an explicit button on our own page.
- Reuse Better Auth's token storage, expiry and deletion code rather than writing our own.

**Non-Goals:**

- A grace period, data export, or an admin way to delete someone else's account.

## Decisions

**Own confirmation page, Better Auth's deletion endpoint.** The email link points at `/delete-account?token=...` on our site, not at Better Auth's GET callback. The page shows the warning and a confirm button, which calls Better Auth's `deleteUser` with the token (a POST that needs the member's session and checks that the token belongs to that member). Alternative: use Better Auth's emailed GET link as is. Rejected: a single GET deleting an account is the wrong default, and a signed-out member would see a raw error.

**Email through the existing helper**, with the same look as the other action emails. It says plainly what is removed and that it cannot be undone, and that ignoring the email changes nothing.

**One-hour expiry** via the `deleteTokenExpiresIn` option, and one-time use, which Better Auth enforces by consuming the token.

**Signed-out visitors** to the confirmation page get a sign-in prompt that returns them to the same address, using the existing safe "return to" handling.

**Request button as a small client component** that calls the sign-in client's `deleteUser` with no password. The server sends the email because a verification sender is configured. Errors become friendly text, and the page never reveals more than "check your email".

**Pages are noindex** (the confirmation and goodbye pages).

**Copy changes**: the privacy page's "there is no delete button yet" becomes a description of the self-service flow, and the terms page says the same.

**Testing.** Verified end to end against a real local database by driving the endpoints: request (email printed, nothing deleted), open link signed out and signed in, wrong and reused tokens, confirm (member, sessions and votes gone), and a vote removed from the totals. No new unit tests: the logic belongs to Better Auth and is exercised by that run.

## Risks / Trade-offs

- [Someone with a stolen session could request deletion] → they still need access to the member's email to get the link.
- [An accidental deletion is permanent] → an email, a warning page and an explicit button stand in the way; there is deliberately no undo.
- [Email delivery fails and the member cannot proceed] → the page says to check spam and lets them ask again.
- [Better Auth changes its endpoint] → a version upgrade would show in the end-to-end run; the build catches type changes.
