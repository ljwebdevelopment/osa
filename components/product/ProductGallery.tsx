"use client";

import { useState } from "react";
import { AnimatePresence, motion } from "framer-motion";
import InteractiveProductFan from "./InteractiveProductFan";
import SafeImage from "@/components/system/SafeImage";
import { useMotionPreference } from "@/components/system/ReducedMotionProvider";
import { EASE_PAPER } from "@/lib/motion";
import { cn } from "@/lib/utils";
import type { Product } from "@/lib/types";

/**
 * Product gallery.
 *
 * Three views: the closed pack, the papers inside, and the collection artwork.
 * A 3D view would be a fourth — it is omitted rather than shown disabled,
 * because no model has been supplied.
 *
 * Switching from pack to papers runs the same emergence animation as the rest
 * of the site rather than swapping one image for another.
 */

type View = "booklet" | "fan" | "artwork";

const VIEWS: { id: View; label: string }[] = [
  { id: "booklet", label: "Closed pack" },
  { id: "fan", label: "Three papers" },
  { id: "artwork", label: "Artwork" },
];

export default function ProductGallery({ product }: { product: Product }) {
  const [view, setView] = useState<View>("booklet");
  const { reduced } = useMotionPreference();

  const index = VIEWS.findIndex((v) => v.id === view);
  const go = (next: number) =>
    setView(VIEWS[(next + VIEWS.length) % VIEWS.length].id);

  return (
    <div className="no-clip">
      <div
        className="no-clip relative border-2 border-ink p-4 sm:p-6"
        style={{ backgroundColor: product.motif.palette.paper }}
      >
        <div
          aria-hidden
          className="halftone pointer-events-none absolute inset-0 opacity-20"
        />

        {/* Swipe to move between views on touch devices. */}
        <motion.div
          className="no-clip relative"
          drag="x"
          dragConstraints={{ left: 0, right: 0 }}
          dragElastic={0.14}
          onDragEnd={(_, info) => {
            if (info.offset.x < -60) go(index + 1);
            if (info.offset.x > 60) go(index - 1);
          }}
        >
          {/* Pack and papers share one node so the reveal can animate. */}
          <div className={cn("no-clip", view === "artwork" && "hidden")}>
            <InteractiveProductFan
              booklet={product.media.booklet}
              fan={product.media.fan}
              productName={product.name}
              motif={product.motif}
              forceOpen={view === "fan"}
              priority
              intensity={1}
              sizes="(max-width: 1024px) 92vw, 620px"
            />
          </div>

          <AnimatePresence mode="wait">
            {view === "artwork" && (
              <motion.div
                key="artwork"
                initial={{ opacity: 0, scale: reduced ? 1 : 1.04 }}
                animate={{ opacity: 1, scale: 1 }}
                exit={{ opacity: 0 }}
                transition={{ duration: reduced ? 0.15 : 0.5, ease: EASE_PAPER }}
                className="relative aspect-[3/2] w-full overflow-hidden border-2 border-ink/20"
              >
                <SafeImage
                  src={product.media.background}
                  alt={`${product.name} collection artwork`}
                  fill
                  sizes="(max-width: 1024px) 92vw, 620px"
                  className="object-cover"
                />
              </motion.div>
            )}
          </AnimatePresence>
        </motion.div>
      </div>

      {/* View switcher. */}
      <div
        role="tablist"
        aria-label={`${product.name} views`}
        className="mt-3 flex flex-wrap gap-2"
      >
        {VIEWS.map((item) => {
          const selected = item.id === view;
          return (
            <button
              key={item.id}
              role="tab"
              type="button"
              aria-selected={selected}
              onClick={() => setView(item.id)}
              className={cn(
                "eyebrow border-2 px-3 py-2.5 text-[0.625rem] transition-colors",
                selected
                  ? "border-ink bg-ink text-paper-light"
                  : "border-ink/25 text-ink-soft hover:border-ink",
              )}
            >
              {item.label}
            </button>
          );
        })}
      </div>

      <p className="mt-2 text-xs text-ink-soft sm:hidden">
        Swipe the image to switch views.
      </p>
    </div>
  );
}
