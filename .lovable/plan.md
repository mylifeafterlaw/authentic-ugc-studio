# Final Pre-Publish Wiring & Cleanup

## 1. Wire real URLs (external links open in new tab)
**`src/components/HeroSection.tsx`**
- "@MyLifeAfterLaw": change `<Link to="/links">` → `<a href="https://linktr.ee/MyLifeAfterLaw" target="_blank" rel="noopener noreferrer">` (keep existing classes/text). Remove now-unused `Link` import if no longer used elsewhere in the file.

**`src/components/Footer.tsx`** (these are already `<a target="_blank">`, just swap the href):
- Instagram → `https://www.instagram.com/mylifeafterlaw/`
- YouTube → `https://www.youtube.com/@MyLifeAfterLaw`
- Linktree → `https://linktr.ee/MyLifeAfterLaw`

## 2. Remove empty portfolio tiles
**`src/components/PortfolioSection.tsx`** — in the `talking-head` ("Talking to Camera") category, delete the two tiles with no `videoUrl`/`thumbnail`:
- `{ label: "Piece to camera" }`
- `{ label: "Voiceover" }`

Category will then show only: Skin Comparison, Product UGC (both have real videos). No other empty tiles exist elsewhere — confirmed every other tile has a `videoUrl`.

## 3. "More about me (coming soon)"
**`src/components/AboutSection.tsx`** — this was NOT yet applied (still a clickable `<Link to="/about-me">`). I will replace it with a non-clickable, muted `<span>` reading "More about me (coming soon)", same position. Remove unused `Link` import.

## 4. Verification after changes
- Confirm no `to="/links"` or `to="/about-me"` clickable routes remain (grep).
- Confirm no reachable 404 routes from any link.
- Confirm no tile lacks both `videoUrl` and `thumbnail`.
- Run typecheck/build to confirm no broken imports.

No copy, layout, or styling changes beyond the items above.