import {
  BlobField,
  CheckerRibbon,
  ColorWheel,
  GlyphDrift,
  GrainOverlay,
  LightShafts,
  MarqueeBulbs,
  ParticleField,
  RayBurst,
  RingField,
  WaveLines,
} from "@/components/backdrop-layers/primitives";
import type { GlyphName } from "@/components/system/Glyph";
import type { CollectionMotif, MotionIntensity } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * One backdrop, nine motion languages.
 *
 * Each collection names a `backdropPattern` recipe; the recipe decides which
 * shared primitives are composed, in what colours and at what density. Nothing
 * here is per-collection bespoke code.
 */

const DENSITY: Record<MotionIntensity, number> = {
  calm: 0.5,
  medium: 0.75,
  high: 1,
};

export default function PsychedelicBackdrop({
  motif,
  intensity,
  className,
  /** Dim the whole ambient layer, e.g. behind dense text. */
  opacity = 1,
}: {
  motif: CollectionMotif;
  intensity?: MotionIntensity;
  className?: string;
  opacity?: number;
}) {
  const level = intensity ?? motif.motionIntensity;
  const d = DENSITY[level];
  const { primary, secondary, accent, paper } = motif.palette;
  const glyphs = motif.glyphs as GlyphName[];
  const seedKey = motif.key;

  return (
    <div
      aria-hidden
      className={cn("pointer-events-none absolute inset-0 overflow-hidden", className)}
      style={{ opacity }}
      data-pattern={motif.backdropPattern}
    >
      {renderPattern()}
      <GrainOverlay opacity={0.22} />
    </div>
  );

  function renderPattern() {
    switch (motif.backdropPattern) {
      /* Paradise — a low sun, liquid heat, and drifting blooms. */
      case "liquid-sunset":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(175deg, ${accent} 0%, ${primary} 42%, ${secondary} 100%)`,
              }}
            />
            <BlobField
              colors={[accent, primary, paper]}
              count={Math.round(4 * d)}
              seedKey={seedKey}
              opacity={0.3}
            />
            <RayBurst color={paper} rays={28} duration={200} opacity={0.18} />
            <WaveLines color={paper} lines={5} opacity={0.26} amplitude={14} />
            <GlyphDrift
              glyphs={glyphs}
              color={paper}
              count={Math.round(6 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.12}
            />
          </>
        );

      /* Day Trip — tie-dye bloom, spinning rays, shifting hue. */
      case "tie-dye-swirl":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(165deg, ${paper} 0%, ${accent} 55%, ${secondary} 100%)`,
                opacity: 0.5,
              }}
            />
            <ColorWheel
              colors={[primary, accent, secondary, paper]}
              duration={180}
              opacity={0.5}
              size="260%"
            />
            <BlobField
              colors={[paper, accent, secondary]}
              count={Math.round(5 * d)}
              seedKey={seedKey}
              opacity={0.28}
              blur={80}
            />
            <RingField color={paper} rings={Math.round(7 * d)} opacity={0.12} />
            <RayBurst color={paper} rays={36} duration={150} reverse opacity={0.12} />
            <GlyphDrift
              glyphs={glyphs}
              color={paper}
              count={Math.round(7 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.13}
            />
          </>
        );

      /* Deep End — pressure, drifting motes, light from far above. */
      case "underwater-caustics":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% -10%, ${primary} 0%, ${secondary} 55%, ${motif.palette.ink} 100%)`,
              }}
            />
            <LightShafts color={paper} opacity={0.16} angle={-14} />
            <BlobField
              colors={[primary, secondary]}
              count={Math.round(3 * d)}
              seedKey={seedKey}
              opacity={0.25}
              blur={80}
            />
            <ParticleField
              color={paper}
              count={Math.round(34 * d)}
              seedKey={`${seedKey}-motes`}
              mode="rise"
              size={5}
              opacity={0.5}
            />
            <WaveLines color={paper} lines={4} opacity={0.14} amplitude={22} />
            <GlyphDrift
              glyphs={glyphs}
              color={accent}
              count={Math.round(5 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.15}
            />
          </>
        );

      /* High Seas — engraved swell and a turning compass. */
      case "engraved-waves":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(185deg, ${paper} 0%, ${paper} 38%, ${primary} 100%)`,
              }}
            />
            <WaveLines color={primary} lines={Math.round(10 * d)} opacity={0.38} amplitude={20} />
            <RingField color={primary} rings={4} opacity={0.1} duration={30} />
            <RayBurst color={primary} rays={32} duration={260} opacity={0.1} />
            <GlyphDrift
              glyphs={glyphs}
              color={motif.palette.ink}
              count={Math.round(5 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.11}
            />
          </>
        );

      /* Lucky Break — felt, brass, and bulbs that never quite settle. */
      case "casino-shimmer":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 40%, ${secondary} 0%, ${motif.palette.ink} 82%)`,
              }}
            />
            <RayBurst color={accent} rays={40} duration={220} opacity={0.1} />
            <MarqueeBulbs color={accent} count={Math.round(26 * d)} opacity={0.5} />
            <ParticleField
              color={accent}
              count={Math.round(18 * d)}
              seedKey={`${seedKey}-sparkle`}
              size={3}
              opacity={0.45}
            />
            <GlyphDrift
              glyphs={glyphs}
              color={primary}
              count={Math.round(6 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.15}
            />
          </>
        );

      /* Night Garden — moonlight, slow botany, fireflies. */
      case "moonlit-fireflies":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 70% 12%, ${primary} 0%, ${secondary} 58%, ${motif.palette.ink} 100%)`,
              }}
            />
            <BlobField
              colors={[primary, secondary]}
              count={Math.round(3 * d)}
              seedKey={seedKey}
              opacity={0.28}
              blur={70}
            />
            <ParticleField
              color={accent}
              count={Math.round(26 * d)}
              seedKey={`${seedKey}-flies`}
              size={5}
              opacity={0.7}
            />
            <GlyphDrift
              glyphs={glyphs}
              color={accent}
              count={Math.round(6 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.13}
            />
          </>
        );

      /* Odd Garden — the checkers bend and something is watching. */
      case "psych-checker-bloom":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 55%, ${secondary} 0%, ${motif.palette.ink} 76%)`,
              }}
            />
            <RayBurst color={primary} secondary={accent} rays={22} duration={140} opacity={0.16} />
            <RingField color={accent} rings={Math.round(6 * d)} opacity={0.12} duration={18} />
            {/* Only at full strength: on a quiet, pale section a faint grid
                would read as a transparency checkerboard, not as artwork. */}
            {level !== "calm" && (
              <>
                <CheckerRibbon
                  color={primary}
                  contrast={motif.palette.ink}
                  opacity={0.34}
                  top="66%"
                />
                <CheckerRibbon
                  color={accent}
                  contrast={secondary}
                  opacity={0.26}
                  top="14%"
                />
              </>
            )}
            <GlyphDrift
              glyphs={glyphs}
              color={paper}
              count={Math.round(8 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.15}
            />
          </>
        );

      /* Space Case — depth, orbit, and a very long way down. */
      case "cosmic-starfield":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `radial-gradient(ellipse at 50% 50%, ${secondary} 0%, ${motif.palette.ink} 70%)`,
              }}
            />
            <ParticleField
              color={paper}
              count={Math.round(70 * d)}
              seedKey={`${seedKey}-stars`}
              size={3}
              opacity={0.85}
            />
            <RingField color={primary} rings={Math.round(5 * d)} opacity={0.11} duration={34} />
            <BlobField
              colors={[primary, secondary, accent]}
              count={Math.round(3 * d)}
              seedKey={seedKey}
              opacity={0.22}
              blur={90}
            />
            <RayBurst color={primary} rays={30} duration={300} reverse opacity={0.08} />
            <GlyphDrift
              glyphs={glyphs}
              color={paper}
              count={Math.round(5 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.14}
            />
          </>
        );

      /* Summer of Love — warm light, ribboned rays, a field in bloom. */
      case "sunburst-daisies":
        return (
          <>
            <div
              className="absolute inset-0"
              style={{
                background: `linear-gradient(170deg, ${paper} 0%, ${primary} 55%, ${secondary} 100%)`,
              }}
            />
            <RayBurst color={accent} secondary={primary} rays={26} duration={170} opacity={0.2} />
            <BlobField
              colors={[accent, paper, secondary]}
              count={Math.round(4 * d)}
              seedKey={seedKey}
              opacity={0.26}
            />
            <WaveLines color={paper} lines={5} opacity={0.24} amplitude={16} />
            <GlyphDrift
              glyphs={glyphs}
              color={paper}
              count={Math.round(7 * d)}
              seedKey={`${seedKey}-glyph`}
              opacity={0.14}
            />
          </>
        );
    }
  }
}
