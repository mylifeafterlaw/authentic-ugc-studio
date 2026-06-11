## Goal
Centre the social icons under the **visible** part of the secondary photo — the slice that peeks out past the phone's right edge — instead of under the photo's full width (whose left ~third is hidden behind the phone). Hero only; nothing else changes.

## Why it's currently off
The photo wrapper is `w-[340px]` (lg) anchored `right-0` then pushed out with `translate-x-[70%]`. That means roughly the left **30%** of the photo sits *behind* the phone, and only the right ~70% is actually visible. The icon row uses `left-1/2 -translate-x-1/2 w-full`, so it centres on the **whole** photo box — and that centre point falls behind/near the phone, pulling the icons left of where the visible photo is.

## Fix
Re-reference the icon row to the **visible band only** — from roughly the phone's right edge (where the photo emerges) to the photo's right edge — and centre within that band.

Concretely, on the existing icon-row `div` (still a child of the photo wrapper so it keeps tracking the photo's bottom + right edge):
- Remove `left-1/2 -translate-x-1/2 w-full`.
- Add `right-0` (lock to the photo's right edge) and a responsive **left offset** equal to the portion hidden behind the phone, so the row spans only the visible overhang:
  - `left-[38%]` (base/sm-photo) · `sm:left-[34%]` · `lg:left-[30%]`
  These mirror the photo's hidden fraction (`1 − translate-x%`: 0.62→38%, 0.66→34%, 0.70→30%).
- Keep `flex items-center justify-center gap-3` so the icons sit centred **within that visible band**, which lines up under the exposed photo with the phone's right edge as the effective starting point.
- Keep everything else: `top-full mt-5`, `hidden lg:flex`, sizes, accent colour, hover, links.

Result: the row starts at the phone's right edge and centres under the visible photo slice, no longer dragged left behind the phone.

## Technical detail
- **File:** `src/components/HeroSection.tsx`, the icon-row `div` at ~line 124 only.
- **Anchor unchanged:** still the photo wrapper (tracks the photo). Only the horizontal span/centre reference changes from full-width to the visible overhang band.

## Verification
Screenshot at desktop width to confirm the icons sit centred under the exposed photo, beginning at the phone's right edge, all five visible and clear of the phone.