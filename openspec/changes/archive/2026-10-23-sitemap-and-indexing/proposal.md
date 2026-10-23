## Why

The site's content has been reviewed and Robin has asked for search engines to be let in. Turning indexing on is a setting, but a site this size should also tell search engines where its pages are, so every shark profile and quiz result is found quickly instead of by chance.

## What Changes

- Add a **sitemap** (`/sitemap.xml`) listing every public page: the main pages, every shark profile, and every quiz result. Account, sign-in and similar private pages are left out.
- Point **robots.txt** at the sitemap when indexing is on.
- When indexing is **off**, the sitemap is empty, so the site never advertises pages while asking to be ignored.
- Switch **search indexing on** for the live site, by setting `ALLOW_INDEXING=true` in production. This is a setting, not code, and it can be set back to `false` at any time to hide the site again.

Not in this change: search-engine accounts (Google Search Console and similar), structured data, or any change to which pages are private.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `sitemap-and-indexing`: the sitemap, robots pointing at it, and how indexing on and off behave.

### Modified Capabilities

<!-- None. -->

## Impact

- **Code:** a sitemap file, a small helper listing the public paths, and one line in `robots.ts`.
- **Database and dependencies:** none; the sitemap is built from the content files.
- **Setting changed:** `ALLOW_INDEXING` in Vercel production, then a redeploy. This lets search engines list the site.
- **Safety locks touched:** this change is the deliberate release of the "do not index" lock, at Robin's instruction. Private pages (account, sign-in, check-email, reset password) keep their own do-not-index marking.
- **Robin to decide or provide:** a receiving contact address is still outstanding; until it is set, the privacy page has no contact section.
