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
  keywords: "event technology, MICE, registration system, NFC badges, event management, Thailand",
  openGraph: {
    title: "IN2IT Company | Your One-Stop Event Tech Solution",
    description: "End-to-end event technology for the MICE industry.",
    type: "website",
  },
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en" className={poppins.variable}>
      <body className="font-poppins bg-black text-white antialiased">
        {children}
      </body>
    </html>
  );
}
