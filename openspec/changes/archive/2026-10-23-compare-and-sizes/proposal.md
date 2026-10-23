## Why

The original idea for Sharkly included a size lineup ("from a dwarf lanternshark to a whale shark") and a way to compare two sharks. They are the most visual things we can build from data the site already has, they turn the species list into something to play with, and they need no database, no accounts and no new content to maintain.

## What Changes

- Add a public **/sharks/sizes** page: every shark in one list, longest first, each drawn as a bar scaled to the longest shark, with a "You" bar at 1.7 metres in its place in the lineup. Each row shows the shark's photo, name and length, and links to its profile.
- Add a public **/compare** page: choose any two sharks and see them side by side (photo, length, size compared with each other and with a person, where it lives, what it eats, how worried we are, and the weird bit). The choice is kept in the page address so a comparison can be shared, and it works without JavaScript.
- Add links: "Size lineup" and "Compare two sharks" from the sharks page, and "Compare with another shark" from each profile.
- Give both pages titles and descriptions for link previews.

Not in this change: comparing more than two sharks, saving comparisons, and adding either page to the main menu (the menu is full).

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `shark-compare`: the size lineup and the two-shark comparison.

### Modified Capabilities

<!-- None. -->

## Impact

- **Code:** two new pages, small shared pure helpers (the lineup order and reading the comparison choice), a few links.
- **Database and dependencies:** none. Both pages read the content files.
- **Safety locks touched:** none loosened. Pages stay noindex while indexing is off.
- **Robin to decide or provide:** nothing.
