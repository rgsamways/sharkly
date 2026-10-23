## Purpose

Makes a link to Sharkly look good wherever it is pasted, and gives the site a proper icon.

## ADDED Requirements

### Requirement: The site has an icon

The system SHALL provide a site icon that browsers show in tabs and bookmarks.

#### Scenario: Requesting the icon

- **WHEN** a browser asks for the site icon
- **THEN** it receives an image and the response succeeds

### Requirement: Every page can be previewed

The system SHALL give every public page a title and a description for link previews, and SHALL give the site a default share image used by pages that do not have a better one.

#### Scenario: A page without its own image

- **WHEN** a link to the home page is previewed
- **THEN** the preview shows the site name, a description, and the default share image

#### Scenario: Absolute addresses

- **WHEN** a page describes its share image
- **THEN** the address is a full web address on the site's own domain or on the photo's host, not a relative path

### Requirement: Shark pages preview with the shark

The system SHALL give each shark profile a title naming the shark, a description taken from its summary, and the shark's photo as its share image.

#### Scenario: Sharing a profile

- **WHEN** a link to `/sharks/goblin-shark` is previewed
- **THEN** the title names the Goblin shark, the description is its summary, and the image is its photo

#### Scenario: An unknown shark

- **WHEN** the address names a shark that does not exist
- **THEN** the page is a 404 and no preview is built for it

### Requirement: Quiz results preview as the result

The system SHALL give each quiz result a title such as "I'm a Tiger shark!", a description from the result, and the matching shark's photo as its share image.

#### Scenario: Sharing a result

- **WHEN** a link to `/quiz/result/tiger-shark` is previewed
- **THEN** the title says "I'm a Tiger shark!" and the image is the tiger shark's photo

### Requirement: Previews do not turn on search indexing

The system SHALL keep telling search engines not to index pages while indexing is switched off, whether or not a page has a share preview.

#### Scenario: Indexing off

- **WHEN** indexing is switched off and a page has a share preview
- **THEN** the page still tells search engines not to index it
