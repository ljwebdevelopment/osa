import type { CartItem, CheckoutAdapter, CheckoutResult } from "./types";

/**
 * Checkout boundary.
 *
 * No payment provider is connected to this storefront yet, so the default
 * adapter reports that honestly instead of simulating a completed order.
 *
 * To connect a real provider, implement `CheckoutAdapter` and return it from
 * `getCheckoutAdapter()`. Nothing else in the app changes — `CheckoutButton`
 * only ever talks to this interface.
 *
 *   Stripe Checkout
 *     Create a route handler that calls
 *     `stripe.checkout.sessions.create({ line_items, mode: "payment", ... })`
 *     and return `{ ok: true, url: session.url }` from the adapter.
 *
 *   Shopify Storefront API
 *     Call `cartCreate` with the line items, then return
 *     `{ ok: true, url: cart.checkoutUrl }`.
 *
 * In both cases the cart's `slug` is the natural key to map onto a price ID
 * or variant ID.
 */
export const stubCheckoutAdapter: CheckoutAdapter = {
  name: "stub",
  isConfigured: false,
  async createCheckoutSession({ items }): Promise<CheckoutResult> {
    if (items.length === 0) {
      return { ok: false, code: "EMPTY_CART", message: "Your cart is empty." };
    }

    return {
      ok: false,
      code: "NOT_CONFIGURED",
      message:
        "Checkout isn't connected yet. Your cart is saved — payment processing is the last piece still to be wired up.",
    };
  },
};

export function getCheckoutAdapter(): CheckoutAdapter {
  return stubCheckoutAdapter;
}

export async function createCheckoutSession(payload: {
  items: CartItem[];
  subtotal: number;
}) {
  return getCheckoutAdapter().createCheckoutSession(payload);
}
