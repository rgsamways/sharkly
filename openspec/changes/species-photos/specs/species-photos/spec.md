## Purpose

Shows each shark with a real photograph, and gives every photographer the credit their license requires.

## ADDED Requirements

### Requirement: Species show a licensed photo

The system SHALL show a photo for each species that has one on its card, its profile, the home page and monthly pages when featured, the archive, and its quiz result, and SHALL use only images that are public domain, CC BY, or CC BY-SA.

#### Scenario: A species with a photo

- **WHEN** a species has a photo
- **THEN** the photo is shown with alternative text naming the species

#### Scenario: A species without a photo

- **WHEN** a species has no photo
- **THEN** the silhouette placeholder is shown instead, as before

### Requirement: Every photo is credited where it is shown in full

The system SHALL show a credit line under the photo on a species profile and on a featured shark, naming the photographer and the license, stating the image is from Wikimedia Commons, and linking to the image's page.

#### Scenario: Credit under a profile photo

- **WHEN** a visitor views a species profile whose photo is CC BY-SA
- **THEN** the credit line names the photographer and the license, and links to the image's page on Commons

#### Scenario: A public domain photo

- **WHEN** a photo is in the public domain
- **THEN** the credit line says so and still links to the image's page

### Requirement: A credits page lists every photo

The system SHALL provide a public page at `/credits` listing every species photo with its photographer, license, and links to the license and the image's page, and SHALL link to it from the footer of every public page.

#### Scenario: Reading the credits

- **WHEN** a visitor opens `/credits`
- **THEN** every photographed species is listed with its photographer, license and links

#### Scenario: Finding the credits

- **WHEN** a visitor looks at the footer of any public page
- **THEN** a link to the credits page is there

### Requirement: Photos load quickly and do not break the layout

The system SHALL load photos lazily below the first screen, SHALL keep the same picture shape whether a photo or the placeholder is shown so the page does not jump, and SHALL still read well on a phone about 360px wide.

#### Scenario: Phone width

- **WHEN** a list of species is viewed at 360px wide
- **THEN** the photos fit within the cards with no sideways scrolling

### Requirement: Photo choices are reviewable

The system SHALL keep the choice of photo, photographer, license and link for each species in the repository, and SHALL refuse to load a photo that has no photographer or no license.

#### Scenario: A photo with no license

- **WHEN** the content lists a photo without a license
- **THEN** loading the content is refused and the problem is named
