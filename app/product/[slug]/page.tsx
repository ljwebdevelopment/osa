import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import ProductGallery from "@/components/product/ProductGallery";
import ProductInformation from "@/components/product/ProductInformation";
import ProductGrid from "@/components/product/ProductGrid";
import StickyMobileBuyBar from "@/components/product/StickyMobileBuyBar";
import FanShowcase from "@/components/product/FanShowcase";
import PsychedelicBackdrop from "@/components/collections/PsychedelicBackdrop";
import SectionHeading from "@/components/layout/SectionHeading";
import { motifVars } from "@/lib/collection-motifs";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { pageMetadata, productJsonLd } from "@/lib/seo";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) return pageMetadata({ title: "Not found", path: "/shop" });

  return pageMetadata({
    title: `${product.name} Filter Tips`,
    description: product.shortDescription,
    path: `/product/${product.slug}`,
    image: product.media.booklet,
  });
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const product = getProductBySlug(slug);
  if (!product) notFound();

  const related = getRelatedProducts(product.relatedSlugs);

  return (
    <div style={motifVars(product.motif)}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{
          __html: JSON.stringify(productJsonLd(product)),
        }}
      />

      <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
        <PsychedelicBackdrop
          motif={product.motif}
          intensity="calm"
          opacity={0.14}
        />

        <div className="wrap relative py-10 lg:py-16">
          <nav aria-label="Breadcrumb" className="mb-8">
            <ol className="eyebrow flex flex-wrap items-center gap-2 text-[0.625rem] text-ink-soft">
              <li>
                <Link href="/" className="hover:text-ember">
                  Home
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li>
                <Link href="/shop" className="hover:text-ember">
                  Shop
                </Link>
              </li>
              <li aria-hidden>/</li>
              <li aria-current="page" className="text-ink">
                {product.name}
              </li>
            </ol>
          </nav>

          <div className="no-clip grid gap-10 lg:grid-cols-2 lg:gap-16">
            <div
              className="no-clip lg:sticky lg:top-24 lg:self-start"
              data-trail-glyphs={product.motif.glyphs.join(",")}
              data-trail-color={product.motif.palette.primary}
            >
              <ProductGallery product={product} />
            </div>

            <ProductInformation product={product} />
          </div>
        </div>
      </section>

      <FanShowcase product={product} />

      {related.length > 0 && (
        <section
          aria-labelledby="related-heading"
          className="border-b-2 border-ink bg-paper"
        >
          <div className="wrap no-clip py-20">
            <SectionHeading
              id="related-heading"
              eyebrow="Goes with it"
              title="Complete the rotation."
              intro={`Three more collections that sit well beside ${product.name}.`}
            />
            <ProductGrid products={related} className="mt-12" />
          </div>
        </section>
      )}

      <StickyMobileBuyBar product={product} />
      {/* Room for the sticky bar so it never covers the footer's last line. */}
      <div aria-hidden className="h-20 lg:hidden" />
    </div>
  );
}
