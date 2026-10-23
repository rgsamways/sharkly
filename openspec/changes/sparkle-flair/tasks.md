## 1. Building blocks

- [x] 1.1 Add the `Sparkle` component and the twinkle, shine and shimmer styles inside a reduced-motion-safe block in the global stylesheet; verify `pnpm typecheck` passes and read the CSS to confirm nothing animates under reduced motion

## 2. Where it goes

- [x] 2.1 Add the logo gradient with shimmer and two small stars beside it; verify the header at 360px and desktop
- [x] 2.2 Add the hero glitter and stars around the featured shark's photo (fewer on phones); verify the home page at 360px and desktop with no sideways scrolling
- [x] 2.3 Add the sparkles around the quiz result title and the small star before key section labels; verify a quiz result at 360px
- [x] 2.4 Add the shine to main buttons and the hover lift and glow to shark cards; verify they show on hover and on keyboard focus

## 3. Release

- [x] 3.1 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [ ] 3.2 After merge, check the live home page and a quiz result, and confirm decorations are hidden from assistive technology
