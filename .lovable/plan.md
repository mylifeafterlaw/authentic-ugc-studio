Plan: Refine Hero Section Portrait on Mobile Only

Scope: `src/components/HeroSection.tsx`. Only the `lg:hidden` mobile portrait block is affected. Desktop layout, phone mockup, and all other hero elements remain untouched.

Changes:

1. Reduce photo size/height
   - Current: `w-[180px] sm:w-[220px]` with `aspect-[4/5]`
   - New: `w-[140px] sm:w-[170px]` with `aspect-[3/4]` (tighter portrait crop, smaller footprint)
   - Effect: headline and "View Portfolio" button shift up, more visible without scrolling.

2. Soften the frame
   - Current: `border-4 border-background` + `shadow-card` (thick bright white card look)
   - New: `border border-background/40` + `shadow-soft` (thin, translucent border + gentle shadow so it blends into the pink gradient)

3. Tighten photo-to-name gap
   - Current: `mb-6` on the photo wrapper
   - New: `mb-2` on the photo wrapper
   - Effect: photo and "Jess Cousin" name read as one compact unit.

No changes to desktop, the phone mockup, CTAs, stats, scroll cue, or decorative blobs.