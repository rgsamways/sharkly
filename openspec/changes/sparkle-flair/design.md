## Context

The design uses Tailwind 4 with a small token set in `globals.css`. All colours already come from tokens, so sparkles can use the existing teal and coral without new colours. See proposal.md for motivation and the spec for the rules.

## Goals / Non-Goals

**Goals:**

- A handful of memorable touches, all in CSS, controlled from one place.
- Zero effect on accessibility, layout or speed.

**Non-Goals:**

- A general animation system, or sparkles on content that is already busy.

## Decisions

**A `Sparkle` component** draws a four-point star with a CSS `clip-path`, so it is a single empty element with no image or SVG file. It is positioned by whoever uses it, is `aria-hidden`, `pointer-events-none`, and takes a size and a delay. Alternative: an inline SVG per use. Rejected: more markup and the same result.

**Animation in the global stylesheet**, inside a `prefers-reduced-motion: no-preference` block. The keyframes are `twinkle` (a slow scale and fade over 3 to 5 seconds), `shine` (a diagonal highlight sweep across a button on hover and focus), and `shimmer` (a slow pass of light across the logo text). With reduced motion on, none of these rules apply, so everything is still and nothing needs JavaScript to switch off.

**Where it goes**, deliberately few places: beside the logo (two stars), around the home hero photo (a handful, fewer on phones), around the quiz result title, and a small star before key section labels through a shared `eyebrow` class. The hero gets a faint glitter background made of a few tiny radial gradients, not an image.

**Buttons and cards** get the effect through a shared class, so every main button shines the same way without editing each one. Cards gain a small lift and a soft teal glow on hover, which is also shown on keyboard focus.

**Colours stay on tokens**: stars use the coral highlight and the teal accent; the logo gradient uses the accent and a lighter tint of it, and keeps enough contrast against the white header.

**Never over text.** Decorations are placed beside or behind content and sized small; the hero stars sit around the picture, not over the headline. Absolute positioning inside relatively positioned wrappers means they cannot cause layout shifts, and they are kept inside their wrapper so they cannot cause sideways scrolling.

**Testing.** Typecheck, lint and build, plus a visual check at 360px and desktop. With animation, a still screenshot cannot show motion, so the reduced-motion rules are checked by reading the CSS.

## Risks / Trade-offs

- [Too much sparkle] → few places, small sizes, and one stylesheet to dial it down.
- [Motion discomfort] → slow, small, reduced-motion respected, nothing flashes.
- [Logo gradient hurts legibility] → the gradient stays within teal tones with enough contrast on white, and the shimmer is a faint highlight.
