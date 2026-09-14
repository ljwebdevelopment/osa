import { CONTACT_EMAIL, MIN_AGE, SITE_NAME } from "./constants";

/**
 * Placeholder legal copy. None of this has been reviewed by a lawyer and none
 * of it states jurisdiction-specific law — bracketed tokens mark every value
 * that has to be filled in and confirmed before launch.
 */

export interface LegalSection {
  heading: string;
  body: string[];
}

export interface LegalPage {
  slug: string;
  title: string;
  summary: string;
  updated: string;
  sections: LegalSection[];
}

export const LEGAL_PAGES: LegalPage[] = [
  {
    slug: "terms",
    title: "Terms of Service",
    summary: "The ground rules for using this site and ordering from it.",
    updated: "[INSERT DATE]",
    sections: [
      {
        heading: "Agreement",
        body: [
          `By using this site or placing an order you agree to these terms. ${SITE_NAME} may update them at any time; the version posted when you order is the one that applies.`,
        ],
      },
      {
        heading: "Eligibility",
        body: [
          `You must be at least ${MIN_AGE} years old to purchase. We may ask for age verification at checkout or on delivery. [CONFIRM: minimum age requirement for every market you ship to.]`,
        ],
      },
      {
        heading: "Products and artwork",
        body: [
          "All artwork on OSA products is original and owned by the brand. You are welcome to enjoy, photograph, and collect the packs; reproducing the artwork commercially is not permitted.",
          "Printed colour can vary slightly between production runs. Small variation is a feature of small-batch printing, not a defect.",
        ],
      },
      {
        heading: "Orders and pricing",
        body: [
          "We may decline or cancel an order — including after it is placed — if a product is mispriced, unavailable, or if we cannot verify eligibility. If we cancel a paid order, we refund it in full.",
        ],
      },
      {
        heading: "Limitation of liability",
        body: [
          "[INSERT REVIEWED LIABILITY LANGUAGE.] This section needs to be drafted or approved by a lawyer before launch.",
        ],
      },
      {
        heading: "Governing law",
        body: ["These terms are governed by the laws of [INSERT STATE / JURISDICTION]."],
      },
      {
        heading: "Contact",
        body: [`Questions about these terms: ${CONTACT_EMAIL}`],
      },
    ],
  },
  {
    slug: "privacy",
    title: "Privacy Policy",
    summary: "What this site collects today, described accurately.",
    updated: "[INSERT DATE]",
    sections: [
      {
        heading: "What this site stores right now",
        body: [
          "Your cart is kept in your own browser's local storage so it survives a refresh. It never leaves your device and we cannot read it.",
          "Your age confirmation is stored the same way, so you are not asked again on every visit.",
          "This build has no analytics, no advertising pixels, and no third-party trackers.",
        ],
      },
      {
        heading: "What changes when checkout goes live",
        body: [
          "Connecting a payment provider means order and contact details will be processed by that provider. [INSERT PROVIDER NAME AND LINK TO THEIR PRIVACY POLICY once chosen.] This section must be rewritten at that point.",
        ],
      },
      {
        heading: "Email",
        body: [
          "The newsletter form is not connected to an email provider yet and does not store what you type. Once it is connected, [INSERT PROVIDER] will hold your address until you unsubscribe.",
        ],
      },
      {
        heading: "Your choices",
        body: [
          "Clearing your browser storage removes the cart and the age confirmation.",
          `To ask what we hold about you once orders are live, write to ${CONTACT_EMAIL}.`,
          "[CONFIRM: obligations under CCPA/CPRA, GDPR, or any other regime that applies to where you ship.]",
        ],
      },
    ],
  },
  {
    slug: "shipping",
    title: "Shipping",
    summary: "Where packs go, how fast, and the restrictions that apply.",
    updated: "[INSERT DATE]",
    sections: [
      {
        heading: "Processing",
        body: [
          "Orders are packed by hand in small batches. Expect [INSERT] business days before a package ships.",
        ],
      },
      {
        heading: "Carriers and delivery",
        body: [
          "We ship via [INSERT CARRIER]. Delivery estimates are provided by the carrier and are not guaranteed.",
          "Shipping cost is calculated at checkout.",
        ],
      },
      {
        heading: "Shipping restrictions",
        body: [
          "Some jurisdictions regulate the sale and shipment of rolling papers and smoking accessories, including age-verification requirements at delivery.",
          "[CONFIRM WITH COUNSEL: the exact list of states, territories, and countries you can ship to, and any age-verified-delivery or licensing requirement that applies.] Until that list is confirmed, this page should not be read as a statement that we ship anywhere in particular.",
        ],
      },
      {
        heading: "Lost or damaged parcels",
        body: [
          `If a parcel arrives damaged, email ${CONTACT_EMAIL} with a photo within [INSERT] days and we'll make it right.`,
        ],
      },
    ],
  },
  {
    slug: "returns",
    title: "Returns",
    summary: "How returns and exchanges work.",
    updated: "[INSERT DATE]",
    sections: [
      {
        heading: "Window",
        body: [
          "Unopened packs can be returned within [INSERT] days of delivery. Return shipping is [INSERT: paid by customer / covered by us].",
        ],
      },
      {
        heading: "Condition",
        body: [
          "Because these are a consumable product, opened packs can't be returned unless the item arrived damaged or incorrect.",
        ],
      },
      {
        heading: "How to start one",
        body: [
          `Email ${CONTACT_EMAIL} with your order number and what went wrong. Refunds are issued to the original payment method once the return is received.`,
        ],
      },
    ],
  },
  {
    slug: "product-use",
    title: "Product Use Notice",
    summary: "Who these are for and what they are.",
    updated: "[INSERT DATE]",
    sections: [
      {
        heading: "Adults only",
        body: [
          `OSA products are intended for adults ${MIN_AGE} and over. They are not marketed to, and may not be purchased by, minors.`,
          "[CONFIRM: whether any market you ship to sets a higher minimum age.]",
        ],
      },
      {
        heading: "What the product is",
        body: [
          "OSA sells rolling filter-tip papers — a paper accessory. No plant material, tobacco, or any other substance is included or supplied with them.",
        ],
      },
      {
        heading: "Legal use",
        body: [
          "These accessories are sold for use with legal products only. You are responsible for complying with the laws where you live.",
          "[CONFIRM WITH COUNSEL: any warning language your jurisdiction requires on accessory packaging or at point of sale.]",
        ],
      },
      {
        heading: "No health claims",
        body: [
          "We make no health, safety, or performance claims about these products of any kind.",
        ],
      },
    ],
  },
];

export const getLegalPage = (slug: string) =>
  LEGAL_PAGES.find((page) => page.slug === slug);
