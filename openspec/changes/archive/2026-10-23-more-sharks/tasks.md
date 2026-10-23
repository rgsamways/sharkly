## 1. Content

- [x] 1.1 Research 20 more species from Wikipedia and FishBase with cautious sizes and depths, and write them into the species content file; verify every entry has two source links
- [x] 1.2 Check every new status, scientific name and assessment year against its own IUCN page with `pnpm check:iucn`; verify all 50 species match
- [x] 1.3 Choose a credited open-licensed photo for each new species and add them to the photo file; verify `pnpm test` passes (every species has a photo with an allowed license)

## 2. Release

- [x] 2.1 Seed the local database twice and verify 50 species both times
- [x] 2.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 2.3 Run the seed against the production database before merging, and verify the new sharks, their photos and the sitemap on sharkly.ca after the deploy
