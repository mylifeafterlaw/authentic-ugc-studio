# Portfolio — Mobile Tile Size + Swipe Cue

All changes are mobile-only, scoped below the `md` breakpoint. Desktop (md and up) stays exactly as it is.

## 1. Smaller mobile tiles
In `VideoTile` (src/components/PortfolioSection.tsx), the tile wrapper currently uses:
`w-[75vw] max-w-[280px] md:w-[260px] md:max-w-none`

Change the mobile sizing to roughly `w-[52vw] max-w-[210px]` so ~1.7–2 tiles are visible and the next tile is clearly peeking. The `md:` classes stay untouched, so desktop tiles remain `260px`. The 9:16 phone-frame ratio, notch, play button, captions and styling are all kept (the aspect ratio is on an inner element, unaffected by width).

## 2. Swipe cue (mobile only)
Both row variants (`≤4 tiles` and `>4 tiles`) currently have desktop-only cues. Add a mobile-only cue that signals horizontal scrollability:

- Wrap each `CategoryRow` output in a `relative` container (the ≤4 branch needs one added; the >4 branch already has one).
- Add a small right-pointing chevron at the right edge, shown only on mobile (`md:hidden`): a subtle muted-maroon `ChevronRight` inside a soft pill/circle (`bg-background/80`, `text-primary`/muted maroon, low opacity), `pointer-events-none`, vertically centred over the phone frames.
- Add a soft right-edge fade gradient (`from-background`) on mobile too, so it reads as "more to swipe".

Tone: subtle, on-brand muted maroon — not loud.

## 3. Preserve behaviour
Horizontal scroll, `snap-x snap-mandatory`, hidden scrollbars, captions and phone frames are all kept. No JS logic changes for mobile (the cue is purely visual/static); existing desktop arrow + scroll logic for >4 tiles is untouched.

## Technical detail
- Edit only `src/components/PortfolioSection.tsx`.
- Adjust tile width classes in `VideoTile` (both the `button` and `div` returns).
- ≤4 branch: add a `relative` wrapper + mobile-only fade + chevron.
- >4 branch: add mobile-only fade + chevron alongside the existing desktop ones.
