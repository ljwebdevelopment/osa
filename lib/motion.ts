import type { Transition, Variants } from "framer-motion";

/** Slow, weighty ease-out. Used for anything that should feel like paper. */
export const EASE_PAPER = [0.16, 1, 0.3, 1] as const;
/** Softer in-out for ambient, looping motion. */
export const EASE_DRIFT = [0.45, 0, 0.55, 1] as const;

/** Booklet-to-fan runs at the slow end of the 500–800ms brief. */
export const FAN_DURATION = 0.68;

export const fanTransition: Transition = {
  duration: FAN_DURATION,
  ease: EASE_PAPER,
};

export const revealUp: Variants = {
  hidden: { opacity: 0, y: 28 },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.7, ease: EASE_PAPER },
  },
};

export const revealStagger: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: 0.08, delayChildren: 0.05 } },
};

/** Per-letter entrance used by the wavy headline treatment. */
export const letterWave: Variants = {
  hidden: { opacity: 0, y: "0.45em", rotate: -6 },
  visible: (i: number) => ({
    opacity: 1,
    y: 0,
    rotate: 0,
    transition: { duration: 0.75, ease: EASE_PAPER, delay: i * 0.035 },
  }),
};
