# Portfolio Video Upload Plan

## How you send me the videos
Yes — just drop the files into the chat and tell me the category + caption for each. The cleanest format:

- **File:** (attach the MP4/MOV)
- **Category:** Product / Accommodation & Travel / Lifestyle & Experience
- **Caption (optional):** e.g. "Unboxing"

A few practical notes:
- Up to **10 files per message**, **20MB max each**. If you have more than 10 or larger files, send across several messages — I'll keep adding them.
- **MP4 (H.264)** is ideal for web playback. MOV usually works too, but MP4 is safest. I can flag any that won't play in-browser.
- 9:16 vertical clips fit the existing tile layout perfectly.

## What I'll build

**1. Host the videos**
Each uploaded file gets pushed to the Lovable CDN (fast, global, keeps the repo light) and referenced by URL in the portfolio data — no external accounts needed.

**2. Inline playback**
Clicking a tile opens the video and plays it on the page (not a redirect to TikTok/YouTube). Implementation:
- Tiles show a poster frame (first frame / supplied thumbnail) with the existing play button.
- Clicking opens a lightweight modal/overlay that plays the video with native controls; closing returns to the gallery.
- Videos use `preload="metadata"` and lazy loading so the page stays fast.

**3. Wire into categories**
Update the `categories` array in `PortfolioSection.tsx` so each tile carries its `videoUrl` (CDN), optional `thumbnail`, and `label`, slotted under the category you specify.

## Technical details
- Upload via the Lovable assets CLI → write `.asset.json` pointers → reference `url` in the tile data.
- Extend the `Tile` type so `videoUrl` drives an inline player instead of an external link.
- Add a small modal player (reuse existing `Dialog` UI) to keep styling consistent with the editorial/peach theme.
- Keep the current tile sizing, lighter typography, smaller play button, and centered `max-w-3xl` row layout unchanged.

## Next step
Send the videos with their category + caption and I'll host them and wire up inline playback.