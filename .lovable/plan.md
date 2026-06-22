## Goal
Make the Portfolio section's videos load fast (especially on mobile) by lazy-loading them and showing real poster stills until they're needed. This is a pure performance change in `src/components/PortfolioSection.tsx` (plus generated poster assets). Layout, tile sizes, captions, and phone-frame styling stay identical.

## Problem today
Every tile renders `<video preload="metadata">` on mount, so all ~13 videos start fetching metadata immediately. Most tiles have no poster, so before load they show the raw `<video>` first frame or nothing solid.

## Approach

### 1. Generate real poster stills for every video
- Use ffmpeg to extract a representative frame (~1s in) from each source video and save as compressed `.jpg` CDN assets in `src/assets/`.
- Reuse existing stills where present (`apartment-ugc-poster`, `raja-stadium-poster`, `hume-health-thumbnail`).
- Each tile gets a `poster` field pointing at its still.

### 2. Lazy-load with IntersectionObserver
- Inside `VideoTile`, attach an `IntersectionObserver` (generous `rootMargin` ~200px) to the tile wrapper.
- The `<video>` always renders with `poster={...}` and `preload="none"`, so the poster shows immediately and no video bytes download on mount.
- Only assign the video `src` once the tile nears the viewport; disconnect the observer after first intersection.

### 3. Always real content
- Every tile shows a true frame of its own video at all times — no grey boxes, no spinners. The `poster` attribute covers the gap until the first frame decodes.

## Files
- `src/components/PortfolioSection.tsx`: add `poster` to each `Tile`, IntersectionObserver-based lazy `src`, `preload="none"`, `poster` on `<video>`.
- New `src/assets/*-poster.jpg.asset.json` for videos lacking stills.

## Unchanged
- All caption text/structure, tile sizing, scroll arrows, phone-frame styling, modal playback, and every other aspect of the section.