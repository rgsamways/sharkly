# shark-quiz Specification

## Purpose

Gives visitors a quick, friendly quiz that matches them with a shark, and gives each result its own address so it can be shared.

## Requirements

### Requirement: The quiz asks a fixed set of questions

The system SHALL provide a public page at `/quiz` with six questions, each with four answers, that can be completed and submitted without JavaScript and without an account.

#### Scenario: Taking the quiz

- **WHEN** a visitor opens `/quiz`
- **THEN** they see six questions, each with four answers they can choose by tapping, and a button to see their shark

#### Scenario: Unanswered questions

- **WHEN** a visitor submits the quiz with a question left unanswered
- **THEN** they are sent back to the quiz with a friendly note asking them to answer every question

### Requirement: Answers produce one shark

The system SHALL score the answers so that each answer awards points to one or two result sharks, the shark with the most points is the result, and a tie is settled by a fixed order so the same answers always give the same shark.

#### Scenario: Same answers, same shark

- **WHEN** the same six answers are submitted twice
- **THEN** both times the visitor is sent to the same result

#### Scenario: A tie

- **WHEN** two sharks have the same highest score
- **THEN** the one earlier in the fixed order is the result

#### Scenario: Invalid answers

- **WHEN** a submission has an answer that is not one of the four options
- **THEN** it is treated as unanswered and the visitor is sent back to the quiz

### Requirement: Each result has its own shareable page

The system SHALL show each result at `/quiz/result/<slug>` with the shark's name, a short friendly description of the matching personality, a link to the shark's full profile, and a way to take the quiz again, and SHALL show the same result to anyone who opens that address.

#### Scenario: Viewing a result

- **WHEN** a visitor opens `/quiz/result/great-white-shark`
- **THEN** they see the result for the great white shark with a link to its profile and a link to retake the quiz

#### Scenario: Not a result

- **WHEN** a visitor opens `/quiz/result/not-a-shark`
- **THEN** they see a friendly "no such result" page and the response status is 404

### Requirement: The quiz is easy to find and works on a phone

The system SHALL link the quiz from the site menu and the home page, SHALL lay the quiz and results out for a phone about 360px wide without sideways scrolling and with tap targets of at least 44px, and SHALL tell search engines not to index it while indexing is switched off.

#### Scenario: Phone width

- **WHEN** the quiz and a result are viewed at 360px wide
- **THEN** answers can be chosen by tapping, nothing scrolls sideways, and the buttons are at least 44px tall

#### Scenario: Indexing off

- **WHEN** search indexing is switched off
- **THEN** the quiz pages tell search engines not to index them
