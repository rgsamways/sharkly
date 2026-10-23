## 1. Data and rules

- [x] 1.1 Add the `shark_votes` table with the one-vote-per-member-per-round rule, generate the migration, and verify it applies to the local database and refuses a second row for the same member and round
- [x] 1.2 Write `content/voting.ts` with the April 2027 round and its three candidates, and the pure `openRound` rule, with unit tests for before a round, after it, none left, and picking the earliest, and that every candidate is a real species; verify `pnpm test` passes
- [x] 1.3 Add the data functions (a member's vote, the tally, and an upsert that only accepts a candidate of the open round); verify `pnpm typecheck` passes

## 2. Pages

- [x] 2.1 Build the `castVote` server action that requires a signed-in member, ignores the month from the browser, and rejects a non-candidate; verify a signed-out request records nothing and a valid vote is saved
- [x] 2.2 Build `/vote` showing the candidates to everyone, voting buttons to signed-in members, a sign-in prompt to visitors, and results only after voting; verify each of the four states
- [x] 2.3 Add "Vote" to the menu and a home-page card while a round is open; verify at 360px and 1280px wide

## 3. Release

- [x] 3.1 Check `/vote` and the home page at 360px wide: no sideways scrolling and 44px tap targets
- [x] 3.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 3.3 Run the migration against the production database before merging, and verify `/vote` on sharkly.ca after the deploy
