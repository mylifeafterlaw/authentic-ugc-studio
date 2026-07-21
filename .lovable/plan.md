Add a new "Tech and Apps" category to the existing portfolio section, following the same structure and behaviour as the current categories.

What will be built:
- Insert a new `tech-apps` entry into the `categories` array in `src/components/PortfolioSection.tsx`.
- Use the same tile structure as other categories: `subject`, `format`, `poster`, and `videoUrl`.
- Apply the existing two-line caption styling (uppercase subject + muted format).
- Inherit the same responsive behaviour: horizontal scroll on mobile, up to 5 tiles on one row on desktop, lazy-loaded poster stills, and click-to-play modal.
- Position the new category after the "Product" category unless you request a different order.

What I need from you before building:
- The video files for each tile in this category.
- The exact `subject` and `format` captions for each tile (e.g., subject: "Tech review", format: "Hook-led · B-roll and voiceover").

No other sections, styles, or layout rules will be changed.