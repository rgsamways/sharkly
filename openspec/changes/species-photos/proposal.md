## Why

Every shark on the site shows the same silhouette. Photos are the single biggest thing that would make Sharkly feel real, and Wikimedia Commons has openly licensed photos of all 30 species. Using them means the site must credit each photographer and respect each license, so the change has to treat credits as part of the feature, not an afterthought.

## What Changes

- Give each of the 30 species a **photo**, chosen from Wikimedia Commons images that are public domain, CC BY, or CC BY-SA, and checked by eye to show the correct species and suit a kids' site.
- Show the photo on species cards, profiles, the home page, the Shark of the Month pages, the archive, and quiz results.
- Show a **credit line** (photographer, license, "via Wikimedia Commons") linking to the image's page, under the photo on profiles and the featured shark.
- Add a public **/credits** page listing every photo with its photographer, license, and links, and link it from the footer. This is where credit is given for small cards that have no room for a caption.
- Keep the silhouette as the fallback for any species with no photo.
- Store the credit link beside the existing image fields (one new nullable column), and keep the image choices in a reviewable content file.

Not in this change: hosting copies of the images ourselves, an image upload screen, illustrations, and more than one photo per species.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `species-photos`: species photos with their licensed credits, the credits page, and the silhouette fallback.

### Modified Capabilities

<!-- None. species-catalog already allows an image address and a credit; it does not require them. -->

## Impact

- **Code:** the picture component, the cards and pages that use it, a new `/credits` page, a footer link, the seed script, and a content file of image choices.
- **Database:** one new nullable column (`image_credit_url`) and one migration, applied to production before the merge.
- **External:** photos are loaded straight from Wikimedia's servers, which they allow. If we ever want independence, a later change can copy the images to our own storage.
- **Safety locks touched:** none loosened. Search indexing stays off.
- **Robin to decide or provide:** a look at the photo choices, and whether hotlinking to Wikimedia is acceptable long term.
