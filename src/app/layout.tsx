import type { Metadata } from "next";
import { Inter } from "next/font/google";
import "./globals.css";

const inter = Inter({
  variable: "--font-sans",
  subsets: ["latin"],
  display: "swap",
});

export const metadata: Metadata = {
  title: "TaxPrint & Shivaami | Google Pixel for Business — Empower Your Team",
  description:
    "Mumbai's authorized Google Partner for Pixel SMB plans. Get Pixel 10 series with 2-year protection, zero-touch deployment, AI workshops, and corporate pricing. Order online.",
  keywords: [
    "Google Pixel for Business",
    "Pixel 10 SMB",
    "Google Partner Mumbai",
    "TaxPrint & Shivaami",
    "Pixel enterprise plan",
    "business smartphones India",
  ],
  openGraph: {
    title: "TaxPrint & Shivaami | Google Pixel for Business",
    description:
      "Empower Your Team. Elevate Productivity. Mumbai's authorized Google Pixel SMB dealership.",
    type: "website",
    locale: "en_IN",
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background text-foreground">
        {children}
      </body>
    </html>
  );
}
