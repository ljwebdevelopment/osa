import { readFile } from "node:fs/promises";
import path from "node:path";
import { ImageResponse } from "next/og";
import { SITE_SHORT_NAME, SLOGAN } from "@/lib/constants";

export const size = { width: 1200, height: 630 };
export const contentType = "image/png";
export const alt = "OSA — OKie Smoke Accessories";

export default async function OpengraphImage() {
  const booklet = await readFile(
    path.join(process.cwd(), "public", "collections", "paradise", "booklet.png"),
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
          background: "linear-gradient(140deg, #e2512a 0%, #1a1209 100%)",
          padding: 64,
          fontFamily: "sans-serif",
        }}
      >
        <span
          style={{
            color: "#f4e7cd",
            fontSize: 26,
            letterSpacing: 6,
            fontWeight: 700,
          }}
        >
          {SITE_SHORT_NAME} — OKIE SMOKE ACCESSORIES
        </span>

        <span
          style={{
            color: "#faf2e2",
            fontSize: 92,
            fontWeight: 800,
            lineHeight: 1.02,
            maxWidth: 940,
          }}
        >
          {SLOGAN}
        </span>

        <img
          src={bookletSrc}
          alt=""
          width={1020}
          height={368}
          style={{ objectFit: "contain" }}
        />

        <span style={{ color: "#f4e7cd", opacity: 0.85, fontSize: 26 }}>
          Small-batch rolling filter tips · Nine collections of original artwork
        </span>
      </div>
    ),
    size,
  );
}
