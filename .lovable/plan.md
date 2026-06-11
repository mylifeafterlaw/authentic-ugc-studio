## Goal
Tie the hero social icons row to the **secondary still photo** specifically, so it always sits centred just under that photo's bottom edge — never drifting toward the phone, the gap, or the section centre. Hero section only; nothing else changes.

## Current situation
- The secondary photo is an absolutely-positioned, `rotate-6`, `overflow-hidden` div anchored to the inner `.relative` visual container (line 111).
- The social icons (line 203) are a **separate sibling** absolutely positioned against that same `.relative` container using hand-tuned offsets (`right-0 top-1/2 translate-x-[86%] translate-y-[235px]`). Because they're positioned against the container — not the photo — they read as floating in the gap and are fragile (any size change makes them drift).

## What I'll do

**1. Anchor the icons to the photo, not the container.**
I'll introduce a thin positioning wrapper that carries the photo's existing placement (`absolute right-0 top-1/2 -translate-y-[58%]`, the responsive `translate-x-*`, and the responsive `w-*`), but is **not** rotated and **not** `overflow-hidden`. Inside it:
   - the photo div keeps its own `rotate-6`, `rounded-2xl`, `overflow-hidden`, border and shadow (so the photo looks identical);
   - the social row becomes a **child of this wrapper**, so it inherits the photo's exact width and horizontal position.

This is the key change: the row is now measured from the photo's own box, so it tracks that specific element.

**2. Centre it under the photo's width.**
The social row gets `absolute top-full left-1/2 -translate-x-1/2 w-full` with `flex justify-center`, plus a small `mt` gap. `top-full` puts it just beneath the wrapper's bottom edge; `left-1/2 -translate-x-1/2` over `w-full` centres it to the photo's width — not the phone, not the gap.

**3. Keep the icons horizontal even though the photo is rotated.**
The wrapper itself is unrotated, so the row sits horizontally by default (no counter-rotation needed). It centres under the photo's bounding box, which reads as "centred under the photo" while staying level.

**4. Stop it drifting back to centre / under the phone.**
Because the row is now a child of the photo wrapper (sharing its `right-0 + translate-x-*` anchor and `w-full`), it can only ever sit under the photo. I'll remove the old free-floating offsets (`translate-x-[86%] translate-y-[235px]`, fixed `w-[300px]`) that caused the centre drift.

**5. Preserve appearance.**
Icons stay unchanged: small (`w-8 h-8` buttons, `w-4 h-4` glyphs), subtle accent colour (`text-primary/60` with hover), evenly spaced (`gap-3`), `hidden lg:flex`. Same icon set and links.

## Technical detail (element anchored to)
- **Anchor element:** the new unrotated photo-position wrapper (which owns the secondary photo). The icon row is its direct child via `top-full / left-1/2 -translate-x-1/2 / w-full justify-center`.
- **Files:** `src/components/HeroSection.tsx` only (lines ~111 and ~202–220).
- No wording, link, nav, left-column, phone, or right-column structural changes beyond this re-parenting.

## Verification
Screenshot at desktop width to confirm the row sits centred directly under the secondary photo, level, clear of the phone.