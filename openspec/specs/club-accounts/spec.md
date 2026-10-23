# club-accounts Specification

## Purpose

Lets anyone join the Shark of the Month club for free, prove they own their email, sign in, recover access, and see and leave their account. Everything later in the club builds on a signed-in member.

## Requirements

### Requirement: Joining the club is free and needs a verified email

The system SHALL let a visitor create an account with a name, an email address and a password of at least 12 characters, and SHALL NOT let that account sign in until the email address has been verified by following an emailed link.

#### Scenario: Successful join

- **WHEN** a visitor submits a valid name, email and password on the join page
- **THEN** an account is created with the member role, a verification email is sent, and the visitor is shown a "check your email" page

#### Scenario: Verifying the email signs the member in

- **WHEN** the member follows the verification link in the email
- **THEN** the email is marked verified and the member is signed in and taken to their account page

#### Scenario: Password sign-in before verifying

- **WHEN** a member who has not verified their email tries to sign in with their password
- **THEN** they are not signed in, and they are told to check their email and can ask for the link to be sent again

#### Scenario: Weak password

- **WHEN** a visitor submits a password shorter than 12 characters
- **THEN** the form explains the minimum length in plain words and no account is created

#### Scenario: Email already in use

- **WHEN** a visitor joins with an email that already has an account
- **THEN** the page gives the same "check your email" answer as a new join, so nobody can learn which emails have accounts

### Requirement: A young reader joins through a parent or guardian

The system SHALL NOT create accounts for children on their own and SHALL NOT ask for age, birthday or photo. The join form SHALL include a "Who is this for?" choice, and when "a young reader" is chosen the form SHALL tell the parent or guardian in plain words that the account is theirs and that they are signing up on the child's behalf.

#### Scenario: Choosing a young reader

- **WHEN** a visitor picks "A young reader (a parent or guardian signs up)"
- **THEN** a short note explains that the parent or guardian owns the account, and the form still asks only for the adult's name, email and password

#### Scenario: No extra personal data

- **WHEN** an account is created for either choice
- **THEN** only name, email and password are stored

### Requirement: Members can sign in with a password or an emailed link

The system SHALL let a member sign in with their email and password, or by asking for a one-time link sent to their email. A link SHALL expire after 10 minutes and SHALL NOT create a new account.

#### Scenario: Password sign-in

- **WHEN** a verified member enters the correct email and password
- **THEN** they are signed in and taken to their account page, or to the page they were trying to reach

#### Scenario: Emailed link for an existing member

- **WHEN** a visitor asks for a sign-in link using the email of an existing account
- **THEN** a link is emailed, and following it signs them in

#### Scenario: Emailed link for an unknown email

- **WHEN** a visitor asks for a sign-in link using an email with no account
- **THEN** no email is sent, and the page shows the same "check your email" answer

#### Scenario: Wrong password

- **WHEN** a visitor enters a wrong email or password
- **THEN** they see one general message that does not say whether the email exists

#### Scenario: Too many attempts

- **WHEN** a visitor makes repeated sign-in or join attempts in a short time
- **THEN** further attempts are refused with a friendly "please wait a few minutes" message

### Requirement: Members can reset a forgotten password

The system SHALL let a member ask for a password-reset link by email and choose a new password of at least 12 characters.

#### Scenario: Reset request for any email

- **WHEN** a visitor asks to reset a password
- **THEN** the page always shows the same confirmation, and an email is sent only if an account exists

#### Scenario: Choosing a new password

- **WHEN** a member follows a valid reset link and submits a new password
- **THEN** the password is changed and they can sign in with it

#### Scenario: Expired or used link

- **WHEN** a member follows a reset link that has expired or was already used
- **THEN** they see a friendly message and a way to ask for a new link

### Requirement: Members have an account page and can sign out

The system SHALL give signed-in members an account page that shows their name and email and a sign-out button, and SHALL send signed-out visitors who open it to the sign-in page.

#### Scenario: Viewing the account page

- **WHEN** a signed-in member opens the account page
- **THEN** they see their name and email and can sign out

#### Scenario: Signed out

- **WHEN** a signed-out visitor opens the account page
- **THEN** they are sent to the sign-in page, and after signing in they land back on the account page

#### Scenario: Signing out

- **WHEN** a member chooses sign out
- **THEN** their session ends on this device and the public home page is shown

### Requirement: The header shows the right menu and works on a phone

The system SHALL show "Join the club" and "Sign in" in the site header to signed-out visitors and an account menu to signed-in members, and every join, sign-in and account page SHALL be usable on a phone about 360px wide without sideways scrolling, with tap targets of at least 44px.

#### Scenario: Signed-out header

- **WHEN** a signed-out visitor views any public page
- **THEN** the header offers "Join the club" and "Sign in"

#### Scenario: Signed-in header

- **WHEN** a signed-in member views any public page
- **THEN** the header shows an account menu with links to their account and to sign out

#### Scenario: Phone width

- **WHEN** any of these pages is viewed at 360px wide
- **THEN** content fits the screen with side margins, nothing scrolls sideways, and buttons and fields are at least 44px tall

### Requirement: Accounts are never given elevated roles by sign-up

The system SHALL give every new account the member role and SHALL NOT allow any sign-up or sign-in request to set a role.

#### Scenario: Role in the request

- **WHEN** a join request includes a role value
- **THEN** the value is ignored and the account is created as a member
