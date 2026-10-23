## Context

Accounts, species with photos, and a server-rendered, cache-aware page style all exist. Voting is the first feature that writes member data, so it follows the project rules: the server checks the signed-in member on the action itself (a page that merely hides a button is not protection), and anything personal lives in one small table. See proposal.md for motivation and the spec for behaviour.

## Goals / Non-Goals

**Goals:**

- A vote is one row per member per round, enforced by the database, so a double-click or a replay cannot give anyone two votes.
- Works as a plain form: no JavaScript needed to vote.
- Rounds are data in the repository, reviewed like the other content.

**Non-Goals:**

- Choosing the winner, closing a round automatically, or notifying anyone.
- Preventing a determined person from making many accounts. Voting is for fun, and sign-up needs a confirmed email.

## Decisions

**Table `shark_votes`**: `id`, `created_at`, `updated_at`, `user_id` (references the user, deleted with them), `month` (the round, "YYYY-MM"), `species_id` (references species). A unique index on `(user_id, month)` makes the one-vote rule a database rule, and casting is an insert that updates the existing row on conflict, which is also how changing a vote works. An index on `(month, species_id)` serves the tally.

**Rounds in `content/voting.ts`**: a list of `{ month, candidates: [slug, ...] }`. The open round is the earliest whose month is after the current Toronto month; this is a small pure function with tests. Alternative: a rounds table. Rejected for now: nothing needs to edit rounds at runtime, and a file is reviewable.

**First round**: April 2027, deciding the first month not yet on the schedule. Candidates: epaulette shark (it walks), common thresher shark (its whip-like tail), and basking shark (its huge mouth). All three have photos and profiles, and they show off how different sharks are. Robin can change them in the file.

**Casting is a server action** (`castVote`) on a plain form. It runs `requireUser`, which sends a signed-out visitor to sign in and back, checks that the chosen slug is a candidate of the open round, and then upserts. It never trusts the month from the browser; the server works out which round is open. After saving it sends the member back to `/vote`.

**Results visibility.** The page loads the tally only when the signed-in member already has a vote in the open round. Everyone else gets no counts in the page at all, rather than counts hidden by styling.

**Dynamic by nature.** The page depends on who is signed in, so it reads the session and the database inside a Suspense boundary after `connection()`, with no caching. The candidates and photos come from the content file, so the candidates can show instantly.

**Testing.** Unit tests only: the open-round rule (before a round, after it, none left, picking the earliest) and that every candidate in the content is a real species with at least two candidates per round.

## Risks / Trade-offs

- [One person votes with several accounts] → accounts need a confirmed email and the stakes are fun, so this is accepted; a later change can add stricter rules if it matters.
- [A round runs for months because it opens early] → acceptable for the first round; the rule is easy to change when rounds become routine.
- [Votes are personal data] → one row linking an account to a choice, removed with the account, and the privacy page (a separate change) should mention it.
- [A winner is never announced] → out of scope here; the owner schedules the winning shark by hand, and a follow-up can announce it.
