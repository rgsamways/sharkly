## Context

The picture component already supports an image and a credit, and the species table already has `image_url` and `image_credit`. The photos come from Wikimedia Commons, found by looking up each species' Wikipedia page image and its Commons license through the public APIs, then checked by eye on contact sheets. Six lead images were replaced because they showed the wrong species or were unsuitable. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**

- Real photos for all 30 species, correctly credited, with no copyright surprises.
- A credits page, so small cards need no caption.

**Non-Goals:**

- Hosting our own copies, resizing pipelines, or a gallery per species.

## Decisions

**Hotlink Wikimedia's 800px thumbnails.** Commons allows direct use, and its thumbnail addresses are stable. Using them needs no storage, no build step and no image host configuration, because the picture component uses a plain image tag. Alternative: copy the files to our own bucket. Rejected for now: more setup, and a license-and-attribution record to maintain, for little demo value. It can be added later without changing the pages.

**Choices live in `content/species-images.ts`**, a map from species slug to image address, credit text, credit link, license name and license link. The seed script merges it into the species rows, and refuses an entry with no photographer or no license. Alternative: add fields to every species entry. Rejected: it would bury the photo choices in prose and make photo review noisy.

**One new column, `image_credit_url`**, so the credit line can link to the Commons file page. The existing `image_credit` holds the visible text ("Photo: Name, CC BY-SA 4.0, via Wikimedia Commons"). License names and links are shown on the credits page from the content file, not the database, since only the credits page needs them.

**Where the credit goes.** Under the photo on profiles and the featured-shark block; not on small cards or thumbnails, which would be crowded. Those are covered by the `/credits` page, linked from every page's footer, and each card links to its profile where the credit shows. This is the usual practice for sites that credit many images.

**Quiz results** read the image from the same content map, so the quiz needs no database.

**Which images.** Only public domain, CC BY, and CC BY-SA files. Whole-image choices were checked by eye. Wrong-species and unsuitable lead images were replaced: whitetip reef shark, angelshark, common thresher, salmon shark and frilled shark.

**Testing.** One unit test: every photo has a photographer, a license that is one of the allowed ones, and an https address on Wikimedia, and every key is a real species. No browser tests.

## Risks / Trade-offs

- [A license is misread or changes] → licenses were read from Commons' own data, only open licenses are allowed by a check, and credits link to the source page where the license is shown.
- [Wikimedia changes a thumbnail address] → images would fall back to a broken picture; the placeholder is not shown automatically, so a failed load shows the alt text. Acceptable at this scale, and the content file makes a fix quick.
- [A photo shows something upsetting, such as a dead animal on a deck] → such images were replaced where better ones existed; the few remaining are specimen or fisheries photos and are flagged for Robin's review.
- [Hotlinking depends on Wikimedia] → noted; copying to our own storage is a later option.
