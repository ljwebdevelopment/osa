import Link from "next/link";
import BrandStory from "@/components/home/BrandStory";
import WhyOSA from "@/components/home/WhyOSA";
import SectionHeading from "@/components/layout/SectionHeading";
import SafeImage from "@/components/system/SafeImage";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { MIN_AGE, PAPERS_PER_PACK, SLOGAN } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "About",
  description:
    "OSA makes small-batch rolling filter tips wrapped in original artwork — printed locally in short runs on thick cardstock.",
  path: "/about",
});

export default function AboutPage() {
  const story = getProductBySlug("odd-garden") ?? getAllProducts()[0];
  const products = getAllProducts();

  return (
    <>
      <section className="relative overflow-hidden border-b-2 border-ink bg-paper">
        <div className="wrap py-16 sm:py-24">
          <p className="eyebrow text-ember">About OSA</p>
          <h1 className="display ink-offset mt-4 max-w-[16ch] text-[clamp(2.4rem,7vw,5rem)] leading-[0.92]">
            {SLOGAN}
          </h1>
          <p className="editorial mt-6 max-w-2xl text-lg leading-relaxed text-ink-soft">
            OKie Smoke Accessories makes one thing and tries to make it
            properly: rolling filter tips worth looking at. Nine collections, {" "}
            {PAPERS_PER_PACK} papers a pack, printed in short runs on thick
            cardstock with a clean-cut finish.
          </p>

          <ul className="mt-12 grid gap-3 sm:grid-cols-3">
            {products.slice(0, 3).map((product) => (
              <li
                key={product.slug}
                className="relative aspect-[4/3] overflow-hidden border-2 border-ink"
              >
                <SafeImage
                  src={product.media.background}
                  alt={`${product.name} collection artwork`}
                  fill
                  sizes="(max-width: 640px) 92vw, 30vw"
                  className="object-cover"
                />
                <span className="eyebrow absolute bottom-0 left-0 bg-ink px-3 py-2 text-[0.625rem] text-paper-light">
                  {product.name}
                </span>
              </li>
            ))}
          </ul>
        </div>
      </section>

      <BrandStory product={story} />

      <WhyOSA />

      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap py-20">
          <SectionHeading
            eyebrow="The small print"
            title="Straight answers."
            intro="A few things worth saying plainly."
          />

          <div className="mt-10 grid gap-8 sm:grid-cols-2">
            <div className="border-t-2 border-ink pt-5">
              <h3 className="editorial text-xl font-semibold">
                What OSA sells
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                Paper accessories — rolling filter tips. Nothing else is
                included with them, and they are intended for adults {MIN_AGE}{" "}
                and over.
              </p>
            </div>
            <div className="border-t-2 border-ink pt-5">
              <h3 className="editorial text-xl font-semibold">
                What we don&apos;t claim
              </h3>
              <p className="mt-2 text-sm leading-relaxed text-ink-soft">
                No health claims, no performance claims, no environmental
                claims. The artwork is the product.{" "}
                <Link href="/legal/product-use" className="link-underline">
                  Product use notice
                </Link>
                .
              </p>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
