## 1. Sitemap

- [x] 1.1 Add the `publicPaths` helper with a unit test (every shark and quiz result, no repeats, slashes, no private paths); verify `pnpm test` passes
- [x] 1.2 Add the sitemap, empty while indexing is off, and name it in `robots.txt` only while indexing is on; verify both states locally

## 2. Release

- [x] 2.1 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [ ] 2.2 After merge, set `ALLOW_INDEXING=true` in Vercel production and redeploy; verify `robots.txt` allows crawling and names the sitemap, a public page is not marked do-not-index, and the account and sign-in pages still are
