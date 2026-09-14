"use client";

import CheckoutButton from "./CheckoutButton";
import { useCart } from "@/lib/cart-context";
import { SHIPPING_NOTE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";

export default function CartSummary() {
  const { subtotal, count } = useCart();

  return (
    <div>
      <div className="flex items-baseline justify-between">
        <span className="eyebrow">Subtotal</span>
        <span className="font-sans text-xl font-bold tabular-nums">
          {formatPrice(subtotal)}
        </span>
      </div>
      <p className="mt-1 text-xs text-ink-soft">
        {count} {count === 1 ? "pack" : "packs"} · {SHIPPING_NOTE} Taxes
        calculated at checkout.
      </p>
      <CheckoutButton className="mt-4" />
    </div>
  );
}
