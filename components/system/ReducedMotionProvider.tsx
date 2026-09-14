"use client";

import { createContext, useContext, useMemo, useSyncExternalStore } from "react";

interface MotionPreference {
  /** True when the visitor has asked their OS for reduced motion. */
  reduced: boolean;
  /** True on touch/coarse-pointer devices, where we simplify effects. */
  coarsePointer: boolean;
  /** Convenience: run the full expressive layer. */
  full: boolean;
}

const MotionPreferenceContext = createContext<MotionPreference>({
  reduced: false,
  coarsePointer: false,
  full: true,
});

/**
 * Media queries are an external store, so they're read with
 * useSyncExternalStore — the server renders the "no preference" default and
 * the real value arrives on subscribe without an effect-driven re-render.
 */
function makeMediaQuery(query: string) {
  let mql: MediaQueryList | null = null;
  const get = () => {
    mql ??= window.matchMedia(query);
    return mql.matches;
  };
  return {
    subscribe(listener: () => void) {
      mql ??= window.matchMedia(query);
      mql.addEventListener("change", listener);
      return () => mql?.removeEventListener("change", listener);
    },
    getSnapshot: get,
    getServerSnapshot: () => false,
  };
}

const reducedMotionQuery = makeMediaQuery("(prefers-reduced-motion: reduce)");
const coarsePointerQuery = makeMediaQuery("(pointer: coarse)");

export function ReducedMotionProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const reduced = useSyncExternalStore(
    reducedMotionQuery.subscribe,
    reducedMotionQuery.getSnapshot,
    reducedMotionQuery.getServerSnapshot,
  );
  const coarsePointer = useSyncExternalStore(
    coarsePointerQuery.subscribe,
    coarsePointerQuery.getSnapshot,
    coarsePointerQuery.getServerSnapshot,
  );

  const value = useMemo(
    () => ({ reduced, coarsePointer, full: !reduced }),
    [reduced, coarsePointer],
  );

  return (
    <MotionPreferenceContext.Provider value={value}>
      {children}
    </MotionPreferenceContext.Provider>
  );
}

export function useMotionPreference() {
  return useContext(MotionPreferenceContext);
}
