import watermark from "@/assets/jc-watermark.png";

// Tone-on-tone cherry-JC watermark for the oxblood bands: the mark scattered
// at random-looking sizes and angles in a deeper shade of the field itself,
// so it reads like a blind emboss rather than a printed pattern.
// Placements are fixed (not random at runtime) so the layout is stable across
// renders and matches what was signed off.
const MARKS: Array<{ l: number; t: number; s: number; r: number; o: number }> = [
  { l: 4, t: 6, s: 120, r: -18, o: 0.1 },
  { l: 30, t: 2, s: 90, r: 14, o: 0.08 },
  { l: 58, t: 8, s: 140, r: -8, o: 0.11 },
  { l: 82, t: 4, s: 100, r: 22, o: 0.08 },
  { l: 12, t: 30, s: 95, r: 25, o: 0.09 },
  { l: 44, t: 26, s: 130, r: -22, o: 0.1 },
  { l: 70, t: 32, s: 85, r: 6, o: 0.08 },
  { l: 90, t: 28, s: 115, r: -14, o: 0.1 },
  { l: 2, t: 58, s: 105, r: 10, o: 0.08 },
  { l: 26, t: 62, s: 145, r: -5, o: 0.11 },
  { l: 55, t: 58, s: 90, r: 18, o: 0.08 },
  { l: 80, t: 60, s: 125, r: -25, o: 0.09 },
  { l: 15, t: 84, s: 110, r: 8, o: 0.1 },
  { l: 42, t: 88, s: 88, r: -12, o: 0.08 },
  { l: 68, t: 82, s: 135, r: 15, o: 0.1 },
  { l: 92, t: 86, s: 95, r: -20, o: 0.08 },
];

/**
 * Absolutely-positioned watermark layer. The parent must be `relative` and
 * clip overflow; content above it needs a z-index (this sits at z-0).
 */
const BrandWatermark = ({ className = "" }: { className?: string }) => (
  <div aria-hidden className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}>
    {MARKS.map((m, i) => (
      <img
        key={i}
        src={watermark}
        alt=""
        // Not lazy: it is one small file reused by every mark, so it costs a
        // single cached request — and lazy loading left them blank in-viewport.
        decoding="async"
        className="absolute"
        style={{
          left: `${m.l}%`,
          top: `${m.t}%`,
          width: `${m.s}px`,
          transform: `rotate(${m.r}deg)`,
          opacity: m.o,
        }}
      />
    ))}
  </div>
);

export default BrandWatermark;
