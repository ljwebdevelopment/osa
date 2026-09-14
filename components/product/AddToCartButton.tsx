"use client";

import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function AddToCartButton({
  product,
  quantity = 1,
  className,
  openCartOnAdd = true,
  label,
}: {
  product: Product;
  quantity?: number;
  className?: string;
  openCartOnAdd?: boolean;
  label?: string;
}) {
  const { addProduct, openCart, lastAdded } = useCart();
  const soldOut = product.inventoryStatus === "sold-out";
  const justAdded = lastAdded === product.slug;

  return (
    <button
      type="button"
      disabled={soldOut}
      onClick={() => {
        addProduct(product, quantity);
        if (openCartOnAdd) openCart();
      }}
      className={cn("btn btn-primary", className)}
    >
      {soldOut
        ? "Sold out"
        : justAdded
          ? "Added to cart"
          : (label ?? "Add to cart")}
    </button>
  );
}
