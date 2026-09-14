"use client";

import { useRef } from "react";
import { motion, useInView } from "framer-motion";
import SafeImage from "@/components/system/SafeImage";
import { useMotionPreference } from "@/components/system/ReducedMotionProvider";
import { EASE_PAPER } from "@/lib/motion";
import type { Product } from "@/lib/types";

/**
 * The dedicated "See what's inside" block on a product page.
 *
 * Shows the fan artwork whole and uncropped — the papers ease apart as the
 * section arrives rather than sliding in from nowhere.
 */
export default function FanShowcase({ product }: { product: Product }) {
  const ref = useRef<HTMLElement>(null);
  const inView = useInView(ref, { once: true, amount: 0.3 });
  const { reduced } = useMotionPreference();

  return (
    <section
      ref={ref}
      aria-labelledby="fan-showcase-heading"
      className="relative overflow-hidden border-b-2 border-ink"
      style={{ backgroundColor: product.motif.palette.paper }}
    >
      <div
        aria-hidden
        className="halftone pointer-events-none absolute inset-0 opacity-20"
        style={{ ["--c-ink" as string]: product.motif.palette.ink }}
      />
      <div
        aria-hidden
        className="pointer-events-none absolute inset-0"
        style={{
          background: `radial-gradient(ellipse at 50% 110%, ${product.motif.palette.primary}2e, transparent 60%)`,
        }}
      />

      <div className="wrap relative py-20 text-center">
        <p
          className="eyebrow"
          style={{ color: product.motif.palette.primary }}
        >
          {product.name}
        </p>
        <h2
          id="fan-showcase-heading"
          className="display mt-3 text-[clamp(2rem,5.5vw,3.8rem)] leading-none"
          style={{ color: product.motif.palette.ink }}
        >
          See what&apos;s inside.
        </h2>
        <p
          className="editorial mx-auto mt-4 max-w-2xl text-base leading-relaxed sm:text-lg"
          style={{ color: product.motif.palette.ink, opacity: 0.75 }}
        >
          {product.artworkNotes}
        </p>

        <motion.div
          className="relative mx-auto mt-10 aspect-[3/2] w-full max-w-3xl"
          initial={reduced ? false : { opacity: 0, scale: 0.94, rotate: -2 }}
          animate={
            inView || reduced
              ? { opacity: 1, scale: 1, rotate: 0 }
              : undefined
          }
          transition={{ duration: 0.9, ease: EASE_PAPER }}
        >
          <SafeImage
            src={product.media.fan}
            alt={`The three coordinating paper designs in the ${product.name} collection`}
            fill
            sizes="(max-width: 768px) 92vw, 860px"
            className="object-contain drop-shadow-[0_18px_30px_rgba(0,0,0,0.3)]"
          />
        </motion.div>

        <p
          className="mt-6 text-sm"
          style={{ color: product.motif.palette.ink, opacity: 0.7 }}
        >
          Shown: the three featured designs from this collection.{" "}
          {product.papersPerPack} papers in every pack.
        </p>
      </div>
    </section>
  );
}
