# Mobile / Responsive Fixes (desktop unchanged)

Scope: mobile + small screens only. Every change is gated behind mobile-first classes that reset at the `md` (≥768px) breakpoint, so desktop layout is untouched. Item 3 (WhatsApp) is dropped per your answer — Contact stays Email-only.

## 1. Portfolio: horizontal swipe strips on mobile
**File: `src/components/PortfolioSection.tsx` — `CategoryRow`**

Current behaviour: categories with ≤4 tiles use `flex-wrap justify-center`, which stacks tiles vertically on narrow screens (the long-scroll problem). Categories with >4 already scroll horizontally.

Change: make every category a horizontal swipe strip on mobile, while keeping desktop exactly as-is.
- Always render the horizontal scroll container (`overflow-x-auto`, `snap-x`, hidden scrollbar) on mobile.
- At `md` and up, restore current behaviour: ≤4 tiles → `flex-wrap justify-center`; >4 tiles → existing horizontal strip with the right-edge fade + arrow (arrow/fade stay `hidden md:flex` so they don't appear on mobile, where native swipe is the affordance).
- Tile width responsive: ~`72vw` on mobile (shows ~1–1.5 tiles with the next peeking), reverting to the current `260px` at `md`. Phone-frame styling and captions kept as-is.
- Add a little horizontal padding/`scroll-px` so the first/last tiles aren't flush to the edge.

Implementation note: keep the existing `>4` JS scroll logic for desktop; the mobile strip is CSS-driven via responsive classes so no desktop logic changes.

## 2. Floating "Work With Me" button no longer covers content
**Files: `src/components/FloatingCTA.tsx` + section/footer padding**

The button is already `md:hidden` (mobile only). Fixes:
- Slightly reduce its mobile footprint (smaller padding/text) so it's less intrusive.
- Add bottom padding on mobile to the sections whose content currently sits under it — primarily the Footer and the Contact/About/Services lower edges — using `pb-*` that resets at `md` (e.g. `pb-24 md:pb-*original*`). This guarantees no tile, card, button, or footer text is ever hidden behind the floating button.

## 3. (dropped) Contact WhatsApp
No change — Contact keeps only the "Email Me" button per your decision.

## 4. Footer fine-print fully visible on mobile
**File: `src/components/Footer.tsx`**
- Add mobile bottom padding (`pb-*` resetting at `md`) so the disclaimer line "Portfolio includes personal and non-commissioned content created independently" clears the floating button. Combined with #2 this guarantees all footer text is visible.

## Verification
- Drive the live preview with Playwright at 375px, 390px, and 414px: screenshot Portfolio (confirm horizontal swipe, peeking next tile, no vertical stacking), Services/About/Contact, and Footer (confirm disclaimer not covered, floating button not over tappable elements).
- Confirm desktop (≥768px) screenshots are visually identical to current.
- Run typecheck/build.

No copy, color, or desktop-layout changes beyond the items above.