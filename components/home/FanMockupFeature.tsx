"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import { motion, useInView } from "framer-motion";
import InteractiveProductFan from "@/components/product/InteractiveProductFan";
import { useMotionPreference } from "@/components/system/ReducedMotionProvider";
import { motifVars } from "@/lib/collection-motifs";
import { revealUp } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * The papers, on their own terms. Spreads open as the section scrolls into
 * view, then lets you flick between collections.
 */
export default function FanMockupFeature({ products }: { products: Product[] }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: false, amount: 0.4 });
  const [activeSlug, setActiveSlug] = useState(products[0].slug);
  const { reduced } = useMotionPreference();
  const active = products.find((p) => p.slug === activeSlug) ?? products[0];

  return (
    <section
      id="fan-feature"
      ref={ref}
      aria-labelledby="fan-feature-heading"
      style={motifVars(active.motif)}
      data-trail-glyphs={active.motif.glyphs.join(",")}
      data-trail-color={active.motif.palette.primary}
      className="relative scroll-mt-16 overflow-hidden border-b-2 border-ink bg-paper-deep"
    >
      <div
        aria-hidden
        className="halftone pointer-events-none absolute inset-0 opacity-25"
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0 transition-colors duration-700"
        style={{
          background: `radial-gradient(ellipse at 50% 0%, ${active.motif.palette.primary}33, transparent 62%)`,
        }}
      />

      <div className="wrap relative py-20 text-center sm:py-24">
        <motion.div
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.5 }}
          variants={revealUp}
        >
          <p className="eyebrow text-[color:var(--c-primary)]">Inside every pack</p>
          <h2
            id="fan-feature-heading"
            className="display ink-offset mt-3 text-[clamp(2.2rem,6vw,4.5rem)] leading-none"
          >
            See what&apos;s inside.
          </h2>
          <p className="editorial mx-auto mt-4 max-w-2xl text-base leading-relaxed text-ink-soft sm:text-lg">
            Every collection brings together coordinating artwork designed to
            look just as good in your hand as it does in the pack.
          </p>
        </motion.div>

        <div className="no-clip relative mx-auto mt-6 w-full max-w-2xl">
          <InteractiveProductFan
            key={active.slug}
            booklet={active.media.booklet}
            fan={active.media.fan}
            productName={active.name}
            motif={active.motif}
            forceOpen={inView}
            showHint={false}
            intensity={1.1}
            sizes="(max-width: 768px) 92vw, 680px"
          />
        </div>

        <div className="-mt-2">
          <p className="editorial text-lg">
            <span className="font-semibold">{active.name}</span> —{" "}
            <span className="text-ink-soft">{active.artworkNotes}</span>
          </p>

          <ul
            className="mt-6 flex flex-wrap items-center justify-center gap-2"
            aria-label="Choose a collection to preview"
          >
            {products.map((product) => {
              const isActive = product.slug === active.slug;
              return (
                <li key={product.slug}>
                  <button
                    type="button"
                    onClick={() => setActiveSlug(product.slug)}
                    onPointerEnter={() =>
                      !reduced && setActiveSlug(product.slug)
                    }
                    aria-pressed={isActive}
                    className={cn(
                      "eyebrow border-2 px-3 py-2 text-[0.625rem] transition-[transform,background-color,color]",
                      isActive
                        ? "text-paper-light"
                        : "border-ink/30 text-ink-soft hover:-translate-y-0.5 hover:border-ink",
                    )}
                    style={
                      isActive
                        ? {
                            backgroundColor: product.motif.palette.primary,
                            borderColor: product.motif.palette.ink,
                          }
                        : undefined
                    }
                  >
                    {product.name}
                  </button>
                </li>
              );
            })}
          </ul>

          <Link href={`/product/${active.slug}`} className="btn btn-primary mt-8">
            Shop {active.name}
          </Link>
        </div>
      </div>
    </section>
  );
}
