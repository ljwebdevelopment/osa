import type { CollectionMotif, MotifKey } from "./types";

/**
 * Single source of truth for every collection's look and motion language.
 * Palettes are sampled from the supplied artwork — never invented — and are
 * pushed into CSS as custom properties so nothing can drift out of sync.
 */
export const MOTIFS: Record<MotifKey, CollectionMotif> = {
  paradise: {
    key: "paradise",
    palette: {
      primary: "#e2512a",
      secondary: "#1d7a76",
      accent: "#f0a63c",
      ink: "#2a1206",
      paper: "#f8ecd4",
    },
    backdropPattern: "liquid-sunset",
    motionIntensity: "medium",
    hoverTreatment: "tilt-glow",
    glyphs: ["hibiscus", "palm", "wave", "sun"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "day-trip": {
    key: "day-trip",
    palette: {
      primary: "#e4622c",
      secondary: "#2f6fa6",
      accent: "#d8425f",
      ink: "#2b1e14",
      paper: "#f9f0da",
    },
    backdropPattern: "tie-dye-swirl",
    motionIntensity: "high",
    hoverTreatment: "kaleido-pulse",
    glyphs: ["sunface", "peace", "daisy", "mushroom"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "deep-end": {
    key: "deep-end",
    palette: {
      primary: "#1a6f82",
      secondary: "#0b2a3c",
      accent: "#e2674a",
      ink: "#04141d",
      paper: "#dbe9ed",
    },
    backdropPattern: "underwater-caustics",
    motionIntensity: "calm",
    hoverTreatment: "sink-bubble",
    glyphs: ["jellyfish", "wave", "bubble", "star"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "high-seas": {
    key: "high-seas",
    palette: {
      primary: "#1f5b80",
      secondary: "#0f2a3c",
      accent: "#b33a2b",
      ink: "#14283a",
      paper: "#f1e4c7",
    },
    backdropPattern: "engraved-waves",
    motionIntensity: "calm",
    hoverTreatment: "unfurl-map",
    glyphs: ["compass", "anchor", "wave", "star"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "lucky-break": {
    key: "lucky-break",
    palette: {
      primary: "#c42e2a",
      secondary: "#12332c",
      accent: "#d9a441",
      ink: "#0a1a15",
      paper: "#efe2c6",
    },
    backdropPattern: "casino-shimmer",
    motionIntensity: "medium",
    hoverTreatment: "card-shimmer",
    glyphs: ["spade", "dice", "star", "cherry"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "night-garden": {
    key: "night-garden",
    palette: {
      primary: "#3c6042",
      secondary: "#16210f",
      accent: "#d8cda0",
      ink: "#0c1309",
      paper: "#e6e2cd",
    },
    backdropPattern: "moonlit-fireflies",
    motionIntensity: "calm",
    hoverTreatment: "firefly-drift",
    glyphs: ["moon", "moth", "mushroom", "leaf"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "odd-garden": {
    key: "odd-garden",
    palette: {
      primary: "#d9762c",
      secondary: "#6e7f3c",
      accent: "#c7568a",
      ink: "#17110a",
      paper: "#ecdfc4",
    },
    backdropPattern: "psych-checker-bloom",
    motionIntensity: "high",
    hoverTreatment: "kaleido-pulse",
    glyphs: ["eye", "mushroom", "checker", "sunface"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "space-case": {
    key: "space-case",
    palette: {
      primary: "#e2662b",
      secondary: "#6b4b93",
      accent: "#8aa85c",
      ink: "#080712",
      paper: "#e7e0f0",
    },
    backdropPattern: "cosmic-starfield",
    motionIntensity: "medium",
    hoverTreatment: "starfield-warp",
    glyphs: ["planet", "star", "comet", "moon"],
    fanPivot: { x: "84%", y: "50%" },
  },
  "summer-of-love": {
    key: "summer-of-love",
    palette: {
      primary: "#e8912b",
      secondary: "#2b7d6b",
      accent: "#e2543f",
      ink: "#2a1c10",
      paper: "#f9f1db",
    },
    backdropPattern: "sunburst-daisies",
    motionIntensity: "medium",
    hoverTreatment: "sun-ray-sweep",
    glyphs: ["sunface", "daisy", "butterfly", "wave"],
    fanPivot: { x: "84%", y: "50%" },
  },
};

/** Inline CSS custom properties for a collection-scoped section. */
export function motifVars(motif: CollectionMotif): React.CSSProperties {
  return {
    "--c-primary": motif.palette.primary,
    "--c-secondary": motif.palette.secondary,
    "--c-accent": motif.palette.accent,
    "--c-ink": motif.palette.ink,
    "--c-paper": motif.palette.paper,
  } as React.CSSProperties;
}
