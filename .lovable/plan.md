## Portfolio — Replace Mobile Scroll Cue

### Problem
The current mobile swipe cue is a muted-maroon circle with a chevron inside. It looks too much like the play button on each video tile and causes confusion.

### Solution
Replace the mobile-only `SwipeCue` in `src/components/PortfolioSection.tsx` with a cleaner, understated indicator.

#### Changes
1. **Redesign `SwipeCue` component**
   - Remove the circular background, border, shadow, and backdrop blur.
   - Replace with a thin white `ChevronRight` (no container) plus a small "swipe" label underneath or beside it.
   - Keep `md:hidden` so it only appears on mobile.
   - Position at the right edge of each scrollable category row, vertically centred over the phone frames.
   - Add a gentle `animate-pulse` or subtle motion so it reads as a hint, not a button.

2. **Preserve desktop**
   - The desktop right-edge fade gradient (`hidden md:block`) and the desktop circular scroll arrow remain untouched.

3. **No other changes**
   - Tile sizes, horizontal scroll behaviour, snap, captions, phone frames, and category structure all stay exactly as they are.

### Files changed
- `src/components/PortfolioSection.tsx` — update `SwipeCue` JSX only.