import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/layout/SectionHeading";
import { getAllProducts } from "@/lib/products";
import { PAPERS_PER_PACK, PRICE_USD } from "@/lib/constants";
import { pageMetadata } from "@/lib/seo";
import { formatPrice } from "@/lib/utils";

export const metadata = pageMetadata({
  title: "Shop all collections",
  description: `All nine OSA filter-tip collections. ${formatPrice(PRICE_USD)} a pack, ${PAPERS_PER_PACK} papers in every pack.`,
  path: "/shop",
});

export default function ShopPage() {
  const products = getAllProducts();

  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="wrap no-clip py-16 sm:py-20">
        <SectionHeading
          eyebrow="Everything we make"
          title="Nine collections. One price."
          level={1}
          intro={`Every pack is ${formatPrice(PRICE_USD)} with ${PAPERS_PER_PACK} papers inside. Hover a booklet — or tap it — to see the artwork that comes with it.`}
        />
        <ProductGrid products={products} className="mt-12" priorityCount={3} />
      </div>
    </section>
  );
}
