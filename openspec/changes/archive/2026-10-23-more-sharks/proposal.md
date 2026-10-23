## Why

Thirty sharks was a good start, but there are roughly 500 species, and each new one is another page that can be found, another photo, and another reason to explore. Twenty more also makes the filters, the size lineup, and the comparison tool much more fun to play with.

## What Changes

- Add **20 more species** to the catalog (50 in all), each with a summary, a "weird bit", size, home, diet, conservation status, sources and a credited photo.
- Every status, scientific name and assessment year is checked against the species' own IUCN page, and every photo is an open-licensed Wikimedia Commons image chosen by eye.
- The new sharks appear automatically in the size lineup, the comparison picker, the filters, the credits page and the sitemap.

New sharks: oceanic whitetip, zebra, tasselled wobbegong, bonnethead, smooth hammerhead, broadnose sevengill, bluntnose sixgill, swell, small-spotted catshark, Port Jackson, sandbar, Galapagos, Caribbean reef, grey reef, blacktip, bigeye thresher, kitefin, crocodile, spined pygmy and pyjama sharks.

Not in this change: new features, schedule changes, or more than 20 species.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

<!-- None. This adds content only; no requirement changes, so this change skips spec deltas. -->

### Modified Capabilities

<!-- None. The species catalog's requirements are unchanged; it simply holds more species. -->

## Impact

- **Code:** content files only (species, photos), plus the seed run.
- **Database:** rows added to `species`; no new tables or migration.
- **Safety locks touched:** none.
- **Robin to decide or provide:** a read of the new wording, and a look at the four photos that are specimen shots (bigeye thresher, kitefin, crocodile and spined pygmy sharks), which are the best open-licensed images available.
