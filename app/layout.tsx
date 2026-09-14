import type { Metadata } from "next";
import { Fraunces, Rye, Space_Grotesk } from "next/font/google";
import "./globals.css";

import AnnouncementBar from "@/components/layout/AnnouncementBar";
import Header from "@/components/layout/Header";
import Footer from "@/components/layout/Footer";
import CartDrawer from "@/components/cart/CartDrawer";
import AgeGate from "@/components/system/AgeGate";
import CursorTrail from "@/components/system/CursorTrail";
import { ReducedMotionProvider } from "@/components/system/ReducedMotionProvider";
import { CartProvider } from "@/lib/cart-context";
import { DEFAULT_DESCRIPTION } from "@/lib/seo";
import { SITE_NAME, SITE_URL, SLOGAN } from "@/lib/constants";

const rye = Rye({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-rye",
  display: "swap",
});

const fraunces = Fraunces({
  subsets: ["latin"],
  variable: "--font-fraunces",
  display: "swap",
  axes: ["SOFT", "WONK", "opsz"],
});

const grotesk = Space_Grotesk({
  subsets: ["latin"],
  variable: "--font-grotesk",
  display: "swap",
});

export const metadata: Metadata = {
  metadataBase: new URL(SITE_URL),
  title: {
    default: `${SITE_NAME} — ${SLOGAN}`,
    template: `%s — ${SITE_NAME}`,
  },
  description: DEFAULT_DESCRIPTION,
  applicationName: SITE_NAME,
  keywords: [
    "rolling papers",
    "filter tips",
    "smoking accessories",
    "small batch",
    "collectible artwork",
    "OSA",
  ],
  openGraph: {
    type: "website",
    siteName: SITE_NAME,
    title: `${SITE_NAME} — ${SLOGAN}`,
    description: DEFAULT_DESCRIPTION,
    url: SITE_URL,
  },
  twitter: { card: "summary_large_image" },
  robots: { index: true, follow: true },
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html
      lang="en"
      className={`${rye.variable} ${fraunces.variable} ${grotesk.variable}`}
    >
      <body className="antialiased">
        <ReducedMotionProvider>
          <CartProvider>
            <a
              href="#main"
              className="sr-only focus:not-sr-only focus:fixed focus:left-4 focus:top-4 focus:z-[100] focus:bg-ink focus:px-4 focus:py-3 focus:text-paper-light focus:font-sans focus:text-sm"
            >
              Skip to content
            </a>
            <AnnouncementBar />
            <Header />
            <main id="main">{children}</main>
            <Footer />
            <CartDrawer />
            <AgeGate />
            <CursorTrail />
          </CartProvider>
        </ReducedMotionProvider>
      </body>
    </html>
  );
}
