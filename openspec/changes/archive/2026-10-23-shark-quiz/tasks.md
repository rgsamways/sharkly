## 1. Quiz content and scoring

- [x] 1.1 Write `content/quiz.ts` with six questions of four answers and eight results with plain, friendly descriptions that reuse facts already on the species pages; verify every result links to a real species
- [x] 1.2 Add the pure scoring module (`scoreQuiz`) with unit tests for a deterministic result, tie order, invalid answers, every result being reachable, and every result slug being a known species; verify `pnpm test` passes

## 2. Pages

- [x] 2.1 Build `/quiz` as a no-JavaScript form with large tappable answers and the "please answer every question" note; verify it at 360px wide
- [x] 2.2 Build the `/quiz/result` route handler that scores, redirects to the result, and sends bad submissions back to the quiz; verify a full set of answers and a missing answer by request
- [x] 2.3 Build `/quiz/result/[slug]` with static params, the profile link, retake link, and a 404 for an unknown slug; verify a real slug (200) and an unknown one (404)
- [x] 2.4 Add "Quiz" to the menu and a quiz card to the home page; verify at 360px and 1280px wide

## 3. Release

- [x] 3.1 Check the quiz, a result and the home page at 360px wide: side margins, no sideways scrolling, and 44px tap targets
- [x] 3.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 3.3 After merge, verify `/quiz` and a result on sharkly.ca
