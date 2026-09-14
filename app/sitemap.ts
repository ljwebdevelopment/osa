import type { MetadataRoute } from "next";
import { SITE_URL } from "@/lib/constants";
import { LEGAL_PAGES } from "@/lib/legal";
import { getAllProducts } from "@/lib/products";

export default function sitemap(): MetadataRoute.Sitemap {
  const now = new Date();
  const products = getAllProducts();

  const staticRoutes = ["", "/shop", "/collections", "/about", "/faq"].map(
    (path) => ({
      url: `${SITE_URL}${path}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: path === "" ? 1 : 0.8,
    }),
  );

  const productRoutes = products.flatMap((product) => [
    {
      url: `${SITE_URL}/product/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.9,
    },
    {
      url: `${SITE_URL}/collections/${product.slug}`,
      lastModified: now,
      changeFrequency: "monthly" as const,
      priority: 0.7,
    },
  ]);

  const legalRoutes = LEGAL_PAGES.map((page) => ({
    url: `${SITE_URL}/legal/${page.slug}`,
    lastModified: now,
    changeFrequency: "yearly" as const,
    priority: 0.2,
  }));

  return [...staticRoutes, ...productRoutes, ...legalRoutes];
}
