## Purpose

Gives everyone a browsable, trustworthy guide to sharks: what each species is, how big and where it lives, how worried we should be about it, and where each claim comes from.

## ADDED Requirements

### Requirement: Each species has a profile page

The system SHALL provide a public page for each species at `/sharks/<slug>` showing its common name, scientific name, a plain-language summary, a "weird bit", maximum length, habitats and depth range, diet, conservation status, and its source links. It SHALL NOT require an account.

#### Scenario: Viewing a species

- **WHEN** a visitor opens `/sharks/goblin-shark`
- **THEN** they see the goblin shark's names, summary, weird bit, size, habitat, depth, diet, conservation status and at least one source link

#### Scenario: Unknown species

- **WHEN** a visitor opens `/sharks/not-a-shark`
- **THEN** they see a friendly "we couldn't find that shark" page with a link to all sharks, and the response status is 404

#### Scenario: Missing optional details

- **WHEN** a species has no depth range recorded
- **THEN** the depth line is left out rather than shown as empty or as zero

### Requirement: Size is shown next to a person

The system SHALL show each species' maximum length as a bar compared with an adult human of 1.7 metres, and SHALL state both lengths in words as well, so the comparison does not depend on the bar alone.

#### Scenario: A shark bigger than a person

- **WHEN** a species with a maximum length of 3.5 metres is shown
- **THEN** its bar is longer than the human bar and the text reads both lengths, for example "You: 1.7 m. Goblin shark: 3.5 m"

#### Scenario: A shark smaller than a person

- **WHEN** a species with a maximum length of 0.2 metres is shown
- **THEN** its bar is shorter than the human bar and is still visible

### Requirement: Conservation status uses plain words and a source

The system SHALL show each species' IUCN Red List status in both the official wording and a plain-word label (Least Concern: "Doing okay"; Near Threatened: "Close to trouble"; Vulnerable: "In trouble"; Endangered: "In danger"; Critically Endangered: "In serious danger"; Data Deficient: "Not enough information"), and SHALL link each status to its source.

#### Scenario: Status label

- **WHEN** a species with the IUCN status Endangered is shown on any page
- **THEN** the label reads "In danger" together with "Endangered", and status is not conveyed by colour alone

#### Scenario: Status source

- **WHEN** a visitor views a profile
- **THEN** the conservation status links to the page it came from, and the profile shows the year of the assessment it comes from

### Requirement: Visitors can browse, search and filter all sharks

The system SHALL provide a public page at `/sharks` listing every species as a card with name, size and conservation label. Visitors SHALL be able to search by name and filter by habitat, size band and conservation status, with the choices kept in the page address so a filtered view can be shared and works without JavaScript.

#### Scenario: Browsing

- **WHEN** a visitor opens `/sharks` with no filters
- **THEN** every species is listed in alphabetical order by common name

#### Scenario: Searching by name

- **WHEN** a visitor searches for "hammer"
- **THEN** only species whose common or scientific name contains "hammer" are listed, ignoring capital letters

#### Scenario: Filtering

- **WHEN** a visitor filters by habitat "Deep sea" and status "Doing okay"
- **THEN** only species matching both are listed, and the page address records the filters

#### Scenario: No matches

- **WHEN** the filters match no species
- **THEN** the page says no sharks matched and offers a way to clear the filters

#### Scenario: Invalid filter values

- **WHEN** the page address contains a filter value that does not exist
- **THEN** that filter is ignored and the page still shows results

### Requirement: Size bands group sharks by maximum length

The system SHALL place every species in exactly one size band by maximum length: "Pocket-sized" under 1 metre, "Person-sized" from 1 up to 3 metres, "Bigger than a car" from 3 up to 6 metres, and "Giant" 6 metres and over.

#### Scenario: Band edges

- **WHEN** species have maximum lengths of 0.99, 1.0, 3.0 and 6.0 metres
- **THEN** they fall in Pocket-sized, Person-sized, Bigger than a car and Giant respectively

### Requirement: Artwork is a placeholder until real images exist

The system SHALL show a placeholder picture on species cards and profiles when a species has no image, and SHALL show a credit line next to any image that has one. Every picture, placeholder or real, SHALL have a text alternative naming the species.

#### Scenario: No image yet

- **WHEN** a species has no image address
- **THEN** a placeholder is shown with alternative text naming the species

#### Scenario: Image with credit

- **WHEN** a species has an image address and a credit
- **THEN** the image is shown with its credit text beneath it

### Requirement: Species content stays out of search results until reviewed

The system SHALL NOT allow search engines to index species pages while indexing is switched off, and SHALL keep indexing off until the site owner has reviewed the species content.

#### Scenario: Indexing off

- **WHEN** search indexing is switched off
- **THEN** species pages tell search engines not to index them and `robots.txt` disallows the site

### Requirement: Species pages work on a phone

The system SHALL lay out the species list, filters and profiles for a phone about 360px wide with side margins, no sideways scrolling, and tap targets of at least 44px.

#### Scenario: Phone width

- **WHEN** `/sharks` and a profile page are viewed at 360px wide
- **THEN** content fits the screen with side margins, filters are usable by touch, and nothing scrolls sideways
