"use client";

import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import CompleteTheRotation from "./CompleteTheRotation";
import EmptyCartState from "./EmptyCartState";
import { useCart } from "@/lib/cart-context";

export default function CartPageContents() {
  const { items, hydrated, clear } = useCart();

  if (!hydrated) {
    return (
      <p className="mt-10 text-sm text-ink-soft" role="status">
        Loading your cart…
      </p>
    );
  }

  if (items.length === 0) {
    return (
      <div className="mt-6 border-2 border-ink bg-paper-light">
        <EmptyCartState />
      </div>
    );
  }

  return (
    <div className="mt-10 grid gap-12 lg:grid-cols-[1.6fr_1fr] lg:gap-16">
      <div>
        <ul>
          {items.map((item) => (
            <CartLineItem key={item.slug} item={item} />
          ))}
        </ul>
        <button
          type="button"
          onClick={clear}
          className="link-underline mt-5 text-xs text-ink-soft hover:text-ember"
        >
          Empty cart
        </button>
      </div>

      <div className="lg:sticky lg:top-24 lg:self-start">
        <div className="border-2 border-ink bg-paper-light p-6">
          <CartSummary />
        </div>
        <div className="mt-8">
          <CompleteTheRotation />
        </div>
      </div>
    </div>
  );
}
