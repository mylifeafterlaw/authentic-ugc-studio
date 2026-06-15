Scope: `src/components/AboutSection.tsx` only.

1. Row copy + icons
   - Update the `traits` array with the 5 new text strings exactly as provided.
   - Keep the existing icon-row card layout (icon inside a soft circular background, text beside it).
   - Update imports to use sensible on-brand Lucide icons:
     - Row 1: `Scale`
     - Row 2: `Globe`
     - Row 3: `Leaf`
     - Row 4: `Activity`
     - Row 5: `Clapperboard`

2. Closing line
   - Replace the current `<motion.p>` text with:
     "I hit briefs, hit deadlines, and handle revisions without drama."
   - Keep the same styling classes (centered, muted, small, italic).

3. Subtle link
   - Add a `Link` from `react-router-dom` directly beneath the closing line.
   - Text: "More about me →"
   - Style: small, muted text that transitions to primary on hover. Not a button.
   - Route: `/about-me`

No other sections or files will be touched.