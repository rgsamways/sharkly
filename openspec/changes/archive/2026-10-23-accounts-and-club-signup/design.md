## Context

The backend already exists and typechecks: Better Auth with email-and-password (12+ characters, email verification required), a magic-link plugin (`disableSignUp: true`, 10-minute expiry), a server-side `role` field the browser cannot set, session helpers (`getCurrentUser`, `requireUser`, `requireRole`), the auth email templates, and a rate limiter. What is missing is every page and form. Monkeyback has working versions of them in `apps/web/app/(shop)` (sign-in, create-account, check-email, forgot-password, reset-password, account, auth/continue) and `components/auth-forms.tsx`, `user-menu.tsx`, `header-account.tsx`, `use-sign-out.ts`. See proposal.md for the motivation.

Monkeyback's roles are named `customer < admin < developer`. Sharkly keeps the same role values, because the code and the database default already use them, and shows the word "member" to readers.

## Goals / Non-Goals

**Goals:**

- Port the Monkeyback pages and forms with the least change, restyled for Sharkly and rewritten in Sharkly's plain, friendly voice.
- Phone first: layouts, tap targets and side margins are decided for 360px and scaled up.
- Add a shared public site header and footer, since the home page has none yet.

**Non-Goals:**

- Child accounts, age checks or parental-consent flows. A parent signs up; we store nothing about the child.
- Profile editing, deleting an account, or changing email. These come with a later change.
- Admin pages, roles management, voting, badges, newsletters, or payments.
- Social sign-in (Google and similar).

## Decisions

**Port, don't redesign.** Copy Monkeyback's pages and `auth-forms.tsx`, then remove the shop-specific parts (bag, orders, guest-order claiming) and swap the copy. Alternative: write fresh forms. Rejected: Monkeyback's are already proven against this exact backend, including the "same answer for every email" behaviour, and rewriting risks losing it.

**Routes.** `/join` (create account; Monkeyback calls it `/create-account`), `/sign-in`, `/check-email`, `/forgot-password`, `/reset-password`, `/account`, `/auth/continue`. "Join" matches the club language and is friendlier for children.

**"Who is this for?" is a form note, not stored data.** It switches on a short explanatory note and nothing is saved. Alternative: store a `signup_for` column. Rejected: it adds a migration and personal-data questions for no feature that needs it yet. Draft wording: "Sharkly accounts belong to a grown-up. If this is for a young reader, you sign up and they can enjoy the sharks with you."

**Header.** A server component reads the current user and renders either the join and sign-in buttons or the account menu (`user-menu`). On narrow screens the site menu is a horizontal scrollable strip under the logo row, the same pattern as the mockups, so it never disappears. The header and footer live in a `(site)` route group layout so every public page shares them.

**Data and caching.** The header depends on the session, so the user lookup happens inside a Suspense boundary and the rest of each page stays static under cacheComponents. Alternative: make the whole layout dynamic. Rejected: it would slow every page for a small menu.

**Spam protection.** Keep the existing rate limiter on join and sign-in. Cloudflare Turnstile is already wired in `lib/turnstile.ts` and switches on when both keys are set; leave it off until needed.

**Testing.** Light, as per the project rule: unit tests only, for the pure helpers that are easy to get wrong (safe "return to" path validation, and the friendly error-message mapping). No browser tests and no database tests. The pages are checked by running them and by the CI typecheck, lint and build.

## Risks / Trade-offs

- [Verification emails land in spam or are not sent in production] → `RESEND_API_KEY` is already required in production by the environment check; the "check your email" page offers a resend and tells people to look in junk mail.
- [Open redirect through the "return to" parameter after sign-in] → only same-site paths starting with a single `/` are accepted, covered by a unit test.
- [Children reaching the form directly] → the page states clearly that accounts are for grown-ups and collects no child data.
- [Role names say "customer" in the database but "member" on screen] → mapped in one place, so later code does not scatter the wording.
