/**
 * One-time asset prep. Run with: node scripts/prepare-images.mjs
 *
 * Reads the source PNGs that live at the repo root (kept there as the
 * source-of-truth originals) and writes web-ready copies into public/.
 *
 * Also reports whether OSAlogo.png carries real alpha or a baked-in white
 * square, and keys out the white background when it turns out to be opaque.
 */
import { mkdir, readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import sharp from "sharp";

const ROOT = path.resolve(import.meta.dirname, "..");
const PUBLIC = path.join(ROOT, "public");

const collections = JSON.parse(
  await readFile(path.join(ROOT, "scripts/collections.json"), "utf8"),
);

const SOURCES = [
  { suffix: "mock", out: "booklet", width: 1600 },
  { suffix: "fan", out: "fan", width: 1400 },
  { suffix: "bg", out: "background", width: 1800 },
];

const blurPlaceholders = {};

async function blurDataUrl(input) {
  const buf = await sharp(input)
    .resize(20, null, { fit: "inside" })
    .webp({ quality: 40 })
    .toBuffer();
  return `data:image/webp;base64,${buf.toString("base64")}`;
}

for (const { slug, filePrefix } of collections) {
  const dir = path.join(PUBLIC, "collections", slug);
  await mkdir(dir, { recursive: true });

  for (const { suffix, out, width } of SOURCES) {
    const src = path.join(ROOT, `${filePrefix}${suffix}.png`);
    const dest = path.join(dir, `${out}.png`);

    await sharp(src)
      .resize({ width, withoutEnlargement: true })
      .png({ compressionLevel: 9, palette: true })
      .toFile(dest);

    blurPlaceholders[`/collections/${slug}/${out}.png`] = await blurDataUrl(src);

    const { size } = await sharp(dest).metadata();
    console.log(`  ${slug}/${out}.png  ${(size / 1024).toFixed(0)}kb`);
  }
}

// --- Logo ---------------------------------------------------------------
await mkdir(path.join(PUBLIC, "brand"), { recursive: true });
const logoSrc = path.join(ROOT, "OSAlogo.png");
const stats = await sharp(logoSrc).stats();
const alpha = stats.channels[3];
const opaque = alpha && alpha.min === 255 && alpha.max === 255;

console.log(
  opaque
    ? "\n  OSAlogo.png alpha is uniformly opaque — keying out the white background."
    : "\n  OSAlogo.png has real transparency — trimming only.",
);

let logo = sharp(logoSrc).ensureAlpha();

if (opaque) {
  // The mark is near-black ink on a white field. Build an alpha mask from the
  // inverted luminance so the white field drops out and the ink keeps its
  // anti-aliased edges.
  const { width, height } = await sharp(logoSrc).metadata();
  const mask = await sharp(logoSrc)
    .greyscale()
    .negate()
    .linear(1.6, 0)
    .toColourspace("b-w")
    .raw()
    .toBuffer();
  const rgb = await sharp(logoSrc).removeAlpha().raw().toBuffer();

  const out = Buffer.alloc(width * height * 4);
  for (let i = 0; i < width * height; i++) {
    out[i * 4] = rgb[i * 3];
    out[i * 4 + 1] = rgb[i * 3 + 1];
    out[i * 4 + 2] = rgb[i * 3 + 2];
    out[i * 4 + 3] = mask[i];
  }
  logo = sharp(out, { raw: { width, height, channels: 4 } });
}

const trimmed = await logo
  .trim({ threshold: 1 })
  .png({ compressionLevel: 9 })
  .toBuffer();

await writeFile(path.join(PUBLIC, "brand", "osa-logo.png"), trimmed);
await sharp(trimmed)
  .resize({ height: 180, withoutEnlargement: true })
  .png({ compressionLevel: 9 })
  .toFile(path.join(PUBLIC, "brand", "osa-logo-sm.png"));

const logoMeta = await sharp(trimmed).metadata();
console.log(
  `  brand/osa-logo.png  ${logoMeta.width}x${logoMeta.height}  ${(trimmed.length / 1024).toFixed(0)}kb`,
);

// App icon: the mark centred on a transparent square.
await sharp(trimmed)
  .resize(512, 512, { fit: "contain", background: { r: 0, g: 0, b: 0, alpha: 0 } })
  .png({ compressionLevel: 9 })
  .toFile(path.join(ROOT, "app", "icon.png"));

await writeFile(
  path.join(ROOT, "lib", "blur-placeholders.json"),
  `${JSON.stringify(blurPlaceholders, null, 2)}\n`,
);

console.log(`\nDone. ${Object.keys(blurPlaceholders).length} images prepared.`);
