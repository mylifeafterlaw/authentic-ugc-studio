## Goal
Update the Accommodation & Travel category tile captions to the two-line subject/format structure (same pattern already applied to the Product category).

## Scope
Only the `accommodation-travel` category data changes. No layout, tile size, video, rendering logic, or other categories are touched.

## Plan

1. **In `src/components/PortfolioSection.tsx`, replace the four Accommodation & Travel `Tile` objects** (currently using `label`) with `subject`/`format` pairs:

| Tile | `subject` | `format` |
|---|---|---|
| 1 (was "Apartment UGC") | `Apartment tour · Vietnam` | `B-roll and voiceover` |
| 2 (was "Condo UGC") | `Condo tour · Chiang Mai` | `Hook-led · talking-to-camera and B-roll with voiceover` |
| 3 (was "Vietnam Apartment") | `Apartment tour · Vietnam` | `Aesthetic B-roll and voiceover` |
| 4 (was "Singapore Zoo") | `Travel · Singapore` | `B-roll and voiceover · natural travel style` |

2. **Preserve all existing fields** (`thumbnail`, `videoUrl`) unchanged.

3. **No rendering changes needed** — `VideoTile` already renders `subject` + `format` when present, falling back to `label` for other categories.

Copy is used verbatim, middle dots (`·`) preserved.