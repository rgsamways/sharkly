## 1. Pages

- [x] 1.1 Add `contactEmail` and `legalUpdated` to the site settings and a shared `LegalPage` layout; verify `pnpm typecheck` passes
- [x] 1.2 Write `/privacy` from what the code actually stores and which services it uses, and verify each statement against the schema and settings
- [x] 1.3 Write `/terms`, and verify it renders with the last-updated date
- [x] 1.4 Link both from the footer and the join form; verify the links on a page and on the join form
- [x] 1.5 Show the contact section only when `contactEmail` is set; verify both cases

## 2. Release

- [x] 2.1 Check `/privacy`, `/terms` and the join form at 360px wide: text wraps, nothing scrolls sideways
- [x] 2.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 2.3 Add a pre-launch note to the README (set a receiving contact address, read the legal pages, update them when features change), and verify after the deploy that the pages are live
