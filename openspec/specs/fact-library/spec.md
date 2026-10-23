# fact-library Specification

## Purpose

Gives everyone a trustworthy set of short shark facts and straight answers to popular myths, with a source for every claim and a fresh fact on the home page each day.

## Requirements

### Requirement: Every entry has a source

The system SHALL show at least one source link with every fact and every myth-or-fact entry, and SHALL NOT load an entry that has none.

#### Scenario: Entry with sources

- **WHEN** a visitor views any entry on `/facts`
- **THEN** the entry lists one or more source links that open the cited page

#### Scenario: Entry without a source

- **WHEN** the content contains an entry with no source link
- **THEN** loading the content is refused and the problem is named

### Requirement: Facts are browsable by topic

The system SHALL provide a public page at `/facts` that lists all entries and lets a visitor narrow them to one topic: senses, anatomy, babies, history, records, or myths. The chosen topic SHALL be kept in the page address so a view can be shared, and the filter SHALL work without JavaScript.

#### Scenario: All facts

- **WHEN** a visitor opens `/facts` with no topic
- **THEN** every entry is listed and the topic choices are shown with the number of entries in each

#### Scenario: One topic

- **WHEN** a visitor opens `/facts?topic=senses`
- **THEN** only senses entries are listed and the Senses choice is marked as current

#### Scenario: Unknown topic

- **WHEN** the page address names a topic that does not exist
- **THEN** the topic is ignored and all entries are listed

#### Scenario: Shared link to one entry

- **WHEN** a visitor opens `/facts#<entry-slug>` for an entry in the list
- **THEN** the page scrolls to that entry

### Requirement: Myths are answered plainly

The system SHALL present each myth as the popular claim, a verdict of True, False or Partly true shown in words and with a symbol (not colour alone), a one-sentence answer, and a fuller explanation with sources.

#### Scenario: A false claim

- **WHEN** a myth whose verdict is false is shown
- **THEN** the claim is stated, the verdict reads "Myth" or "False" with its symbol, and a one-sentence answer is given before the longer explanation

#### Scenario: A partly true claim

- **WHEN** a myth whose verdict is partly true is shown
- **THEN** the verdict reads "Partly true" and the explanation says which part holds and which does not

### Requirement: A fact of the day is shown on the home page

The system SHALL show one fact of the day on the home page, the same for every visitor on a given day in the Toronto time zone, chosen only from entries that are not myths, and changing at midnight Toronto time.

#### Scenario: Same fact all day

- **WHEN** two visitors open the home page on the same Toronto day
- **THEN** both see the same fact

#### Scenario: A new day

- **WHEN** the Toronto date changes
- **THEN** the fact of the day changes to the next fact in a fixed order, and cycles back to the start after the last

#### Scenario: No facts yet

- **WHEN** there are no non-myth entries
- **THEN** the fact-of-the-day card is left out and the rest of the home page is unchanged

### Requirement: The fact library works on a phone and stays unindexed until reviewed

The system SHALL lay out `/facts` and the fact-of-the-day card for a phone about 360px wide without sideways scrolling, with tap targets of at least 44px, and SHALL tell search engines not to index the page while indexing is switched off.

#### Scenario: Phone width

- **WHEN** `/facts` is viewed at 360px wide
- **THEN** the topic choices stay reachable, entries fit with side margins, and nothing scrolls sideways

#### Scenario: Indexing off

- **WHEN** search indexing is switched off
- **THEN** `/facts` tells search engines not to index it
