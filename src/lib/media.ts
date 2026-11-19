// Portfolio videos live on Cloudflare R2 (bucket "jesscousin-portfolio"), not in
// the Vite bundle, so each Vercel deploy stays small. To add a video: upload the
// .mp4 to the bucket, then reference it here with r2("file-name.mp4").
export const MEDIA_BASE = "https://pub-046b70ad241744e3836aa6cf4c956de7.r2.dev";

export const r2 = (file: string) => `${MEDIA_BASE}/${file}`;
