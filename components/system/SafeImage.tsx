"use client";

import Image, { type ImageProps } from "next/image";
import blurPlaceholders from "@/lib/blur-placeholders.json";

const placeholders = blurPlaceholders as Record<string, string>;

/**
 * next/image with the generated blur placeholder wired up automatically.
 *
 * Transparent product art is always composited over a real colour so a
 * shopper can never see a transparency checkerboard, whatever the browser
 * would otherwise paint behind it.
 */
export default function SafeImage({
  src,
  alt,
  ground,
  style,
  ...props
}: Omit<ImageProps, "placeholder" | "blurDataURL"> & {
  src: string;
  alt: string;
  /** Colour painted behind a transparent asset. */
  ground?: string;
}) {
  const blurDataURL = placeholders[src];

  return (
    <Image
      src={src}
      alt={alt}
      {...props}
      {...(blurDataURL ? { placeholder: "blur" as const, blurDataURL } : {})}
      style={ground ? { backgroundColor: ground, ...style } : style}
    />
  );
}
