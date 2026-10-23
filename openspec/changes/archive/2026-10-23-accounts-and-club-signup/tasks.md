## 1. Shared site shell

- [x] 1.1 Create a `(site)` route group with a shared header (logo, scrollable site menu, join and sign-in buttons) and footer, move the home page into it, and verify the home page renders with both at 360px and 1280px wide
- [x] 1.2 Add `useSignOut`, `user-menu` and a session-aware `header-account` ported from Monkeyback inside a Suspense boundary, and verify the header shows the signed-out buttons when there is no session and the account menu when there is
- [x] 1.3 Add a safe "return to" path helper (same-site paths only) with unit tests, and verify the tests pass

## 2. Joining and signing in

- [x] 2.1 Port the auth form components, strip shop-specific parts, and rewrite the wording in Sharkly's plain, friendly voice; verify `pnpm typecheck` passes
- [x] 2.2 Build `/join` with name, email, password, the "Who is this for?" choice and its note, and verify a new account is created with the member role and the verification email is printed to the log
- [x] 2.3 Build `/check-email` and `/auth/continue` (the "send the link again" button lives on the sign-in page, shown when a password sign-in is refused for an unverified email), and verify following the emailed link signs the member in and lands on `/account`
- [x] 2.4 Build `/sign-in` with password and emailed-link options, general error messages that do not reveal which emails exist, and the rate-limit message; verify a wrong password and an unknown email give the same message

## 3. Password reset and account page

- [x] 3.1 Build `/forgot-password` and `/reset-password`, including the expired-link message, and verify the reset flow changes the password end to end locally
- [x] 3.2 Build `/account` showing name and email with sign out, redirecting signed-out visitors to `/sign-in` and back; verify both paths by hand
- [x] 3.3 Add a unit test for the friendly error-message mapping and verify `pnpm test` passes

## 4. Finish

- [x] 4.1 Check the home, join and sign-in pages at 360px wide (the other new pages share the same card layout): no sideways scrolling, side margins, and 44px tap targets
- [x] 4.2 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 4.3 Add a short "Accounts" note to README.md and verify it lists how to try sign-up locally with emails printed to the log
