## Portfolio Section — Two Fixes

### Fix 1: Width / wrapping (5 tiles on one row)
**Root cause:** The section uses Tailwind's `.container`, whose max-width is capped at **1200px** (`2xl: "1200px"` in `tailwind.config.ts`) with 1.5rem padding. Usable inner width is ~1152px. Each tile is `260px` with a `gap-6` (24px). Five tiles need `5×260 + 4×24 = 1396px`, so only 4 fit, forcing the 5th to wrap — and the rest of the screen is dead margin.

**Change (this section only):** Replace `<div className="container">` with a wider custom wrapper:
`<div className="mx-auto w-full max-w-[1500px] px-6">`

- New usable width = `1500 - 48 = 1452px` ≥ 1396px required, so **5 tiles fit on one row** on desktop. Confirmed.
- Keeps a sensible 1.5rem (px-6) page margin left/right, removing the large dead space.
- Tile size (`260px`), gap (`gap-6`), and centred rows (`flex flex-wrap justify-center`) all stay exactly as-is, so partial rows remain centred.
- I am NOT changing the global `tailwind.config.ts` container value — only this section's wrapper — since the earlier site-wide change did not apply here.

### Fix 2: Phone frame gap (video flush to bezel)
**Root cause:** The inner screen div is `bg-muted` (light). A thin strip of that light colour peeks between the video and the dark bezel at the rounded edges.

**Change:** On the inner screen container, change `bg-muted` to `bg-black`, and keep the video `absolute inset-0 w-full h-full object-cover`. To guarantee no sub-pixel light strip shows at the rounded corners, the media (video/img/placeholder) gets a tiny `scale-[1.03]` so it bleeds fully to the bezel. Result: video fills the entire inner screen edge to edge with no frame colour showing.

### Unchanged
- All other sections, tile size, gap, centring, phone frame styling, notch, play affordance, captions, modal.

**File:** `src/components/PortfolioSection.tsx` only.