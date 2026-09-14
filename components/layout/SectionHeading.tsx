import { cn } from "@/lib/utils";

export default function SectionHeading({
  id,
  eyebrow,
  title,
  intro,
  action,
  tone = "ink",
  /** Use h1 when this heading is the page's title. */
  level = 2,
  className,
}: {
  id?: string;
  eyebrow?: string;
  title: string;
  intro?: string;
  action?: React.ReactNode;
  tone?: "ink" | "paper";
  level?: 1 | 2;
  className?: string;
}) {
  const dark = tone === "paper";
  const Heading = level === 1 ? "h1" : "h2";

  return (
    <div
      className={cn(
        "flex flex-col gap-6 sm:flex-row sm:items-end sm:justify-between",
        className,
      )}
    >
      <div className="max-w-2xl">
        {eyebrow && (
          <p className={cn("eyebrow", dark ? "text-gold" : "text-ember")}>
            {eyebrow}
          </p>
        )}
        <Heading
          id={id}
          className={cn(
            "display mt-3 text-[clamp(1.9rem,4.8vw,3.3rem)] leading-[0.98]",
            dark && "text-paper-light",
          )}
        >
          {title}
        </Heading>
        {intro && (
          <p
            className={cn(
              "editorial mt-4 text-base leading-relaxed",
              dark ? "text-paper/80" : "text-ink-soft",
            )}
          >
            {intro}
          </p>
        )}
      </div>
      {action && <div className="shrink-0">{action}</div>}
    </div>
  );
}
