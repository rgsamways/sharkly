## Purpose

Lets search engines find every public page when indexing is on, and keeps the site hidden when it is off.

## ADDED Requirements

### Requirement: A sitemap lists the public pages

The system SHALL provide a sitemap at `/sitemap.xml` that lists the main public pages, every shark profile, and every quiz result, each as a full web address on the site's own domain, with no repeats.

#### Scenario: Listing sharks and results

- **WHEN** indexing is on and a crawler reads the sitemap
- **THEN** every shark profile and every quiz result is listed

#### Scenario: Private pages

- **WHEN** a crawler reads the sitemap
- **THEN** it does not list the account, sign-in, check-email, forgot-password or reset-password pages

### Requirement: Indexing off hides the site completely

The system SHALL, while indexing is off, tell search engines not to index pages, disallow crawling in `robots.txt`, and return an empty sitemap.

#### Scenario: Indexing off

- **WHEN** indexing is off and a crawler reads `robots.txt` and the sitemap
- **THEN** crawling is disallowed and the sitemap lists no pages

### Requirement: Indexing on lets search engines in

The system SHALL, while indexing is on, allow crawling of public pages in `robots.txt`, name the sitemap there, keep disallowing the admin and API paths, and stop marking public pages as do-not-index, while pages that are private to a member stay marked do-not-index.

#### Scenario: Indexing on

- **WHEN** indexing is on and a crawler reads `robots.txt`
- **THEN** public pages are allowed, the sitemap address is named, and the API paths are disallowed

#### Scenario: A public page

- **WHEN** indexing is on and a public page is fetched
- **THEN** it is not marked do-not-index

#### Scenario: A private page

- **WHEN** indexing is on and the account or sign-in page is fetched
- **THEN** it is still marked do-not-index
