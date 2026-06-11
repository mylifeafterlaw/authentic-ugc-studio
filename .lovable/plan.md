## Goal
Three hero changes only: (1) offset the script name left as a signature, (2) remove the social icon row, (3) add a quiet "@MyLifeAfterLaw" internal text link centred under the secondary photo. Headline, lawyer line, niches, bullets, CTAs, phone, and photos stay untouched.

## 1. Offset the name left (keep size)
File: `src/components/HeroSection.tsx`, name `<p>` (~line 57).
- Keep `font-script text-6xl sm:text-7xl lg:text-8xl text-primary leading-none` unchanged (no size change).
- Add a small **desktop-only negative left margin**: `lg:-ml-5 xl:-ml-8`.
- **Why it won't break layout / overflow:** the left column already has a left inset (`lg:pl-8 xl:pl-16` = 32–64px). A −20/−32px margin only eats back into that inset, so the name shifts left of the body text but never crosses the column's outer edge. Gated behind `lg:` so the centred mobile/tablet stack is unaffected.
- No handle under the name (per your note).

## 2. Remove the social icon row
- Delete the entire icon-row `<div>` (lines ~123–142) from inside the secondary-photo wrapper.
- Also remove the now-unused `socials` array (line 13) and any icon imports that become unused (Mail/Instagram/etc.), so no dead code or lint warnings remain. (Will verify which imports are still used elsewhere before removing.)

## 3. Add "@MyLifeAfterLaw" link under the secondary photo
- In the **same secondary-photo wrapper** (the div that owns the photo), where the icon row used to be, add a single `<Link>` so it tracks that specific photo.
- Anchoring: reuse the proven positioning from the icon row so it sits centred under the **visible** photo slice (not behind the phone):
  `absolute top-full right-0 left-[38%] sm:left-[34%] lg:left-[30%] mt-4 flex justify-center`, `hidden lg:flex` (matches the photo, which is desktop-prominent).
- Styling: small, quiet, on-brand — `font-body text-xs sm:text-sm text-primary/60 tracking-wide hover:text-primary transition-colors`. Reads as a subtle handle, not a CTA.
- Link target: **internal route `/links`** via React Router `Link` (`import { Link } from "react-router-dom"`). I'll point to `/links` as the placeholder you'll build later.
  - Note: `/links` isn't defined in `App.tsx` yet, so until you build that page it will hit the catch-all NotFound. If you'd like, I can also drop in a tiny placeholder `/links` route now so the click doesn't 404 — tell me and I'll add it; otherwise I'll just wire the link.

## Verification
Screenshot at desktop (1366) and a mobile width to confirm: name is subtly shifted left without overflow, the icon row is gone, and "@MyLifeAfterLaw" sits centred under the visible photo as a quiet link.