## Plan

1. **Upload the uploaded video to Lovable Assets**
   - Run `lovable-assets create --file /mnt/user-uploads/My_hair_wasn_t_just_dry_-_Final-2.mp4 --filename My_hair_wasn_t_just_dry_Final-2.mp4 > src/assets/My_hair_wasn_t_just_dry_Final-2.mp4.asset.json`

2. **Wire the asset into HeroSection**
   - Import the new `.asset.json` in `src/components/HeroSection.tsx`
   - Replace `const videoSrc = "";` with the imported asset URL
   - The phone mockup already handles playback via `handlePlay` and `<video>` — no other changes needed.

The existing `videoPoster` (hero portrait) stays as-is until a dedicated poster frame is provided.