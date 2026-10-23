## Why

The site has things to read but nothing to play with. A short "Which shark are you?" quiz is the most shareable thing a shark site can have: kids and grown-ups both enjoy it, it takes a minute, it sends people to species profiles, and every result is a link they can send to a friend. It also needs no account and no database.

## What Changes

- Add a public **/quiz** page: six friendly questions, each with four answers, submitted as a plain form that works without JavaScript.
- Submitting the quiz redirects to a **result page** for one of eight sharks: **/quiz/result/[slug]**. Each result has a short, kind description of the personality it matches, a link to that shark's full profile, and a button to take the quiz again.
- A result address can be shared. Anyone who opens it sees the same result, without taking the quiz.
- Add "Quiz" to the site menu and a quiz card on the home page.
- Scoring is a small pure function: each answer awards points to one or two results, the highest total wins, and ties go to a fixed order so the same answers always give the same shark.
- Questions and results are drafted in a reviewable content file. Result text uses only things already on the species pages, so no new factual claims are introduced.

Not in this change: quiz analytics, saving results to an account, trivia or scoring-based quizzes, and result images beyond the placeholder silhouette.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `shark-quiz`: the "Which shark are you?" quiz, its scoring, and its shareable result pages.

### Modified Capabilities

<!-- None. The home page and menu gain public links. -->

## Impact

- **Code:** new pages under `apps/web/app/(site)/quiz`, a route handler that scores and redirects, a content file, a pure scoring module with unit tests, a menu link and a home-page card.
- **Database:** none.
- **Dependencies:** none.
- **Safety locks touched:** none loosened. Search indexing stays off.
- **Robin to decide or provide:** a read of the questions and the eight personality descriptions for tone.
