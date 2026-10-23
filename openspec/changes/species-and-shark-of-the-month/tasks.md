## 1. Data model and rules

- [x] 1.1 Add the `species` and `shark_of_the_month` tables to the schema and the combined schema export, generate the drizzle migration, and verify it applies cleanly to the local database
- [x] 1.2 Add the shared module for habitats, IUCN codes with plain-word labels, size bands, `sizeBand`, `conservationLabel`, `parseSpeciesFilters` and `currentFeatureMonth`, with unit tests for the band edges (0.99, 1.0, 3.0, 6.0 m), invalid filter values, and the month boundary in Toronto time; verify `pnpm test` passes
- [x] 1.3 Add the data-access functions (list with filters, get by slug, current feature with fallback, archive, last three) using `use cache`, and verify `pnpm typecheck` passes

## 2. Content

- [x] 2.1 Draft 30 species in `content/species.ts` with summary, weird bit, size, habitats, depth, diet, sources and IUCN status, with each status taken from Wikipedia and FishBase (which cite the IUCN assessment) and the IUCN page URL and assessment year recorded; the IUCN website itself blocked automated lookups, so no IUCN page was opened and this is flagged in the file and for Robin's review; verify every entry has at least one source link
- [x] 2.2 Add the draft monthly schedule (October 2026 Goblin Shark, then November to March as listed in the design) to the same file
- [x] 2.3 Write the idempotent seed script that upserts species by slug and the schedule by month and refuses an entry with no source; verify running it twice against the local database gives the same row counts

## 3. Pages

- [x] 3.1 Build the shared components (shark card, size-compared-to-you bar, conservation label, placeholder silhouette) and verify they render at 360px wide with text alternatives
- [x] 3.2 Build `/sharks` with the search and filter form, the empty state and the invalid-filter behaviour; verify it works with JavaScript turned off and that a filtered address reloads to the same list
- [x] 3.3 Build `/sharks/[slug]` with all profile fields, sources and a 404 page for unknown slugs; verify a real species and an unknown slug (status 404)
- [x] 3.4 Build `/shark-of-the-month` and `/shark-of-the-month/archive` including the fallback and empty states; verify each state by editing the local schedule
- [x] 3.5 Update the home page to feature this month's shark with the previous three, keep the plain welcome when none is scheduled, and add "Sharks" and "Shark of the Month" to the site menu; verify at 360px and 1280px wide

## 4. Release

- [x] 4.1 Check every new page at 360px wide: side margins, no sideways scrolling, and 44px tap targets
- [x] 4.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 4.3 Add a short "Species content" section to the README (where the data lives, how to run the seed) and verify it lists the command
- [x] 4.4 Before merging (the tables are only added, so the live site is unaffected), run the migration and the seed against the production database as separate commands and verify `/sharks` and `/shark-of-the-month` on sharkly.ca show the content with search indexing still off
