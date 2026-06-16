## Goal
Change the Portfolio section so categories with more than 4 video tiles display as a single horizontal scrollable strip, while categories with 4 or fewer tiles keep their current centred row layout.

## Current state
- Product: 4 tiles
- Accommodation & Travel: 4 tiles
- Talking to Camera: 3 tiles
- Lifestyle & Experience: 5 tiles ← only category affected

Each tile is fixed at 260px wide with a 24px gap. The current layout uses `flex flex-wrap justify-center gap-6` for all categories.

## Changes

### 1. Conditional layout per category count
- Categories with ≤ 4 tiles: keep `flex flex-wrap justify-center gap-6` exactly as-is.
- Categories with > 4 tiles: switch the tile container to a horizontally scrollable strip.

### 2. Scrollable strip behaviour (5+ tile categories only)
- Remove `flex-wrap` and `justify-center`; add `flex overflow-x-auto` with hidden scrollbar.
- Add scroll-snapping (`snap-x snap-mandatory` on the track, `snap-start` on each tile) so swiping lands cleanly on tile boundaries.
- Wrap the strip in a centred container with `max-w-[1200px]` so roughly 4 tiles are visible at once and the 5th peeks at the right edge on desktop.
- Keep tile width at 260px and gap at 24px — no change to tile size, phone frames, captions, or play affordance.

### 3. Scroll cue (5+ tile categories only)
- Add a subtle right-edge gradient fade overlay (`bg-gradient-to-l from-background to-transparent`) on the scrollable row to reinforce that content continues off-screen.
- Use a small React state hook to track scroll position and hide the fade when the user has scrolled to the far right (all tiles visible), so the cue only appears when there is more to see.

### 4. Unchanged
- All tile content: labels, thumbnails, videos, placeholder gradients, phone notch, play icon, hover lift effect.
- Category headers (serif heading + thin rule).
- Category jump-nav order and styling.
- Dialog/modal video player.
- Section padding, background, Framer Motion entrance animations.