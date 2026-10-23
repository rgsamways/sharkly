## 1. Styling foundations

- [x] 1.1 Add the themed slim scrollbar (with fallback and a stable gutter) and the global rounded focus ring to the stylesheet; verify the page scrollbar and a focused link in a real browser
- [x] 1.2 Make the Facts topic choices wrap instead of scrolling; verify at 360px wide with no horizontal scrollbar

## 2. Header

- [x] 2.1 Add the current-page check with a small unit test, and the menu component (phone disclosure and desktop links); verify `pnpm test` and `pnpm typecheck` pass
- [x] 2.2 Rebuild the header: sticky, menu button, logo as its own box, join button, and Sign in moved into the phone menu; verify one row at 360px and the desktop layout
- [x] 2.3 Verify in a browser driven by script that the menu opens, shows the current page, closes on choosing a page, on Escape and on a tap outside, and that focus returns to the button

## 3. Footer

- [x] 3.1 Rebuild the footer with a brand line, Explore and About groups and a bottom row; verify at 360px and desktop

## 4. Release

- [x] 4.1 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [ ] 4.2 After merge, check the live header, menu, footer and scrollbars at phone and desktop widths
