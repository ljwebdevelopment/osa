"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useEffect, useState } from "react";
import Logo from "./Logo";
import MobileNav from "./MobileNav";
import { useCart } from "@/lib/cart-context";
import { cn } from "@/lib/utils";

export const NAV_LINKS = [
  { href: "/shop", label: "Shop" },
  { href: "/collections", label: "Collections" },
  { href: "/about", label: "About" },
  { href: "/faq", label: "FAQ" },
];

export default function Header() {
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const pathname = usePathname();
  const { count, openCart, hydrated } = useCart();

  // Routes whose first section is a full-bleed dark hero the header sits over.
  const overDarkHero =
    pathname === "/" || /^\/collections\/[^/]+$/.test(pathname);
  const onDark = overDarkHero && !scrolled;

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close the menu when the route changes. Adjusting state during render is
  // React's documented alternative to a route-watching effect.
  const [lastPath, setLastPath] = useState(pathname);
  if (lastPath !== pathname) {
    setLastPath(pathname);
    if (menuOpen) setMenuOpen(false);
  }

  return (
    <header
      className={cn(
        "sticky top-0 z-50 transition-[background-color,box-shadow,border-color] duration-300",
        scrolled
          ? "border-b-2 border-ink bg-paper-light/95 shadow-[0_2px_0_var(--color-ink)] backdrop-blur-[2px]"
          : "border-b-2 border-transparent bg-transparent",
        onDark && "text-paper-light",
      )}
      data-ground={onDark ? "dark" : undefined}
    >
      {onDark && (
        <div
          aria-hidden
          className="pointer-events-none absolute inset-x-0 top-0 h-28 bg-gradient-to-b from-ink/55 to-transparent"
        />
      )}
      {scrolled && (
        <div
          aria-hidden
          className="halftone pointer-events-none absolute inset-0 opacity-[0.14]"
        />
      )}

      <div className="wrap relative flex h-16 items-center justify-between gap-4">
        <Link
          href="/"
          className="flex shrink-0 items-center gap-2"
          aria-label="OSA — OKie Smoke Accessories, home"
        >
          <Logo className="h-8 w-auto md:h-9" priority invert={onDark} />
        </Link>

        <nav aria-label="Primary" className="hidden md:block">
          <ul className="flex items-center gap-7">
            {NAV_LINKS.map((link) => {
              const active =
                pathname === link.href || pathname.startsWith(`${link.href}/`);
              return (
                <li key={link.href}>
                  <Link
                    href={link.href}
                    aria-current={active ? "page" : undefined}
                    className={cn(
                      "eyebrow relative py-2 transition-colors",
                      onDark
                        ? "hover:text-gold"
                        : "hover:text-ember",
                      active && (onDark ? "text-gold" : "text-ember"),
                    )}
                  >
                    {link.label}
                    <span
                      aria-hidden
                      className={cn(
                        "absolute -bottom-0.5 left-0 h-0.5 w-full origin-left scale-x-0 bg-current transition-transform duration-300",
                        active && "scale-x-100",
                      )}
                    />
                  </Link>
                </li>
              );
            })}
          </ul>
        </nav>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={openCart}
            className={cn(
              "eyebrow flex min-h-11 items-center gap-2 border-2 px-3 py-2 transition-transform hover:-translate-y-0.5",
              onDark
                ? "border-paper-light bg-ink/40 text-paper-light backdrop-blur-[2px]"
                : "border-ink bg-paper-light",
            )}
          >
            <CartIcon />
            <span className="hidden sm:inline">Cart</span>
            <span
              className={cn(
                "grid h-5 min-w-5 place-items-center rounded-full bg-ember px-1 text-[0.625rem] text-paper-light tabular-nums",
                (!hydrated || count === 0) && "opacity-40",
              )}
            >
              {hydrated ? count : 0}
            </span>
            <span className="sr-only">
              {hydrated
                ? `Open cart, ${count} ${count === 1 ? "item" : "items"}`
                : "Open cart"}
            </span>
          </button>

          <button
            type="button"
            onClick={() => setMenuOpen(true)}
            className={cn(
              "flex min-h-11 min-w-11 items-center justify-center border-2 md:hidden",
              onDark
                ? "border-paper-light bg-ink/40 backdrop-blur-[2px]"
                : "border-ink bg-paper-light",
            )}
            aria-label="Open menu"
          >
            <span aria-hidden className="relative block h-3 w-5">
              <span className="absolute inset-x-0 top-0 h-0.5 bg-current" />
              <span className="absolute inset-x-0 top-1/2 h-0.5 -translate-y-1/2 bg-current" />
              <span className="absolute inset-x-0 bottom-0 h-0.5 bg-current" />
            </span>
          </button>
        </div>
      </div>

      <MobileNav open={menuOpen} onOpenChange={setMenuOpen} />
    </header>
  );
}

function CartIcon() {
  return (
    <svg
      aria-hidden
      viewBox="0 0 24 24"
      className="h-4 w-4"
      fill="none"
      stroke="currentColor"
      strokeWidth="2.2"
      strokeLinecap="round"
      strokeLinejoin="round"
    >
      <path d="M4 7h16l-1.3 11.2a2 2 0 0 1-2 1.8H7.3a2 2 0 0 1-2-1.8Z" />
      <path d="M9 7a3 3 0 0 1 6 0" />
    </svg>
  );
}
