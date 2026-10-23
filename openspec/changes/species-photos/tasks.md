## 1. Data

- [x] 1.1 Add the nullable `image_credit_url` column to the species table, generate the migration, and verify it applies to the local database
- [x] 1.2 Write `content/species-images.ts` with the chosen photo, photographer, license and links for all 30 species, and a unit test that every entry has a photographer, an allowed license, a Wikimedia https address, and a real species; verify `pnpm test` passes
- [x] 1.3 Extend the seed script to merge the photos into the species rows and refuse a photo with no photographer or license; verify two runs give the same counts and every species has a photo

## 2. Pages

- [x] 2.1 Update the picture component to show the photo with lazy loading, the credit line with its link, and the placeholder fallback; verify the shape does not change between photo and placeholder
- [x] 2.2 Pass the credit through on the profile and the featured-shark block, and use the photo on cards, the archive, the home thumbnails and quiz results; verify each page shows its photo
- [x] 2.3 Build the `/credits` page and the footer link; verify every species is listed and the link is on the footer

## 3. Release

- [x] 3.1 Check the home page, `/sharks`, a profile and `/credits` at 360px wide: no sideways scrolling and photos within their cards
- [x] 3.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [ ] 3.3 Run the migration and then the seed against the production database as separate commands before merging, and verify the photos on sharkly.ca after the deploy
