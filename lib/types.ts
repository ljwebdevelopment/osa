export type MotifKey =
  | "paradise"
  | "day-trip"
  | "deep-end"
  | "high-seas"
  | "lucky-break"
  | "night-garden"
  | "odd-garden"
  | "space-case"
  | "summer-of-love";

export type BackdropPattern =
  | "liquid-sunset"
  | "tie-dye-swirl"
  | "underwater-caustics"
  | "engraved-waves"
  | "casino-shimmer"
  | "moonlit-fireflies"
  | "psych-checker-bloom"
  | "cosmic-starfield"
  | "sunburst-daisies";

export type HoverTreatment =
  | "tilt-glow"
  | "ripple"
  | "sink-bubble"
  | "unfurl-map"
  | "card-shimmer"
  | "firefly-drift"
  | "kaleido-pulse"
  | "starfield-warp"
  | "sun-ray-sweep";

export type MotionIntensity = "calm" | "medium" | "high";

export interface Palette {
  /** Dominant artwork colour — drives headings and glows. */
  primary: string;
  /** Supporting artwork colour — drives secondary washes. */
  secondary: string;
  /** Small-dose highlight — badges, sparkles, underlines. */
  accent: string;
  /** Darkest tone, always safe as a text colour on `paper`. */
  ink: string;
  /** Lightest tone, always safe as a background behind `ink`. */
  paper: string;
}

export interface CollectionMotif {
  key: MotifKey;
  palette: Palette;
  backdropPattern: BackdropPattern;
  motionIntensity: MotionIntensity;
  hoverTreatment: HoverTreatment;
  /** Decorative glyph set drawn by the backdrop + cursor trail. */
  glyphs: string[];
  /**
   * Origin the fan animates out from, as a percentage of the booklet frame.
   * Tuned per collection because the booklet spine sits slightly differently
   * in each mockup.
   */
  fanPivot: { x: string; y: string };
}

export interface Money {
  amount: number;
  currency: "USD";
}

export interface ProductMedia {
  booklet: string;
  fan: string;
  background: string;
  /** Cover artwork used for cards and social images. */
  cover: string;
  /** No individual per-paper artwork has been supplied yet. */
  paperArt: string[] | null;
  /** No 3D model or texture set has been supplied yet. */
  model3d: string | null;
}

export type InventoryStatus = "in-stock" | "low-stock" | "sold-out";

export interface Spec {
  label: string;
  value: string;
}

export interface Product {
  slug: string;
  name: string;
  tagline: string;
  shortDescription: string;
  fullDescription: string;
  /** What the three papers in the fan mockup depict, per collection. */
  artworkNotes: string;
  price: Money;
  papersPerPack: number;
  media: ProductMedia;
  motif: CollectionMotif;
  inventoryStatus: InventoryStatus;
  isFeatured: boolean;
  isNew: boolean;
  relatedSlugs: string[];
  specs: Spec[];
}

export interface CartItem {
  slug: string;
  name: string;
  price: number;
  image: string;
  quantity: number;
}

export interface CheckoutSuccess {
  ok: true;
  url: string;
}

export interface CheckoutError {
  ok: false;
  message: string;
  code: "NOT_CONFIGURED" | "EMPTY_CART" | "UNKNOWN";
}

export type CheckoutResult = CheckoutSuccess | CheckoutError;

export interface CheckoutAdapter {
  name: string;
  isConfigured: boolean;
  createCheckoutSession(payload: {
    items: CartItem[];
    subtotal: number;
  }): Promise<CheckoutResult>;
}
