import Glyph, { type GlyphName } from "@/components/system/Glyph";

const POINTS: { glyph: GlyphName; title: string; body: string }[] = [
  {
    glyph: "eye",
    title: "Original artwork",
    body: "Every design is drawn for OSA and appears on nothing else. Nine collections, no stock art.",
  },
  {
    glyph: "leaf",
    title: "Thick cardstock",
    body: "Covers are printed on heavy stock with a clean-cut finish, so a pack still looks right at the bottom of a bag.",
  },
  {
    glyph: "star",
    title: "Small batch, locally made",
    body: "Printed in short runs close to home. When a run sells through, that's the run.",
  },
  {
    glyph: "compass",
    title: "Built to collect",
    body: "Coordinating designs per collection means the packs read as a set — and look good lined up on a shelf.",
  },
];

export default function WhyOSA() {
  return (
    <section
      aria-labelledby="why-heading"
      className="relative overflow-hidden border-b-2 border-ink bg-paper"
    >
      <div className="wrap py-20 sm:py-24">
        <p className="eyebrow text-ember">Why OSA</p>
        <h2
          id="why-heading"
          className="display mt-3 max-w-[20ch] text-[clamp(1.9rem,4.6vw,3.2rem)] leading-[0.98]"
        >
          Made small, on purpose.
        </h2>

        <ul className="mt-12 grid gap-x-10 gap-y-10 sm:grid-cols-2 lg:grid-cols-4">
          {POINTS.map((point) => (
            <li key={point.title} className="border-t-2 border-ink pt-5">
              <Glyph name={point.glyph} className="h-8 w-8 text-ember" />
              <h3 className="editorial mt-4 text-xl font-semibold leading-snug">
                {point.title}
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                {point.body}
              </p>
            </li>
          ))}
        </ul>
      </div>
    </section>
  );
}
