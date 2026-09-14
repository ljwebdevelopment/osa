import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import InteractiveProductFan from "@/components/product/InteractiveProductFan";
import PsychedelicBackdrop from "@/components/collections/PsychedelicBackdrop";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/layout/SectionHeading";
import SafeImage from "@/components/system/SafeImage";
import { motifVars } from "@/lib/collection-motifs";
import {
  getAllProducts,
  getProductBySlug,
  getRelatedProducts,
} from "@/lib/products";
import { pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

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
  if (!product) return pageMetadata({ title: "Not found", path: "/collections" });

  return pageMetadata({
    title: `${product.name} collection`,
    description: product.shortDescription,
    path: `/collections/${product.slug}`,
    image: product.media.background,
  });
}

export default async function CollectionPage({
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
      {/* Editorial hero — the collection as a place, not a listing. */}
      <section
        data-ground="dark"
        data-trail-glyphs={product.motif.glyphs.join(",")}
        data-trail-color={product.motif.palette.paper}
        className="relative isolate -mt-16 flex min-h-svh items-center overflow-hidden border-b-2 border-ink pt-16"
        aria-labelledby="collection-heading"
      >
        <div aria-hidden className="absolute inset-0 -z-20">
          <SafeImage
            src={product.media.background}
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-ink/55" />
        </div>
        <PsychedelicBackdrop
          motif={product.motif}
          opacity={0.45}
          className="-z-10"
        />

        <div className="wrap relative grid gap-10 py-16 lg:grid-cols-2 lg:items-center">
          <div>
            <p className="eyebrow text-[color:var(--c-accent)]">
              The {product.name} collection
            </p>
            <h1
              id="collection-heading"
              className="display chromatic mt-4 text-[clamp(2.6rem,7.5vw,5.5rem)] leading-[0.9] text-paper-light"
            >
              {product.name}
            </h1>
            <p className="editorial mt-5 max-w-xl text-lg leading-relaxed text-paper-light/85">
              {product.fullDescription}
            </p>

            <div className="mt-8 flex flex-wrap items-center gap-4">
              <Link href={`/product/${product.slug}`} className="btn btn-primary">
                Shop {product.name} — {formatPrice(product.price.amount)}
              </Link>
              <Link href="/collections" className="btn btn-quiet text-paper-light">
                All collections
              </Link>
            </div>
          </div>

          <div className="no-clip">
            <InteractiveProductFan
              booklet={product.media.booklet}
              fan={product.media.fan}
              productName={product.name}
              motif={product.motif}
              hintTone="paper"
              priority
              sizes="(max-width: 1024px) 92vw, 600px"
            />
            <p className="mt-4 text-center text-sm text-paper-light/70">
              {product.artworkNotes}
            </p>
          </div>
        </div>
      </section>

      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap no-clip py-20">
          <SectionHeading
            eyebrow="Goes with it"
            title="Complete the rotation."
            intro={`Collections that sit well beside ${product.name}.`}
          />
          <ProductGrid products={related} className="mt-12" />
        </div>
      </section>
    </div>
  );
}
