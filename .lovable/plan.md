## Goal
Two layout tweaks to the Portfolio section tile rows — nothing else changes.

## Changes

### 1. Fixed gap, left-aligned rows
Replace the current split mobile/desktop layout with a single flex row that behaves the same at every breakpoint.

- Remove the `lg:grid` desktop branch and the `lg:hidden` mobile branch.
- Use one wrapper: `flex flex-wrap justify-start gap-6`.
- Each `VideoTile` keeps its explicit width, so gaps stay fixed and tiles left-align. Rows that don’t fill the width simply leave empty space on the right instead of stretching.

### 2. Larger phone tiles
- Bump the tile width from `w-[200px]` to `w-[260px]`.
- The phone frame (`aspect-[9/19]`, bezel padding, notch, play button, caption) all scale proportionally because they use `w-full` / relative units inside the fixed-width wrapper.
- At the larger size fewer tiles fit per row on some breakpoints — that is expected and acceptable.

## What stays the same
- Phone frame styling and 9:16 video ratio inside the bezel.
- Captions below tiles.
- Modal video player behaviour.
- Category headers and nav.
- No other sections touched.