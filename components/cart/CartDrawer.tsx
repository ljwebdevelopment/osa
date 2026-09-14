"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import CartLineItem from "./CartLineItem";
import CartSummary from "./CartSummary";
import EmptyCartState from "./EmptyCartState";
import CompleteTheRotation from "./CompleteTheRotation";
import { useCart } from "@/lib/cart-context";

export default function CartDrawer() {
  const { items, isOpen, closeCart, hydrated } = useCart();

  return (
    <Dialog.Root open={isOpen} onOpenChange={(open) => !open && closeCart()}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[90] flex w-[min(30rem,94vw)] flex-col border-l-2 border-ink bg-paper"
        >
          <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
            <Dialog.Title className="display text-2xl">Your cart</Dialog.Title>
            <Dialog.Close
              className="flex h-11 w-11 items-center justify-center border-2 border-ink"
              aria-label="Close cart"
            >
              <span aria-hidden className="text-lg leading-none">
                ✕
              </span>
            </Dialog.Close>
          </div>

          <div className="flex-1 overflow-y-auto px-5">
            {!hydrated ? null : items.length === 0 ? (
              <EmptyCartState onNavigate={closeCart} />
            ) : (
              <>
                <ul>
                  {items.map((item) => (
                    <CartLineItem
                      key={item.slug}
                      item={item}
                      onNavigate={closeCart}
                    />
                  ))}
                </ul>
                <CompleteTheRotation onNavigate={closeCart} />
              </>
            )}
          </div>

          {items.length > 0 && (
            <div className="border-t-2 border-ink bg-paper-light px-5 py-5">
              <CartSummary />
              <Link
                href="/cart"
                onClick={closeCart}
                className="link-underline mt-3 block text-center text-xs text-ink-soft"
              >
                View full cart
              </Link>
            </div>
          )}
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
