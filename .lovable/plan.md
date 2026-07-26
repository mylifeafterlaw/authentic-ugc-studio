## Add new Playful App video as first tile in Tech and Apps

**Asset**
- Upload `Playful_Arrival_App_-_Video_2_FINAL.mp4` via `lovable-assets` to `src/assets/playful-arrival-app.mp4.asset.json`.
- Scan the opening seconds with ffmpeg and pick a frame where both the on-screen title text and the small corner cutout of you speaking are clearly visible; save it as `playful-arrival-app-poster.jpg` and upload as an asset pointer.

**Portfolio edit (`src/components/PortfolioSection.tsx`)**
- Import the new video + poster pointers.
- Insert as the FIRST tile in the `tech-apps` category; the two existing Hatch tiles shift to 2nd and 3rd.
- Caption:
  - subject: `Playful App`
  - format (suggested): `Hook-led · full-screen screen recording · greenscreen talking-head overlay`

Alternative sublines if you prefer: `Hook-led · screen recording with greenscreen talking-head corner overlay` or `Hook-led · app walkthrough · greenscreen presenter overlay`.

**Verify**
- Run the build, confirm the tile renders and plays.

Nothing else in the portfolio or other sections changes.