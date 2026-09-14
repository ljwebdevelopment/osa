import { ANNOUNCEMENT, MIN_AGE } from "@/lib/constants";

/** Edit the copy in lib/constants.ts. */
export default function AnnouncementBar() {
  const messages = [ANNOUNCEMENT, `${MIN_AGE}+ only.`, "Original artwork, small batches."];

  return (
    <div className="relative overflow-hidden border-b-2 border-ink bg-ink text-paper-light">
      <div className="flex w-max animate-[osa-scroll-x_38s_linear_infinite]" data-ambient>
        {[0, 1].map((copy) => (
          <ul key={copy} className="flex shrink-0 items-center" aria-hidden={copy === 1}>
            {messages.concat(messages).map((message, i) => (
              <li
                key={`${copy}-${i}`}
                className="eyebrow flex items-center gap-8 whitespace-nowrap px-8 py-2.5"
              >
                {message}
                <span aria-hidden className="text-gold">
                  ✳
                </span>
              </li>
            ))}
          </ul>
        ))}
      </div>
    </div>
  );
}
