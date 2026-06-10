"use client";

import { useState } from "react";
import Link from "next/link";
import { ArrowRight, ChevronDown } from "lucide-react";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import ProductColorSelector from "@/components/products/ProductColorSelector";
import type { Product, ProductColor } from "@/lib/products";
import BrandText from "@/components/ui/BrandText";

interface ProductHeroProps {
  product: Product;
}

export default function ProductHero({ product }: ProductHeroProps) {
  const [selectedColor, setSelectedColor] = useState<ProductColor>(product.colors[0]);

  return (
    <section
      className="relative min-h-[90vh] flex flex-col overflow-hidden"
      style={{
        background: `linear-gradient(135deg, ${selectedColor.hex}18 0%, #F0F4FF 50%, #E8F5E9 100%)`,
        transition: "background 0.5s ease",
      }}
    >
      {/* Background blobs */}
      <div
        className="absolute top-0 right-0 w-96 h-96 rounded-full blur-3xl opacity-30 pointer-events-none transition-colors duration-500"
        style={{ background: selectedColor.hex }}
      />
      <div className="absolute bottom-0 left-0 w-64 h-64 rounded-full bg-[#E8D5FF]/40 blur-3xl pointer-events-none" />

      {/* Sticky mini-header bar */}
      <div className="sticky top-24 z-20 bg-white/80 backdrop-blur-md border-b border-border/40 py-3 px-4">
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          <div className="flex items-center gap-2 text-sm text-muted-foreground">
            <Link href="/products" className="hover:text-primary transition-colors">Products</Link>
            <span>/</span>
            <span className="font-medium text-foreground">{product.name}</span>
          </div>
          <Link
            href={`/marketplace?model=${product.slug}&color=${encodeURIComponent(selectedColor.name)}`}
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-primary hover:bg-primary/90 text-white gap-1.5 text-xs"
            )}
          >
            Order from <BrandText />
            <ArrowRight className="w-3 h-3" />
          </Link>
        </div>
      </div>

      {/* Main hero content */}
      <div className="relative flex-1 max-w-7xl mx-auto w-full px-4 sm:px-6 lg:px-8 py-16 flex flex-col lg:flex-row items-center gap-12 lg:gap-16">

        {/* Device visual — left */}
        <div className="flex-1 flex items-center justify-center order-2 lg:order-1">
          <div className="relative">
            {/* Phone mockup */}
            <div
              className="w-48 sm:w-56 h-[420px] sm:h-[480px] rounded-[3rem] flex items-center justify-center font-bold text-6xl text-white/30 shadow-2xl transition-all duration-500 relative overflow-hidden"
              style={{ background: selectedColor.hex }}
            >
              <span>G</span>
              {/* Camera bar */}
              <div className="absolute top-10 left-1/2 -translate-x-1/2 w-20 h-10 rounded-full bg-black/60" />
              {/* Home indicator */}
              <div className="absolute bottom-4 left-1/2 -translate-x-1/2 w-16 h-1.5 rounded-full bg-white/40" />
            </div>

            {/* Feature pills floating around */}
            {product.aiFeatures.slice(0, 3).map((feature, i) => {
              const positions = [
                "-top-4 -right-8 sm:-right-16",
                "top-1/3 -right-4 sm:-right-14",
                "-bottom-4 -right-6 sm:-right-12",
              ];
              return (
                <div
                  key={feature.name}
                  className={`absolute ${positions[i]} bg-white/90 backdrop-blur-sm rounded-2xl border border-border/60 px-3 py-1.5 shadow-md max-w-[140px] sm:max-w-[160px]`}
                  style={{ animationDelay: `${i * 0.2}s` }}
                >
                  <div className="flex items-center gap-1.5">
                    <span className="text-sm">{feature.icon}</span>
                    <span className="text-xs font-medium text-foreground leading-tight">{feature.name}</span>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {/* Product info — right */}
        <div className="flex-1 order-1 lg:order-2 text-center lg:text-left">
          {/* Badge */}
          <span className={`inline-block text-xs font-semibold px-3 py-1.5 rounded-full mb-4 ${product.badgeColor}`}>
            {product.badge}
          </span>

          <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground mb-4 leading-tight">
            {product.name}
          </h1>
          <p className="text-xl text-muted-foreground mb-6 leading-relaxed max-w-lg">
            {product.tagline}
          </p>

          <p className="text-base text-muted-foreground mb-8 max-w-lg leading-relaxed">
            {product.businessValue}
          </p>

          {/* Color selector */}
          <div className="mb-8 flex justify-center lg:justify-start">
            <ProductColorSelector
              colors={product.colors}
              selectedColor={selectedColor}
              onColorChange={(color) => setSelectedColor(color)}
            />
          </div>

          {/* Key highlights pills */}
          <div className="flex flex-wrap gap-2 justify-center lg:justify-start mb-8">
            {product.highlights.map((h) => (
              <span
                key={h}
                className="text-xs text-muted-foreground bg-white/80 border border-border/50 rounded-full px-3 py-1.5"
              >
                {h}
              </span>
            ))}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row gap-3 justify-center lg:justify-start">
            <Link
              href={`/marketplace?model=${product.slug}&color=${encodeURIComponent(selectedColor.name)}`}
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 h-12 font-semibold bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20"
              )}
            >
              Order for Your Business
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919022223600?text=Hi%2C%20I%27m%20interested%20in%20the%20Google%20Pixel%20for%20Business"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 h-12 font-semibold border-primary/30 text-primary hover:bg-primary/5"
              )}
            >
              WhatsApp for Pricing
            </a>
          </div>
        </div>
      </div>

      {/* Scroll hint */}
      <div className="flex justify-center pb-8 animate-bounce">
        <ChevronDown className="w-5 h-5 text-muted-foreground" />
      </div>
    </section>
  );
}
