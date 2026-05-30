"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { ArrowRight} from "lucide-react";
import { cn } from "@/lib/utils";
import { useInView } from "@/hooks/useInView";
import { products } from "@/lib/products";
import ProductCard from "@/components/products/ProductCard";


export default function ProductsTeaser() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);

  return (
    <section id="products" className="py-28 bg-[#F0F4FF] overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Section Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Pixel 10 Series
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Four phones.{" "}
            <span className="text-primary">One business plan.</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Every Pixel in the lineup comes with the full TaxPrint & Shivaami business
            package — pick the right model for each role in your team.
          </p>
        </div>

        {/* Product Cards */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {products.map((product, i) => (
            <ProductCard key={product.slug} product={product} index={i} />
          ))}
        </div>

        {/* CTA */}
        <div className="text-center mt-12">
          <Link
            href="/marketplace"
            className={cn(
              buttonVariants({ size: "lg" }),
              "rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white gap-2 inline-flex items-center shadow-lg shadow-primary/20"
            )}
          >
            Order for Your Business
            <ArrowRight className="w-4 h-4" />
          </Link>
        </div>
      </div>
    </section>
  );
}
