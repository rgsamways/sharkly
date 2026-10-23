## Why

The privacy page tells members they can have their account deleted, but today the only way is to ask someone, and there is no mailbox for that yet. People should be able to delete their own account whenever they like, safely, without waiting for anyone. It is also the right thing to offer on a site that children and their parents will use.

## What Changes

- Add a **"Delete my account"** section to the account page. Pressing its button emails the member a link; nothing is deleted yet.
- The link opens a **confirmation page** of our own that says plainly what will be removed and has an explicit "Yes, delete my account" button. Opening the link alone never deletes anything, so email scanners and previews cannot delete an account by accident.
- If the member is not signed in when they open the link, the page asks them to sign in and then brings them back to it.
- Confirming deletes the account, its sign-in records and its votes, signs the member out, and shows a short **goodbye page**.
- The link works once and expires after an hour. A used or expired link gets a friendly message.
- Update the **privacy and terms** pages so they say members can delete their own account.

Not in this change: an admin screen, a grace period or "undo" for deletion, and exporting a member's data.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `account-deletion`: requesting, confirming and completing deletion of one's own account.

### Modified Capabilities

<!-- None. club-accounts requirements are unchanged; deletion is a separate capability. -->

## Impact

- **Code:** account page, two new pages (confirmation and goodbye), the sign-in configuration, one email, and two sentences on the privacy and terms pages.
- **Database:** none new. Deleting a member already removes their sessions, accounts and votes because those tables are set to delete with the member.
- **Personal data:** deletion removes the member's name, email, password record, sign-in records and votes. Server logs kept by the hosting provider are outside this and expire on their own.
- **Safety locks touched:** none.
- **Robin to decide or provide:** nothing. (The mailbox for questions is a separate task.)
