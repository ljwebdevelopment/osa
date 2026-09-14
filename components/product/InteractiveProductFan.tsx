"use client";

import { motion, type Variants } from "framer-motion";
import { useCallback, useEffect, useId, useRef, useState } from "react";
import SafeImage from "@/components/system/SafeImage";
import { useMotionPreference } from "@/components/system/ReducedMotionProvider";
import { fanTransition } from "@/lib/motion";
import type { CollectionMotif } from "@/lib/types";
import { cn } from "@/lib/utils";

/**
 * The signature interaction: a closed booklet that opens into its three-paper
 * fan.
 *
 * Both images are mounted at all times and only their transforms change, so
 * interrupting the animation part-way (rapid hover in/out) re-targets from
 * wherever it currently is instead of snapping or getting stuck.
 *
 * The supplied fan artwork is a single flattened PNG in which the three papers
 * overlap where they converge, so they animate as one coordinated unit rather
 * than as three independently-moving layers — separating them would expose the
 * pixels each paper hides behind its neighbour. Per-paper cutouts would let us
 * choreograph them individually; the component already accepts `paperArt` for
 * that day.
 */

interface Props {
  booklet: string;
  fan: string;
  /** Individual paper cutouts. None supplied yet — see note above. */
  paperArt?: string[] | null;
  productName: string;
  motif: CollectionMotif;
  /** Scales how far the papers travel. */
  intensity?: number;
  /** Tap opens the fan on touch devices; the caller supplies the real link. */
  mobileMode?: "tap" | "always-open";
  /** Forced open by an ancestor, e.g. the hero's "See What's Inside" button. */
  forceOpen?: boolean;
  /** Shows a small prompt over the closed pack. */
  showHint?: boolean;
  /** Tints the hint for dark grounds. */
  hintTone?: "ink" | "paper";
  className?: string;
  priority?: boolean;
  sizes?: string;
}

export default function InteractiveProductFan({
  booklet,
  fan,
  productName,
  motif,
  intensity = 1,
  mobileMode = "tap",
  forceOpen,
  showHint = true,
  hintTone = "ink",
  className,
  priority = false,
  sizes = "(max-width: 768px) 92vw, 520px",
}: Props) {
  const { reduced, coarsePointer } = useMotionPreference();
  const [hovered, setHovered] = useState(false);
  const [pinned, setPinned] = useState(false);
  const [focused, setFocused] = useState(false);
  const preloaded = useRef(false);
  const labelId = useId();

  const open =
    forceOpen || pinned || hovered || focused || mobileMode === "always-open";

  /* The fan is never the LCP image, so it isn't given priority — but it must
     be decoded before the first reveal or the papers pop in. */
  useEffect(() => {
    if (preloaded.current) return;
    preloaded.current = true;
    const img = new window.Image();
    img.src = fan;
  }, [fan]);

  const handleEnter = useCallback(() => {
    if (!coarsePointer) setHovered(true);
  }, [coarsePointer]);

  const handleLeave = useCallback(() => setHovered(false), []);

  const toggle = useCallback(() => setPinned((p) => !p), []);

  const travel = reduced ? 0 : intensity;

  const fanVariants: Variants = {
    closed: {
      scale: reduced ? 1 : 0.22,
      rotate: reduced ? 0 : -7 * travel,
      x: reduced ? 0 : `${5 * travel}%`,
      opacity: 0,
      clipPath: `circle(14% at ${motif.fanPivot.x} ${motif.fanPivot.y})`,
    },
    open: {
      scale: 1,
      rotate: 0,
      x: "0%",
      opacity: 1,
      clipPath: `circle(110% at ${motif.fanPivot.x} ${motif.fanPivot.y})`,
    },
  };

  const bookletVariants: Variants = {
    closed: { y: 0, rotate: 0, scale: 1 },
    open: {
      y: reduced ? 0 : -10 * travel,
      rotate: reduced ? 0 : -1.6 * travel,
      scale: reduced ? 1 : 1.02,
    },
  };

  const shadowVariants: Variants = {
    closed: { opacity: 0.18, scaleX: 0.72, scaleY: 0.9 },
    open: { opacity: 0.34, scaleX: 1, scaleY: 1 },
  };

  const state = open ? "open" : "closed";
  const transition = reduced ? { duration: 0.18 } : fanTransition;

  return (
    <div
      className={cn("no-clip relative w-full", className)}
      onPointerEnter={handleEnter}
      onPointerLeave={handleLeave}
    >
      {/* 3:2 frame sized to the fan artwork so the spread is never cropped. */}
      <div className="no-clip relative aspect-[3/2] w-full">
        {/* Papers. Sits behind the booklet so they read as sliding out of it. */}
        <motion.div
          aria-hidden
          className="absolute inset-x-0 top-0 h-[78%]"
          style={{ transformOrigin: `${motif.fanPivot.x} ${motif.fanPivot.y}` }}
          variants={fanVariants}
          initial={false}
          animate={state}
          transition={transition}
        >
          <SafeImage
            src={fan}
            alt=""
            fill
            sizes={sizes}
            className="object-contain drop-shadow-[0_10px_18px_rgba(0,0,0,0.28)]"
          />
        </motion.div>

        {/* Contact shadow between the papers and the surface they lift off. */}
        <motion.div
          aria-hidden
          className="absolute bottom-[10%] left-[14%] right-[14%] h-[9%] rounded-[50%]"
          style={{
            background:
              "radial-gradient(ellipse at center, rgba(0,0,0,0.55), rgba(0,0,0,0) 70%)",
            filter: "blur(10px)",
          }}
          variants={shadowVariants}
          initial={false}
          animate={state}
          transition={transition}
        />

        {/* The pack itself. */}
        <motion.div
          className="absolute inset-x-[4%] bottom-[6%]"
          variants={bookletVariants}
          initial={false}
          animate={state}
          transition={transition}
        >
          <div className="relative aspect-[2089/753] w-full">
            <SafeImage
              src={booklet}
              alt={`${productName} filter tips, closed booklet`}
              fill
              sizes={sizes}
              priority={priority}
              className="object-contain drop-shadow-[0_14px_22px_rgba(0,0,0,0.32)]"
            />
          </div>
        </motion.div>

        {/* Tells people the pack opens, instead of leaving the space above it
            looking empty. Wording follows the input device. */}
        {showHint && (
          <motion.p
            aria-hidden
            initial={false}
            animate={{ opacity: open ? 0 : 1 }}
            transition={{ duration: reduced ? 0.12 : 0.32 }}
            className="pointer-events-none absolute inset-x-0 top-[6%] z-[5] text-center"
          >
            <span
              className={cn(
                "eyebrow inline-flex items-center gap-1.5 border-2 px-3 py-1.5 text-[0.5625rem] backdrop-blur-[1px]",
                hintTone === "paper"
                  ? "border-paper-light/50 bg-ink/30 text-paper-light"
                  : "border-ink/25 bg-paper-light/60 text-ink-soft",
              )}
            >
              {coarsePointer ? "Tap" : "Hover"} to see what&apos;s inside
            </span>
          </motion.p>
        )}

        {/* Interaction surface. A real button so it is keyboard-reachable and
            announced; pointer hover is handled by the wrapper above. */}
        <button
          type="button"
          onClick={toggle}
          onFocus={() => setFocused(true)}
          onBlur={() => setFocused(false)}
          aria-pressed={pinned}
          aria-describedby={labelId}
          className="absolute inset-0 z-10 cursor-pointer rounded-sm"
        >
          <span className="sr-only">
            {open
              ? `Hide the three ${productName} paper designs`
              : `See the three ${productName} paper designs`}
          </span>
        </button>
      </div>

      <p id={labelId} className="sr-only">
        Opening this preview shows the three coordinating paper designs in the{" "}
        {productName} collection.
      </p>
    </div>
  );
}
