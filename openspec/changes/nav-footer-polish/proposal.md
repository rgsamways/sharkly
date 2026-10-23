## Why

Looking at the live site on a phone, three things feel unfinished. The top menu is a strip of pills that runs off the screen and shows a clunky browser scrollbar under it. The logo shows an odd rectangular focus outline. And the footer is a wrapped sentence with three small underlined links under it. Visitors judge the whole site by its header and footer, so both should look deliberate on every screen size.

## What Changes

- **Phone menu:** replace the sideways-scrolling strip with a menu button that opens a tidy panel listing every main page (and the account link). It closes when a page is chosen, when Escape is pressed, or when the visitor taps elsewhere. It works even if scripts are slow to load, and marks the current page.
- **Desktop menu:** clearer links with hover and "you are here" states.
- **Header:** stays at the top of the screen while scrolling, so the menu is always one tap away.
- **Phone header layout:** menu button, logo and the Join button fit on one row at 360px; Sign in moves into the menu on phones.
- **Scrollbars:** the page scrollbar is slim and themed to match the site; no horizontal scrollbar shows in the header; the Facts topic choices wrap onto lines instead of scrolling sideways.
- **Focus outlines:** a clear, rounded focus ring that fits each control, and no odd shapes around the logo.
- **Footer:** reorganised into a short brand line and two tidy link groups (Explore and About), a copyright line, and a photo note, laid out in columns on wide screens and stacked on phones, with comfortable tap targets.

Not in this change: a dark theme, a search box, or new pages.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `site-chrome`: the header menu, the footer, and the scrollbar and focus styling shared by every page.

### Modified Capabilities

<!-- None. -->

## Impact

- **Code:** the header, a new menu component, the footer, the account buttons, the Facts topic choices, and the global stylesheet.
- **Database and dependencies:** none (the menu icons come from the icon set already installed).
- **Safety locks touched:** none.
- **Robin to decide or provide:** nothing.
