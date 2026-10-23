## Why

The site is called Sharkly, and a little sparkle in the design would make it feel more playful and memorable, especially for younger visitors. The aim is small touches that make it pop, not a carnival.

## What Changes

- Add a small **sparkle** decoration (a four-point star) that twinkles gently, used in a few chosen places: beside the logo, around the featured shark's photo on the home page, around the quiz result title, and as a small mark before key section labels.
- Give the **logo wordmark** a soft teal gradient with an occasional shimmer.
- Give **main buttons** a soft shine that sweeps across on hover and keyboard focus.
- Give **shark cards** a gentle lift and glow on hover.
- Give the home page hero a **very faint glitter** background.
- Everything is decorative: hidden from screen readers, not clickable, never shifts the layout, and does not change any text or colour contrast.
- All motion stops for visitors whose device asks for reduced motion; the sparkles then simply sit still or are not drawn.

Not in this change: confetti or sound, JavaScript animation libraries, a theme switch, or sparkles on every element.

No part of this change is **BREAKING**.

## Capabilities

### New Capabilities

- `sparkle-flair`: the decorative sparkle treatments and the rules they follow (decorative only, reduced motion respected, no layout shift).

### Modified Capabilities

<!-- None. No behaviour changes. -->

## Impact

- **Code:** a small `Sparkle` component, a few CSS rules in the global stylesheet, and light edits to the header, hero, quiz result, buttons and cards.
- **Database, dependencies and content:** none.
- **Safety locks touched:** none.
- **Robin to decide or provide:** whether it is the right amount. The strength is controlled in one place, and anything can be turned down or removed.
