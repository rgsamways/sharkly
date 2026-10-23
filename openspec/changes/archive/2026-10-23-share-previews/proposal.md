## Why

The site is built to be shared: the quiz result, a shark profile, this month's shark. But a link pasted into a message or social post currently shows a bare address with no picture, and the browser tab has no icon. First impressions of a shared link are the cheapest marketing a small site gets, and they cost nothing to run.

## What Changes

- Add a **site icon** (a small shark on a teal tile) so tabs, bookmarks and phone home screens look finished.
- Add a **default share image** and set the site's title and description for link previews (Open Graph and Twitter cards).
- Give **shark profiles** their own title, description and share image (the shark's photo), instead of the generic "Shark profile" title.
- Give **quiz results** a share title ("I'm a Tiger shark!") and the matching shark's photo, so a shared result looks like the result.
- Give the **Shark of the Month**, **facts**, **quiz** and **vote** pages sensible titles and descriptions where they have none.
- Make links absolute using the site's address, so previews work from any messaging app.

Not in this change: generated per-page images, a sitemap, analytics, or turning search indexing on (previews work with indexing off).

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `share-previews`: the site icon, the default share image, and per-page titles, descriptions and share images.

### Modified Capabilities

<!-- None. -->

## Impact

- **Code:** the root layout's metadata, an icon file, a default share image route, and metadata on the profile and quiz-result pages.
- **Database and dependencies:** none.
- **External:** share images for sharks use the same Wikimedia photos already on the site.
- **Safety locks touched:** none loosened. The pages stay marked "do not index" while indexing is off; link previews do not depend on indexing.
- **Robin to decide or provide:** nothing required. A hand-made share image and icon can replace the drawn ones later.
