import type { Metadata } from "next";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import ProductCatalogHero from "@/components/products/ProductCatalogHero";
import ProductCard from "@/components/products/ProductCard";
import WhyPixelBusiness from "@/components/products/WhyPixelBusiness";
import PlanComparison from "@/components/landing/PlanComparison";
import { products } from "@/lib/products";

export const metadata: Metadata = {
  title: "Pixel 10 Series for Business | TaxPrint & Shivaami",
  description:
    "Browse the full Google Pixel 10 lineup — Pixel 10a, Pixel 10, Pixel 10 Pro, and Pixel 10 Pro XL — with TaxPrint & Shivaami's exclusive business plan: 2-year protection, zero-touch deployment, and corporate pricing.",
};

export default function ProductsPage() {
  return (
    <>
      <Navbar />
      <main>
        <ProductCatalogHero />

        {/* Product Grid */}
        <section className="py-20 bg-[#F0F4FF]">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
                Pixel 10 Series
              </p>
              <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
                Four phones.{" "}
                <span className="text-primary">One business plan.</span>
              </h2>
              <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
                Every Pixel in the lineup comes with the full TaxPrint & Shivaami business package — pick the right model for each role in your team.
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {products.map((product, i) => (
                <ProductCard key={product.slug} product={product} index={i} />
              ))}
            </div>
          </div>
        </section>

        <WhyPixelBusiness />
        <PlanComparison />
      </main>
      <Footer />
    </>
  );
}
