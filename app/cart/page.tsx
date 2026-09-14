import CartPageContents from "@/components/cart/CartPageContents";
import { pageMetadata } from "@/lib/seo";

export const metadata = pageMetadata({
  title: "Cart",
  description: "Your OSA cart.",
  path: "/cart",
});

export default function CartPage() {
  return (
    <section className="border-b-2 border-ink bg-paper">
      <div className="wrap py-16 sm:py-20">
        <h1 className="display ink-offset text-[clamp(2.2rem,6vw,3.6rem)] leading-none">
          Your cart
        </h1>
        <CartPageContents />
      </div>
    </section>
  );
}
