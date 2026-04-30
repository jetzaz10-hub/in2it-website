import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["300", "400", "500", "600", "700", "800", "900"],
  variable: "--font-poppins",
  display: "swap",
});

export const metadata: Metadata = {
  title: "IN2IT Company | Your One-Stop Event Tech Solution",
  description:
    "IN2IT is an event technology company delivering end-to-end solutions for the MICE industry — from registration and ticketing to branding and live streaming.",
  keywords: "event technology, MICE, registration system, NFC badges, event management, Thailand, Chiang Mai, live streaming, ticketing",
  metadataBase: new URL("https://in2it.co.th"),
  openGraph: {
    title: "IN2IT Company | Your One-Stop Event Tech Solution",
    description: "End-to-end event technology for the MICE industry — registration, ticketing, NFC badges, live streaming & more.",
    type: "website",
    siteName: "IN2IT Company",
    locale: "en_US",
    images: [
      {
        url: "/og-image.png",
        width: 1200,
        height: 630,
        alt: "IN2IT Company — Your One-Stop Event Tech Solution",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "IN2IT Company | Your One-Stop Event Tech Solution",
    description: "End-to-end event technology for the MICE industry.",
    images: ["/og-image.png"],
  },
  robots: {
    index: true,
    follow: true,
  },
};

import SmoothScroll from "@/components/SmoothScroll";

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-black text-white antialiased">
        <SmoothScroll>
          {children}
        </SmoothScroll>
      </body>
    </html>
  );
}
