## Services Section — Mobile Compactness Fix

### Current State
The Services section renders 6 cards in a 3-column grid on desktop. On mobile (< md), cards stack in a single column with `p-6` internal padding, `gap-5` between cards, and a `w-14 h-14` icon circle. This creates excessive vertical whitespace and a long scroll.

### Goal
Tighten only the mobile layout (`< md` breakpoint). Desktop (`md` and up) must remain exactly as-is. Copy, card colours, border-radius, and two-line layout stay unchanged.

### Changes
In `src/components/ServicesSection.tsx`:

1. **Card internal padding** — change `p-6` to `py-4 px-5 md:p-6` so mobile cards hug their content.
2. **Grid gap** — change `gap-5` to `gap-3 md:gap-5` so mobile cards sit closer together.
3. **Icon circle** — change `w-14 h-14` to `w-12 h-12 md:w-14 md:h-14` to save a little vertical space on small screens while keeping it clearly visible.
4. **Icon circle bottom margin** — change `mb-4` to `mb-2 md:mb-4` on mobile.
5. **Section heading bottom margin** — change `mb-14` to `mb-10 md:mb-14` to reduce dead space above the cards on mobile.

### Verification
- Visual check at 375 px, 390 px, and 414 px widths to confirm cards are compact and not cut off.
- Visual check at 1280 px desktop to confirm zero change.

### Technical Details
- Tailwind responsive prefixes (`md:`) reset values at the `md` breakpoint (768 px).
- No new dependencies, no JavaScript logic changes.
