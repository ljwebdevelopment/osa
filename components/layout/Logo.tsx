import Image from "next/image";
import { cn } from "@/lib/utils";

/**
 * The supplied OSA mark, used as-is. Presentation-only adjustments (size,
 * opacity, and colour-matching via CSS filters) are applied by callers —
 * the artwork itself is never redrawn.
 */
export default function Logo({
  className,
  priority = false,
  /** Renders the mark in paper-light for use on dark collection grounds. */
  invert = false,
  decorative = false,
}: {
  className?: string;
  priority?: boolean;
  invert?: boolean;
  decorative?: boolean;
}) {
  return (
    <Image
      src="/brand/osa-logo.png"
      alt={decorative ? "" : "OSA — OKie Smoke Accessories"}
      aria-hidden={decorative || undefined}
      width={1625}
      height={930}
      priority={priority}
      className={cn("h-auto w-auto select-none", className)}
      style={invert ? { filter: "invert(1) brightness(1.9)" } : undefined}
    />
  );
}
