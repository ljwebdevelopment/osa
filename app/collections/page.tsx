import CollectionSwitcher from "@/components/collections/CollectionSwitcher";
import ProductGrid from "@/components/product/ProductGrid";
import SectionHeading from "@/components/layout/SectionHeading";
import { getAllProducts } from "@/lib/products";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Collections",
  description:
    "Paradise, Day Trip, Deep End, High Seas, Lucky Break, Night Garden, Odd Garden, Space Case and Summer of Love — nine collections of original OSA artwork.",
  path: "/collections",
});

export default function CollectionsPage() {
  const products = getAllProducts();

  return (
    <>
      <CollectionSwitcher
        products={products}
        level={1}
        heading="Pick your world."
        intro="Nine collections, each drawn as its own piece of artwork. Move through the list and the whole page follows."
      />

      <section className="border-b-2 border-ink bg-paper">
        <div className="wrap no-clip py-20">
          <SectionHeading
            eyebrow="All nine"
            title="Every collection, side by side."
            intro="Same pack, same price — the artwork is the difference."
          />
          <ProductGrid products={products} className="mt-12" />
        </div>
      </section>
    </>
  );
}
