## Fix: Accommodation & Travel — 4 videos in one row

### Problem
The Accommodation & Travel section currently uses `grid-cols-3`, so the 4th video wraps to a second line.

### Fix
1. Update the tile grid in `PortfolioSection.tsx` to use a flexible layout that fits all tiles in a single row.
2. Options:
   - **A)** Switch all category grids to a responsive flex row (`flex flex-nowrap gap-5`) so tiles shrink to fit.
   - **B)** Keep `grid-cols-3` for categories with 3 tiles, and use `grid-cols-4` for the Accommodation & Travel category (requires conditional grid class per category).

### Preferred approach
Option A — use a single-row flex layout for all categories. This keeps the code simple, avoids per-category logic, and makes the section scalable if more videos are added later. Tiles will proportionally scale down to fit the container width.

### Files changed
- `src/components/PortfolioSection.tsx`

### Verification
- Visual check in preview: Accommodation & Travel shows 4 tiles on one line.
- Other categories still display correctly.