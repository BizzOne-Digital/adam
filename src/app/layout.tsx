import type { Metadata, Viewport } from "next";
import { Anton, Manrope, Oswald } from "next/font/google";
import { SiteProviders } from "@/providers/SiteProviders";
import { createMetadata, localBusinessJsonLd } from "@/lib/seo";
import { SITE } from "@/lib/constants";
import "./globals.css";

const anton = Anton({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-anton",
  display: "swap",
});

const oswald = Oswald({
  subsets: ["latin"],
  variable: "--font-oswald",
  display: "swap",
});

const manrope = Manrope({
  subsets: ["latin"],
  variable: "--font-manrope",
  display: "swap",
});

export const metadata: Metadata = createMetadata({
  title: SITE.name,
  description:
    "A1 Fitness & Nutrition provides personalized personal training, in-home coaching, gym sessions, online coaching, and nutrition guidance across Long Island for all fitness levels and abilities.",
  path: "/",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  viewportFit: "cover",
  themeColor: "#050505",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const jsonLd = localBusinessJsonLd();

  return (
    <html
      lang="en"
      className={`${anton.variable} ${oswald.variable} ${manrope.variable} h-full`}
    >
      <body className="font-body flex min-h-full flex-col bg-obsidian text-ice antialiased">
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
        />
        <SiteProviders>{children}</SiteProviders>
      </body>
    </html>
  );
}
