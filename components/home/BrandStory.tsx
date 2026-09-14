import Link from "next/link";
import Logo from "@/components/layout/Logo";
import SafeImage from "@/components/system/SafeImage";
import { SLOGAN } from "@/lib/constants";
import type { Product } from "@/lib/types";

/**
 * Editorial brand story. Intentionally short and easy to replace — no founder
 * biography has been supplied, so nothing here invents one.
 */
export default function BrandStory({ product }: { product: Product }) {
  return (
    <section
      aria-labelledby="story-heading"
      className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper"
      data-ground="dark"
    >
      <div aria-hidden className="absolute inset-0 opacity-25">
        <SafeImage
          src={product.media.background}
          alt=""
          fill
          sizes="100vw"
          className="object-cover"
        />
      </div>
      <div
        aria-hidden
        className="halftone pointer-events-none absolute inset-0 opacity-10"
        style={{ ["--c-ink" as string]: "#ffffff" }}
      />

      <div className="wrap relative grid gap-10 py-20 sm:py-28 lg:grid-cols-[1fr_1.3fr] lg:gap-16">
        <div>
          <Logo className="h-16 w-auto opacity-90" invert decorative />
          <p className="eyebrow mt-6 text-gold">The idea</p>

          <div
            aria-hidden
            className="relative mt-10 hidden aspect-[3/2] w-full max-w-sm -rotate-3 lg:block"
          >
            <SafeImage
              src={product.media.fan}
              alt=""
              fill
              sizes="380px"
              className="object-contain drop-shadow-[0_18px_28px_rgba(0,0,0,0.5)]"
            />
          </div>
        </div>

        <div>
          <h2
            id="story-heading"
            className="display text-[clamp(1.9rem,4.8vw,3.4rem)] leading-[1] text-paper-light"
          >
            Even the smallest thing you carry can have a personality.
          </h2>

          <div className="editorial mt-6 space-y-4 text-base leading-relaxed text-paper/85 sm:text-lg">
            <p>
              Filter tips are usually the least interesting object in the room —
              blank, disposable, forgettable. That seemed like a waste of a
              perfectly good surface.
            </p>
            <p>
              So OSA prints them like something worth keeping. Each collection
              is its own world, drawn as original artwork and produced in small
              runs on thick cardstock with a clean-cut finish. Sunsets, deep
              water, night gardens, open road — pick the one that matches where
              your head is.
            </p>
            <p>
              That&apos;s the whole idea, really.{" "}
              <span className="text-paper-light">{SLOGAN}</span>
            </p>
          </div>

          <div className="mt-8 flex flex-wrap gap-3">
            <Link href="/about" className="btn btn-secondary">
              More about OSA
            </Link>
            <Link href="/shop" className="btn btn-quiet text-paper-light">
              Shop all collections
            </Link>
          </div>
        </div>
      </div>
    </section>
  );
}
