## Goal
Push the script name "Jess Cousin" a bit further left for a clearer off-aligned signature effect. Keep its size, keep everything else (including the @MyLifeAfterLaw link, which you confirmed stays where it is).

## Change (only one)
File: `src/components/HeroSection.tsx`, name `<p>` (~line 51).
- Current: `... mb-2 lg:-ml-5 xl:-ml-8`
- New: increase the desktop-only negative left margin to `lg:-ml-8 xl:-ml-12` (≈32px / 48px).
- Size unchanged (`text-6xl sm:text-7xl lg:text-8xl` stays).

## Overflow safety
The left column has a left inset of `lg:pl-8` (32px) and `xl:pl-16` (64px). The new negative margins (32px / 48px) stay within those insets, so the name shifts further left into the inset but never past the column's outer edge. Mobile/tablet are unaffected (offset is gated behind `lg:`).

## Verification
Screenshot at desktop (1366) and a mobile width to confirm the name reads as a clearer left-shifted signature with no overflow off the left edge, and nothing else moved.