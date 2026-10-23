## Context

The header renders the logo, a nav strip (`overflow-x-auto` on phones) and the account buttons. The footer is a sentence plus a row of links. Global styles have no scrollbar or focus rules, so browsers draw their defaults. See proposal.md for what looked wrong.

## Goals / Non-Goals

**Goals:**

- A menu that is native where it can be (a disclosure), so it works with scripts slow or off, with a small client component only to close it and mark the current page.
- Styling through standard CSS (`scrollbar-color`, `scrollbar-width`) with a fallback for browsers that lack it.

**Non-Goals:**

- A mega menu, a search field, or animation beyond a short fade.

## Decisions

**Native `<details>`/`<summary>` for the phone menu**, wrapped by a small client component. The disclosure gives keyboard support and open/closed state to assistive technology for free. The client part only closes the panel when the address changes (using the current path), on Escape (returning focus to the button), and on a tap outside. Alternative: a fully scripted dialog or drop-down. Rejected: more code and worse without scripts.

**Two renderings of the links, one visible at a time**: the disclosure below the medium breakpoint and an inline list from it upwards, both fed from the same list of pages in the site settings. The hidden one is not shown to assistive technology. Alternative: one list restyled with CSS. Rejected: a disclosure cannot be forced open with CSS reliably across browsers.

**Current page** is worked out from the path (a page is current on its own address and below it), so Sharks is current on a shark's profile and the size lineup. It is marked with the standard "current page" attribute and a visible style.

**Phone header row**: menu button, logo, and the Join button. The Sign in button is hidden below the small breakpoint and replaced by an "Account" row in the menu panel that links to the account page, which sends a signed-out visitor to sign in and back. This keeps one row at 360px.

**Sticky header** with a slightly translucent background and a soft blur where supported, over the white site background so text stays readable.

**Scrollbars**: `scrollbar-width: thin` and `scrollbar-color` on the page, using the site's teal and background tokens, plus `scrollbar-gutter: stable` so the layout does not jump between short and long pages. A `::-webkit-scrollbar` fallback applies only where `scrollbar-color` is unsupported. The Facts topic choices wrap (`flex-wrap`) instead of scrolling.

**Focus**: one global rule draws a two-pixel rounded outline in the accent colour with a small offset on keyboard focus. The logo link becomes a block-level box (`inline-flex`) so the outline is its own rectangle, and the decorative stars no longer enlarge it.

**Footer**: a brand column (name and a short line) and two link groups, in a grid that is one column on phones and three from the medium breakpoint, with a bottom row for the copyright and photo note. Links are plain muted text with an underline on hover, 44px tall.

**Testing.** No new logic worth a unit test beyond the current-page check, which is a one-line pure function with a small test. Visual checks at 360px and desktop, including the opened menu, using a browser driven by script.

## Risks / Trade-offs

- [The panel covers content on a phone] → it is short, closes on any tap outside, and sits just under the header.
- [`scrollbar-color` is ignored by an older browser] → they simply keep their default bar, which is harmless.
- [Two copies of the links in the page] → the hidden copy is not shown to assistive technology and costs a few bytes.
