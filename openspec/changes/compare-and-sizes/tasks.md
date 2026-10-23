## 1. Logic

- [x] 1.1 Add the pure helpers `sizeLineup` and `parseCompare` with unit tests for lineup order, the person's position, proportional widths, the minimum width, and valid, same, unknown and missing comparison choices; verify `pnpm test` passes

## 2. Pages

- [x] 2.1 Build `/sharks/sizes` with the lineup, the person bar, lengths in words and links to profiles; verify the order and the person's place in the list
- [x] 2.2 Build `/compare` with the plain GET form and the side-by-side view, and notes for unusable choices; verify a valid comparison, the same shark twice, and an unknown shark
- [x] 2.3 Add the links from the sharks page and each profile, and titles and descriptions for both pages; verify the links and the page heads

## 3. Release

- [x] 3.1 Check both pages at 360px wide: no sideways scrolling, the comparison stacks, and 44px tap targets
- [x] 3.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [ ] 3.3 After merge, verify both pages and a shared comparison link on sharkly.ca
