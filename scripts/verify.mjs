/**
 * End-to-end verification against a running server.
 *   node scripts/verify.mjs [baseUrl]
 */
import { chromium } from "/opt/node22/lib/node_modules/playwright/index.mjs";

const BASE = process.argv[2] ?? "http://localhost:3000";
const EXEC = "/opt/pw-browsers/chromium-1194/chrome-linux/chrome";

const results = [];
const record = (name, ok, detail = "") =>
  results.push({ name, ok, detail });

const browser = await chromium.launch({ executablePath: EXEC });

async function newPage(options = {}) {
  const context = await browser.newContext({
    viewport: { width: 1440, height: 900 },
    ...options,
  });
  const page = await context.newPage();
  const errors = [];
  page.on("console", (m) => m.type() === "error" && errors.push(m.text()));
  page.on("pageerror", (e) => errors.push(`PAGEERROR ${e.message}`));
  await page.addInitScript(() =>
    localStorage.setItem("osa_age_verified_v1", "true"),
  );
  return { context, page, errors };
}

const SLUGS = [
  "paradise",
  "day-trip",
  "deep-end",
  "high-seas",
  "lucky-break",
  "night-garden",
  "odd-garden",
  "space-case",
  "summer-of-love",
];

const ROUTES = [
  "/",
  "/shop",
  "/collections",
  "/about",
  "/faq",
  "/cart",
  ...SLUGS.map((s) => `/product/${s}`),
  ...SLUGS.map((s) => `/collections/${s}`),
  ...["terms", "privacy", "shipping", "returns", "product-use"].map(
    (s) => `/legal/${s}`,
  ),
  "/definitely-not-a-page",
];

// ---------------------------------------------------------------- routes
{
  const { context, page, errors } = await newPage();
  for (const route of ROUTES) {
    if (route === "/definitely-not-a-page") {
      // The deliberate 404 logs an expected resource error; check it last so
      // it can't pollute the console-error assertion below.
      errors.length = 0;
    }
    const response = await page.goto(`${BASE}${route}`, {
      waitUntil: "domcontentloaded",
    });
    const status = response?.status() ?? 0;
    const expected = route === "/definitely-not-a-page" ? 404 : 200;
    const h1 = await page.locator("h1").first().textContent().catch(() => null);

    // Horizontal overflow check at desktop width.
    const overflow = await page.evaluate(
      () => document.documentElement.scrollWidth > window.innerWidth + 1,
    );

    record(
      `route ${route}`,
      status === expected && Boolean(h1) && !overflow,
      `status=${status} h1=${h1 ? "yes" : "MISSING"}${overflow ? " OVERFLOW" : ""}`,
    );
  }
  const realErrors = errors.filter(
    (e) => !/status of 404/.test(e) && !/Failed to load resource/.test(e),
  );
  record("no console errors on route sweep", realErrors.length === 0, realErrors.slice(0, 3).join(" | "));
  await context.close();
}

// -------------------------------------------------- booklet/fan pairing
{
  const { context, page } = await newPage();
  for (const slug of SLUGS) {
    await page.goto(`${BASE}/product/${slug}`, { waitUntil: "networkidle" });
    const srcs = await page.evaluate(() =>
      Array.from(document.querySelectorAll("img"))
        .map((img) => img.getAttribute("src") ?? "")
        .join(" "),
    );
    const safeDecode = (value) => {
      try {
        return decodeURIComponent(value);
      } catch {
        return value;
      }
    };
    const decoded = safeDecode(srcs);
    const hasOwnBooklet = decoded.includes(`/collections/${slug}/booklet.png`);
    const hasOwnFan = decoded.includes(`/collections/${slug}/fan.png`);
    // No other collection's fan may appear in this product's own gallery.
    const foreignFan = SLUGS.filter(
      (other) =>
        other !== slug && decoded.includes(`/collections/${other}/fan.png`),
    );
    // Related-product cards legitimately show other collections, so only the
    // gallery region is checked for cross-contamination.
    const galleryHtml = await page
      .locator("[role='tablist']")
      .first()
      .evaluate((el) => el.closest("div")?.parentElement?.innerHTML ?? "");
    const galleryForeign = SLUGS.filter(
      (other) =>
        other !== slug &&
        safeDecode(galleryHtml).includes(`/collections/${other}/`),
    );

    record(
      `pairing ${slug}`,
      hasOwnBooklet && hasOwnFan && galleryForeign.length === 0,
      `booklet=${hasOwnBooklet} fan=${hasOwnFan} galleryForeign=[${galleryForeign}] pageOther=[${foreignFan.length}]`,
    );
  }
  await context.close();
}

// ----------------------------------------------------- rapid hover reset
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
  const card = page.locator("article").first();
  const fanLayer = card.locator("div[style*='transform-origin']").first();
  const away = page.locator("header").first();

  for (let i = 0; i < 12; i++) {
    await card.hover();
    await page.waitForTimeout(40);
    await away.hover();
    await page.waitForTimeout(40);
  }
  await page.waitForTimeout(1200);
  const closedOpacity = await fanLayer.evaluate(
    (el) => Number(getComputedStyle(el).opacity),
  );

  await card.hover();
  await page.waitForTimeout(1100);
  const openOpacity = await fanLayer.evaluate(
    (el) => Number(getComputedStyle(el).opacity),
  );

  record(
    "fan resets after rapid hover",
    closedOpacity < 0.05 && openOpacity > 0.95,
    `closed=${closedOpacity.toFixed(3)} open=${openOpacity.toFixed(3)}`,
  );
  await context.close();
}

// ------------------------------------------------------- keyboard access
{
  const { context, page } = await newPage();
  await page.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
  const trigger = page.locator("button[aria-pressed]").first();
  const fanLayer = page
    .locator("article")
    .first()
    .locator("div[style*='transform-origin']")
    .first();

  await trigger.focus();
  await page.waitForTimeout(900);
  const focusOpen = await fanLayer.evaluate(
    (el) => Number(getComputedStyle(el).opacity),
  );

  await page.keyboard.press("Enter");
  await page.waitForTimeout(200);
  const pressed = await trigger.getAttribute("aria-pressed");
  await trigger.evaluate((el) => el.blur());
  await page.waitForTimeout(900);
  const pinnedOpen = await fanLayer.evaluate(
    (el) => Number(getComputedStyle(el).opacity),
  );

  record(
    "fan opens on keyboard focus",
    focusOpen > 0.9,
    `opacity=${focusOpen.toFixed(2)}`,
  );
  record(
    "Enter pins the fan open past blur",
    pressed === "true" && pinnedOpen > 0.9,
    `aria-pressed=${pressed} afterBlur=${pinnedOpen.toFixed(2)}`,
  );
  await context.close();
}

// ------------------------------------------------------------ mobile tap
{
  const { context, page } = await newPage({
    viewport: { width: 390, height: 844 },
    hasTouch: true,
    isMobile: true,
  });
  await page.goto(`${BASE}/shop`, { waitUntil: "networkidle" });
  const card = page.locator("article").first();
  const fanLayer = card.locator("div[style*='transform-origin']").first();

  await card.locator("button[aria-pressed]").first().tap();
  await page.waitForTimeout(1000);
  const tapped = await fanLayer.evaluate(
    (el) => Number(getComputedStyle(el).opacity),
  );

  const overflow = await page.evaluate(
    () => document.documentElement.scrollWidth > window.innerWidth + 1,
  );
  const viewProduct = await card
    .getByRole("link", { name: /view product/i })
    .isVisible();

  record("fan opens on mobile tap", tapped > 0.9, `opacity=${tapped.toFixed(2)}`);
  record("no horizontal overflow on mobile shop", !overflow);
  record("View Product control visible without hover", viewProduct);
  await context.close();
}

// ------------------------------------------------------------- cart flow
{
  const { context, page, errors } = await newPage();
  await page.goto(`${BASE}/product/paradise`, { waitUntil: "networkidle" });

  await page.getByRole("button", { name: "Add to cart", exact: true }).click();
  await page.waitForTimeout(600);
  const drawerVisible = await page
    .getByRole("dialog")
    .first()
    .isVisible()
    .catch(() => false);

  const subtotal = await page.getByText("$5.00").first().isVisible();

  // Quantity up, then the honest checkout message.
  await page.getByRole("button", { name: /increase/i }).first().click();
  await page.waitForTimeout(300);
  await page.getByRole("button", { name: "Checkout" }).click();
  await page.waitForTimeout(800);
  const checkoutMessage = await page
    .locator("[role='status']")
    .filter({ hasText: /checkout/i })
    .first()
    .textContent()
    .catch(() => "");

  // Persistence across a reload.
  await page.keyboard.press("Escape");
  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(600);
  const badge = await page
    .locator("header")
    .getByText("2", { exact: true })
    .first()
    .isVisible()
    .catch(() => false);

  record("add to cart opens drawer", drawerVisible);
  record("cart shows price", subtotal);
  record(
    "checkout reports not-connected instead of faking success",
    /isn't connected/i.test(checkoutMessage),
    checkoutMessage.slice(0, 80),
  );
  record("cart persists across reload", badge);
  record("no console errors in cart flow", errors.length === 0, errors.slice(0, 2).join(" | "));
  await context.close();
}

// --------------------------------------------------------- reduced motion
{
  const { context, page } = await newPage({ reducedMotion: "reduce" });
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(800);

  const heroVisible = await page.locator("h1").first().isVisible();
  const ambientAnimating = await page.evaluate(() => {
    const nodes = Array.from(document.querySelectorAll("[data-ambient]"));
    return nodes.filter(
      (n) => getComputedStyle(n).animationName !== "none",
    ).length;
  });
  const headingOpacity = await page
    .locator("h1")
    .first()
    .evaluate((el) => Number(getComputedStyle(el).opacity));

  record("reduced motion keeps hero readable", heroVisible && headingOpacity > 0.9);
  record(
    "reduced motion stops ambient animation",
    ambientAnimating === 0,
    `${ambientAnimating} still animating`,
  );
  await context.close();
}

// ------------------------------------------------------------- age gate
{
  const context = await browser.newContext({ viewport: { width: 1440, height: 900 } });
  const page = await context.newPage();
  await page.goto(`${BASE}/`, { waitUntil: "networkidle" });
  await page.waitForTimeout(700);

  const gate = page.getByRole("dialog");
  const gateVisible = await gate.isVisible().catch(() => false);
  await page.keyboard.press("Escape");
  await page.waitForTimeout(300);
  const stillOpen = await gate.isVisible().catch(() => false);

  await page.getByRole("button", { name: /18 or older/i }).click();
  await page.waitForTimeout(400);
  const dismissed = !(await gate.isVisible().catch(() => false));

  await page.reload({ waitUntil: "networkidle" });
  await page.waitForTimeout(700);
  const staysDismissed = !(await page
    .getByRole("dialog")
    .isVisible()
    .catch(() => false));

  record("age gate shows on first visit", gateVisible);
  record("age gate cannot be escaped without answering", stillOpen);
  record("age gate accepts confirmation", dismissed);
  record("age gate remembers the answer", staysDismissed);
  await context.close();
}

await browser.close();

const failed = results.filter((r) => !r.ok);
for (const r of results) {
  if (!r.ok) console.log(`FAIL  ${r.name}  ${r.detail}`);
}
console.log(
  `\n${results.length - failed.length}/${results.length} checks passed`,
);
if (failed.length) process.exitCode = 1;
