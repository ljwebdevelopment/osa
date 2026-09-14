import ProductCard from "./ProductCard";
import type { Product } from "@/lib/types";
import { cn } from "@/lib/utils";

export default function ProductGrid({
  products,
  className,
  priorityCount = 0,
}: {
  products: Product[];
  className?: string;
  /** How many cards load their booklet eagerly. */
  priorityCount?: number;
}) {
  return (
    <ul
      className={cn(
        "no-clip grid gap-8 sm:grid-cols-2 lg:grid-cols-3 lg:gap-10",
        className,
      )}
    >
      {products.map((product, i) => (
        <li key={product.slug} className="no-clip">
          <ProductCard product={product} priority={i < priorityCount} />
        </li>
      ))}
    </ul>
  );
}
