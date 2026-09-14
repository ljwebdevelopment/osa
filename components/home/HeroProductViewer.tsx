"use client";

import Link from "next/link";
import { useRef, useState } from "react";
import {
  motion,
  useMotionValue,
  useScroll,
  useSpring,
  useTransform,
} from "framer-motion";
import InteractiveProductFan from "@/components/product/InteractiveProductFan";
import PsychedelicBackdrop from "@/components/collections/PsychedelicBackdrop";
import SafeImage from "@/components/system/SafeImage";
import { useMotionPreference } from "@/components/system/ReducedMotionProvider";
import { motifVars } from "@/lib/collection-motifs";
import { letterWave, revealUp } from "@/lib/motion";
import { SLOGAN } from "@/lib/constants";
import type { Product } from "@/lib/types";

/**
 * The hero.
 *
 * No 3D model was supplied, so the product is presented as layered 2D art
 * with pointer-driven parallax between the backdrop, the collection scene and
 * the booklet itself.
 */
export default function HeroProductViewer({ product }: { product: Product }) {
  const { reduced, coarsePointer } = useMotionPreference();
  const sectionRef = useRef<HTMLElement>(null);
  const [revealFan, setRevealFan] = useState(false);

  const pointerX = useMotionValue(0);
  const pointerY = useMotionValue(0);
  const springX = useSpring(pointerX, { stiffness: 60, damping: 18, mass: 0.6 });
  const springY = useSpring(pointerY, { stiffness: 60, damping: 18, mass: 0.6 });

  const { scrollYProgress } = useScroll({
    target: sectionRef,
    offset: ["start start", "end start"],
  });
  const sceneOpacity = useTransform(scrollYProgress, [0, 0.9], [1, 0.15]);
  const sceneScale = useTransform(scrollYProgress, [0, 1], [1, 1.12]);

  // Each layer moves further than the one behind it, which is what sells the
  // depth. Written out rather than generated so the hooks stay unconditional.
  const backdropX = useTransform(springX, [-0.5, 0.5], [-14, 14]);
  const backdropY = useTransform(springY, [-0.5, 0.5], [-8, 8]);
  const sceneX = useTransform(springX, [-0.5, 0.5], [-28, 28]);
  const sceneY = useTransform(springY, [-0.5, 0.5], [-17, 17]);
  const productX = useTransform(springX, [-0.5, 0.5], [-46, 46]);
  const productY = useTransform(springY, [-0.5, 0.5], [-28, 28]);

  const interactive = !reduced && !coarsePointer;

  const onPointerMove = (event: React.PointerEvent<HTMLElement>) => {
    if (!interactive) return;
    const rect = event.currentTarget.getBoundingClientRect();
    pointerX.set((event.clientX - rect.left) / rect.width - 0.5);
    pointerY.set((event.clientY - rect.top) / rect.height - 0.5);
  };

  const onPointerLeave = () => {
    pointerX.set(0);
    pointerY.set(0);
  };

  const seeInside = () => {
    setRevealFan(true);
    document.getElementById("fan-feature")?.scrollIntoView({
      behavior: reduced ? "auto" : "smooth",
      block: "start",
    });
  };

  const words = SLOGAN.split(" ");

  return (
    <section
      ref={sectionRef}
      onPointerMove={onPointerMove}
      onPointerLeave={onPointerLeave}
      data-ground="dark"
      data-trail-glyphs={product.motif.glyphs.join(",")}
      data-trail-color={product.motif.palette.paper}
      style={motifVars(product.motif)}
      className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden border-b-2 border-ink pt-16"
      aria-labelledby="hero-heading"
    >
      {/* Ambient layer — furthest back, slowest parallax. */}
      <motion.div
        className="absolute inset-[-6%] -z-30"
        style={{ x: backdropX, y: backdropY, opacity: sceneOpacity }}
      >
        <PsychedelicBackdrop motif={product.motif} />
      </motion.div>

      {/* The collection's own illustrated scene, bent around the product. */}
      <motion.div
        aria-hidden
        className="absolute inset-[-8%] -z-20"
        style={{
          x: sceneX,
          y: sceneY,
          scale: sceneScale,
          opacity: 0.42,
          maskImage:
            "radial-gradient(ellipse at 50% 52%, transparent 12%, rgba(0,0,0,0.55) 38%, #000 70%)",
        }}
      >
        <SafeImage
          src={product.media.background}
          alt=""
          fill
          priority
          sizes="100vw"
          className="object-cover"
        />
      </motion.div>

      <div className="absolute inset-0 -z-10 bg-ink/35" aria-hidden />

      <div className="wrap relative z-10 py-10 text-center sm:py-12">
        <motion.p
          initial="hidden"
          animate="visible"
          variants={revealUp}
          className="eyebrow text-[color:var(--c-paper)]"
        >
          Small-batch filter tips · {product.papersPerPack} per pack
        </motion.p>

        <h1
          id="hero-heading"
          className="display chromatic mx-auto mt-5 max-w-[16ch] text-balance text-[clamp(2.3rem,6.6vw,5.1rem)] leading-[0.92] text-paper-light"
        >
          {words.map((word, i) => (
            <motion.span
              key={`${word}-${i}`}
              custom={i}
              initial={reduced ? "visible" : "hidden"}
              animate="visible"
              variants={letterWave}
              className="mr-[0.22em] inline-block"
            >
              {word}
            </motion.span>
          ))}
        </h1>

        {/* The product itself — largest parallax factor, so it reads closest. */}
        <motion.div
          className="no-clip relative mx-auto -mt-1 w-full max-w-[min(38rem,96vw)]"
          style={{ x: productX, y: productY }}
          initial={reduced ? false : { opacity: 0, scale: 0.94 }}
          animate={{ opacity: 1, scale: 1 }}
          transition={{ duration: 0.9, ease: [0.16, 1, 0.3, 1], delay: 0.15 }}
        >
          <InteractiveProductFan
            booklet={product.media.booklet}
            fan={product.media.fan}
            productName={product.name}
            motif={product.motif}
            forceOpen={revealFan}
            hintTone="paper"
            priority
            intensity={1.15}
            sizes="(max-width: 768px) 88vw, 580px"
          />
        </motion.div>

        <motion.div
          initial="hidden"
          animate="visible"
          variants={revealUp}
          transition={{ delay: 0.3 }}
          className="mx-auto -mt-6 max-w-2xl sm:-mt-10"
        >
          <p className="editorial text-balance text-base leading-relaxed text-paper-light/90 sm:text-lg">
            Small-batch filter tips wrapped in artwork made to turn every
            session into its own little world.
          </p>

          <div className="mt-6 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link href="/collections" className="btn btn-primary w-full sm:w-auto">
              Explore the Collections
            </Link>
            <button
              type="button"
              onClick={seeInside}
              className="btn btn-secondary w-full sm:w-auto"
            >
              See What&apos;s Inside
            </button>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
