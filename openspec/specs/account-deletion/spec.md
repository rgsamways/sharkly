# account-deletion Specification

## Purpose

Lets a member permanently delete their own account safely and by themselves.

## Requirements

### Requirement: A member asks to delete by email first

The system SHALL let a signed-in member request deletion from their account page, and SHALL respond by emailing them a confirmation link without deleting anything.

#### Scenario: Requesting deletion

- **WHEN** a signed-in member presses "Delete my account" on the account page
- **THEN** an email with a confirmation link is sent to their address, the page says to check their email, and the account still exists

#### Scenario: Not signed in

- **WHEN** a request to delete an account arrives without a signed-in member
- **THEN** nothing is sent and nothing is deleted

### Requirement: Opening the link never deletes anything

The system SHALL show a confirmation page when the link is opened, stating what will be removed, and SHALL delete the account only when the member presses the explicit confirm button on that page while signed in.

#### Scenario: Opening the link

- **WHEN** a member opens the emailed link
- **THEN** a page explains that the account, sign-in records and votes will be permanently removed and offers a confirm button, and the account still exists

#### Scenario: Link opened while signed out

- **WHEN** the link is opened by someone who is not signed in
- **THEN** the page asks them to sign in and returns them to the confirmation page afterwards, and nothing is deleted

#### Scenario: Someone else's link

- **WHEN** a signed-in member confirms using a link that was issued for a different account
- **THEN** nothing is deleted and they see a friendly message

### Requirement: Confirming deletes everything about the member

The system SHALL, on confirmation, remove the member's account, sign-in records, saved sessions and votes, sign them out, and show a goodbye page.

#### Scenario: Confirming

- **WHEN** a signed-in member presses the confirm button with a valid link
- **THEN** their account, sessions and votes no longer exist, and they see the goodbye page

#### Scenario: Votes are not counted afterwards

- **WHEN** a member who had voted deletes their account
- **THEN** the round's totals no longer include their vote

### Requirement: Links are single-use and short-lived

The system SHALL accept each deletion link once only and for no more than one hour after it is sent, and SHALL show a friendly message with a way to ask again when a link is used or expired.

#### Scenario: Reusing a link

- **WHEN** a link that has already been used is opened or confirmed
- **THEN** nothing is deleted and the page explains the link is no longer valid

#### Scenario: Expired link

- **WHEN** a link older than one hour is confirmed
- **THEN** nothing is deleted and the page explains the link has expired

### Requirement: The pages work on a phone and stay private

The system SHALL lay out the account section, the confirmation page and the goodbye page for a phone about 360px wide, and SHALL mark the confirmation and goodbye pages as not to be indexed.

#### Scenario: Phone width

- **WHEN** the confirmation page is viewed at 360px wide
- **THEN** the warning and both buttons fit with side margins and nothing scrolls sideways

#### Scenario: Indexing

- **WHEN** a search engine fetches the confirmation or goodbye page
- **THEN** the page tells it not to index
