## Context

The site has a shared header and footer in the `(site)` route group, a Drizzle and Postgres setup with one migration (auth, audit, mailing, newsletter tables), and a placeholder home page. Pages run under `cacheComponents`, so data reads should use `use cache` with a cache life, and anything per-visitor sits behind Suspense. The mockups in `docs/design/mockups` show the intended look. See proposal.md for motivation and the specs for behaviour.

## Goals / Non-Goals

**Goals:**

- Put real, sourced content on the public site quickly, with a structure that later changes (facts, quizzes, voting) can hang off.
- Keep species text reviewable in git, so Robin can edit it in a pull request.
- Server-rendered browsing that works without JavaScript and is cheap to cache.

**Non-Goals:**

- An admin editing screen, image upload, or a CMS.
- Facts, quizzes, voting, badges, or anything that needs an account.
- Illustrations or photography.
- Full-text or fuzzy search. A simple name match is enough for about 30 species, and a few hundred later.

## Decisions

**Content in the repo, loaded into the database by a seed script.** Species live in a typed file (`content/species.ts`) and a script upserts them by slug into the `species` table. Alternative: write the rows as SQL in a migration. Rejected: prose in SQL is hard to review and edit, and re-seeding after a fix would need another migration. The script is idempotent and is run by hand against production, the same way migrations are. Alternative: read straight from the file with no table. Rejected: later changes (facts, votes) need to reference species by id, and the catalog should survive growing to 500+ species.

**Two tables.** `species` (slug unique, names, `max_length_cm`, `habitats text[]`, `depth_min_m` and `depth_max_m` nullable, `diet`, `iucn_status` code, `iucn_source_url`, `iucn_assessed_year`, `summary`, `weird_bit`, `sources jsonb` as a list of label and URL, `image_url` and `image_credit` nullable) and `shark_of_the_month` (`month` text in `YYYY-MM` form, unique, `species_id` foreign key, `teaser`). Alternative: a boolean "featured" on species. Rejected: a species can be featured twice and the archive needs a history. `month` is text with a check against the pattern, which sorts correctly and avoids time-zone surprises in the stored value.

**Controlled vocabularies in code.** Habitats (`reef`, `coastal`, `open-ocean`, `deep-sea`, `polar`, `estuary`), IUCN codes (`LC`, `NT`, `VU`, `EN`, `CR`, `DD`) and their plain-word labels, and the size bands live in one module with pure functions: `sizeBand(cm)`, `conservationLabel(code)`, `parseSpeciesFilters(searchParams)` and `currentFeatureMonth(now)`. These are the only things unit-tested, because they hold the rules that are easy to get wrong (band edges, invalid filter values, the month boundary).

**Filtering by query string, on the server.** `/sharks?q=&habitat=&size=&status=` is parsed with `parseSpeciesFilters`, which drops unknown values, and applied in the query. The page is a plain form with a GET submit, so it works without JavaScript and filtered views are shareable. Alternative: client-side filtering of the full list. Rejected: needs JavaScript and ships the whole list; fine today, wasteful at 500 species.

**"Current month" is computed in the Toronto time zone** and the reads are cached for an hour (`cacheLife` of hours), so a new month shows up within an hour of midnight without a redeploy. If the month has no record, fall back to the most recent past month. The archive only lists months up to and including the current one.

**Size bar.** A pure presentational component takes the shark's length and 170 cm for the person. The bar is scaled against the longer of the two, with a minimum visible width, and the lengths are also printed as text, so it is accessible and survives a failed render.

**Conservation labels.** Status is shown as text plus a small icon shape, never colour alone, in the order "plain words, official name". The colour only reinforces.

**Placeholders.** With no `image_url`, cards and profiles use a drawn shark silhouette component with alt text naming the species. Real images go through `next/image` later; remote image hosts are added to the config then.

**Draft schedule.** October 2026: Goblin Shark. Then, as a suggestion Robin can reorder, November: Greenland Shark; December: Whale Shark; January: Hammerhead (scalloped); February: Great White; March: Dwarf Lanternshark. The schedule is data in the seed file.

**Content accuracy.** The 30 entries are drafted by Claude from Wikipedia and FishBase, which cite the IUCN Red List. The IUCN website blocks automated lookups, so no IUCN page was opened: each status is "as reported by Wikipedia and FishBase", each entry links the IUCN page that Wikipedia cites, and the year stored is the year of the assessment, not a year we checked. Where sources disagreed on a length or depth, the more cautious figure was used, and depth is left out when it could not be pinned down. Robin reviews the file in the pull request, and opens the IUCN links, before indexing is turned on.

**Testing.** Unit tests only for the four pure functions. No database or browser tests; the pages are checked by running them locally and at 360px, and by the CI typecheck, lint and build.

## Risks / Trade-offs

- [A wrong fact or out-of-date conservation status on a public kids' site] → every entry carries source links and a checked-year; indexing stays off until Robin reviews; each status comes from Wikipedia and FishBase citing the IUCN assessment, and Robin opens the IUCN links before indexing.
- [Placeholder art makes the site look unfinished] → a single well-made silhouette component and good layout carry the pages; real art is its own later change.
- [Seeding by hand against production is easy to forget] → the task list ends with running and verifying it, and the README documents the command.
- [Month rollover depends on cache life] → at most one hour of lag, which is accepted and written in the spec.
- [Habitats as an array complicate filtering] → Postgres array overlap handles it in one query; with a few hundred rows no index is needed.
- [Species added later without a source] → the seed script refuses an entry with no source link.
