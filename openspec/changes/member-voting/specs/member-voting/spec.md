## Purpose

Lets club members help choose a future Shark of the Month, which gives membership a real benefit while keeping the candidates open for anyone to see.

## ADDED Requirements

### Requirement: A voting round offers a few candidate sharks

The system SHALL show, at `/vote`, the open voting round: the month being decided and its candidate sharks, each with a photo, name, a short hook and a link to its profile. Anyone SHALL be able to see the candidates without an account.

#### Scenario: A round is open

- **WHEN** any visitor opens `/vote` while a round is open
- **THEN** they see the month being decided and every candidate for it

#### Scenario: No round is open

- **WHEN** no round is open
- **THEN** the page says voting is closed for now and links to the Shark of the Month

#### Scenario: Which round is open

- **WHEN** several rounds exist in the content
- **THEN** the open round is the earliest one whose month has not yet started

### Requirement: Only members can vote, once per round

The system SHALL let a signed-in member cast one vote per round for one of its candidates, and SHALL require a signed-in member to do so.

#### Scenario: A signed-in member votes

- **WHEN** a signed-in member chooses a candidate
- **THEN** their vote is recorded and they see the results so far

#### Scenario: A signed-out visitor

- **WHEN** a signed-out visitor opens `/vote`
- **THEN** they see the candidates and a prompt to join or sign in, with no voting buttons

#### Scenario: Casting a vote while signed out

- **WHEN** a request to vote arrives without a signed-in member
- **THEN** no vote is recorded and the visitor is sent to sign in

#### Scenario: Not a candidate

- **WHEN** a request votes for a shark that is not a candidate in the open round
- **THEN** no vote is recorded

### Requirement: Members can change their vote while the round is open

The system SHALL let a member who has voted choose a different candidate, replacing their earlier vote, so that each member always has at most one vote in a round.

#### Scenario: Changing a vote

- **WHEN** a member who voted for one candidate chooses another
- **THEN** their earlier vote is replaced, and the totals count them once

### Requirement: Results appear after voting

The system SHALL show the results so far (a count and a bar for each candidate) only to a member who has voted in the open round, and SHALL NOT show them to anyone else.

#### Scenario: After voting

- **WHEN** a member who has voted opens `/vote`
- **THEN** they see their own choice marked and the count for each candidate

#### Scenario: Before voting

- **WHEN** a member who has not voted, or a signed-out visitor, opens `/vote`
- **THEN** no counts are shown, and a note says the results appear after voting

### Requirement: Voting is easy to find and works on a phone

The system SHALL link voting from the site menu and, while a round is open, from the home page, SHALL lay the page out for a phone about 360px wide without sideways scrolling and with tap targets of at least 44px, and SHALL tell search engines not to index it while indexing is switched off.

#### Scenario: Phone width

- **WHEN** `/vote` is viewed at 360px wide
- **THEN** candidates and buttons fit with side margins and nothing scrolls sideways

#### Scenario: Home page card

- **WHEN** a round is open and a visitor opens the home page
- **THEN** a card invites them to help choose the month's shark and links to `/vote`
