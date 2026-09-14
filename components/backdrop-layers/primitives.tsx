import Glyph, { type GlyphName } from "@/components/system/Glyph";

/**
 * Shared building blocks for the ambient layer. Everything here is decorative,
 * animated with GPU-friendly transforms only, and tagged [data-ambient] so
 * reduced-motion can stop all of it in a single rule.
 *
 * Randomness is seeded, never Math.random — the server and client have to
 * agree on every position.
 */

export function seeded(seed: number) {
  let s = seed >>> 0 || 1;
  return () => {
    s ^= s << 13;
    s ^= s >>> 17;
    s ^= s << 5;
    return ((s >>> 0) % 10000) / 10000;
  };
}

const seedFrom = (key: string) =>
  key.split("").reduce((acc, char) => acc * 31 + char.charCodeAt(0), 7) >>> 0;

/** Slow liquid washes of colour. The base of most patterns. */
export function BlobField({
  colors,
  count = 4,
  seedKey = "blob",
  opacity = 0.55,
  blur = 60,
}: {
  colors: string[];
  count?: number;
  seedKey?: string;
  opacity?: number;
  blur?: number;
}) {
  const rand = seeded(seedFrom(seedKey));

  return (
    <div
      className="absolute inset-0"
      style={{ filter: `blur(${blur}px)`, opacity }}
    >
      {Array.from({ length: count }).map((_, i) => {
        const size = 38 + rand() * 44;
        return (
          <span
            key={i}
            data-ambient
            data-rest-opacity
            className="absolute block rounded-[50%]"
            style={
              {
                width: `${size}%`,
                height: `${size * 0.8}%`,
                left: `${rand() * 90 - 15}%`,
                top: `${rand() * 90 - 15}%`,
                background: colors[i % colors.length],
                "--drift-x": `${(rand() - 0.5) * 90}px`,
                "--drift-y": `${(rand() - 0.5) * 80}px`,
                "--drift-r": `${(rand() - 0.5) * 18}deg`,
                "--rest-opacity": 0.8,
                animation: `osa-drift ${16 + i * 5}s var(--ease-drift) ${i * -3}s infinite`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/** Rotating ray burst — the backbone of the sun-driven collections. */
export function RayBurst({
  color,
  secondary,
  rays = 24,
  duration = 120,
  reverse = false,
  opacity = 0.3,
}: {
  color: string;
  secondary?: string;
  rays?: number;
  duration?: number;
  reverse?: boolean;
  opacity?: number;
}) {
  const step = 360 / rays;
  const stops: string[] = [];
  for (let i = 0; i < rays; i++) {
    const from = i * step;
    stops.push(
      `${i % 2 === 0 ? color : (secondary ?? "transparent")} ${from}deg ${from + step / 2}deg`,
      `transparent ${from + step / 2}deg ${from + step}deg`,
    );
  }

  return (
    <div
      data-ambient
      data-rest-opacity
      className="absolute left-1/2 top-1/2 aspect-square w-[160%] -translate-x-1/2 -translate-y-1/2 rounded-full"
      style={
        {
          background: `conic-gradient(${stops.join(",")})`,
          opacity,
          "--rest-opacity": opacity,
          maskImage:
            "radial-gradient(circle at center, #000 12%, rgba(0,0,0,0.45) 48%, transparent 72%)",
          animation: `${reverse ? "osa-spin-reverse" : "osa-spin"} ${duration}s linear infinite`,
        } as React.CSSProperties
      }
    />
  );
}

/** Concentric rings that breathe outward — spirals, ripples, orbits. */
export function RingField({
  color,
  rings = 7,
  opacity = 0.24,
  duration = 22,
}: {
  color: string;
  rings?: number;
  opacity?: number;
  duration?: number;
}) {
  return (
    <div className="absolute inset-0 grid place-items-center" style={{ opacity }}>
      {Array.from({ length: rings }).map((_, i) => (
        <span
          key={i}
          data-ambient
          data-rest-opacity
          className="absolute aspect-square rounded-full border-2"
          style={
            {
              width: `${18 + i * 15}%`,
              borderColor: color,
              "--breathe-scale": 1.06 + i * 0.012,
              "--breathe-min": 0.3,
              "--breathe-max": 0.75,
              "--rest-opacity": 0.5,
              animation: `osa-breathe ${duration + i * 2}s var(--ease-drift) ${i * -1.6}s infinite`,
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}

/** Stacked wave lines with a slow lateral sway. */
export function WaveLines({
  color,
  lines = 7,
  opacity = 0.3,
  amplitude = 18,
}: {
  color: string;
  lines?: number;
  opacity?: number;
  amplitude?: number;
}) {
  return (
    <div className="absolute inset-0" style={{ opacity }}>
      {Array.from({ length: lines }).map((_, i) => (
        <svg
          key={i}
          data-ambient
          data-rest-opacity
          aria-hidden
          viewBox="0 0 400 60"
          preserveAspectRatio="none"
          className="absolute left-[-6%] w-[112%]"
          style={
            {
              top: `${(i * 100) / lines}%`,
              height: `${90 / lines}%`,
              "--rest-opacity": 0.7,
              animation: `osa-sway ${14 + i * 2.4}s var(--ease-drift) ${i * -1.8}s infinite`,
            } as React.CSSProperties
          }
        >
          <path
            d={`M0 30 Q 50 ${30 - amplitude} 100 30 T 200 30 T 300 30 T 400 30`}
            fill="none"
            stroke={color}
            strokeWidth="2.5"
          />
        </svg>
      ))}
    </div>
  );
}

/** Points of light: stars, fireflies, bubbles, sparks. */
export function ParticleField({
  color,
  count = 40,
  seedKey = "particles",
  mode = "twinkle",
  size = 4,
  opacity = 0.8,
}: {
  color: string;
  count?: number;
  seedKey?: string;
  mode?: "twinkle" | "rise";
  size?: number;
  opacity?: number;
}) {
  const rand = seeded(seedFrom(seedKey));

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => {
        const scale = 0.4 + rand() * 1.1;
        return (
          <span
            key={i}
            data-ambient
            data-rest-opacity
            className="absolute block rounded-full"
            style={
              {
                width: size * scale,
                height: size * scale,
                left: `${rand() * 100}%`,
                top: `${rand() * 100}%`,
                background: color,
                boxShadow: `0 0 ${6 * scale}px ${color}`,
                "--rise-opacity": 0.5 + rand() * 0.4,
                "--rest-opacity": 0.55,
                animation:
                  mode === "rise"
                    ? `osa-rise ${12 + rand() * 14}s linear ${rand() * -18}s infinite`
                    : `osa-twinkle ${3.5 + rand() * 5}s var(--ease-drift) ${rand() * -7}s infinite`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/** Motif glyphs drifting through the scene. */
export function GlyphDrift({
  glyphs,
  color,
  count = 7,
  seedKey = "glyphs",
  opacity = 0.3,
  size = 52,
}: {
  glyphs: GlyphName[];
  color: string;
  count?: number;
  seedKey?: string;
  opacity?: number;
  size?: number;
}) {
  const rand = seeded(seedFrom(seedKey));

  return (
    <div className="absolute inset-0" style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => {
        const scale = 0.6 + rand() * 0.9;
        return (
          <span
            key={i}
            data-ambient
            data-rest-opacity
            className="absolute block"
            style={
              {
                left: `${rand() * 92}%`,
                top: `${rand() * 88}%`,
                color,
                width: size * scale,
                height: size * scale,
                "--drift-x": `${(rand() - 0.5) * 70}px`,
                "--drift-y": `${(rand() - 0.5) * 70}px`,
                "--drift-r": `${(rand() - 0.5) * 40}deg`,
                "--rest-opacity": 0.75,
                animation: `osa-drift ${18 + rand() * 16}s var(--ease-drift) ${rand() * -14}s infinite`,
              } as React.CSSProperties
            }
          >
            <Glyph name={glyphs[i % glyphs.length]} className="h-full w-full" />
          </span>
        );
      })}
    </div>
  );
}

/**
 * A warped checkerboard ribbon.
 *
 * Deliberately two-tone, saturated, skewed and over-sized: a low-contrast
 * grey grid on a pale ground would read as a transparency checkerboard rather
 * than as artwork, which is the one thing this motif must never look like.
 */
export function CheckerRibbon({
  color,
  contrast,
  opacity = 0.3,
  top = "62%",
}: {
  color: string;
  contrast: string;
  opacity?: number;
  top?: string;
}) {
  return (
    <div
      data-ambient
      data-rest-opacity
      className="absolute left-[-12%] h-[16%] w-[124%]"
      style={
        {
          top,
          opacity,
          "--rest-opacity": opacity,
          backgroundImage: `repeating-conic-gradient(${color} 0% 25%, ${contrast} 0% 50%)`,
          backgroundSize: "72px 72px",
          transform: "rotate(-7deg) skewY(-4deg)",
          maskImage:
            "linear-gradient(to right, transparent, #000 22%, #000 78%, transparent)",
          animation: "osa-sway 19s var(--ease-drift) infinite",
        } as React.CSSProperties
      }
    />
  );
}

/** Shafts of light angling through water or a window. */
export function LightShafts({
  color,
  opacity = 0.2,
  angle = -16,
}: {
  color: string;
  opacity?: number;
  angle?: number;
}) {
  return (
    <div
      data-ambient
      data-rest-opacity
      className="absolute inset-[-20%]"
      style={
        {
          opacity,
          "--rest-opacity": opacity,
          background: `repeating-linear-gradient(${angle}deg, transparent 0 60px, ${color} 60px 92px, transparent 92px 190px)`,
          maskImage:
            "linear-gradient(to bottom, #000 0%, rgba(0,0,0,0.35) 62%, transparent 92%)",
          filter: "blur(14px)",
          animation: "osa-sway 26s var(--ease-drift) infinite",
        } as React.CSSProperties
      }
    />
  );
}

/** Marquee bulbs tracing the edge of the frame. */
export function MarqueeBulbs({
  color,
  count = 26,
  opacity = 0.65,
}: {
  color: string;
  count?: number;
  opacity?: number;
}) {
  return (
    <div className="absolute inset-6" style={{ opacity }}>
      {Array.from({ length: count }).map((_, i) => {
        const t = i / count;
        return (
          <span
            key={i}
            data-ambient
            data-rest-opacity
            className="absolute block h-2 w-2 rounded-full"
            style={
              {
                left: `${t * 100}%`,
                top: i % 2 === 0 ? "0%" : "100%",
                background: color,
                boxShadow: `0 0 10px ${color}`,
                "--rest-opacity": 0.6,
                animation: `osa-marquee-glow ${2.6 + (i % 5) * 0.5}s var(--ease-drift) ${i * -0.18}s infinite`,
              } as React.CSSProperties
            }
          />
        );
      })}
    </div>
  );
}

/** Fixed grain + halftone, matching the printed feel of the artwork. */
export function GrainOverlay({ opacity = 0.28 }: { opacity?: number }) {
  return (
    <div
      aria-hidden
      className="halftone pointer-events-none absolute inset-0"
      style={{ opacity, mixBlendMode: "multiply" }}
    />
  );
}
