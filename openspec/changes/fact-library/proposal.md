## Why

The species catalog says what each shark is. The site also needs the things people repeat and wonder about: how sharks sense the world, how they are born, how old they are, and which popular beliefs are wrong. A page of well-sourced facts and "myth or fact?" answers gives visitors a reason to come back daily and share the site, and it is half of what was asked for at the start ("a bunch of interesting facts about sharks in general").

## What Changes

- Add a **fact library** of about 40 short, sourced entries across six topics: senses, anatomy, babies, history, records, and myths.
- Add a public **/facts** page with topic filters that work without JavaScript. Each entry shows a title, a short body, and its sources.
- **Myth or fact?** entries state the popular claim, a plain verdict (True, False, or Partly true) written in words and with a symbol, a one-sentence answer, and a fuller explanation.
- Add a **Fact of the day** card on the home page, chosen the same way for every visitor each day (Toronto time), drawn from the non-myth facts.
- Add "Facts" to the site menu.
- Every entry carries at least one source link. Wording is plain enough for a ten-year-old and accurate enough for an adult.
- Facts are drafted in a reviewable content file and loaded by an idempotent seed script, the same way as species.

Not in this change: quizzes, member favourites or voting, per-fact pages, an admin editing screen, and linking facts to each species' profile.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `fact-library`: the facts and myth-or-fact entries, the topic filter on `/facts`, source links, plain verdict labels, and the fact of the day.

### Modified Capabilities

<!-- None. The home page and menu gain public links, but species-catalog and shark-of-the-month requirements are unchanged. -->

## Impact

- **Code:** a new page under `apps/web/app/(site)/facts`, a fact-of-the-day card on the home page, new components, and a menu link.
- **Database:** one new table (`facts`) and one drizzle migration, applied to production before the merge, as with species.
- **Content:** `content/facts.ts`, researched by agents using NOAA, Smithsonian, the Natural History Museum, the Florida Museum and similar, with Wikipedia only as a flagged fallback. Robin should read it before indexing is turned on.
- **Dependencies:** none new.
- **Safety locks touched:** none loosened. Search indexing stays off.
- **Robin to decide or provide:** a read of the wording and verdicts before indexing.
