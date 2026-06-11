## Goal

Refine the hero section only (no other section, nav, or copy wording changes). All edits live in `src/components/HeroSection.tsx`, plus possibly one small keyframe in `tailwind.config.ts` for the arrow animation.

## Changes

### 1. Vertically centre the phone-and-still group
- The right column already uses a flex container with `items-center`, but the section's tall padding/min-height pushes the group low. Adjust the right-column wrapper so the phone + still group is balanced vertically within the hero with breathing room above and below (e.g. ensure the visuals column centres its content and isn't bottom-weighted by the grid's padding).
- Keep the phone and still in their current relative positions, sizes, overlap, layering (phone `z-10` in front, still `z-0` behind), and proportions.
- If centring still leaves it tight, reduce the phone's height slightly (e.g. trim the `lg:w-[300px]` / aspect-driven height a notch) so the whole group sits comfortably centred. The still scales with it since their relationship stays intact.

### 2. Captioned cue + animated curved arrow pointing at the play button
- Add a small handwritten-style caption "Watch a sample" using the existing `font-script` (Parisienne) in the accent/primary colour, placed in clear background space near the lower portion of the phone — on whichever side has room and does NOT overlap the left column text or the secondary still (the still sits to the phone's right, so the caption goes to the lower-left of the phone, inside the right column area).
- Add a small inline SVG curved arrow sweeping from the caption toward the phone's play button, in the accent colour.
- Animate it subtly: a gentle floating/draw-in motion (using Framer Motion, already imported, or an existing/added lightweight keyframe). Keep it quiet and on-brand — not loud.
- The whole cue is hidden on small screens if it would crowd (shown from `sm`/`lg` where the layout has room), consistent with the still photo's responsive behaviour.

### 3. Subtle bottom-centre scroll cue
- Add a small, gently bouncing down-chevron (lucide `ChevronDown`) centred at the bottom of the hero section, in the accent/primary colour.
- Use a subtle continuous bounce (Framer Motion loop or a soft animation), small and low-key — a quiet "scroll for more" hint. It sits above the decorative blobs and below the main grid.

### 4. Accent part of the headline
- In the `<h1>` "UGC that feels like a recommendation, not an ad", wrap just the phrase "recommendation, not an ad" in a `<span>` with a subtle accent treatment (existing `text-primary` accent colour, optionally slightly heavier weight). Leave "UGC that feels like a" unchanged. No font or wording change.

## Technical notes
- Accent colour: `text-primary` (`--primary: 340 45% 40%`, the maroon/pink).
- Handwritten caption: `font-script` class (Parisienne).
- Animations: prefer Framer Motion (already imported) for the arrow float and chevron bounce; if a CSS keyframe is cleaner for the arrow draw-in, add a small one to `tailwind.config.ts`.
- No changes to copy text, the left column content, the phone/video logic, the Watch (30s) button, or the still's styling/overlap.
