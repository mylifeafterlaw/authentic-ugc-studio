## Talking to Camera Captions — Two-Line Subject/Format Structure

### Scope
Update only the three tiles in the `talking-head` ("Talking to Camera") category in `src/components/PortfolioSection.tsx`. No layout, tile size, video, or other category changes.

### Changes
Replace `label` with `subject` + `format` on each tile:

| Tile | Current | Subject | Format |
|------|---------|---------|--------|
| 1 | "Hume Health" | "Hume Health" | "Talking-to-camera · hook and CTA · ad-style" |
| 2 | "Skin Comparison" | "Skincare" | "Talking-to-camera · before and after with overlays · series-style" |
| 3 | "Product UGC" | "Food and drink" | "Talking-to-camera · natural and authentic" |

- Keep `thumbnail` and `videoUrl` fields unchanged.
- No rendering changes needed — `VideoTile` already renders `subject`/`format` when present.
- Copy used verbatim with middle dots (`·`).