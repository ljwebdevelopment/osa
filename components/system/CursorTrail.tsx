"use client";

import { useEffect, useRef, useState } from "react";
import Glyph, { type GlyphName } from "./Glyph";
import { useMotionPreference } from "./ReducedMotionProvider";

interface Mark {
  id: number;
  x: number;
  y: number;
  glyph: GlyphName;
  color: string;
  rotation: number;
  scale: number;
}

/**
 * Drops motif glyphs behind the pointer. The glyph set and colour come from
 * whichever collection section the pointer is currently over — sections
 * advertise themselves with data-trail-glyphs / data-trail-color.
 *
 * Fine pointers only, and off entirely under reduced motion.
 */
export default function CursorTrail() {
  const { reduced, coarsePointer } = useMotionPreference();
  const [marks, setMarks] = useState<Mark[]>([]);
  const last = useRef({ x: 0, y: 0, time: 0 });
  const idRef = useRef(0);

  useEffect(() => {
    if (reduced || coarsePointer) return;

    const onMove = (event: PointerEvent) => {
      if (event.pointerType !== "mouse") return;

      const now = performance.now();
      const dx = event.clientX - last.current.x;
      const dy = event.clientY - last.current.y;
      const travelled = Math.hypot(dx, dy);

      if (travelled < 90 || now - last.current.time < 90) return;
      last.current = { x: event.clientX, y: event.clientY, time: now };

      const host = (event.target as Element | null)?.closest?.(
        "[data-trail-glyphs]",
      ) as HTMLElement | null;
      if (!host) return;

      const glyphs = (host.dataset.trailGlyphs ?? "").split(",").filter(Boolean);
      if (glyphs.length === 0) return;

      const id = idRef.current++;
      const mark: Mark = {
        id,
        x: event.clientX,
        y: event.clientY,
        glyph: glyphs[id % glyphs.length] as GlyphName,
        color: host.dataset.trailColor || "currentColor",
        rotation: (id % 7) * 24 - 72,
        scale: 0.75 + ((id % 5) * 0.12),
      };

      setMarks((prev) => [...prev.slice(-11), mark]);
      setTimeout(
        () => setMarks((prev) => prev.filter((m) => m.id !== id)),
        1100,
      );
    };

    window.addEventListener("pointermove", onMove, { passive: true });
    return () => window.removeEventListener("pointermove", onMove);
  }, [reduced, coarsePointer]);

  if (reduced || coarsePointer || marks.length === 0) return null;

  return (
    <div aria-hidden className="pointer-events-none fixed inset-0 z-[55]">
      {marks.map((mark) => (
        <Glyph
          key={mark.id}
          name={mark.glyph}
          className="absolute h-7 w-7"
          style={
            {
              left: mark.x,
              top: mark.y,
              color: mark.color,
              "--trail-rot": `${mark.rotation}deg`,
              "--trail-scale": mark.scale,
              animation: "osa-trail-fade 1.1s var(--ease-paper) forwards",
            } as React.CSSProperties
          }
        />
      ))}
    </div>
  );
}
