// Derives the favicon set + navbar logo mark from the supplied brand sheet
// (script "JC" monogram, cream on oxblood rounded square).
// Usage:
//   ffmpeg -i <brand-sheet.png> -f rawvideo -pix_fmt rgba brand-raw.bin
//   node scripts/brand-favicons.mjs <brand-raw.bin> <width> <height>
// Finds the large mark's bounding box automatically, crops it, then emits:
//   public/favicon-16x16.png, favicon-32x32.png  (transparent rounded corners)
//   public/icon-512.png                          (transparent rounded corners)
//   public/apple-touch-icon.png (180, opaque on cream — iOS dislikes alpha)
//   public/favicon.ico (16+32)
//   src/assets/jc-mark.png (256, transparent corners, used by the navbar)
import { deflateSync } from "node:zlib";
import { readFileSync, writeFileSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const [rawPath, W, H] = [process.argv[2], +process.argv[3], +process.argv[4]];
// Optional search window as fractions: x0 x1 y0 y1 (defaults match the first
// brand sheet: right half, upper ~62%).
const [wx0, wx1, wy0, wy1] = [
  +(process.argv[5] ?? 0.45), +(process.argv[6] ?? 1),
  +(process.argv[7] ?? 0), +(process.argv[8] ?? 0.62),
];
const raw = readFileSync(rawPath);
if (raw.length !== W * H * 4) throw new Error("raw size mismatch");
const px = (x, y) => raw.subarray((y * W + x) * 4, (y * W + x) * 4 + 4);
const isDark = (p) => p[0] < 170 && p[1] < 90 && p[2] < 100;

// Bounding box of the dark tile inside the search window.
let minX = Infinity, maxX = -1, minY = Infinity, maxY = -1;
for (let y = Math.floor(H * wy0); y < Math.floor(H * wy1); y++)
  for (let x = Math.floor(W * wx0); x < Math.floor(W * wx1); x++)
    if (isDark(px(x, y))) {
      if (x < minX) minX = x; if (x > maxX) maxX = x;
      if (y < minY) minY = y; if (y > maxY) maxY = y;
    }
const bw = maxX - minX + 1, bh = maxY - minY + 1;
// The art's rounded square is slightly non-square; centre-crop to the smaller
// dimension (trims a sliver of flat red edge, no cream padding bands) and the
// rounded mask below re-rounds the clipped corners.
const side = Math.min(bw, bh);
const offX = minX + Math.floor((bw - side) / 2);
const offY = minY + Math.floor((bh - side) / 2);
const sq = Buffer.alloc(side * side * 4);
for (let y = 0; y < side; y++) for (let x = 0; x < side; x++)
  px(offX + x, offY + y).copy(sq, (y * side + x) * 4);
console.log(`mark bbox: ${bw}x${bh} at (${minX},${minY}) -> square ${side}`);

// Bolder variant for tiny sizes: dilate the cream strokes so they survive a
// 15x downscale (8px lines are ~0.5px at 16px and vanish otherwise).
function dilateCream(src, S, radius) {
  const out = Buffer.from(src);
  const isCream = (o) => src[o] > 190 && src[o + 1] > 160 && src[o + 2] > 140;
  const offs = [];
  for (let dy = -radius; dy <= radius; dy++)
    for (let dx = -radius; dx <= radius; dx++)
      if (dx * dx + dy * dy <= radius * radius) offs.push([dx, dy]);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    const o = (y * S + x) * 4;
    if (isCream(o)) continue;
    for (const [dx, dy] of offs) {
      const nx = x + dx, ny = y + dy;
      if (nx < 0 || ny < 0 || nx >= S || ny >= S) continue;
      if (isCream((ny * S + nx) * 4)) {
        out[o] = 245; out[o + 1] = 233; out[o + 2] = 220; // brand cream
        break;
      }
    }
  }
  return out;
}

// box-average downscale (high quality for large ratios)
function resize(src, S, D) {
  const out = Buffer.alloc(D * D * 4);
  const r = S / D;
  for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
    const x0 = x * r, x1 = (x + 1) * r, y0 = y * r, y1 = (y + 1) * r;
    let acc = [0, 0, 0, 0], wsum = 0;
    for (let sy = Math.floor(y0); sy < Math.ceil(y1); sy++)
      for (let sx = Math.floor(x0); sx < Math.ceil(x1); sx++) {
        const wx = Math.min(sx + 1, x1) - Math.max(sx, x0);
        const wy = Math.min(sy + 1, y1) - Math.max(sy, y0);
        const w = wx * wy, o = (sy * S + sx) * 4;
        acc[0] += src[o] * w; acc[1] += src[o + 1] * w; acc[2] += src[o + 2] * w; acc[3] += src[o + 3] * w;
        wsum += w;
      }
    const o = (y * D + x) * 4;
    for (let c = 0; c < 4; c++) out[o + c] = Math.round(acc[c] / wsum);
  }
  return out;
}

// rounded-rect alpha mask (radius fraction of side); antialiased edge
function roundMask(buf, D, radFrac) {
  const r = D * radFrac;
  const corners = [[r, r], [D - r, r], [r, D - r], [D - r, D - r]];
  for (let y = 0; y < D; y++) for (let x = 0; x < D; x++) {
    const cx = x + 0.5, cy = y + 0.5;
    const inX = cx > r && cx < D - r, inY = cy > r && cy < D - r;
    if (inX || inY) continue;
    const [kx, ky] = corners[(cx < r ? 0 : 1) + (cy < r ? 0 : 2)];
    const d = Math.hypot(cx - kx, cy - ky);
    const o = (y * D + x) * 4;
    if (d > r + 0.5) buf[o + 3] = 0;
    else if (d > r - 0.5) buf[o + 3] = Math.round(buf[o + 3] * (r + 0.5 - d));
  }
  return buf;
}

// ---- PNG encoder ----
const CRC_TABLE = (() => { const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0; } return t; })();
const crc32 = (b) => { let c = 0xffffffff;
  for (const v of b) c = CRC_TABLE[(c ^ v) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0; };
const chunk = (t, d) => { const l = Buffer.alloc(4); l.writeUInt32BE(d.length);
  const body = Buffer.concat([Buffer.from(t, "ascii"), d]);
  const c = Buffer.alloc(4); c.writeUInt32BE(crc32(body));
  return Buffer.concat([l, body, c]); };
function png(buf, D) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(D, 0); ihdr.writeUInt32BE(D, 4); ihdr[8] = 8; ihdr[9] = 6;
  const rawLines = Buffer.alloc(D * (D * 4 + 1));
  for (let y = 0; y < D; y++) {
    rawLines[y * (D * 4 + 1)] = 0;
    buf.copy(rawLines, y * (D * 4 + 1) + 1, y * D * 4, (y + 1) * D * 4);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr), chunk("IDAT", deflateSync(rawLines, { level: 9 })), chunk("IEND", Buffer.alloc(0)),
  ]);
}
function ico(list) {
  const h = Buffer.alloc(6); h.writeUInt16LE(1, 2); h.writeUInt16LE(list.length, 4);
  const es = []; let off = 6 + 16 * list.length;
  for (const { size, buf } of list) {
    const e = Buffer.alloc(16);
    e[0] = size % 256; e[1] = size % 256;
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6);
    e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(off, 12);
    es.push(e); off += buf.length;
  }
  return Buffer.concat([h, ...es, ...list.map((p) => p.buf)]);
}

const root = join(dirname(fileURLToPath(import.meta.url)), "..");
const RAD = 0.24; // slightly rounder than the art so no cream slivers survive
// Pre-boldened sources for the tiny sizes (scaled to the tile's resolution).
const boldStrong = dilateCream(sq, side, Math.max(2, Math.round(side / 60)));
const boldLight = dilateCream(sq, side, Math.max(1, Math.round(side / 120)));
const make = (D, masked, src = sq) => {
  const b = resize(src, side, D);
  return masked ? roundMask(b, D, RAD) : b;
};
const p16 = png(make(16, true, boldStrong), 16);
const p32 = png(make(32, true, boldLight), 32);
writeFileSync(join(root, "public", "favicon-16x16.png"), p16);
writeFileSync(join(root, "public", "favicon-32x32.png"), p32);
writeFileSync(join(root, "public", "icon-512.png"), png(make(512, true), 512));
writeFileSync(join(root, "public", "apple-touch-icon.png"), png(make(180, false), 180));
writeFileSync(join(root, "public", "favicon.ico"), ico([{ size: 16, buf: p16 }, { size: 32, buf: p32 }]));
writeFileSync(join(root, "src", "assets", "jc-mark.png"), png(make(256, true), 256));
console.log("written: favicon 16/32/ico, icon-512, apple-touch-icon(180, opaque), src/assets/jc-mark.png(256)");
