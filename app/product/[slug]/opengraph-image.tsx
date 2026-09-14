import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { getAllProducts, getProductBySlug } from "@/lib/products";
import { PAPERS_PER_PACK, SITE_SHORT_NAME } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OSA filter tips";

export function generateStaticParams() {
  return getAllProducts().map((product) => ({ slug: product.slug }));
}

export default async function OpengraphImage({
  params,
}: {
  params: { slug: string };
}) {
  const product = getProductBySlug(params.slug) ?? getAllProducts()[0];
  const { palette } = product.motif;

  const booklet = await readFile(
    path.join(process.cwd(), "public", "collections", product.slug, "booklet.png"),
  );
  const bookletSrc = `data:image/png;base64,${booklet.toString("base64")}`;

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          background: `linear-gradient(140deg, ${palette.primary} 0%, ${palette.ink} 100%)`,
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between" }}>
          <span
            style={{
              color: palette.paper,
              fontSize: 26,
              letterSpacing: 6,
              fontWeight: 700,
            }}
          >
            {SITE_SHORT_NAME} — OKIE SMOKE ACCESSORIES
          </span>
          <span style={{ color: palette.accent, fontSize: 26, fontWeight: 700 }}>
            ${product.price.amount.toFixed(2)}
          </span>
        </div>

        <div style={{ display: "flex", flexDirection: "column" }}>
          <span
            style={{
              color: palette.paper,
              fontSize: 104,
              fontWeight: 800,
              lineHeight: 1,
            }}
          >
            {product.name}
          </span>
          <span
            style={{
              color: palette.paper,
              opacity: 0.85,
              fontSize: 32,
              marginTop: 16,
              maxWidth: 900,
            }}
          >
            {product.tagline}
          </span>
        </div>

        <img
          src={bookletSrc}
          alt=""
          width={1020}
          height={368}
          style={{ objectFit: "contain" }}
        />

        <span style={{ color: palette.paper, opacity: 0.8, fontSize: 24 }}>
          Filter tips · {PAPERS_PER_PACK} per pack · Small-batch, original
          artwork
        </span>
      </div>
    ),
    size,
  );
}
