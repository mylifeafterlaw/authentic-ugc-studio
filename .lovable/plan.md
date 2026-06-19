# Hero poster from video frame

Keep the click-to-play behaviour exactly as it is. Only swap the static image shown before play (currently the hero portrait photo) for a real frame captured from the showreel video itself.

## What changes

1. **Extract a frame** from `My_hair_wasn_t_just_dry_-_Final-2.mp4` using ffmpeg (a frame ~1–2s in, where the subject is clearly visible), save as a JPG.
2. **Upload the frame** to the Lovable Assets CDN and write its `.asset.json` pointer into `src/assets/` (e.g. `hero-video-poster.jpg.asset.json`).
3. **Wire it into `HeroSection.tsx`:**
   - Import the new poster asset.
   - Change `const videoPoster = heroImg;` to use the new frame's URL.
   - This automatically updates both the `<img>` shown before play and the `<video poster=...>`.

## Untouched

- Click-to-play flow (`handlePlay`, play button, "Watch (30s)" label).
- The secondary side still (`sideStill`) keeps using the portrait photo, so the layout still has two distinct visuals.

## Technical notes

ffmpeg command (build mode): `ffmpeg -ss 00:00:01.5 -i <video> -frames:v 1 -q:v 2 /tmp/hero-video-poster.jpg`, then `lovable-assets create`. If the chosen timestamp lands on an unflattering frame, I'll grab a couple of candidates and pick the best.
