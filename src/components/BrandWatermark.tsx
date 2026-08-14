import watermark from "@/assets/jc-line-cream.png";

// Tone-on-tone cherry-JC watermark for the oxblood bands.
//
// The ink is CREAM composited with `screen`, not a darker shade. A fixed dark
// ink loses contrast wherever the field deepens (the hero gradient runs
// #6f1727 -> #470c17), which made the marks fade out at the bottom. With
// screen the lift is ink x (1 - base): it GROWS as the field darkens, so the
// marks read evenly from the lightest corner to the darkest. Still an emboss,
// just catching the light rather than sinking into shadow.
//
// Placements are fixed (not random at runtime) so the layout is stable across
// renders and matches what was signed off.
const MARKS: Array<{ l: number; t: number; s: number; r: number; o: number }> = [
  // "Editorial" treatment (approved from the reduction test): three marks at
  // deliberately different sizes, placed asymmetrically, at low opacity —
  // background detailing rather than a repeated pattern.
  { l: 10, t: 8, s: 200, r: -12, o: 0.05 },
  { l: 56, t: 38, s: 95, r: 18, o: 0.04 },
  { l: 78, t: 74, s: 150, r: -22, o: 0.05 },
];

/**
 * Absolutely-positioned watermark layer. The parent must be `relative` and
 * clip overflow; content above it needs a z-index (this sits at z-0).
 */
const BrandWatermark = ({ className = "" }: { className?: string }) => (
  <div
    aria-hidden
    className={`pointer-events-none absolute inset-0 overflow-hidden z-0 ${className}`}
    style={{ mixBlendMode: "screen" }}
  >
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
