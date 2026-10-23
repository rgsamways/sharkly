## Context

`ALLOW_INDEXING` already controls the root metadata (do-not-index) and `robots.txt`. Individual private pages carry their own do-not-index marking, which does not depend on the setting. Shark and result addresses come from the content files. See proposal.md.

## Goals / Non-Goals

**Goals:**

- One helper that lists the public paths, so the sitemap and its test share one source of truth.
- Turning indexing on is one setting, and turning it off again undoes everything, including the sitemap.

**Non-Goals:**

- Search-engine accounts, per-page priorities, or last-modified dates.

## Decisions

**A pure `publicPaths()` helper** returns the static pages plus one path per species and per quiz result, in a fixed order, with no repeats. The sitemap maps them to full addresses using the site's own address (`BETTER_AUTH_URL`, already set everywhere). Alternative: discover pages from the router. Rejected: private pages would have to be filtered out by hand anyway, and an explicit list is clearer.

**The sitemap is empty while indexing is off**, so the site never lists its pages while asking to be ignored. `robots.ts` names the sitemap only when indexing is on.

**Private pages are excluded** by simply not being in the list. They keep their own do-not-index marking as a second layer.

**Testing.** A unit test that the helper includes every species and quiz result, has no repeats, starts every path with a slash, and contains none of the private paths.

## Risks / Trade-offs

- [Content pages that read badly in search results] → previews and titles were added earlier; the site owner approved the wording.
- [Search engines index before a contact address exists] → noted; the privacy page omits the contact section until one is set, and this is called out as the next thing to do.
- [Needing to hide the site again] → set `ALLOW_INDEXING=false` and redeploy; the sitemap empties and `robots.txt` disallows everything. Pages already listed by a search engine take its own time to drop.
