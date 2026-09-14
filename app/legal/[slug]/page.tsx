import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LEGAL_PAGES, getLegalPage } from "@/lib/legal";
import { pageMetadata } from "@/lib/seo";

export function generateStaticParams() {
  return LEGAL_PAGES.map((page) => ({ slug: page.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) return pageMetadata({ title: "Not found", path: "/" });

  return {
    ...pageMetadata({
      title: page.title,
      description: page.summary,
      path: `/legal/${page.slug}`,
    }),
    robots: { index: false, follow: true },
  };
}

export default async function LegalPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const page = getLegalPage(slug);
  if (!page) notFound();

  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="wrap py-16 sm:py-20">
        <div className="grid gap-12 lg:grid-cols-[14rem_minmax(0,1fr)] lg:gap-16">
          <nav aria-label="Legal pages" className="lg:sticky lg:top-24 lg:self-start">
            <p className="eyebrow text-ember">Legal</p>
            <ul className="mt-4 space-y-2 text-sm">
              {LEGAL_PAGES.map((item) => (
                <li key={item.slug}>
                  <Link
                    href={`/legal/${item.slug}`}
                    aria-current={item.slug === page.slug ? "page" : undefined}
                    className={
                      item.slug === page.slug
                        ? "font-semibold text-ember"
                        : "link-underline text-ink-soft"
                    }
                  >
                    {item.title}
                  </Link>
                </li>
              ))}
            </ul>
          </nav>

          <div className="max-w-3xl">
            <h1 className="display text-[clamp(2rem,5.5vw,3.2rem)] leading-none">
              {page.title}
            </h1>
            <p className="editorial mt-3 text-lg text-ink-soft">{page.summary}</p>

            <p
              role="note"
              className="mt-8 border-2 border-ember bg-ember/10 p-4 text-sm leading-relaxed"
            >
              <strong className="font-sans font-bold uppercase tracking-wider">
                Placeholder — pending legal review.
              </strong>{" "}
              This page is draft copy written for the build, not legal advice.
              Every value in square brackets needs to be filled in, and the
              whole page needs review by a lawyer before launch.
            </p>

            <p className="mt-4 text-xs text-ink-soft">
              Last updated: {page.updated}
            </p>

            <div className="mt-10 space-y-10">
              {page.sections.map((section) => (
                <section key={section.heading}>
                  <h2 className="editorial text-2xl font-semibold">
                    {section.heading}
                  </h2>
                  <div className="mt-3 space-y-3">
                    {section.body.map((paragraph, i) => (
                      <p key={i} className="text-base leading-relaxed text-ink-soft">
                        {paragraph}
                      </p>
                    ))}
                  </div>
                </section>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
