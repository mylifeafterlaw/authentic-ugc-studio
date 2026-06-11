## Portfolio section refinements

Three scoped changes to `src/components/PortfolioSection.tsx` only. Hero and all other sections untouched.

### 1. Remove the subheading
Delete the `<p>` line "A selection of short-form video work, organised by category." Keep only the "Portfolio" heading + jump-nav.

### 2. Shrink the tiles (airy gallery, cohesive row)
Keep 9:16 portrait ratio and 3-across desktop. Make the whole row narrower rather than constraining each tile individually:
- Wrap each category's 3-tile grid in a centered max-width container (e.g. `max-w-3xl mx-auto`) so the row is narrower than the section width, with clear margin either side.
- Let tiles size naturally within that narrower container at 3-across, with a consistent gap — a cohesive, evenly-spaced row (tight gallery feel), not tiles floating far apart.
- Shrink the play-button affordance to match the smaller tiles.

### 3. Lighter, more refined typography
- Category headers ("Product" etc.): smaller serif (e.g. `text-xl sm:text-2xl`), keeping DM Serif Display (`font-heading`).
- Tile caption/label: small, light, muted, uppercase with generous letter-spacing (`text-[0.65rem] uppercase tracking-[0.2em] font-light text-muted-foreground`).

### Technical notes
- No font change — DM Serif Display (`font-heading`) stays for all headings.
- Only presentational class changes; data arrays, jump-nav logic, and animations remain.
- No new dependencies, no other files touched.
