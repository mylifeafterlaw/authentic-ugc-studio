// Generates the cherry favicon set (cream on oxblood) at 16/32/180/512 px
// plus a multi-size favicon.ico, without native deps: simple supersampled
// rasterizer + minimal PNG encoder using Node's zlib.
// Geometry matches the approved design exactly (fractions of size S):
//   fruit  : filled circle, centre (0.44, 0.69), radius 0.27
//   stem   : quadratic (0.50,0.50) -> ctrl (0.66,0.30) -> (0.70,0.14), width 0.085, round caps
//   leaf   : filled ellipse at (0.78,0.17), rx 0.13, ry 0.06, rotated -0.6 rad
import { deflateSync } from "node:zlib";
import { writeFileSync, mkdirSync } from "node:fs";
import { dirname, join } from "node:path";
import { fileURLToPath } from "node:url";

const OX = [0x5c, 0x12, 0x20];
const CREAM = [0xf4, 0xec, 0xdc];

function insideCherry(px, py, S) {
  const x = px / S, y = py / S;
  // fruit
  { const dx = x - 0.44, dy = y - 0.69; if (dx * dx + dy * dy <= 0.27 * 0.27) return true; }
  // leaf (rotate point into ellipse frame)
  { const c = Math.cos(0.6), s = Math.sin(0.6); // inverse of -0.6 rotation
    const dx = x - 0.78, dy = y - 0.17;
    const lx = dx * c - dy * s, ly = dx * s + dy * c;
    if ((lx * lx) / (0.13 * 0.13) + (ly * ly) / (0.06 * 0.06) <= 1) return true; }
  // stem: distance to sampled quadratic
  { const r = Math.max(1 / S, 0.085) / 2;
    let prevx = 0.5, prevy = 0.5, best = Infinity;
    for (let i = 1; i <= 32; i++) {
      const t = i / 32, mt = 1 - t;
      const qx = mt * mt * 0.5 + 2 * mt * t * 0.66 + t * t * 0.70;
      const qy = mt * mt * 0.5 + 2 * mt * t * 0.30 + t * t * 0.14;
      // distance from (x,y) to segment prev->q
      const vx = qx - prevx, vy = qy - prevy;
      const wx = x - prevx, wy = y - prevy;
      const len2 = vx * vx + vy * vy;
      const u = len2 ? Math.max(0, Math.min(1, (wx * vx + wy * vy) / len2)) : 0;
      const dx = wx - u * vx, dy = wy - u * vy;
      best = Math.min(best, dx * dx + dy * dy);
      prevx = qx; prevy = qy;
    }
    if (best <= r * r) return true; }
  return false;
}

function raster(S) {
  const SS = 4; // 4x4 supersampling for smooth edges
  const px = new Uint8Array(S * S * 4);
  for (let y = 0; y < S; y++) for (let x = 0; x < S; x++) {
    let hits = 0;
    for (let sy = 0; sy < SS; sy++) for (let sx = 0; sx < SS; sx++) {
      if (insideCherry(x + (sx + 0.5) / SS, y + (sy + 0.5) / SS, S)) hits++;
    }
    const a = hits / (SS * SS);
    const i = (y * S + x) * 4;
    px[i] = Math.round(OX[0] + (CREAM[0] - OX[0]) * a);
    px[i + 1] = Math.round(OX[1] + (CREAM[1] - OX[1]) * a);
    px[i + 2] = Math.round(OX[2] + (CREAM[2] - OX[2]) * a);
    px[i + 3] = 255;
  }
  return px;
}

// ---- minimal PNG encoder ----
const CRC_TABLE = (() => { const t = new Uint32Array(256);
  for (let n = 0; n < 256; n++) { let c = n;
    for (let k = 0; k < 8; k++) c = c & 1 ? 0xedb88320 ^ (c >>> 1) : c >>> 1;
    t[n] = c >>> 0; } return t; })();
const crc32 = (buf) => { let c = 0xffffffff;
  for (const b of buf) c = CRC_TABLE[(c ^ b) & 0xff] ^ (c >>> 8);
  return (c ^ 0xffffffff) >>> 0; };
function chunk(type, data) {
  const len = Buffer.alloc(4); len.writeUInt32BE(data.length);
  const body = Buffer.concat([Buffer.from(type, "ascii"), data]);
  const crc = Buffer.alloc(4); crc.writeUInt32BE(crc32(body));
  return Buffer.concat([len, body, crc]);
}
function encodePNG(px, S) {
  const ihdr = Buffer.alloc(13);
  ihdr.writeUInt32BE(S, 0); ihdr.writeUInt32BE(S, 4);
  ihdr[8] = 8; ihdr[9] = 6; // 8-bit RGBA
  const raw = Buffer.alloc(S * (S * 4 + 1));
  for (let y = 0; y < S; y++) {
    raw[y * (S * 4 + 1)] = 0; // no filter
    Buffer.from(px.buffer, y * S * 4, S * 4).copy(raw, y * (S * 4 + 1) + 1);
  }
  return Buffer.concat([
    Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]),
    chunk("IHDR", ihdr),
    chunk("IDAT", deflateSync(raw, { level: 9 })),
    chunk("IEND", Buffer.alloc(0)),
  ]);
}

// ---- ICO container embedding PNGs (16 + 32) ----
function encodeICO(pngs /* [{size, buf}] */) {
  const header = Buffer.alloc(6);
  header.writeUInt16LE(0, 0); header.writeUInt16LE(1, 2); // icon type
  header.writeUInt16LE(pngs.length, 4);
  const entries = [];
  let offset = 6 + 16 * pngs.length;
  for (const { size, buf } of pngs) {
    const e = Buffer.alloc(16);
    e[0] = size === 256 ? 0 : size; e[1] = size === 256 ? 0 : size;
    e.writeUInt16LE(1, 4); e.writeUInt16LE(32, 6); // planes, bpp
    e.writeUInt32LE(buf.length, 8); e.writeUInt32LE(offset, 12);
    entries.push(e); offset += buf.length;
  }
  return Buffer.concat([header, ...entries, ...pngs.map((p) => p.buf)]);
}

const pub = join(dirname(fileURLToPath(import.meta.url)), "..", "public");
mkdirSync(pub, { recursive: true });
const out = {};
for (const S of [16, 32, 180, 512]) out[S] = encodePNG(raster(S), S);
writeFileSync(join(pub, "favicon-16x16.png"), out[16]);
writeFileSync(join(pub, "favicon-32x32.png"), out[32]);
writeFileSync(join(pub, "apple-touch-icon.png"), out[180]);
writeFileSync(join(pub, "icon-512.png"), out[512]);
writeFileSync(join(pub, "favicon.ico"), encodeICO([
  { size: 16, buf: out[16] },
  { size: 32, buf: out[32] },
]));
console.log("written:", Object.entries(out).map(([s, b]) => `${s}px=${b.length}B`).join(" "));
