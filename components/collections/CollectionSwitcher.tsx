"use client";

import Link from "next/link";
import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveProductFan from "@/components/product/InteractiveProductFan";
import PsychedelicBackdrop from "./PsychedelicBackdrop";
import SafeImage from "@/components/system/SafeImage";
import { useMotionPreference } from "@/components/system/ReducedMotionProvider";
import { motifVars } from "@/lib/collection-motifs";
import { EASE_PAPER } from "@/lib/motion";
import { formatPrice, cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Browsing the nine collections, built to feel like flipping through a crate
 * of record sleeves: one stage that re-skins itself completely — palette,
 * scene, motifs, booklet, fan — as you move down the list.
 */
export default function CollectionSwitcher({
  products,
  heading = "Nine little worlds.",
  intro = "Every collection is its own piece of artwork, printed in short runs. Run down the list — the whole place changes with it.",
  /** Use h1 where this section is the page's title. */
  level = 2,
}: {
  products: Product[];
  heading?: string;
  intro?: string;
  level?: 1 | 2;
}) {
  const Heading = level === 1 ? "h1" : "h2";
  const [activeSlug, setActiveSlug] = useState(products[0].slug);
  const { reduced } = useMotionPreference();
  const active = products.find((p) => p.slug === activeSlug) ?? products[0];

  return (
    <section
      aria-labelledby="collections-heading"
      data-ground="dark"
      data-trail-glyphs={active.motif.glyphs.join(",")}
      data-trail-color={active.motif.palette.paper}
      style={motifVars(active.motif)}
      className="relative isolate overflow-hidden border-b-2 border-ink"
    >
      {/* Scene + ambient layer, cross-faded on every change. */}
      <AnimatePresence mode="sync">
        <motion.div
          key={active.slug}
          aria-hidden
          className="absolute inset-0 -z-20"
          initial={{ opacity: 0, scale: reduced ? 1 : 1.06 }}
          animate={{ opacity: 1, scale: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: reduced ? 0.2 : 0.9, ease: EASE_PAPER }}
        >
          <SafeImage
            src={active.media.background}
            alt=""
            fill
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/62" />
          <PsychedelicBackdrop motif={active.motif} opacity={0.5} />
        </motion.div>
      </AnimatePresence>

      <div className="wrap relative py-20 sm:py-24">
        <p className="eyebrow text-[color:var(--c-paper)]">The collections</p>
        <Heading
          id="collections-heading"
          className="display mt-3 max-w-[18ch] text-[clamp(2rem,5.2vw,3.8rem)] leading-[0.95] text-paper-light"
        >
          {heading}
        </Heading>
        <p className="editorial mt-4 max-w-xl text-base leading-relaxed text-paper-light/80">
          {intro}
        </p>

        <div className="mt-12 grid gap-10 lg:grid-cols-[minmax(0,1fr)_minmax(0,1.05fr)] lg:items-center lg:gap-14">
          {/* The crate. */}
          <ul className="order-2 lg:order-1">
            {products.map((product) => {
              const isActive = product.slug === active.slug;
              return (
                <li key={product.slug}>
                  <Link
                    href={`/product/${product.slug}`}
                    onPointerEnter={() => setActiveSlug(product.slug)}
                    onFocus={() => setActiveSlug(product.slug)}
                    className={cn(
                      "group/item flex items-baseline gap-4 border-b border-paper-light/15 py-3 transition-colors",
                      isActive && "border-paper-light/40",
                    )}
                  >
                    <span
                      className={cn(
                        "eyebrow w-6 shrink-0 text-[0.625rem] transition-colors",
                        isActive ? "text-[color:var(--c-paper)]" : "text-paper-light/55",
                      )}
                    >
                      {String(products.indexOf(product) + 1).padStart(2, "0")}
                    </span>

                    <span
                      className={cn(
                        "display text-[clamp(1.4rem,3.4vw,2.3rem)] leading-none transition-[color,transform] duration-300",
                        isActive
                          ? "text-paper-light lg:translate-x-2"
                          : "text-paper-light/55 group-hover/item:text-paper-light/85",
                      )}
                    >
                      {product.name}
                    </span>

                    <span
                      aria-hidden
                      className={cn(
                        "ml-auto hidden shrink-0 items-center gap-2 text-[0.625rem] font-bold uppercase tracking-[0.18em] transition-opacity sm:flex",
                        isActive ? "opacity-100" : "opacity-0",
                      )}
                      style={{ color: active.motif.palette.paper }}
                    >
                      View Product →
                    </span>
                  </Link>
                </li>
              );
            })}
          </ul>

          {/* The stage. */}
          <div className="no-clip relative order-1 lg:order-2">
            <AnimatePresence mode="wait">
              <motion.div
                key={active.slug}
                initial={{ opacity: 0, y: reduced ? 0 : 18 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: reduced ? 0 : -14 }}
                transition={{ duration: reduced ? 0.2 : 0.5, ease: EASE_PAPER }}
                className="no-clip"
              >
                <InteractiveProductFan
                  booklet={active.media.booklet}
                  fan={active.media.fan}
                  productName={active.name}
                  motif={active.motif}
                  mobileMode="tap"
                  forceOpen
                  showHint={false}
                  intensity={1}
                  sizes="(max-width: 1024px) 90vw, 560px"
                />

                <div className="mt-4 flex flex-wrap items-center justify-between gap-4 border-t-2 border-paper-light/25 pt-4">
                  <div>
                    <p className="editorial text-lg text-paper-light">
                      {active.tagline}
                    </p>
                    <p className="mt-1 max-w-md text-sm leading-relaxed text-paper-light/70">
                      {active.shortDescription}
                    </p>
                  </div>
                  <div className="flex items-center gap-3">
                    <span className="font-sans text-lg font-bold tabular-nums text-paper-light">
                      {formatPrice(active.price.amount)}
                    </span>
                    <Link href={`/product/${active.slug}`} className="btn btn-primary">
                      View Product
                    </Link>
                  </div>
                </div>
              </motion.div>
            </AnimatePresence>
          </div>
        </div>
      </div>
    </section>
  );
}
