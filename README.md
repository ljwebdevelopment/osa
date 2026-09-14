# OSA — OKie Smoke Accessories

Storefront for OSA: small-batch rolling filter tips wrapped in original
artwork. Next.js App Router, TypeScript, Tailwind v4, Framer Motion.

```bash
npm install
npm run dev          # http://localhost:3000
npm run build        # production build
npx tsc --noEmit     # typecheck
npx eslint .         # lint
node scripts/verify.mjs   # end-to-end checks against a running server
```

## Assets

The 27 source PNGs stay at the repo root as the originals. `scripts/prepare-images.mjs`
re-encodes them into `public/collections/<slug>/{booklet,fan,background}.png`,
trims `OSAlogo.png` into `public/brand/`, and writes the blur placeholders in
`lib/blur-placeholders.json`. Re-run it after replacing any source art:

```bash
node scripts/prepare-images.mjs
```

`scripts/collections.json` maps each source filename prefix to its URL slug —
it is the only place the inconsistent source filenames are spelled out.

## Where to edit things

| What | Where |
|---|---|
| Price, pack count, age, announcement, contact | `lib/constants.ts` |
| Product names, copy, related collections, stock | `lib/products.ts` |
| Collection palettes, motifs, motion language | `lib/collection-motifs.ts` |
| Legal copy | `lib/legal.ts` |

## Integration points

Neither is connected, and neither pretends to be.

**Checkout** — `lib/checkout.ts` defines `CheckoutAdapter` and ships a stub that
reports "not connected". Implement the interface and return it from
`getCheckoutAdapter()`; the cart's `slug` maps onto a Stripe price ID or a
Shopify variant ID. Nothing else changes.

**Newsletter** — `lib/newsletter.ts` is a server action that validates the
address and returns an `unconfigured` state. Replace its body with a call to
your email provider and return `{ status: "success" }`.

## Needs confirmation before launch

- **Pricing** — $5.00/pack and 30 papers per pack are set in `lib/constants.ts`.
- **All legal copy is placeholder** and unreviewed. Every `[INSERT …]` and
  `[CONFIRM …]` token needs a real value, and the shipping restrictions in
  particular need legal advice.
- **Business details** — contact email, address, shipping regions, processing
  times and the returns window are placeholders.
- **Age gate** is 18+ and cannot be dismissed without answering. It remembers
  the answer in localStorage, which means the page is briefly visible before
  the gate paints; a cookie read in middleware would remove that.
- **`isNew`** is false on every product because no release dates were given,
  and `inventoryStatus` is "in-stock" everywhere — set both from reality rather
  than using them for urgency.

## Known asset gaps

- **No 3D model or texture** was supplied, so the hero uses layered 2D parallax
  rather than React Three Fiber, and the product gallery has no 3D tab.
- **No individual per-paper cutouts** were supplied. Each collection's fan is a
  single flattened PNG in which the three papers overlap where they converge,
  so `InteractiveProductFan` animates them as one coordinated reveal.
  `Product.media.paperArt` is already read where per-paper choreography would
  go — supplying 27 cutouts (3 × 9) is all it would take.
