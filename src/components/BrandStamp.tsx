import markCream from "@/assets/jc-line-cream.png";
import markInk from "@/assets/jc-line-ink.png";

// Circular brand stamp: the lettering alone forms the ring (no outline circle,
// no separator dots). Both lines share the SAME letter-spacing; the arc each
// occupies is proportional to its own length, so neither looks stretched:
//   top 210deg + bottom 115.6deg + 2 x 17.2deg gaps = 360deg.
const TRACK = 3.9;

type Ink = "cream" | "ink";
const INK_HEX: Record<Ink, string> = { cream: "#F4ECDC", ink: "#5C1220" };
const MARK_SRC: Record<Ink, string> = { cream: markCream, ink: markInk };

export const StampSVG = ({
  ink,
  size = 150,
  className = "",
}: {
  ink: Ink;
  size?: number;
  className?: string;
}) => {
  const colour = INK_HEX[ink];
  return (
    <svg
      viewBox="0 0 200 200"
      width={size}
      height={size}
      className={className}
      role="img"
      aria-label="Content that connects — created by Jess"
    >
      <defs>
        <path id={`stamp-top-${ink}`} d="M 30.45,118.63 A 72,72 0 1 1 169.55,118.63" fill="none" />
        <path id={`stamp-bot-${ink}`} d="M 27.23,145.83 A 86,86 0 0 0 172.77,145.83" fill="none" />
      </defs>
      <text
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing={TRACK}
        fill={colour}
      >
        <textPath href={`#stamp-top-${ink}`} startOffset="50%" textAnchor="middle">
          CONTENT THAT CONNECTS
        </textPath>
      </text>
      <text
        fontFamily="'Plus Jakarta Sans', system-ui, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing={TRACK}
        fill={colour}
      >
        <textPath href={`#stamp-bot-${ink}`} startOffset="50%" textAnchor="middle">
          CREATED BY JESS
        </textPath>
      </text>
      <image href={MARK_SRC[ink]} x="57" y="54" width="86" height="86" />
    </svg>
  );
};

/**
 * Seam seal: the stamp straddling the join between a cream band above and an
 * oxblood band below. Rendered twice and clipped at the midline so each half
 * carries the ink that contrasts its own background — one mark, two colours,
 * like a wax seal pressed across the divide.
 */
const BrandStamp = ({ size = 132 }: { size?: number }) => (
  <div
    className="pointer-events-none absolute left-1/2 -translate-x-1/2 -translate-y-1/2 z-20"
    style={{ top: 0, width: size, height: size }}
    aria-hidden
  >
    {/* upper half sits on cream -> oxblood ink */}
    <div className="absolute inset-0" style={{ clipPath: "inset(0 0 50% 0)" }}>
      <StampSVG ink="ink" size={size} />
    </div>
    {/* lower half sits on oxblood -> cream ink */}
    <div className="absolute inset-0" style={{ clipPath: "inset(50% 0 0 0)" }}>
      <StampSVG ink="cream" size={size} />
    </div>
  </div>
);

export default BrandStamp;
