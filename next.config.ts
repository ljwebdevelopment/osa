import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  images: {
    // WebP only, deliberately. On this artwork AVIF came out the same size
    // (104kb vs 106kb for a fan at 1080px) while taking 13x as long to encode
    // — 16s for a background at 1920px — which stalls the first request for
    // every image on a self-hosted optimizer.
    formats: ["image/webp"],
    // Widths the layout actually asks for: full-bleed scenes, gallery stages,
    // grid cards, and cart thumbnails.
    deviceSizes: [640, 828, 1080, 1440, 1920],
    imageSizes: [80, 112, 256, 384, 520, 620],
  },
};

export default nextConfig;
