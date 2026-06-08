"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import type { Product } from "@/lib/products";
import { CartProvider } from "@/context/CartContext";
import BrandText from "@/components/ui/BrandText";
import SavingsCalculator from "@/components/marketplace/SavingsCalculator";
import ProductOrderCard from "@/components/marketplace/ProductOrderCard";
import OrderSummary, { MobileCartBar } from "@/components/marketplace/OrderSummary";
import OrderFormModal from "@/components/marketplace/OrderFormModal";

interface MarketplaceClientProps {
  products: Product[];
}

export default function MarketplaceClient({ products }: MarketplaceClientProps) {
  const router = useRouter();
  const [isModalOpen, setIsModalOpen] = useState(false);

  return (
    <CartProvider>
      {/* Hero */}
      <section className="gradient-hero py-20 px-4 text-center">
        <div className="max-w-3xl mx-auto">
          <span className="inline-block bg-white/80 text-primary text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20 mb-6 tracking-wide uppercase">
            B2B Marketplace
          </span>
          <h1 className="text-4xl md:text-5xl font-bold text-foreground mb-4 leading-tight">
            Equip Your Team with{" "}
            <span className="text-primary">Google Pixel 10</span>
          </h1>
          <p className="text-lg text-muted-foreground max-w-xl mx-auto">
            Exclusive corporate pricing with 18% GST input credit, 2-year
            protection, and AI support — only through <BrandText />, Mumbai&apos;s
            authorized Google Partner.
          </p>
        </div>
      </section>

      {/* Savings Calculator */}
      <SavingsCalculator />

      {/* Product Grid + Order Summary */}
      <section id="order-grid" className="max-w-7xl mx-auto px-4 py-16">
        <div className="mb-10 text-center">
          <h2 className="text-3xl font-bold text-foreground mb-2">
            Build Your Order
          </h2>
          <p className="text-muted-foreground">
            Select model, color, and quantity — your savings update in real time
          </p>
        </div>

        <div className="lg:grid lg:grid-cols-[1fr_380px] lg:gap-8 lg:items-start">
          {/* 2×2 product grid */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 lg:mb-0">
            {products.map((product, index) => (
              <ProductOrderCard
                key={product.slug}
                product={product}
                index={index}
              />
            ))}
          </div>

          {/* Sticky sidebar — desktop only */}
          <div className="hidden lg:flex lg:flex-col lg:gap-5 lg:sticky lg:top-24">
            <OrderSummary onCheckout={() => setIsModalOpen(true)} />

            {/* Promo video */}
            <div className="rounded-3xl overflow-hidden border border-border/60 shadow-sm bg-black">
              <video
                src="/assets/marketplace.mp4"
                autoPlay
                loop
                muted
                playsInline
                className="w-full h-auto object-cover"
              />
            </div>
          </div>
        </div>
      </section>

      {/* Mobile floating cart bar */}
      <MobileCartBar onCheckout={() => setIsModalOpen(true)} />

      {/* Order form modal */}
      <OrderFormModal
        open={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSuccess={(orderId) =>
          router.push(`/marketplace/confirmation?order=${orderId}`)
        }
      />
    </CartProvider>
  );
}
