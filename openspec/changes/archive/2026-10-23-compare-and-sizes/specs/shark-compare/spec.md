## Purpose

Lets visitors see how sharks differ in size and compare any two of them side by side.

## ADDED Requirements

### Requirement: A size lineup shows every shark against a person

The system SHALL provide a public page at `/sharks/sizes` listing every species from longest to shortest, each as a bar scaled to the longest shark, with the shark's photo, name and length, and a link to its profile, and SHALL show a bar for a 1.7 metre person in the position its length falls in the list.

#### Scenario: Reading the lineup

- **WHEN** a visitor opens `/sharks/sizes`
- **THEN** the sharks are listed longest first, and the person's bar sits between the sharks just longer and just shorter than 1.7 metres

#### Scenario: Bars are proportional

- **WHEN** a shark is twice as long as another
- **THEN** its bar is twice as wide, except that no bar is narrower than a visible minimum

#### Scenario: Lengths in words

- **WHEN** any row is shown
- **THEN** its length is written as text, so the bar is not the only way to read it

### Requirement: Two sharks can be compared side by side

The system SHALL provide a public page at `/compare` where a visitor can choose two different sharks and see them side by side with each one's photo, length, size compared with the other and with a person, habitat, diet, conservation status in plain words, and weird bit, with a link to each profile.

#### Scenario: Comparing two sharks

- **WHEN** a visitor opens `/compare?a=great-white-shark&b=whale-shark`
- **THEN** both sharks are shown side by side with the details above

#### Scenario: Choosing without JavaScript

- **WHEN** a visitor picks two sharks in the form and submits it
- **THEN** the page address records the two choices and the comparison is shown

#### Scenario: Invalid or missing choices

- **WHEN** one or both choices are missing, unknown, or the same shark
- **THEN** no comparison is shown, and the form is shown with a friendly note where a choice is unusable

### Requirement: The new pages are easy to reach, shareable and work on a phone

The system SHALL link the lineup and the comparison from the sharks page, link the comparison from each shark's profile, give both pages titles and descriptions for link previews, lay both out for a phone about 360px wide without sideways scrolling and with tap targets of at least 44px, and tell search engines not to index them while indexing is switched off.

#### Scenario: Links

- **WHEN** a visitor opens the sharks page or a profile
- **THEN** a link to the lineup and to the comparison is there

#### Scenario: Phone width

- **WHEN** either page is viewed at 360px wide
- **THEN** content fits with side margins, the comparison stacks one shark above the other, and nothing scrolls sideways
