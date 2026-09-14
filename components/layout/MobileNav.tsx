"use client";

import * as Dialog from "@radix-ui/react-dialog";
import Link from "next/link";
import Logo from "./Logo";
import { NAV_LINKS } from "./Header";
import { getAllProducts } from "@/lib/products";
import { MIN_AGE } from "@/lib/constants";

export default function MobileNav({
  open,
  onOpenChange,
}: {
  open: boolean;
  onOpenChange: (open: boolean) => void;
}) {
  const products = getAllProducts();

  return (
    <Dialog.Root open={open} onOpenChange={onOpenChange}>
      <Dialog.Portal>
        <Dialog.Overlay className="fixed inset-0 z-[80] bg-ink/60 backdrop-blur-[2px]" />
        <Dialog.Content
          aria-describedby={undefined}
          className="fixed inset-y-0 right-0 z-[90] flex w-[min(22rem,88vw)] flex-col border-l-2 border-ink bg-paper-light"
        >
          <Dialog.Title className="sr-only">Menu</Dialog.Title>

          <div className="flex items-center justify-between border-b-2 border-ink px-5 py-4">
            <Logo className="h-7 w-auto" />
            <Dialog.Close
              className="flex h-11 w-11 items-center justify-center border-2 border-ink"
              aria-label="Close menu"
            >
              <span aria-hidden className="text-lg leading-none">
                ✕
              </span>
            </Dialog.Close>
          </div>

          <nav aria-label="Mobile" className="flex-1 overflow-y-auto px-5 py-6">
            <ul className="flex flex-col gap-1">
              {NAV_LINKS.map((link) => (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    className="display block py-3 text-3xl transition-colors hover:text-ember"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>

            <p className="eyebrow mt-8 border-t-2 border-ink/20 pt-6 text-ink-soft">
              Collections
            </p>
            <ul className="mt-3 grid grid-cols-2 gap-x-4 gap-y-2">
              {products.map((product) => (
                <li key={product.slug}>
                  <Link
                    href={`/product/${product.slug}`}
                    className="editorial block py-1.5 text-sm transition-colors hover:text-ember"
                    style={{ color: product.motif.palette.primary }}
                  >
                    {product.name}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <p className="border-t-2 border-ink/20 px-5 py-4 text-xs text-ink-soft">
            Must be {MIN_AGE}+ to purchase. Shipping restrictions may apply.
          </p>
        </Dialog.Content>
      </Dialog.Portal>
    </Dialog.Root>
  );
}
