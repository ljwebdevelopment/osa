/**
 * Decorative motif glyphs, drawn in a flat cut-paper style to match the
 * collection artwork. Used by the ambient backdrops and the cursor trail.
 * Always decorative — every instance is aria-hidden.
 */

export type GlyphName =
  | "hibiscus"
  | "palm"
  | "wave"
  | "sun"
  | "sunface"
  | "peace"
  | "daisy"
  | "mushroom"
  | "jellyfish"
  | "bubble"
  | "star"
  | "compass"
  | "anchor"
  | "spade"
  | "dice"
  | "cherry"
  | "moon"
  | "moth"
  | "leaf"
  | "eye"
  | "checker"
  | "planet"
  | "comet"
  | "butterfly";

export default function Glyph({
  name,
  className,
  style,
}: {
  name: GlyphName;
  className?: string;
  style?: React.CSSProperties;
}) {
  return (
    <svg
      aria-hidden
      viewBox="0 0 64 64"
      className={className}
      style={style}
      fill="none"
      stroke="currentColor"
      strokeWidth="2.4"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      {PATHS[name]}
    </svg>
  );
}

const PATHS: Record<GlyphName, React.ReactNode> = {
  hibiscus: (
    <>
      <path d="M32 30c0-9-6-14-12-11s-4 12 4 14" />
      <path d="M32 30c7-6 14-4 15 2s-6 10-12 6" />
      <path d="M32 30c4 8 1 15-5 15s-9-7-5-13" />
      <circle cx="32" cy="30" r="3.4" fill="currentColor" stroke="none" />
      <path d="M32 26v-9" />
      <path d="M30 17c-1-3 4-3 3 0" fill="currentColor" />
    </>
  ),
  palm: (
    <>
      <path d="M32 56V30" />
      <path d="M32 30c-8-7-17-6-21 1 6-3 12-2 17 3" />
      <path d="M32 30c8-7 17-6 21 1-6-3-12-2-17 3" />
      <path d="M32 30c-3-9 1-17 9-19-4 5-5 11-4 16" />
      <path d="M32 30c3-9-1-17-9-19 4 5 5 11 4 16" />
    </>
  ),
  wave: (
    <>
      <path d="M4 38c7-10 14-10 21 0s14 10 21 0 10-7 14-3" />
      <path d="M4 48c7-10 14-10 21 0s14 10 21 0 10-7 14-3" />
    </>
  ),
  sun: (
    <>
      <circle cx="32" cy="32" r="11" />
      {Array.from({ length: 12 }).map((_, i) => {
        const a = (i * Math.PI) / 6;
        return (
          <line
            key={i}
            x1={32 + Math.cos(a) * 16}
            y1={32 + Math.sin(a) * 16}
            x2={32 + Math.cos(a) * 23}
            y2={32 + Math.sin(a) * 23}
          />
        );
      })}
    </>
  ),
  sunface: (
    <>
      <circle cx="32" cy="32" r="13" />
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <path
            key={i}
            d={`M${32 + Math.cos(a) * 15} ${32 + Math.sin(a) * 15}q${Math.cos(a + 0.6) * 9} ${Math.sin(a + 0.6) * 9} ${Math.cos(a) * 11} ${Math.sin(a) * 11}`}
          />
        );
      })}
      <path d="M27 29v2M37 29v2" strokeWidth="3" />
      <path d="M27 37q5 4 10 0" />
    </>
  ),
  peace: (
    <>
      <circle cx="32" cy="32" r="19" />
      <path d="M32 13v38M32 32 18 46M32 32l14 14" />
    </>
  ),
  daisy: (
    <>
      {Array.from({ length: 8 }).map((_, i) => {
        const a = (i * Math.PI) / 4;
        return (
          <ellipse
            key={i}
            cx={32 + Math.cos(a) * 13}
            cy={32 + Math.sin(a) * 13}
            rx="6.5"
            ry="4"
            transform={`rotate(${(i * 180) / 4} ${32 + Math.cos(a) * 13} ${32 + Math.sin(a) * 13})`}
          />
        );
      })}
      <circle cx="32" cy="32" r="5.5" fill="currentColor" stroke="none" />
    </>
  ),
  mushroom: (
    <>
      <path d="M12 32c0-12 9-19 20-19s20 7 20 19c0 3-4 3-8 3H20c-4 0-8 0-8-3Z" />
      <path d="M25 35c0 12-2 15-2 18h18c0-3-2-6-2-18" />
      <circle cx="24" cy="24" r="3" fill="currentColor" stroke="none" />
      <circle cx="39" cy="21" r="2.4" fill="currentColor" stroke="none" />
      <circle cx="32" cy="29" r="2" fill="currentColor" stroke="none" />
    </>
  ),
  jellyfish: (
    <>
      <path d="M15 30c0-10 8-17 17-17s17 7 17 17c0 3-34 3-34 0Z" />
      <path d="M21 31c0 8-3 12-1 19M29 31c0 9-2 13 0 20M35 31c0 9 2 13 0 20M43 31c0 8 3 12 1 19" />
    </>
  ),
  bubble: (
    <>
      <circle cx="32" cy="32" r="16" />
      <path d="M24 24a10 10 0 0 1 6-4" strokeWidth="3" />
    </>
  ),
  star: <path d="m32 8 6.6 16.4L56 26l-13 11.6L46.8 56 32 46.4 17.2 56 21 37.6 8 26l17.4-1.6Z" />,
  compass: (
    <>
      <circle cx="32" cy="32" r="21" />
      <path d="m32 12 5 15 15 5-15 5-5 15-5-15-15-5 15-5Z" />
      <circle cx="32" cy="32" r="2.6" fill="currentColor" stroke="none" />
    </>
  ),
  anchor: (
    <>
      <circle cx="32" cy="13" r="5" />
      <path d="M32 18v34" />
      <path d="M20 27h24" />
      <path d="M13 38c0 10 9 16 19 16s19-6 19-16" />
    </>
  ),
  spade: (
    <>
      <path d="M32 10c0 10-18 15-18 26 0 6 5 9 10 9 4 0 7-2 8-5 1 3 4 5 8 5 5 0 10-3 10-9 0-11-18-16-18-26Z" />
      <path d="M32 45c0 6-2 8-4 11h8c-2-3-4-5-4-11Z" />
    </>
  ),
  dice: (
    <>
      <rect x="12" y="12" width="40" height="40" rx="7" />
      <circle cx="23" cy="23" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="41" cy="23" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="32" cy="32" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="23" cy="41" r="3.2" fill="currentColor" stroke="none" />
      <circle cx="41" cy="41" r="3.2" fill="currentColor" stroke="none" />
    </>
  ),
  cherry: (
    <>
      <circle cx="21" cy="45" r="9" />
      <circle cx="43" cy="47" r="8" />
      <path d="M21 36C21 22 30 14 40 11M43 39c-2-12 0-20 -3-28" />
      <path d="M40 11c5-3 9-1 11 2-4 2-8 2-11-2Z" fill="currentColor" />
    </>
  ),
  moon: <path d="M40 8a24 24 0 1 0 14 44A26 26 0 0 1 40 8Z" />,
  moth: (
    <>
      <path d="M32 22c-4-8-18-12-24-4s2 20 10 22c-6 6-2 14 4 14 5 0 8-6 10-12" />
      <path d="M32 22c4-8 18-12 24-4s-2 20-10 22c6 6 2 14-4 14-5 0-8-6-10-12" />
      <path d="M32 22v30" strokeWidth="3" />
      <path d="M30 20c-2-4-6-5-8-4M34 20c2-4 6-5 8-4" />
    </>
  ),
  leaf: (
    <>
      <path d="M50 12C28 12 14 24 14 42c0 6 3 10 3 10s20 0 28-12c6-9 5-28 5-28Z" />
      <path d="M17 52C27 40 36 30 48 20" />
    </>
  ),
  eye: (
    <>
      <path d="M6 32c8-11 17-16 26-16s18 5 26 16c-8 11-17 16-26 16S14 43 6 32Z" />
      <circle cx="32" cy="32" r="8" />
      <circle cx="32" cy="32" r="3" fill="currentColor" stroke="none" />
    </>
  ),
  checker: (
    <>
      <rect x="8" y="8" width="16" height="16" fill="currentColor" stroke="none" />
      <rect x="40" y="8" width="16" height="16" fill="currentColor" stroke="none" />
      <rect x="24" y="24" width="16" height="16" fill="currentColor" stroke="none" />
      <rect x="8" y="40" width="16" height="16" fill="currentColor" stroke="none" />
      <rect x="40" y="40" width="16" height="16" fill="currentColor" stroke="none" />
    </>
  ),
  planet: (
    <>
      <circle cx="32" cy="30" r="14" />
      <ellipse cx="32" cy="34" rx="27" ry="8" transform="rotate(-18 32 34)" />
    </>
  ),
  comet: (
    <>
      <circle cx="44" cy="20" r="7" />
      <path d="M38 26 10 54M40 33 20 53M31 25 12 44" />
    </>
  ),
  butterfly: (
    <>
      <path d="M32 20c-3-9-14-14-20-8s-3 17 5 20c-6 4-4 13 2 14 6 1 11-6 13-14" />
      <path d="M32 20c3-9 14-14 20-8s3 17-5 20c6 4 4 13-2 14-6 1-11-6-13-14" />
      <path d="M32 20v26" strokeWidth="3" />
      <path d="M30 18c-2-5-5-7-8-7M34 18c2-5 5-7 8-7" />
    </>
  ),
};
