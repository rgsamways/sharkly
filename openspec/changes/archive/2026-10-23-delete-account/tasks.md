## 1. Backend

- [x] 1.1 Enable account deletion in the sign-in configuration with a one-hour link that points at our own confirmation page, and add the deletion email; verify `pnpm typecheck` passes and the email prints in the local log when requested

## 2. Pages

- [x] 2.1 Add the "Delete my account" section to the account page with the request button and its confirmation message; verify the request sends the email and deletes nothing
- [x] 2.2 Build the confirmation page (signed-out prompt, warning, confirm and cancel buttons, friendly errors) and the goodbye page, both noindex; verify each state
- [x] 2.3 Update the privacy and terms pages to describe self-service deletion; verify the wording is live

## 3. Verify end to end

- [x] 3.1 Against the local database, verify: request sends one email and deletes nothing; the link opened signed out deletes nothing; a wrong token and a token for another member delete nothing; confirming removes the member, sessions and votes; reusing the link fails; the round's totals drop the vote
- [x] 3.2 Check the account section, the confirmation page and the goodbye page at 360px wide

## 4. Release

- [x] 4.1 Run the same checks as CI (`pnpm format:check`, `typecheck`, `lint`, `test`, `build`) and verify all pass
- [x] 4.2 After merge, verify the account page and the confirmation page on sharkly.ca (without deleting a real account)
