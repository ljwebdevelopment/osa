"use client";

import Link from "next/link";
import { useState } from "react";
import InteractiveProductFan from "./InteractiveProductFan";
import { useCart } from "@/lib/cart-context";
import { motifVars } from "@/lib/collection-motifs";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

export default function ProductCard({
  product,
  priority = false,
}: {
  product: Product;
  priority?: boolean;
}) {
  const { addProduct, lastAdded } = useCart();
  const [hovered, setHovered] = useState(false);
  const soldOut = product.inventoryStatus === "sold-out";
  const justAdded = lastAdded === product.slug;

  return (
    <article
      style={motifVars(product.motif)}
      data-trail-glyphs={product.motif.glyphs.join(",")}
      data-trail-color={product.motif.palette.primary}
      onPointerEnter={() => setHovered(true)}
      onPointerLeave={() => setHovered(false)}
      className={cn(
        "group relative flex flex-col border-2 border-ink transition-[transform,box-shadow] duration-300",
        "shadow-[5px_5px_0_var(--color-ink)] hover:-translate-y-1 hover:shadow-[9px_9px_0_var(--color-ink)]",
      )}
    >
      {/* Artwork stage. Overflow stays visible so the fan is never cropped. */}
      <div
        className="no-clip relative px-4 pb-2 pt-5"
        style={{ backgroundColor: product.motif.palette.paper }}
      >
        <div
          aria-hidden
          className="halftone pointer-events-none absolute inset-0 opacity-[0.18] transition-opacity duration-500 group-hover:opacity-30"
        />

        <div className="relative flex items-start justify-between gap-2">
          <span
            className="eyebrow rounded-none px-0 text-[0.625rem]"
            style={{ color: product.motif.palette.primary }}
          >
            {product.tagline}
          </span>
          {product.isFeatured && (
            <span
              className="eyebrow shrink-0 border-2 px-2 py-1 text-[0.5625rem]"
              style={{
                borderColor: product.motif.palette.ink,
                color: product.motif.palette.ink,
              }}
            >
              Featured
            </span>
          )}
        </div>

        <div className="no-clip relative mt-1">
          <InteractiveProductFan
            booklet={product.media.booklet}
            fan={product.media.fan}
            productName={product.name}
            motif={product.motif}
            priority={priority}
            intensity={0.85}
            sizes="(max-width: 640px) 88vw, (max-width: 1024px) 44vw, 30vw"
          />
        </div>
      </div>

      <div className="flex flex-1 flex-col border-t-2 border-ink bg-paper-light p-5">
        <div className="flex items-baseline justify-between gap-3">
          <h3 className="display text-2xl leading-none">
            <Link
              href={`/product/${product.slug}`}
              className="after:absolute after:inset-0 after:content-['']"
            >
              {product.name}
            </Link>
          </h3>
          <p className="font-sans text-base font-bold tabular-nums">
            {formatPrice(product.price.amount)}
          </p>
        </div>

        <p className="mt-2 text-sm leading-relaxed text-ink-soft">
          {product.shortDescription}
        </p>

        <p className="eyebrow mt-3 text-[0.625rem] text-ink-soft">
          {soldOut ? "Sold out" : `In stock · ${product.papersPerPack} per pack`}
        </p>

        {/* Above the card-wide link overlay so both controls stay clickable. */}
        <div className="relative z-10 mt-4 flex items-center gap-2">
          <Link
            href={`/product/${product.slug}`}
            className="btn btn-secondary flex-1 px-3 text-[0.6875rem]"
          >
            View Product
          </Link>
          <button
            type="button"
            onClick={() => addProduct(product)}
            disabled={soldOut}
            className="btn btn-primary px-3 text-[0.6875rem]"
            aria-label={`Add ${product.name} to cart`}
          >
            {justAdded ? "Added" : "Quick add"}
          </button>
        </div>
      </div>

      {/* Colour wash that answers the hover, matched to the collection. */}
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 -z-10 transition-opacity duration-500"
        style={{
          opacity: hovered ? 0.5 : 0,
          background: `radial-gradient(ellipse at 50% 30%, ${product.motif.palette.primary}, transparent 70%)`,
          filter: "blur(26px)",
          transform: "scale(1.06)",
        }}
      />
    </article>
  );
}
