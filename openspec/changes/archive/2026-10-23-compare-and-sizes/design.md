## Context

Species, sizes, photos and the size-compared-to-you bar all exist already, and the species content file is the source of truth for the database. Both new pages need only that data, so they read the content files directly. See proposal.md for motivation.

## Goals / Non-Goals

**Goals:**

- Zero database use, so both pages are fast, static where possible, and cannot fail with the database.
- Pure helpers for the two bits of logic (lineup order with the person inserted, and reading the two choices), tested.

**Non-Goals:**

- Comparing more than two sharks, or saving anything.

## Decisions

**Read the content files, not the database.** The pages import `speciesEntries` and `speciesImages`. The lineup is fully static. The comparison depends on the page address, so it is read inside a Suspense boundary (it needs no `connection()` because it touches no database). Alternative: read the database for consistency with profiles. Rejected: nothing here needs it, and the content and the database are loaded from the same file.

**Lineup order and scale in one pure function** (`sizeLineup`). It sorts sharks by length (longest first, ties by name), scales each to the longest, keeps a minimum visible width, and inserts the 170 cm person row at its place. The person row is part of the returned list, so the page just renders rows in order.

**Choices read by `parseCompare`.** It returns the two slugs only when both are known and different, and reports which input was unusable so the form can say so. Alternative: redirect on bad input. Rejected: a friendly note beside the form is clearer, and works without JavaScript.

**Form as plain GET.** Two `<select>`s listing every shark by common name, with the current choices selected. Alternative: client-side widgets. Rejected, as elsewhere: no JavaScript is needed.

**Side by side, stacked on phones.** Two columns from the medium breakpoint up; one above the other on a phone, with the comparison bars (each shark against the longer of the two, plus the person) shown in a shared block above both so the size story reads first.

**Previews.** Both pages get a title and description; they use the default share image.

**Testing.** Unit tests for `sizeLineup` (order, the person's position, proportional widths, the minimum width) and `parseCompare` (valid, same shark twice, unknown, missing). No browser tests.

## Risks / Trade-offs

- [The lineup is long on a phone (31 rows)] → rows are compact with small photos, and the page has a short intro; acceptable.
- [Two content sources drift] → they are the same file, loaded by the seed, so they cannot differ by more than an unseeded edit; accepted.
- [Comparing a shark with itself] → treated as an unusable choice with a note.
