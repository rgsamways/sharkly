## Why

Sharkly is live at sharkly.ca but the only things on it are a placeholder home page and sign-in. The site exists to introduce a new shark every month, so it needs the sharks themselves (a browsable species catalog) and the monthly feature built on top of it. Both are public, so they also give visitors a reason to come back and, later, a reason to join the club.

## What Changes

- Add a **species catalog** seeded with about 30 well-known species. Each has a plain-language summary, a "weird bit", size, habitat and depth, diet, its conservation status with a source link, and a source or credit line.
- Add public pages: **/sharks** (browse, search, and filter by habitat, size and conservation status) and **/sharks/[slug]** (a profile with a size-compared-to-you bar, quick facts and sources).
- Add **Shark of the Month**: a record of which species is featured in which month, a **/shark-of-the-month** page for the current month's shark, and **/shark-of-the-month/archive** listing past months.
- Show this month's shark, and the previous three, on the **home page**, and add "Sharks" and "Shark of the Month" to the site menu.
- Conservation labels are shown in plain words alongside the official wording (for example, "In danger" next to "Endangered").
- Artwork is a **placeholder** for now. Each species has an optional image address and credit field so real art or photos can be added later without a rebuild.
- Species content is drafted by Claude from IUCN and FishBase and **must be reviewed by Robin before search indexing is switched on**.
- Everything here is public: no account is needed to read it.

Not in this change (each is its own later change): an admin screen for editing species, the fact library, quizzes, voting and badges for members, and illustrations.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `species-catalog`: the species data, the browse page with search and filters, species profile pages, plain-word conservation labels, and the placeholder-artwork rule.
- `shark-of-the-month`: which species is featured in each month, the current-month page, the archive, and the home-page feature.

### Modified Capabilities

<!-- None. club-accounts is unchanged; the header menu only gains public links. -->

## Impact

- **Code:** new pages under `apps/web/app/(site)` (sharks, sharks/[slug], shark-of-the-month, archive), changes to the home page and the site menu, and new components for shark cards, the size bar and conservation labels.
- **Database:** two new tables (`species`, `shark_of_the_month`) and one drizzle migration, applied to the Railway production database.
- **Content:** a reviewable species data file in the repo, loaded into the database by an idempotent seed script. The seed is run by hand against production.
- **Dependencies:** none new.
- **Safety locks touched:** none loosened. `ALLOW_INDEXING` stays off until Robin has reviewed the content.
- **Robin to decide or provide:**
  - Review the drafted species text and conservation statuses before indexing is turned on.
  - Which shark is featured for each upcoming month (a draft schedule is proposed in the design; October is the Goblin Shark).
  - Later: illustration or photo sources.
