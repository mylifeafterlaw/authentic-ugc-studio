Problem: Each category's tile row is constrained by `max-w-5xl mx-auto` and uses `flex flex-wrap justify-center`, so tiles cluster in the middle with large side margins. A 5-tile category wraps to 4 + 1 because the 1024px max-width is too narrow.

Plan for `src/components/PortfolioSection.tsx`:

1. Remove the `max-w-5xl mx-auto` wrapper from each category block so the tile row spans the full `container` width.

2. On desktop (`lg` and up), switch from `flex justify-center` to a CSS grid with exactly as many equal columns as tiles in that category:
   - Inline style: `gridTemplateColumns: \`repeat(${cat.tiles.length}, 1fr)\``
   - `justifyItems: 'center'` so each fixed-width tile sits centred in its column
   - `gap: 1.5rem` between columns
   This evenly distributes tiles across the full width with consistent gaps — no side margins, no clustering.

3. On smaller screens (below `lg`), fall back to `flex flex-wrap justify-center` so tiles wrap cleanly to fewer per row without stretching.

4. Keep every tile at its existing fixed `w-[200px]` and all phone-frame styling, captions, category headers, play affordance, and modal behaviour untouched.

Result: 4–5 tiles sit on one row on desktop, spread evenly across the full content width, with no orphaned single tile. Fewer tiles per row on mobile via natural flex-wrap.

---

Technical detail:
- The `VideoTile` component stays as-is (`w-[200px] shrink-0`). In the grid cells, `shrink-0` is harmless; `w-[200px]` maintains the fixed size.
- The grid is applied only to the tile row wrapper (`<div>` that currently has `flex flex-wrap justify-center gap-6 sm:gap-8`), not to the category heading or rule.
- Tailwind responsive classes handle the breakpoint switch: `grid lg:grid` with inline style for desktop, `flex flex-wrap justify-center lg:hidden` (or equivalent logic) for mobile.