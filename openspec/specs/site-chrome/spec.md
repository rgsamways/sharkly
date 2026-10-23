# site-chrome Specification

## Purpose

Gives every page a header, menu and footer that look deliberate and work well on a phone as well as a desktop.

## Requirements

### Requirement: The phone menu is a button and a panel

The system SHALL, on a phone-sized screen, show a menu button in the header that opens a panel listing every main page and a link to the member's account, SHALL show which page the visitor is on, and SHALL NOT show a sideways-scrolling strip of links.

#### Scenario: Opening the menu

- **WHEN** a visitor on a phone taps the menu button
- **THEN** a panel opens listing Sharks, Shark of the Month, Facts, Quiz and Vote, plus the account link

#### Scenario: Choosing a page

- **WHEN** the visitor chooses a page in the panel
- **THEN** the page opens and the panel closes

#### Scenario: Dismissing the menu

- **WHEN** the panel is open and the visitor presses Escape or taps outside it
- **THEN** the panel closes and focus returns to the menu button

#### Scenario: Current page

- **WHEN** the visitor is on the Quiz page and opens the menu
- **THEN** the Quiz link is marked as the current page, both visually and for assistive technology

### Requirement: The desktop menu shows where you are

The system SHALL, on a wide screen, show the main pages as links in the header with a visible hover state and a visible, accessible marker on the current page, and SHALL keep the header at the top of the screen while the page scrolls.

#### Scenario: Current page on desktop

- **WHEN** a visitor is on `/facts` on a wide screen
- **THEN** the Facts link looks different from the others and is marked as the current page for assistive technology

#### Scenario: Scrolling

- **WHEN** the visitor scrolls down a long page
- **THEN** the header stays visible at the top

### Requirement: The header fits on one row on a phone

The system SHALL fit the menu button, the logo, and the join button on one row at 360px wide without overlap or sideways scrolling, and SHALL offer signing in from the menu on phones.

#### Scenario: Phone width

- **WHEN** the header is viewed at 360px wide
- **THEN** the menu button, logo and join button are all visible on one row

### Requirement: Scrollbars look intentional

The system SHALL style the page scrollbar to be slim and match the site's colours, SHALL NOT show a horizontal scrollbar in the header, and SHALL let the Facts topic choices wrap onto more lines instead of scrolling sideways.

#### Scenario: No header scrollbar

- **WHEN** the header is viewed at any width
- **THEN** no horizontal scrollbar appears in or under it

#### Scenario: Topic choices

- **WHEN** the Facts page is viewed at 360px wide
- **THEN** all topic choices are visible, wrapping onto several lines, with no horizontal scrollbar

### Requirement: Focus is clear and tidy

The system SHALL show a visible focus ring on every link, button and form control that is reached by keyboard, drawn as a rounded outline around the control itself, with no outline shapes that include decorative elements.

#### Scenario: Logo focus

- **WHEN** the logo link is focused by keyboard
- **THEN** a rounded outline surrounds the logo and wordmark only

### Requirement: The footer is organised and readable on a phone

The system SHALL show in the footer a short brand line, links grouped under Explore and About (including photo credits, privacy and terms), and a copyright line, SHALL lay the groups out in columns on wide screens and stacked on phones, and SHALL give every footer link a tap target of at least 44px.

#### Scenario: Phone footer

- **WHEN** the footer is viewed at 360px wide
- **THEN** the brand line fits without leaving a single word on its own line, the links are grouped and easy to tap, and nothing scrolls sideways

#### Scenario: Wide footer

- **WHEN** the footer is viewed on a wide screen
- **THEN** the brand line and the link groups sit side by side in columns
