"use client";

import Link from "next/link";
import QuantitySelector from "./QuantitySelector";
import SafeImage from "@/components/system/SafeImage";
import { useCart } from "@/lib/cart-context";
import { MOTIFS } from "@/lib/collection-motifs";
import { formatPrice } from "@/lib/utils";
import type { CartItem, MotifKey } from "@/lib/types";

export default function CartLineItem({
  item,
  onNavigate,
}: {
  item: CartItem;
  onNavigate?: () => void;
}) {
  const { setQuantity, removeItem } = useCart();
  const motif = MOTIFS[item.slug as MotifKey];

  return (
    <li className="flex gap-4 border-b-2 border-ink/15 py-5">
      <Link
        href={`/product/${item.slug}`}
        onClick={onNavigate}
        className="relative aspect-[2089/753] w-28 shrink-0 self-start border-2 border-ink/20"
        style={{ backgroundColor: motif?.palette.paper }}
        tabIndex={-1}
        aria-hidden
      >
        <SafeImage
          src={item.image}
          alt=""
          fill
          sizes="112px"
          className="object-contain p-1"
        />
      </Link>

      <div className="min-w-0 flex-1">
        <div className="flex items-start justify-between gap-3">
          <div className="min-w-0">
            <h3 className="editorial text-base font-semibold leading-tight">
              <Link
                href={`/product/${item.slug}`}
                onClick={onNavigate}
                className="link-underline"
              >
                {item.name}
              </Link>
            </h3>
            <p className="mt-0.5 text-xs text-ink-soft">Filter tips · 30 per pack</p>
          </div>
          <p className="font-sans text-sm font-bold tabular-nums">
            {formatPrice(item.price * item.quantity)}
          </p>
        </div>

        <div className="mt-3 flex items-center gap-3">
          <QuantitySelector
            value={item.quantity}
            onChange={(next) => setQuantity(item.slug, next)}
            label={item.name}
            size="sm"
          />
          <button
            type="button"
            onClick={() => removeItem(item.slug)}
            className="link-underline text-xs text-ink-soft hover:text-ember"
          >
            Remove
            <span className="sr-only"> {item.name} from cart</span>
          </button>
        </div>
      </div>
    </li>
  );
}
