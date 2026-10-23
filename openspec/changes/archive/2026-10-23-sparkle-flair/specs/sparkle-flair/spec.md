## Purpose

Adds a light, playful sparkle to the design that suits the Sharkly name, without hurting readability, accessibility or speed.

## ADDED Requirements

### Requirement: Sparkles are purely decorative

The system SHALL draw every sparkle as decoration only: hidden from assistive technology, not focusable, not clickable, and never placed over text or controls so that it hides or blocks them.

#### Scenario: Screen readers

- **WHEN** a screen reader reads a page with sparkles
- **THEN** the sparkles are not announced

#### Scenario: Clicking through

- **WHEN** a visitor taps or clicks where a sparkle is drawn
- **THEN** the thing underneath receives the click

### Requirement: Motion respects the visitor's settings

The system SHALL stop all sparkle, shimmer, shine and glow animation for visitors whose device asks for reduced motion, and SHALL NOT use any animation that flashes more than three times in a second.

#### Scenario: Reduced motion

- **WHEN** a visitor's device is set to reduce motion
- **THEN** nothing on the page animates because of this change

#### Scenario: Gentle motion

- **WHEN** motion is allowed
- **THEN** sparkles twinkle slowly, with each cycle lasting at least two seconds

### Requirement: Sparkle does not harm layout, reading or speed

The system SHALL draw sparkles without moving any content, SHALL NOT change the colour or contrast of any text, and SHALL use only styling, with no extra script or image downloads.

#### Scenario: No layout shift

- **WHEN** sparkles load or animate
- **THEN** no text, image or button changes position

#### Scenario: Readable text

- **WHEN** text appears next to or above a decoration
- **THEN** its colour and contrast are the same as before

### Requirement: The flair is subtle and works on a phone

The system SHALL keep the effects light, SHALL show fewer sparkles on a phone about 360px wide, and SHALL NOT cause sideways scrolling on any page.

#### Scenario: Phone width

- **WHEN** the home page and a quiz result are viewed at 360px wide
- **THEN** sparkles stay inside the screen and nothing scrolls sideways
