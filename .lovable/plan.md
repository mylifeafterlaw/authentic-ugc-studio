## Goal
Make the secondary still photo in the hero's right column read as a deliberate second photo of Jess sitting behind the phone — a complete framed photo card peeking from the phone's right side at upper-to-mid height — instead of a small fragment poking out the bottom-right corner.

## Scope
- File: `src/components/HeroSection.tsx`
- Only the "Secondary still" `<div>` block (and, if needed, the wrapper's overflow/justify handling so nothing clips on desktop).
- No changes to copy, the left column, the phone, the video, or the Watch (30s) button.

## Changes to the still

1. **Full framed photo card, not a bleed fragment**
   - Keep `rounded-2xl overflow-hidden` and the soft shadow (`shadow-card`), keep the `border-4 border-background` frame so it reads as a distinct photo card.
   - Target outcome (not a specific value): roughly **55–60% of the photo visible on the right, ~40% hidden behind the phone**. Tune the horizontal offset to hit that visible proportion; whatever translate value is chosen must achieve it — adjust until it does.
   - Use a portrait crop that keeps the face centered/visible (`object-cover object-top` so the face isn't cut off).

2. **Reposition to upper-to-mid height, right side**
   - Vertically centre relative to the phone, nudged slightly up: `top-1/2 -translate-y-1/2` with a small upward shift. Do **not** use `top-[15%]` — avoid sitting so high it clips against the top of the phone.
   - Anchor to the phone's right edge rather than the container's bottom-right corner.

3. **Medium size**
   - Bump to roughly `w-[150px] sm:w-[180px] lg:w-[210px]` — clearly a full photo, still visibly smaller than the ~300px phone.

4. **Layering / depth**
   - Phone stays `z-10` with its shadow; still stays `z-0` behind it, partly hidden by the phone's left edge. Keep the slight `rotate` for a casual stacked-photo feel.

5. **No awkward clipping on desktop**
   - Ensure the right-column wrapper doesn't clip the card: confirm the visuals container allows the still to extend right without being cut. The section already has `overflow-hidden`, so position the still so its right edge stays within the section at normal desktop widths (tune offset so it peeks out but isn't sliced by the viewport edge). May adjust the wrapper's `justify-end` / right padding slightly if the card would otherwise touch the edge.

6. **Mobile**
   - Keep `hidden sm:block` so the still only appears at `sm` and up, preserving the phone-first mobile layout.

## Technical notes
- All values are Tailwind utility tweaks on the existing absolutely-positioned still `<div>` and its `<img>`; no new dependencies, no JS/state changes.
- `sideStill` placeholder asset stays as-is (still swappable later).
</parameter>
<parameter name="summary">Reframe the hero's secondary still as a deliberate full photo card peeking from behind the phone's right side, centred-and-nudged-up vertically, with ~55–60% visible.