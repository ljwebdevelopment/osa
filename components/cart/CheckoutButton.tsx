"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-context";

/**
 * Runs the cart through whichever checkout adapter is configured. Today that
 * is the stub, which reports that payment isn't connected — this never
 * pretends an order was placed.
 */
export default function CheckoutButton({ className }: { className?: string }) {
  const { checkout, items } = useCart();
  const [pending, setPending] = useState(false);
  const [message, setMessage] = useState<string | null>(null);

  const onClick = async () => {
    setPending(true);
    setMessage(null);
    const result = await checkout();
    setPending(false);

    if (result.ok) {
      window.location.href = result.url;
      return;
    }
    setMessage(result.message);
  };

  return (
    <div className={className}>
      <button
        type="button"
        onClick={onClick}
        disabled={pending || items.length === 0}
        className="btn btn-primary w-full"
      >
        {pending ? "Checking…" : "Checkout"}
      </button>

      <p
        role="status"
        aria-live="polite"
        className="mt-3 min-h-4 text-xs leading-relaxed text-ink-soft"
      >
        {message}
      </p>
    </div>
  );
}
