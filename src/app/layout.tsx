import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { WhatsAppCTA } from "@/components/layout/WhatsAppCTA";
import { StickyBookButton } from "@/components/layout/StickyBookButton";
import { Analytics } from "@vercel/analytics/react";

const playfair = Playfair_Display({
  subsets: ["latin"],
  variable: "--font-heading",
  display: "swap",
  weight: ["400", "500", "600", "700", "800", "900"],
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-body",
  display: "swap",
  weight: ["300", "400", "500", "600", "700"],
});

export const metadata: Metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_APP_URL || "http://localhost:3000"),
  title: {
    default: "DOGSPA Harrow | Luxury Pet Grooming & Wellness",
    template: "%s | DOGSPA Harrow",
  },
  description:
    "Premium one-to-one dog and cat grooming in Harrow. Luxury spa treatments, professional styling, and a calm, nurturing environment. Book your pet's spa day today.",
  keywords: [
    "dog grooming harrow",
    "pet spa harrow",
    "luxury dog grooming",
    "cat grooming harrow",
    "pet grooming near me",
    "dog spa treatment",
    "DOGSPA",
  ],
  authors: [{ name: "DOGSPA Harrow" }],
  openGraph: {
    type: "website",
    locale: "en_GB",
    url: "https://dogspa.co.uk",
    siteName: "DOGSPA Harrow",
    title: "DOGSPA Harrow | Luxury Pet Grooming & Wellness",
    description:
      "Premium one-to-one dog and cat grooming in Harrow. Luxury spa treatments and a calm, nurturing environment.",
    images: [
      {
        url: "/images/hero.png",
        width: 1200,
        height: 630,
        alt: "DOGSPA Harrow - Luxury Pet Grooming",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "DOGSPA Harrow | Luxury Pet Grooming & Wellness",
    description:
      "Premium one-to-one dog and cat grooming in Harrow. Book your pet's spa day.",
  },
  robots: {
    index: true,
    follow: true,
  },
};

import { ThemeProvider } from "@/components/ThemeProvider";

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${playfair.variable} ${inter.variable}`} suppressHydrationWarning>
      <head>
        <link rel="icon" href="/images/logo.png" type="image/png" />
      </head>
      <body className="antialiased bg-white dark:bg-[#16161A] text-charcoal dark:text-white/90 transition-colors duration-300">
        <ThemeProvider>
          <Navbar />
          <main>{children}</main>
          <Footer />
          <WhatsAppCTA />
          <StickyBookButton />
        </ThemeProvider>
        <Analytics />
      </body>
    </html>
  );
}
