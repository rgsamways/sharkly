## 1. Site-wide

- [x] 1.1 Add the SVG site icon and set `metadataBase`, Open Graph and Twitter defaults in the root layout; verify `/icon.svg` succeeds and the page head has the tags
- [x] 1.2 Add the default share image route; verify it returns a PNG

## 2. Page previews

- [x] 2.1 Add metadata helpers that build the title, description and absolute photo address for a shark and for a quiz result, with a unit test for every species and every result; verify `pnpm test` passes
- [x] 2.2 Use them on the profile page and the quiz result page, and add missing titles and descriptions to the facts, quiz, vote and Shark of the Month pages; verify the head of each page

## 3. Release

- [x] 3.1 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [ ] 3.2 After merge, verify the tags and image on sharkly.ca for the home page, a profile, and a quiz result, and that pages are still marked noindex
