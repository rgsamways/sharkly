## Purpose

Introduces one shark each month, keeps a visible history of past sharks, and gives the home page something fresh to show, which is the reason the club exists.

## ADDED Requirements

### Requirement: One species is featured per calendar month

The system SHALL record at most one featured species for each calendar month, and a species MAY be featured in more than one month.

#### Scenario: One shark per month

- **WHEN** a second species is recorded for a month that already has one
- **THEN** the change is rejected and the existing record is kept

### Requirement: The current month's shark has its own page

The system SHALL show the shark featured for the current month at `/shark-of-the-month`, in the Toronto time zone, with the species' name, a headline fact, its size-compared-to-you bar, its conservation label, a few quick facts, and a link to its full profile.

#### Scenario: A shark is scheduled for this month

- **WHEN** a visitor opens `/shark-of-the-month` and this month has a featured shark
- **THEN** that shark is shown with the month and year named, for example "October 2026"

#### Scenario: The month rolls over

- **WHEN** the clock passes midnight Toronto time at the start of a new month that has a featured shark
- **THEN** the page shows the new month's shark, without anyone redeploying the site, within one hour

#### Scenario: Nothing scheduled this month

- **WHEN** the current month has no featured shark
- **THEN** the page shows the most recent past featured shark, labelled with its month, and does not show an error

#### Scenario: Nothing ever scheduled

- **WHEN** no month has a featured shark
- **THEN** the page says the first shark is coming soon and links to all sharks

### Requirement: Past sharks are kept in an archive

The system SHALL list every past and current featured month at `/shark-of-the-month/archive`, newest first, each with its month, species name, a one-line teaser and a link to the species profile. It SHALL NOT list months that have not started yet.

#### Scenario: Viewing the archive

- **WHEN** a visitor opens the archive in October 2026 and sharks are recorded for September and October 2026 and November 2026
- **THEN** October and September 2026 are listed, with October first, and November is not shown

#### Scenario: Empty archive

- **WHEN** no month has started with a featured shark
- **THEN** the archive says there is nothing here yet

### Requirement: The home page features this month's shark

The system SHALL show the current month's shark prominently on the home page, with up to the three previous featured sharks below it, and a link to join the club.

#### Scenario: Home page with history

- **WHEN** a visitor opens the home page and four or more months have a featured shark
- **THEN** this month's shark is the hero and the three most recent earlier sharks are listed beneath it

#### Scenario: Home page with no featured shark

- **WHEN** no month has a featured shark
- **THEN** the home page keeps the plain welcome message and a link to browse all sharks

### Requirement: The monthly feature is public and phone friendly

The system SHALL show the monthly feature, its archive and the home-page section to anyone without an account, and SHALL lay them out for a phone about 360px wide without sideways scrolling and with tap targets of at least 44px.

#### Scenario: Signed-out visitor

- **WHEN** a signed-out visitor opens `/shark-of-the-month`
- **THEN** the page is shown in full with no sign-in prompt blocking it

#### Scenario: Phone width

- **WHEN** the shark-of-the-month pages and the home page are viewed at 360px wide
- **THEN** content fits with side margins and nothing scrolls sideways
