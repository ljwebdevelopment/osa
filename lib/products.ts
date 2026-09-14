import { MOTIFS } from "./collection-motifs";
import { PAPERS_PER_PACK, PRICE_USD } from "./constants";
import type { MotifKey, Product, Spec } from "./types";

/**
 * The catalog. One collection = one SKU, so a single entry powers both the
 * editorial collection page and the commerce product page.
 *
 * Notes for whoever maintains this file:
 *  - `isNew` is false everywhere because no release dates have been confirmed.
 *    Flip it per product once they're known; the badge is already wired up.
 *  - `inventoryStatus` is "in-stock" everywhere. Set it from real stock levels
 *    rather than using it for urgency.
 *  - `paperArt` and `model3d` are null across the board: no per-paper cutouts
 *    and no 3D model have been supplied. Both are read everywhere they'd be
 *    used, so dropping assets in and filling these fields is all it takes.
 */

const baseSpecs = (extra: Spec[]): Spec[] => [
  { label: "Papers per pack", value: `${PAPERS_PER_PACK}` },
  { label: "Stock", value: "Thick cardstock with a clean-cut finish" },
  { label: "Artwork", value: "Original OSA artwork, printed in small batches" },
  ...extra,
];

interface Draft {
  slug: MotifKey;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  artworkNotes: string;
  isFeatured: boolean;
  relatedSlugs: MotifKey[];
  extraSpecs: Spec[];
}

const drafts: Draft[] = [
  {
    slug: "paradise",
    name: "Paradise",
    tagline: "Golden hour, folded flat.",
    shortDescription:
      "Sunset oranges, deep teal surf, and hand-drawn hibiscus wrapped around every fold.",
    fullDescription:
      "Paradise takes the last twenty minutes of an island afternoon and prints it on cardstock. A hand-drawn sun sinks behind a headland, palms lean into the frame, and hibiscus blooms crowd the edges in the kind of saturated ink you only used to find on souvenir fruit crates. It is the warmest thing we make, and the one people keep in their pocket long after the papers are gone.",
    artworkNotes:
      "Three coordinating designs: a hibiscus and monstera panel, a rolling wave study, and a pair of sea turtles drifting through shallow water.",
    isFeatured: true,
    relatedSlugs: ["summer-of-love", "high-seas", "deep-end"],
    extraSpecs: [{ label: "Palette", value: "Sunset orange, surf teal, ochre" }],
  },
  {
    slug: "day-trip",
    name: "Day Trip",
    tagline: "Everything at once, in the best way.",
    shortDescription:
      "Tie-dye ribbons, twin sun faces, and dancing bears rolling across a cream sky.",
    fullDescription:
      "Day Trip is the loudest collection in the lineup and makes no apology for it. Rainbow ribbons bend across the sheet, two sun faces watch from opposite corners, and a line of bears dances along the bottom edge past daisies and speckled mushrooms. It reads like a flyer stapled to a telephone pole in 1971 — the kind of thing you'd pull down and keep.",
    artworkNotes:
      "Three coordinating designs built from the same rainbow palette: a ribbon-and-starburst panel, a daisy field, and a bear parade.",
    isFeatured: true,
    relatedSlugs: ["summer-of-love", "odd-garden", "space-case"],
    extraSpecs: [{ label: "Palette", value: "Full-spectrum tie-dye on cream" }],
  },
  {
    slug: "deep-end",
    name: "Deep End",
    tagline: "Past where the light stops.",
    shortDescription:
      "A moonlit surface, a drifting whale, and jellyfish glowing in ink-dark water.",
    fullDescription:
      "Deep End trades the sunshine for pressure and quiet. A full moon sits over a breaking swell, a whale passes through the middle distance, and a brass diving helmet throws one narrow beam across the seabed. Coral, shells, and a half-buried wreck fill the lower edge. It is the moodiest set we print, and the detail rewards a close look.",
    artworkNotes:
      "Three coordinating designs drawn in the same deep-water palette: a jellyfish drift, a kelp-and-coral study, and a moonlit swell.",
    isFeatured: false,
    relatedSlugs: ["high-seas", "night-garden", "paradise"],
    extraSpecs: [{ label: "Palette", value: "Abyss navy, deep teal, coral" }],
  },
  {
    slug: "high-seas",
    name: "High Seas",
    tagline: "Charted, mostly.",
    shortDescription:
      "Engraved swells, a tall ship under full sail, and a compass rose on aged chart paper.",
    fullDescription:
      "High Seas is drawn the way old maritime charts were engraved — tight cross-hatching, confident linework, and not a wasted stroke. A square-rigger runs toward a red sun, a lighthouse holds the far headland, and an anchor coils in rope at the edge of the sheet. The paper tone is warm and aged, so the blue ink sits on it like a century-old print.",
    artworkNotes:
      "Three coordinating designs in engraved linework: a breaking wave, a compass rose with chart fragments, and a tall ship at full sail.",
    isFeatured: false,
    relatedSlugs: ["deep-end", "paradise", "lucky-break"],
    extraSpecs: [{ label: "Palette", value: "Chart blue, aged cream, signal red" }],
  },
  {
    slug: "lucky-break",
    name: "Lucky Break",
    tagline: "The house doesn't always win.",
    shortDescription:
      "Roulette, aces, dice, and marquee bulbs glowing against deep casino green.",
    fullDescription:
      "Lucky Break is late-night neon on felt-green. A roulette wheel spins into frame, four aces fan out across the top corner, dice tumble past a stack of chips, and a strip of marquee bulbs runs off toward palms and a low skyline. Gold and red do the heavy lifting against a dark ground, which makes the whole pack read like a matchbook from a place that closed decades ago.",
    artworkNotes:
      "Three coordinating designs on the same dark ground: a card-and-dice spread, a roulette detail, and a marquee-light run.",
    isFeatured: false,
    relatedSlugs: ["space-case", "odd-garden", "high-seas"],
    extraSpecs: [{ label: "Palette", value: "Felt green, casino red, brass gold" }],
  },
  {
    slug: "night-garden",
    name: "Night Garden",
    tagline: "Everything that opens after dark.",
    shortDescription:
      "Moonflowers, a luna moth, a barn owl, and fireflies held in deep botanical green.",
    fullDescription:
      "Night Garden is the quietest set we print. A crescent moon hangs over moonflowers in bloom, a luna moth rests against the leaves, and a barn owl watches from a branch strung with web. Ferns, mushrooms, and a still lily pond fill the lower half, with fireflies scattered through as small points of warm light. The greens go almost black, so the pale blooms carry the whole design.",
    artworkNotes:
      "Three coordinating designs from the same nocturnal palette: a moonflower panel, a luna moth study, and a fern-and-firefly run.",
    isFeatured: true,
    relatedSlugs: ["odd-garden", "deep-end", "space-case"],
    extraSpecs: [{ label: "Palette", value: "Midnight green, bone, moth gold" }],
  },
  {
    slug: "odd-garden",
    name: "Odd Garden",
    tagline: "The garden is looking back.",
    shortDescription:
      "Eye-centred flowers, warped checkers, mushrooms, and a sun face that has seen things.",
    fullDescription:
      "Odd Garden is where the lineup goes surreal. Flowers open to reveal eyes, a checkerboard ribbon bends through the undergrowth, and mushrooms crowd the border while a frog and a snail hold their ground. A sun face watches from one corner and the moon runs through its phases in the other. Warm oranges and olive greens on a near-black ground keep it strange rather than sweet.",
    artworkNotes:
      "Three coordinating designs sharing the same surreal vocabulary: an eye-flower panel, a mushroom cluster, and a warped checker run.",
    isFeatured: false,
    relatedSlugs: ["night-garden", "day-trip", "space-case"],
    extraSpecs: [{ label: "Palette", value: "Burnt orange, olive, dusk pink" }],
  },
  {
    slug: "space-case",
    name: "Space Case",
    tagline: "Long way out, no hurry.",
    shortDescription:
      "A ringed planet, a spiral galaxy, a drifting astronaut, and one very unbothered saucer.",
    fullDescription:
      "Space Case is built on black with the kind of ink-on-void contrast that old paperback covers did so well. A ringed planet fills one corner, a spiral galaxy turns in the other, and a lone astronaut drifts past on a tether while a saucer runs its beam down to the surface below. Ribbons of orange, purple, and green arc across the whole thing and tie it together.",
    artworkNotes:
      "Three coordinating designs from the same cosmic palette: a ringed-planet panel, a galaxy spiral, and a lunar-horizon run.",
    isFeatured: true,
    relatedSlugs: ["odd-garden", "night-garden", "day-trip"],
    extraSpecs: [{ label: "Palette", value: "Void black, solar orange, nebula purple" }],
  },
  {
    slug: "summer-of-love",
    name: "Summer of Love",
    tagline: "Windows down, no particular plan.",
    shortDescription:
      "A flower-painted bus on an open road, monarchs, daisies, and a sun with a face.",
    fullDescription:
      "Summer of Love is the open-road set. A flower-painted bus rounds a bend toward a lake and a run of snow-capped peaks, monarchs cross a field of daisies, and a sun face throws ribboned rays across the top of the sheet. An acoustic guitar leans into the corner. Warm cream paper, saturated ink, and just enough halftone to feel printed rather than drawn.",
    artworkNotes:
      "Three coordinating designs sharing the same warm palette: a daisy-and-butterfly panel, a ribboned sunburst, and an open-road scene.",
    isFeatured: true,
    relatedSlugs: ["day-trip", "paradise", "odd-garden"],
    extraSpecs: [{ label: "Palette", value: "Sun gold, meadow green, poppy red" }],
  },
];

export const PRODUCTS: Product[] = drafts.map((draft) => ({
  slug: draft.slug,
  name: draft.name,
  tagline: draft.tagline,
  shortDescription: draft.shortDescription,
  fullDescription: draft.fullDescription,
  artworkNotes: draft.artworkNotes,
  price: { amount: PRICE_USD, currency: "USD" },
  papersPerPack: PAPERS_PER_PACK,
  media: {
    booklet: `/collections/${draft.slug}/booklet.png`,
    fan: `/collections/${draft.slug}/fan.png`,
    background: `/collections/${draft.slug}/background.png`,
    cover: `/collections/${draft.slug}/booklet.png`,
    paperArt: null,
    model3d: null,
  },
  motif: MOTIFS[draft.slug],
  inventoryStatus: "in-stock",
  isFeatured: draft.isFeatured,
  isNew: false,
  relatedSlugs: draft.relatedSlugs,
  specs: baseSpecs(draft.extraSpecs),
}));

export const getAllProducts = () => PRODUCTS;

export const getFeaturedProducts = () => PRODUCTS.filter((p) => p.isFeatured);

export const getProductBySlug = (slug: string) =>
  PRODUCTS.find((p) => p.slug === slug);

export const getRelatedProducts = (slugs: string[], limit = 3) =>
  slugs
    .map(getProductBySlug)
    .filter((p): p is Product => Boolean(p))
    .slice(0, limit);

/** The product whose artwork frames the homepage hero. */
export const getHeroProduct = () => getProductBySlug("paradise") ?? PRODUCTS[0];
