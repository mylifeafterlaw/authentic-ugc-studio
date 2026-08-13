// Emits recolourable line-art versions of the cherry-JC monogram from the
// brand sheet (the second tile: dark line art on cream, no filled square).
// Alpha is derived from the artwork's darkness, so each output is the mark in
// a single flat colour with transparent background.
//   node scripts/brand-linemarks.mjs <brand-raw.bin> <width> <height>
// Outputs:
//   src/assets/jc-watermark.png  deep oxblood shadow — hero/band watermark
//   src/assets/jc-line-cream.png cream — stamp on dark backgrounds
//   src/assets/jc-line-ink.png   oxblood — stamp on cream backgrounds
import { deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [rawPath, W, H] = [process.argv[2], +process.argv[3], +process.argv[4]];
const raw = readFileSync(rawPath);
const px = (x, y) => raw.subarray((y * W + x) * 4, (y * W + x) * 4 + 4);
const isDark = (p) => p[0] < 170 && p[1] < 90 && p[2] < 100;

// monogram tile window (dark mark on cream, second tile of the sheet)
const x0 = Math.floor(W * 0.25), x1 = Math.floor(W * 0.43);
const y0 = Math.floor(H * 0.515), y1 = Math.floor(H * 0.79);
let minX = Infinity, maxX = -1, minY = Infinity, maxY = -1;
for (let y = y0; y < y1; y++) for (let x = x0; x < x1; x++)
  if (isDark(px(x, y))) { if (x < minX) minX = x; if (x > maxX) maxX = x; if (y < minY) minY = y; if (y > maxY) maxY = y; }
const bw = maxX - minX + 1, bh = maxY - minY + 1;
const side = Math.max(bw, bh) + 20;
const offX = minX - Math.floor((side - bw) / 2), offY = minY - Math.floor((side - bh) / 2);
console.log(`monogram bbox ${bw}x${bh} at (${minX},${minY}) -> ${side}px square`);

const CRC = (() => { const t = new Uint32Array(256); for (let n = 0; n < 256; n++) { let c = n; for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1; t[n] = c >>> 0; } return t; })();
const crc32 = (b) => { let c = 0xffffffff; for (const v of b) c = CRC[(c ^ v) & 0xff] ^ (c >>> 8); return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length); const body = Buffer.concat([Buffer.from(t), d]); const c = Buffer.alloc(4); c.writeUInt32BE(crc32(body)); return Buffer.concat([l, body, c]); };

function tinted(ink) {
  const D = side;
  const buf = Buffer.alloc(D * D * 4);
  for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
    const sx = offX + x, sy = offY + y, o = (y * D + x) * 4;
    buf[o] = ink[0]; buf[o + 1] = ink[1]; buf[o + 2] = ink[2];
    if (sx >= 0 && sx < W && sy >= 0 && sy < H) {
      const p = px(sx, sy);
      const lum = p[0] * 0.299 + p[1] * 0.587 + p[2] * 0.114;
      buf[o + 3] = Math.round(Math.max(0, Math.min(1, (215 - lum) / 150)) * 255);
    }
  }
  const ihdr = Buffer.alloc(13); ihdr.writeUInt32BE(D, 0); ihdr.writeUInt32BE(D, 4); ihdr[8] = 8; ihdr[9] = 6;
  const rl = Buffer.alloc(D * (D * 4 + 1));
  for (let y = 0; y < D; y++) { rl[y * (D * 4 + 1)] = 0; buf.copy(rl, y * (D * 4 + 1) + 1, y * D * 4, (y + 1) * D * 4); }
  return Buffer.concat([Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]), chunk("IHDR", ihdr), chunk("IDAT", deflateSync(rl, { level: 9 })), chunk("IEND", Buffer.alloc(0))]);
}

const assets = join(dirname(fileURLToPath(import.meta.url)), "..", "src", "assets");
writeFileSync(join(assets, "jc-watermark.png"), tinted([40, 6, 14]));
writeFileSync(join(assets, "jc-line-cream.png"), tinted([244, 236, 220]));
writeFileSync(join(assets, "jc-line-ink.png"), tinted([92, 18, 32]));
console.log("written: jc-watermark.png, jc-line-cream.png, jc-line-ink.png");
