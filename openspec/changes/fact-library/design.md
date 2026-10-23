## Context

Species and Shark of the Month follow a pattern: content in a typed file (`content/species.ts`), loaded into Postgres by an idempotent seed script, read through cached functions behind `connection()` and Suspense so the build needs no database. The fact library reuses all of that. See proposal.md for motivation and the spec for behaviour.

## Goals / Non-Goals

**Goals:**

- Reuse the species pattern end to end so there is little new to learn or break.
- Make every claim sourced, and make verdicts readable without colour.
- A small, deterministic fact of the day with no per-visitor state.

**Non-Goals:**

- Per-fact pages, quizzes, favourites, or tying facts to species profiles.
- Anything personalised or stored per member.

## Decisions

**One `facts` table, with myths as rows.** Columns: `slug` (unique), `topic` (one of senses, anatomy, babies, history, records, myths), `title`, `short_answer` and `verdict` (both only for myths), `body`, `sources` (jsonb, at least one, enforced by a check), plus optional `species_slug` text for a later link. Alternative: separate `facts` and `myths` tables. Rejected: they share almost every field and the page lists them together.

**Topics are a code constant**, like habitats, so the filter, the seed check and the page use one list. `myths` is a topic, which keeps filtering to one query-string value.

**Filtering by `?topic=`** with `parseFactTopic` (unknown values become "all"), as plain links that work without JavaScript. Anchors use the entry slug as the element id, so `#slug` works.

**Fact of the day by date arithmetic, not randomness.** Count whole days since a fixed date in Toronto time, take the remainder by the number of non-myth facts, and index into the list ordered by slug. It is deterministic, needs no storage, changes at Toronto midnight, and is a pure function that is easy to unit-test. Alternative: pick at random and store it. Rejected: it needs a table, a job, and a way to recover if the job is missed.

**Verdict labels.** `false` reads "Myth", `true` reads "True", `partly` reads "Partly true", each with a distinct symbol, in addition to colour.

**Content.** About 40 entries drafted from agent research using NOAA, Smithsonian, the Natural History Museum, the Florida Museum and similar, with Wikipedia only where nothing better was found and flagged. Wording is checked for a ten-year-old reading level. Entries whose confidence was low, or whose sources disagreed, are left out or stated cautiously.

**Testing.** Unit tests only, for `parseFactTopic` and `factOfTheDay` (the day change, the wrap-around, and an empty list). No database or browser tests.

## Risks / Trade-offs

- [A wrong fact on a public kids' site] → every entry has a source; sources are named in the report; disputed numbers are stated cautiously or left out; indexing stays off until Robin reads it.
- [Verdicts oversimplify, for example "sharks must keep swimming"] → "Partly true" exists and the explanation names which species do what.
- [Fact of the day repeats after about a month] → acceptable at launch; more facts can be added to the file.
- [Content and database drift] → the content file is the source of truth and the seed is idempotent.
