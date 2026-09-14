import type { Metadata } from "next";
import { SITE_NAME, SITE_URL, SLOGAN } from "./constants";
import type { Product } from "./types";

export const DEFAULT_DESCRIPTION =
  "Small-batch rolling filter tips wrapped in original artwork. Nine collectible collections, locally made, printed on thick cardstock with a clean-cut finish.";

export function pageMetadata({
  title,
  description = DEFAULT_DESCRIPTION,
  path = "/",
  image,
}: {
  title: string;
  description?: string;
  path?: string;
  image?: string;
}): Metadata {
  const url = `${SITE_URL}${path}`;
  return {
    title,
    description,
    alternates: { canonical: url },
    openGraph: {
      title: `${title} — ${SITE_NAME}`,
      description,
      url,
      siteName: SITE_NAME,
      type: "website",
      ...(image ? { images: [{ url: image }] } : {}),
    },
    twitter: {
      card: "summary_large_image",
      title: `${title} — ${SITE_NAME}`,
      description,
    },
  };
}

/**
 * Product structured data built only from values that actually exist in the
 * catalog. No review or rating schema — there are no reviews to report.
 */
export function productJsonLd(product: Product) {
  return {
    "@context": "https://schema.org",
    "@type": "Product",
    name: `${product.name} Filter Tips`,
    description: product.shortDescription,
    image: `${SITE_URL}${product.media.booklet}`,
    brand: { "@type": "Brand", name: SITE_NAME, slogan: SLOGAN },
    category: "Smoking accessories",
    url: `${SITE_URL}/product/${product.slug}`,
    offers: {
      "@type": "Offer",
      price: product.price.amount.toFixed(2),
      priceCurrency: product.price.currency,
      availability:
        product.inventoryStatus === "sold-out"
          ? "https://schema.org/OutOfStock"
          : "https://schema.org/InStock",
      url: `${SITE_URL}/product/${product.slug}`,
    },
  };
}
