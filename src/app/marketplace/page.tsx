import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import MarketplaceClient from "./MarketplaceClient";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "B2B Marketplace | TaxPrint & Shivaami — Google Pixel for Business",
  description:
    "Order Google Pixel 10 series in bulk with exclusive B2B pricing. Volume discounts up to 18%, 2-year protection plan, zero-touch deployment. Mumbai's authorized Google Partner.",
  keywords: [
    "Google Pixel bulk order",
    "Pixel 10 corporate pricing",
    "business smartphone Mumbai",
    "Google Pixel B2B India",
    "Pixel 10 Pro enterprise",
  ],
};

export default function MarketplacePage() {
  return (
    <>
      <Navbar />
      <main>
        <MarketplaceClient products={products} />
      </main>
      <Footer />
    </>
  );
}
