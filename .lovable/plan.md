Portfolio section only (`src/components/PortfolioSection.tsx`). No other files/sections touched.

## 1. Phone frames on each tile
In `VideoTile`, wrap the existing 9:16 media in a phone mockup matching the hero:
- Outer frame: `rounded-[2.4rem] bg-foreground p-2 shadow-elevated` (hero uses these).
- Inner screen: `rounded-[1.9rem] overflow-hidden bg-muted` containing the existing image/video and the play affordance.
- Keep the play button overlay and the caption `<p>` below the frame unchanged.

## 2. Fixed, consistent tile size across all categories
- Replace the per-category inline `gridTemplateColumns: repeat(tiles.length, ...)` grid with a flex-wrap row: `flex flex-wrap justify-center gap-6`.
- Give each tile a FIXED width (e.g. `w-[200px]` / wrapper `basis` fixed) so tiles never stretch or shrink to fill the row. A 4-tile row is wider than a 3-tile row, tiles stay identical.
- Each `VideoTile` becomes a fixed-width flex item (`w-[200px]` or similar, shrink-0), with the phone frame filling that width and 9:16 aspect inside.
- Responsive: flex-wrap naturally wraps to fewer tiles per row on narrow screens while keeping each tile's fixed width.

## Technical details
- `VideoTile` button/div wrapper: `w-[200px] shrink-0` instead of `w-full`.
- Phone frame replaces the current bare `aspect-[9/16] rounded-[1.5rem]` container; inner keeps `aspect-[9/16]`.
- Category wrapper stays `max-w-5xl mx-auto`; grid div changes to `flex flex-wrap justify-center gap-6`.
- No content, copy, category order, or modal logic changes.