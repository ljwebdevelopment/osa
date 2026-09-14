"use client";

import Link from "next/link";
import { useState } from "react";
import AddToCartButton from "./AddToCartButton";
import QuantitySelector from "@/components/cart/QuantitySelector";
import { MIN_AGE, SHIPPING_NOTE } from "@/lib/constants";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

const INVENTORY_COPY: Record<Product["inventoryStatus"], string> = {
  "in-stock": "In stock",
  "low-stock": "Low stock",
  "sold-out": "Sold out",
};

export default function ProductInformation({ product }: { product: Product }) {
  const [quantity, setQuantity] = useState(1);

  return (
    <div>
      <p
        className="eyebrow"
        style={{ color: product.motif.palette.primary }}
      >
        {product.tagline}
      </p>

      <h1 className="display ink-offset mt-3 text-[clamp(2.4rem,7vw,4rem)] leading-[0.92]">
        {product.name}
      </h1>

      <p className="editorial mt-4 text-lg leading-relaxed text-ink-soft">
        {product.shortDescription}
      </p>

      <div className="mt-6 flex items-baseline gap-4">
        <p className="font-sans text-3xl font-bold tabular-nums">
          {formatPrice(product.price.amount)}
        </p>
        <p className="text-sm text-ink-soft">
          {product.papersPerPack} papers per pack
        </p>
      </div>

      <p className="eyebrow mt-2 text-[0.625rem] text-ink-soft">
        {INVENTORY_COPY[product.inventoryStatus]}
      </p>

      <div className="mt-7 flex flex-wrap items-center gap-3">
        <QuantitySelector
          value={quantity}
          onChange={setQuantity}
          label={product.name}
        />
        <AddToCartButton
          product={product}
          quantity={quantity}
          className="flex-1 sm:flex-none sm:px-10"
        />
      </div>

      <p className="mt-3 text-xs text-ink-soft">
        {SHIPPING_NOTE} Must be {MIN_AGE}+ to purchase.{" "}
        <Link href="/legal/shipping" className="link-underline">
          Shipping &amp; restrictions
        </Link>
      </p>

      <div className="editorial mt-8 space-y-4 border-t-2 border-ink/15 pt-8 text-base leading-relaxed">
        <p>{product.fullDescription}</p>
        <p className="text-ink-soft">{product.artworkNotes}</p>
      </div>

      <dl className="mt-8 border-t-2 border-ink/15 pt-6">
        <h2 className="eyebrow mb-4">Specifications</h2>
        {product.specs.map((spec) => (
          <div
            key={spec.label}
            className="flex justify-between gap-6 border-b border-ink/10 py-2.5 text-sm"
          >
            <dt className="text-ink-soft">{spec.label}</dt>
            <dd className="text-right font-medium">{spec.value}</dd>
          </div>
        ))}
      </dl>

      <div className="mt-8 border-t-2 border-ink/15 pt-6">
        <h2 className="eyebrow mb-3">Shipping</h2>
        <p className="text-sm leading-relaxed text-ink-soft">
          Packed by hand and shipped in small batches. Rates are calculated at
          checkout, and some destinations are restricted — the{" "}
          <Link href="/legal/shipping" className="link-underline">
            shipping page
          </Link>{" "}
          has the current detail.
        </p>
      </div>
    </div>
  );
}
