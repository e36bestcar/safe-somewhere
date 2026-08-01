import type { Metadata, Viewport } from "next";
import { Analytics } from "@vercel/analytics/next";
import { Host_Grotesk, Six_Caps } from "next/font/google";
import { headers } from "next/headers";
import { getSiteUrl } from "@/lib/site-url";
import "./globals.css";

const sixCaps = Six_Caps({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-six-caps",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

const hostGrotesk = Host_Grotesk({
  subsets: ["latin"],
  variable: "--font-host-grotesk",
  display: "swap",
  preload: true,
  adjustFontFallback: true,
});

export const metadata: Metadata = {
  metadataBase: new URL(getSiteUrl()),
  title: {
    default: "Safe Somewhere",
    template: "%s · Safe Somewhere",
  },
  description:
    "A collective imprint. Music and projects as a place to return to — not a cure, not an escape. A refuge.",
  applicationName: "Safe Somewhere",
  referrer: "strict-origin-when-cross-origin",
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-image-preview": "large",
      "max-snippet": -1,
      "max-video-preview": -1,
    },
  },
  openGraph: {
    title: "Safe Somewhere",
    description:
      "A collective imprint. Music and projects as a place to return to.",
    type: "website",
    locale: "en_US",
    siteName: "Safe Somewhere",
  },
  twitter: {
    card: "summary",
    title: "Safe Somewhere",
    description:
      "A collective imprint. Music and projects as a place to return to.",
  },
  alternates: {
    canonical: "/",
  },
};

export const viewport: Viewport = {
  themeColor: "#6e6a60",
  colorScheme: "dark",
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  // Opt into request-time rendering so proxy nonces apply to scripts
  await headers();

  return (
    <html
      lang="en"
      className={`${sixCaps.variable} ${hostGrotesk.variable} h-full`}
    >
      <body className="min-h-full">
        {children}
        <Analytics />
      </body>
    </html>
  );
}
