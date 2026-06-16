## Goal
Centre and tighten the About section layout while preserving all copy, icons, and existing row styling.

## Current state
The About section lives in `src/components/AboutSection.tsx`. Its content sits inside a `container max-w-5xl` div. The five trait rows are rendered as left-aligned flex items (`flex items-start gap-4`) with `p-4` padding and `space-y-4` vertical spacing.

## Changes

### 1. Centre the content stack
- Remove the outer `container` class and replace it with `mx-auto w-full max-w-3xl px-6` so the entire heading + rows + closing line + link block is centred horizontally with equal left/right margins.

### 2. Constrain row width
- Wrap the row list in the same centred container so the rows share the constrained width; no row will stretch wider than the centred column.

### 3. Tighten vertical spacing
- Reduce `space-y-4` between rows to `space-y-3`.
- Reduce per-row padding from `p-4` to `py-2.5 px-4` so rows are shorter and the section scrolls less.

### 4. What stays exactly the same
- All headline and sub-line copy (verbatim).
- Icons (`Scale`, `Bike`, `Brain`, `Heart`, `Dumbbell`) and their soft-circle styling.
- The "About Jess" heading.
- The closing line `"Same person on camera as off it."`.
- The "More about me →" link text, route (`/about-me`), and hover behaviour.
- `gradient-soft` background, `py-20 lg:py-28` section padding, and Framer Motion animations.

## Verification
- Preview the About section: confirm the row block is centred with equal side margins, rows are narrower than before, and the section height is reduced.