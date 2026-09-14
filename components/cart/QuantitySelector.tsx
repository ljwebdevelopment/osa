"use client";

import { cn } from "@/lib/utils";

export default function QuantitySelector({
  value,
  onChange,
  label,
  min = 1,
  max = 99,
  size = "md",
}: {
  value: number;
  onChange: (next: number) => void;
  /** Describes what is being counted, for screen readers. */
  label: string;
  min?: number;
  max?: number;
  size?: "sm" | "md";
}) {
  const btn = cn(
    "flex items-center justify-center border-ink font-sans leading-none transition-colors hover:bg-ink hover:text-paper-light disabled:opacity-35 disabled:hover:bg-transparent disabled:hover:text-ink",
    size === "sm" ? "h-9 w-9 text-base" : "h-12 w-12 text-lg",
  );

  return (
    <div
      className={cn(
        "inline-flex items-stretch border-2 border-ink bg-paper-light",
        size === "sm" ? "h-9" : "h-12",
      )}
    >
      <button
        type="button"
        className={cn(btn, "border-r-2")}
        onClick={() => onChange(Math.max(min, value - 1))}
        disabled={value <= min}
        aria-label={`Decrease ${label} quantity`}
      >
        <span aria-hidden>−</span>
      </button>

      <output
        aria-live="polite"
        aria-label={`${label} quantity`}
        className={cn(
          "flex min-w-10 items-center justify-center px-2 font-sans font-bold tabular-nums",
          size === "sm" ? "text-sm" : "text-base",
        )}
      >
        {value}
      </output>

      <button
        type="button"
        className={cn(btn, "border-l-2")}
        onClick={() => onChange(Math.min(max, value + 1))}
        disabled={value >= max}
        aria-label={`Increase ${label} quantity`}
      >
        <span aria-hidden>+</span>
      </button>
    </div>
  );
}
