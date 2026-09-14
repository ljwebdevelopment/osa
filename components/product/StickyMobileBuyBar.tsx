"use client";

import { useEffect, useState } from "react";
import AddToCartButton from "./AddToCartButton";
import { formatPrice } from "@/lib/utils";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/** Keeps buying reachable on small screens once the main controls scroll away. */
export default function StickyMobileBuyBar({ product }: { product: Product }) {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const onScroll = () => setVisible(window.scrollY > 520);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <div
      className={cn(
        "fixed inset-x-0 bottom-0 z-40 border-t-2 border-ink bg-paper-light px-4 py-3 transition-transform duration-300 lg:hidden",
        visible ? "translate-y-0" : "translate-y-full",
      )}
    >
      <div className="flex items-center gap-3">
        <div className="min-w-0 flex-1">
          <p className="editorial truncate text-sm font-semibold">
            {product.name}
          </p>
          <p className="text-xs tabular-nums text-ink-soft">
            {formatPrice(product.price.amount)} · {product.papersPerPack} per pack
          </p>
        </div>
        <AddToCartButton product={product} className="shrink-0 px-6" />
      </div>
    </div>
  );
}
