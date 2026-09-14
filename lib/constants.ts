/**
 * Editable business constants. Everything here is placeholder-or-confirm
 * material — see README notes before launch.
 */

export const SITE_NAME = "OSA — OKie Smoke Accessories";
export const SITE_SHORT_NAME = "OSA";
export const SITE_URL = "https://okiesmokeaccessories.com";
export const SLOGAN = "The world at your fingertips.";

export const ANNOUNCEMENT = "Locally made. Designed to stand out.";

/** Flat catalog pricing, confirmed with the brand: $5.00 per pack. */
export const PRICE_USD = 5;
/** Confirmed with the brand: 30 papers in every pack. */
export const PAPERS_PER_PACK = 30;

/** Minimum purchase age. Placeholder pending legal review. */
export const MIN_AGE = 18;

export const CONTACT_EMAIL = "hello@okiesmokeaccessories.com";

export const SHIPPING_NOTE = "Shipping calculated at checkout.";

export const STORAGE_KEYS = {
  cart: "osa_cart_v1",
  age: "osa_age_verified_v1",
} as const;
