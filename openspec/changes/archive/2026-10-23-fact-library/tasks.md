## 1. Data model and rules

- [x] 1.1 Add the `facts` table to the schema and combined schema export, generate the migration, and verify it applies cleanly to the local database
- [x] 1.2 Add the fact rules (topics with labels, verdict labels with symbols, `parseFactTopic`, `factOfTheDay` by Toronto date) with unit tests for an unknown topic, a day change, wrap-around after the last fact, and an empty list; verify `pnpm test` passes
- [x] 1.3 Add the cached data-access functions (list by topic with counts, fact of the day) and verify `pnpm typecheck` passes

## 2. Content

- [x] 2.1 Write about 36 entries in `content/facts.ts` from the research, with plain wording for a ten-year-old, sources for each, and cautious wording where sources disagreed; verify every entry has at least one source link
- [x] 2.2 Extend the seed script to load facts idempotently and refuse an entry with no source, and verify running it twice gives the same row count

## 3. Pages

- [x] 3.1 Build the fact card and myth card components with verdict words and symbols, and verify they render at 360px wide
- [x] 3.2 Build `/facts` with the topic choices as links with counts, the unknown-topic behaviour, and entry anchors; verify it works with JavaScript turned off
- [x] 3.3 Add the fact-of-the-day card to the home page and "Facts" to the menu, and verify the home page at 360px and 1280px wide, and that it is left out when there are no facts

## 4. Release

- [x] 4.1 Check `/facts` and the home page at 360px wide: side margins, no sideways scrolling, and 44px tap targets
- [x] 4.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 4.3 Add a short "Facts" note to the README and verify it lists the seed command
- [ ] 4.4 Run the migration and then the seed against the production database as separate commands before merging, and verify `/facts` on sharkly.ca after the deploy
