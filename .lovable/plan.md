## Goal
Re-centre the "@MyLifeAfterLaw" link between:
- Left boundary = the right side of the phone frame (the video)
- Right boundary = the rotated secondary photo's right edge (its bottom-right corner)

It currently sits **too far right**, so it needs to move LEFT. Nothing else changes (styling, link target, vertical position all stay).

## Change (one line)
File: `src/components/HeroSection.tsx` (~line 118), the link wrapper `<div>`.
- Current: `... absolute top-full left-[65%] -translate-x-1/2 mt-8 z-20`
- New: shift the centre point left — `left-[55%]` (keep `-translate-x-1/2`).

```text
phone right edge ──────── midpoint ──────── secondary photo rotated right edge
                          ^ link centred here (moved left from current)
```

Everything else on the line (`-translate-x-1/2`, `mt-8`, `z-20`, hidden/flex classes) stays untouched.

## Verification
Screenshot at desktop (1366) to confirm the handle now sits centred between the phone's right edge and the photo's rotated right edge, with no other movement. Adjust the percentage once more if it still reads off-centre.
