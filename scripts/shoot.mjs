/**
 * Dev-time screenshot helper.
 *   node scripts/shoot.mjs <path> <outName> [width] [height] [action]
 * Actions: hover-fan, open-cart, reduced
 */
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const [, , route = "/", name = "shot", w = "1440", h = "900", action = ""] =
  process.argv;

const browser = await chromium.launch({
  executablePath: "/opt/pw-browsers/chromium-1194/chrome-linux/chrome",
});
const context = await browser.newContext({
  viewport: { width: Number(w), height: Number(h) },
  deviceScaleFactor: 1,
  reducedMotion: action === "reduced" ? "reduce" : "no-preference",
  hasTouch: Number(w) < 700,
  isMobile: Number(w) < 700,
});

const page = await context.newPage();
const errors = [];
page.on("console", (m) => {
  if (m.type() === "error") errors.push(m.text());
});
page.on("pageerror", (e) => errors.push(`PAGEERROR ${e.message}`));

await page.addInitScript(() => {
  localStorage.setItem("osa_age_verified_v1", "true");
});

await page.goto(`http://localhost:3000${route}`, { waitUntil: "networkidle" });
await page.waitForTimeout(1200);

if (action === "hover-fan") {
  const target = page.locator("[aria-pressed]").first();
  await target.hover();
  await page.waitForTimeout(900);
}
if (action === "open-cart") {
  await page.getByRole("button", { name: /open cart/i }).click();
  await page.waitForTimeout(700);
}

await page.screenshot({
  path: `/tmp/claude-0/-home-user-osa/a0da24cf-f5e5-54aa-9beb-ed6653509e43/scratchpad/${name}.png`,
  fullPage: action === "full",
});

if (errors.length) {
  console.log("CONSOLE ERRORS:");
  for (const e of errors.slice(0, 12)) console.log("  " + e);
} else {
  console.log("no console errors");
}

await browser.close();
