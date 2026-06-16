## Plan: Centre-align each row of phone tiles

### What to change
In `src/components/PortfolioSection.tsx`, change one Tailwind class on the tile row wrapper (line 206).

- **Before:** `className="flex flex-wrap justify-start gap-6"`
- **After:**  `className="flex flex-wrap justify-center gap-6"`

### Effect
- Full rows (e.g. 4-5 tiles across desktop) remain visually full — no visible change.
- Partial rows (e.g. 3 tiles when 5 fit across) sit centred in the available width, with equal empty space on left and right.

### What stays exactly the same
- Tile width (`w-[260px]`)
- Gap between tiles (`gap-6` = fixed 1.5rem)
- Phone frame proportions, bezel, notch, play button, captions
- All other sections of the site

### No other files touched.