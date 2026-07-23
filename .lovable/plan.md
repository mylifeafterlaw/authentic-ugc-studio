Fix: Re-encode the fourth Product video from HEVC/H.265 to H.264/AVC

Root cause confirmed
- The fourth Product tile (`src/assets/product-video-5.mp4.asset.json`) points to a 1440×2560 60fps HEVC (`hvc1`) video.
- HEVC is not supported by many browsers in HTML5 `<video>`; playback shows a black screen.
- The other three Product tiles are H.264 (`avc1`) and play correctly.
- The poster frame extracted from the video is fine — only the video stream needs replacing.

Plan
1. Re-encode `/tmp/product-video-5-check.mp4` to H.264 (AVC) at 1080×1920, preserving 9:16 aspect ratio and quality.
2. Upload the re-encoded file via `lovable-assets create` to replace the CDN asset pointer.
3. Update `src/assets/product-video-5.mp4.asset.json` with the new asset URL/ID.
4. Leave the existing poster asset unchanged; it already shows a real frame.
5. Verify the video plays in the preview by clicking the fourth Product tile.

No other files or sections will be changed.