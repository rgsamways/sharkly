# legal-pages Specification

## Purpose

Tells visitors and members, in plain words, what Sharkly collects and the rules for using it.

## Requirements

### Requirement: A privacy page describes what the site actually does

The system SHALL provide a public page at `/privacy` that states what personal information is collected (name, email address, a scrambled password, sign-in records including the network address and device description, and votes), why, that no advertising, analytics or tracking cookies are used, which outside services handle data (hosting, database, email sending, and the photo host), how long data is kept, how to ask for deletion, and that accounts are for grown-ups and not for children on their own.

#### Scenario: Reading the privacy page

- **WHEN** a visitor opens `/privacy`
- **THEN** they see each of those topics in plain words, and the date the page was last updated

#### Scenario: Passwords

- **WHEN** a visitor reads how passwords are handled
- **THEN** the page says passwords are stored scrambled so that nobody, including the owner, can read them

### Requirement: A terms page sets the basic rules

The system SHALL provide a public page at `/terms` covering use of the site, accounts and keeping a password safe, votes, the educational purpose of facts, photo credits and licenses, the owner's right to remove accounts that misuse the site, and changes to the terms, with the date it was last updated.

#### Scenario: Reading the terms

- **WHEN** a visitor opens `/terms`
- **THEN** they see those topics in plain words and the date of the last update

### Requirement: The legal pages are easy to find

The system SHALL link the privacy and terms pages from the footer of every public page and from the join form.

#### Scenario: Footer links

- **WHEN** a visitor looks at the footer of any public page
- **THEN** links to Privacy and Terms are there

#### Scenario: Join form

- **WHEN** a visitor views the join form
- **THEN** it says that joining means agreeing to the terms and privacy page, with links to both

### Requirement: The contact section only appears when a contact address exists

The system SHALL show a contact address on the legal pages only when one has been set, and SHALL otherwise leave the contact section out rather than show an address that cannot receive mail.

#### Scenario: No address set

- **WHEN** no contact address is set
- **THEN** the legal pages show no contact address

#### Scenario: Address set

- **WHEN** a contact address is set
- **THEN** the legal pages show it as a link to email that address

### Requirement: The legal pages work on a phone

The system SHALL lay both pages out for a phone about 360px wide, with readable line lengths, side margins and no sideways scrolling.

#### Scenario: Phone width

- **WHEN** `/privacy` is viewed at 360px wide
- **THEN** the text wraps within the screen and nothing scrolls sideways
