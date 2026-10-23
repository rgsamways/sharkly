## Context

Everything else on the site is read-only content. The quiz is the first interaction, so the design keeps it as simple as the rest: no database, no accounts, no JavaScript required. See proposal.md for motivation and the spec for behaviour.

## Goals / Non-Goals

**Goals:**

- Work with JavaScript turned off, and on slow phones.
- A result is a plain address, so sharing is just sending a link.
- Scoring that is a pure function, easy to test and impossible to make non-deterministic.

**Non-Goals:**

- Remembering results per member, analytics, or A/B testing.
- Randomised question order (it would make a result harder to reason about).

## Decisions

**Content in a typed file (`content/quiz.ts`)**, not the database: six questions, four options each, and eight results, with the points each option awards. It follows the species and facts habit of editing words in a pull request, but needs no table, migration or seed.

**A plain GET form posting to a route handler.** `/quiz` is a static server page with radio buttons named `q1` to `q6`, submitting to `/quiz/result`. A route handler reads the answers, scores them, and replies with a redirect to `/quiz/result/<slug>`. A missing or invalid answer redirects back to `/quiz?missing=1`. Alternative: a client component with state. Rejected: it needs JavaScript and ships more code for no gain. Alternative: compute the result in a page and redirect there. Rejected: a page that redirects after streaming has begun is slower and gives a worse status code.

**Result pages are static.** `generateStaticParams` returns the eight result slugs from the content file, so they are built ahead of time and an unknown slug is a 404 before anything streams. The page needs no database.

**Scoring.** `scoreQuiz(answers)` takes six option indexes, sums the points per result, and returns the slug with the highest total, or null if the answers are invalid. Ties go to the order the results appear in the content file. Each result earns points from at least four different options, so none is unreachable.

**Results use only what the site already says.** Descriptions are playful but only borrow facts already on the species pages, so the quiz adds no new claims that would need sourcing. Each result links to the profile.

**Linked species must exist.** A unit test checks that each result slug is a real species in `content/species.ts`, so a renamed species cannot silently break a result's link.

**Testing.** Unit tests only: `scoreQuiz` (deterministic result, tie order, invalid answers), and that every result slug is a known species and is reachable. No browser or database tests.

## Risks / Trade-offs

- [A result a child dislikes ("I'm a goblin shark?")] → every description is written to be flattering and fun, and the goblin shark is the quirky, one-of-a-kind result.
- [Skewed results where one shark wins most of the time] → points are spread across results by hand and a test checks that every result is reachable; heavier balancing is not worth it for a fun quiz.
- [A route handler adds a second way to get a result] → it only redirects; the result page is the single place a result is shown.
