## Context

The root layout sets a title and description only. Sharks, photos and quiz results all come from content files, so a profile's or result's preview can be built without the database. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**

- Good previews with almost no new code, and no new runtime cost.
- No dependence on the database for metadata, so previews never slow or fail with it.

**Non-Goals:**

- A dynamically generated image per shark; the photo is better and free.
- Analytics on shares.

## Decisions

**Base address from the existing setting.** `metadataBase` is built from `BETTER_AUTH_URL`, which is already the site's public address in every environment, so relative image paths become absolute and nothing new needs configuring.

**Site icon as a hand-written SVG** (`app/icon.svg`), which Next serves as the favicon and which scales for every use. Alternative: a PNG set. Rejected: more files for no benefit now.

**Default share image as a generated image route** (`app/opengraph-image.tsx`) rendered once at build with Next's image generator: a teal gradient, the name and the tagline, in the default font. No emoji or custom font is needed, so it cannot fail to render.

**Per-page metadata from content.** The profile page's `generateMetadata` finds the shark in the content file by slug and returns its name, summary and photo; the quiz result does the same from its content. Because this uses content only, an unknown slug returns plain defaults and the page itself still answers 404.

**Photos as share images** use the 960px version already stored. Wikimedia allows this; the images are the same ones shown on the page and credited there.

**Testing.** One unit test that the profile and result metadata helpers return a title, a description and an absolute https image for every species and every quiz result. No browser tests.

## Risks / Trade-offs

- [A messaging app caches an old preview] → unavoidable and harmless; previews refresh when the app re-fetches.
- [The default image looks plain] → it is deliberately simple and can be replaced by a designed image file later without code changes.
- [Wikimedia thumbnails used as share images load slowly for the app's crawler] → they are small, hosted on Wikimedia's fast network, and the crawler only needs the headers.
