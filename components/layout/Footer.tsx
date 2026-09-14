import Link from "next/link";
import Logo from "./Logo";
import NewsletterForm from "@/components/marketing/NewsletterForm";
import { LEGAL_PAGES } from "@/lib/legal";
import { getAllProducts } from "@/lib/products";
import { CONTACT_EMAIL, MIN_AGE, SLOGAN } from "@/lib/constants";

export default function Footer() {
  const products = getAllProducts();
  const year = new Date().getFullYear();

  return (
    <footer
      data-ground="dark"
      className="relative overflow-hidden border-t-2 border-ink bg-ink text-paper"
    >
      <div
        aria-hidden
        className="halftone pointer-events-none absolute inset-0 opacity-[0.07]"
        style={{ ["--c-ink" as string]: "#ffffff" }}
      />

      <div className="wrap relative py-16">
        <div className="grid gap-12 lg:grid-cols-[1.1fr_2fr]">
          <div>
            <Logo className="h-14 w-auto" invert />
            <p className="display mt-6 max-w-xs text-2xl leading-tight text-paper-light">
              {SLOGAN}
            </p>
            <p className="mt-4 max-w-xs text-sm leading-relaxed text-paper/70">
              Small-batch filter tips wrapped in original artwork. Nine
              collections, printed in short runs and made to be kept.
            </p>
          </div>

          <div className="grid gap-10 sm:grid-cols-3">
            <nav aria-label="Shop">
              <h2 className="eyebrow text-gold">Shop</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {products.slice(0, 5).map((product) => (
                  <li key={product.slug}>
                    <Link
                      href={`/product/${product.slug}`}
                      className="link-underline text-paper/80 hover:text-paper-light"
                    >
                      {product.name}
                    </Link>
                  </li>
                ))}
                <li>
                  <Link
                    href="/shop"
                    className="link-underline text-paper/80 hover:text-paper-light"
                  >
                    All collections
                  </Link>
                </li>
              </ul>
            </nav>

            <nav aria-label="Company">
              <h2 className="eyebrow text-gold">Company</h2>
              <ul className="mt-4 space-y-2 text-sm">
                <li>
                  <Link href="/about" className="link-underline text-paper/80 hover:text-paper-light">
                    About OSA
                  </Link>
                </li>
                <li>
                  <Link href="/faq" className="link-underline text-paper/80 hover:text-paper-light">
                    FAQ
                  </Link>
                </li>
                <li>
                  <a
                    href={`mailto:${CONTACT_EMAIL}`}
                    className="link-underline text-paper/80 hover:text-paper-light"
                  >
                    Contact
                  </a>
                </li>
              </ul>
            </nav>

            <nav aria-label="Legal">
              <h2 className="eyebrow text-gold">Legal</h2>
              <ul className="mt-4 space-y-2 text-sm">
                {LEGAL_PAGES.map((page) => (
                  <li key={page.slug}>
                    <Link
                      href={`/legal/${page.slug}`}
                      className="link-underline text-paper/80 hover:text-paper-light"
                    >
                      {page.title}
                    </Link>
                  </li>
                ))}
              </ul>
            </nav>
          </div>
        </div>

        <div className="mt-14 border-t border-paper/15 pt-10">
          <NewsletterForm />
        </div>

        <div className="mt-12 flex flex-col gap-4 border-t border-paper/15 pt-6 text-xs text-paper/60 sm:flex-row sm:items-center sm:justify-between">
          <p>
            © {year} OKie Smoke Accessories. Artwork is original and remains the
            property of OSA.
          </p>
          <p>
            Must be {MIN_AGE}+ to purchase. Shipping restrictions may apply — see{" "}
            <Link href="/legal/shipping" className="link-underline">
              Shipping
            </Link>
            .
          </p>
        </div>
      </div>
    </footer>
  );
}
