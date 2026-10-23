## Why

Accounts exist, but nothing on the site needs one. The club's promise was "a vote on next month's shark", and a vote is the simplest thing that gives a free membership a real reason to exist, brings people back, and costs nothing to run. Anyone can see the candidates, so the vote also advertises the club.

## What Changes

- Add a public **/vote** page for the current voting round: three candidate sharks (photo, name, a one-line hook, and a link to the profile) for a future month's Shark of the Month.
- **Members can vote** for one candidate per round, and can change their vote while the round is open. Signed-out visitors see the candidates and a friendly "join the club to vote" prompt.
- After voting, a member sees the **results so far** (counts and bars). Results are hidden until someone has voted, so they do not influence the vote.
- Add "Vote" to the site menu and a short "help choose" card on the home page while a round is open.
- Rounds are defined in a reviewable content file: the month being decided and its candidates. No round open means the page says voting is closed for now.
- Store one vote per member per round (new table, one migration).

Not in this change: picking or announcing the winner (the owner schedules the winning shark by hand for now), vote history on the account page, badges, emailing members about a round, and an admin screen to manage rounds.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `member-voting`: voting rounds, casting and changing a vote, one vote per member, and results shown after voting.

### Modified Capabilities

<!-- None. club-accounts is unchanged; only its sign-in is reused. -->

## Impact

- **Code:** a new page and server action under `apps/web/app/(site)/vote`, a rules module, data functions, a home-page card and a menu link.
- **Database:** one new table (`shark_votes`) and one migration, applied to production before the merge.
- **Personal data:** a vote is linked to a member's account; nothing else is collected. Votes are deleted if the account is.
- **Safety locks touched:** none loosened.
- **Robin to decide or provide:** the three candidates for the first round (a draft is proposed in the design) and when a round should end.
