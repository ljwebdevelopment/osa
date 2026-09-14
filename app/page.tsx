import Link from "next/link";
import HeroProductViewer from "@/components/home/HeroProductViewer";
import CollectionSwitcher from "@/components/collections/CollectionSwitcher";
import FanMockupFeature from "@/components/home/FanMockupFeature";
import WhyOSA from "@/components/home/WhyOSA";
import BrandStory from "@/components/home/BrandStory";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/layout/SectionHeading";
import {
  getAllProducts,
  getFeaturedProducts,
  getHeroProduct,
  getProductBySlug,
} from "@/lib/products";

export default function HomePage() {
  const hero = getHeroProduct();
  const all = getAllProducts();
  const story = getProductBySlug("night-garden") ?? hero;

  // The hero already gives Paradise a full screen, so the sections below it
  // lead with something else and keep Paradise for the end of the list.
  const previewOrder = [
    ...all.filter((p) => p.slug !== hero.slug),
    ...all.filter((p) => p.slug === hero.slug),
  ];
  const featured = getFeaturedProducts().filter((p) => p.slug !== hero.slug);

  return (
    <>
      <HeroProductViewer product={hero} />

      <CollectionSwitcher products={previewOrder} />

      <FanMockupFeature products={featured} />

      <section
        aria-labelledby="featured-heading"
        className="border-b-2 border-ink bg-paper"
      >
        <div className="wrap no-clip py-20 sm:py-24">
          <SectionHeading
            id="featured-heading"
            eyebrow="Featured"
            title="Start with these."
            intro="A few packs that show the range — hover any booklet to see the papers inside."
            action={
              <Link href="/shop" className="btn btn-secondary">
                Shop all nine
              </Link>
            }
          />
          <ProductGrid products={featured} className="mt-12" priorityCount={2} />
        </div>
      </section>

      <WhyOSA />

      <BrandStory product={story} />
    </>
  );
}
