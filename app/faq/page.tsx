import Link from "next/link";
import SectionHeading from "@/components/layout/SectionHeading";
import {
  CONTACT_EMAIL,
  MIN_AGE,
  PAPERS_PER_PACK,
  PRICE_USD,
} from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "FAQ",
  description:
    "What's in a pack, how the collections work, shipping, returns, and the age requirement.",
  path: "/faq",
});

const FAQS: { q: string; a: React.ReactNode }[] = [
  {
    q: "What comes in a pack?",
    a: (
      <>
        {PAPERS_PER_PACK} rolling filter-tip papers, in a printed cardstock
        booklet. Every pack is {formatPrice(PRICE_USD)}.
      </>
    ),
  },
  {
    q: "The photos show three designs — do I get three tips?",
    a: (
      <>
        No. The fan shows the three featured artwork designs in that collection,
        not the number of papers. Each pack holds {PAPERS_PER_PACK} papers.
      </>
    ),
  },
  {
    q: "What's the difference between the collections?",
    a: (
      <>
        The artwork, and only the artwork. Same paper, same count, same price
        across all nine — pick the one you like looking at.{" "}
        <Link href="/collections" className="link-underline">
          Browse the collections
        </Link>
        .
      </>
    ),
  },
  {
    q: "Do collections sell out?",
    a: (
      <>
        Runs are small, so a collection can go out of stock between printings.
        Anything unavailable is marked on its product page — we don&apos;t run
        countdowns or fake stock counters.
      </>
    ),
  },
  {
    q: "How old do I have to be?",
    a: (
      <>
        {MIN_AGE} or older. See the{" "}
        <Link href="/legal/product-use" className="link-underline">
          product use notice
        </Link>{" "}
        for the full position.
      </>
    ),
  },
  {
    q: "Where do you ship?",
    a: (
      <>
        Rates are calculated at checkout, and some destinations are restricted.
        The{" "}
        <Link href="/legal/shipping" className="link-underline">
          shipping page
        </Link>{" "}
        has current detail — those restrictions are still being confirmed.
      </>
    ),
  },
  {
    q: "Can I return a pack?",
    a: (
      <>
        Unopened packs, yes. Opened ones can&apos;t come back unless something
        arrived damaged or wrong — see{" "}
        <Link href="/legal/returns" className="link-underline">
          returns
        </Link>
        .
      </>
    ),
  },
  {
    q: "Is checkout live?",
    a: (
      <>
        Not yet. You can build a cart and it will be saved in your browser, but
        payment isn&apos;t connected — the checkout button says so rather than
        pretending an order went through.
      </>
    ),
  },
  {
    q: "Can I use the artwork?",
    a: (
      <>
        Enjoy it, photograph it, collect it. Reproducing it commercially
        isn&apos;t permitted — it&apos;s original work and it stays ours.
      </>
    ),
  },
  {
    q: "Something else?",
    a: (
      <>
        Write to{" "}
        <a href={`mailto:${CONTACT_EMAIL}`} className="link-underline">
          {CONTACT_EMAIL}
        </a>
        .
      </>
    ),
  },
];

export default function FaqPage() {
  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="wrap py-16 sm:py-20">
        <SectionHeading
          eyebrow="FAQ"
          title="Questions, answered."
          level={1}
          intro="If it isn't here, ask — we'd rather say we don't know yet than make something up."
        />

        <dl className="mt-12 max-w-3xl">
          {FAQS.map((faq) => (
            <div key={faq.q} className="border-t-2 border-ink py-6">
              <dt className="editorial text-xl font-semibold leading-snug">
                {faq.q}
              </dt>
              <dd className="mt-2 text-base leading-relaxed text-ink-soft">
                {faq.a}
              </dd>
            </div>
          ))}
        </dl>
      </div>
    </section>
  );
}
