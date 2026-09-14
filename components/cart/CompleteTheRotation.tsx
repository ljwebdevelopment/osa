"use client";

import Link from "next/link";
import SafeImage from "@/components/system/SafeImage";
import { useCart } from "@/lib/cart-context";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { formatPrice } from "@/lib/utils";
import type { Product } from "@/lib/types";

/** Cross-sell drawn from what's already in the cart. Never more than three. */
export default function CompleteTheRotation({
  onNavigate,
}: {
  onNavigate?: () => void;
}) {
  const { items, addProduct } = useCart();

  const inCart = new Set(items.map((i) => i.slug));
  const suggestions: Product[] = [];

  for (const item of items) {
    const product = getProductBySlug(item.slug);
    for (const slug of product?.relatedSlugs ?? []) {
      if (inCart.has(slug) || suggestions.some((s) => s.slug === slug)) continue;
      const related = getProductBySlug(slug);
      if (related) suggestions.push(related);
      if (suggestions.length === 3) break;
    }
    if (suggestions.length === 3) break;
  }

  if (suggestions.length < 3) {
    for (const product of getAllProducts()) {
      if (suggestions.length === 3) break;
      if (inCart.has(product.slug) || suggestions.some((s) => s.slug === product.slug))
        continue;
      suggestions.push(product);
    }
  }

  if (suggestions.length === 0) return null;

  return (
    <section aria-labelledby="cross-sell" className="py-6">
      <h3 id="cross-sell" className="display text-lg">
        Complete the rotation.
      </h3>
      <ul className="mt-3 space-y-2">
        {suggestions.slice(0, 3).map((product) => (
          <li
            key={product.slug}
            className="flex items-center gap-3 border-2 border-ink/15 p-2"
            style={{ backgroundColor: product.motif.palette.paper }}
          >
            <Link
              href={`/product/${product.slug}`}
              onClick={onNavigate}
              className="relative aspect-[2089/753] w-20 shrink-0"
              tabIndex={-1}
              aria-hidden
            >
              <SafeImage
                src={product.media.booklet}
                alt=""
                fill
                sizes="80px"
                className="object-contain"
              />
            </Link>
            <div className="min-w-0 flex-1">
              <Link
                href={`/product/${product.slug}`}
                onClick={onNavigate}
                className="editorial link-underline block truncate text-sm font-semibold"
                style={{ color: product.motif.palette.ink }}
              >
                {product.name}
              </Link>
              <p className="text-xs tabular-nums" style={{ color: product.motif.palette.ink }}>
                {formatPrice(product.price.amount)}
              </p>
            </div>
            <button
              type="button"
              onClick={() => addProduct(product)}
              className="eyebrow border-2 border-ink px-3 py-2 text-[0.625rem] transition-colors hover:bg-ink hover:text-paper-light"
            >
              Add
              <span className="sr-only"> {product.name} to cart</span>
            </button>
          </li>
        ))}
      </ul>
    </section>
  );
}
