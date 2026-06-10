"use client";

import { useState, useEffect } from "react";
import Link from "next/link";
import type { Product, ProductColor } from "@/lib/products";
import { RETAIL_PRICES, formatInr } from "@/lib/marketplace";
import { useCart } from "@/context/CartContext";
import ProductColorSelector from "@/components/products/ProductColorSelector";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";

interface ProductOrderCardProps {
  product: Product;
  index: number;
}

const DELAY_CLASSES = ["delay-100", "delay-200", "delay-300", "delay-400"];

export default function ProductOrderCard({ product, index }: ProductOrderCardProps) {
  const { ref, isVisible } = useInView(0.1);
  const { items, addItem, removeItem, updateQuantity, updateColor } = useCart();

  const cartItem = items.find((i) => i.productSlug === product.slug);

  const [selectedColor, setSelectedColor] = useState<ProductColor>(
    cartItem?.color ?? product.colors[0]
  );

  // Sync local selectedColor state with the cart item's color (e.g. from query params on mount)
  useEffect(() => {
    if (cartItem?.color) {
      setSelectedColor(cartItem.color);
    }
  }, [cartItem?.color]);

  const isInCart = !!cartItem;
  const displayQty = cartItem?.quantity ?? 0;
  const unitPrice = RETAIL_PRICES[product.slug] ?? 0;

  function handleColorChange(color: ProductColor) {
    setSelectedColor(color);
    if (isInCart) {
      updateColor(product.slug, color);
    }
  }

  function handleQtyChange(delta: number) {
    if (isInCart) {
      const newQty = cartItem.quantity + delta;
      if (newQty <= 0) {
        removeItem(product.slug);
      } else {
        updateQuantity(product.slug, newQty);
      }
    } else {
      if (delta > 0) {
        addItem({
          productSlug: product.slug,
          productName: product.name,
          color: selectedColor,
          quantity: 1,
          unitPriceInr: unitPrice,
          accentBg: product.accentBg,
          badge: product.badge,
        });
      }
    }
  }

  function handleAddToOrder() {
    if (!isInCart) {
      addItem({
        productSlug: product.slug,
        productName: product.name,
        color: selectedColor,
        quantity: 1,
        unitPriceInr: unitPrice,
        accentBg: product.accentBg,
        badge: product.badge,
      });
    }
  }

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={cn(
        "reveal",
        DELAY_CLASSES[index % DELAY_CLASSES.length],
        isVisible ? "visible" : ""
      )}
    >
      <div className="bg-white rounded-3xl border border-border/60 shadow-sm hover:shadow-md transition-shadow duration-300 overflow-hidden flex flex-col h-full">
        {/* Card header with accent background */}
        <div
          className={cn(
            "relative px-6 pt-8 pb-6 flex flex-col items-center",
            product.accentBg
          )}
        >
          {/* Badge */}
          <span
            className="absolute top-4 right-4 text-xs font-semibold px-3 py-1 rounded-full"
            style={{ background: product.badgeColor + "22", color: product.badgeColor }}
          >
            {product.badge}
          </span>

          {/* Phone illustration placeholder */}
          <div className="w-20 h-20 rounded-2xl bg-white/60 backdrop-blur-sm flex items-center justify-center mb-3 shadow-sm">
            <span className="text-3xl font-bold text-primary select-none">G</span>
          </div>

          <h3 className="text-lg font-bold text-foreground text-center">
            {product.name}
          </h3>
          <p className="text-xs text-muted-foreground text-center mt-1 line-clamp-1">
            {product.tagline}
          </p>
        </div>

        {/* Card body */}
        <div className="p-6 flex flex-col flex-1 gap-5">
          {/* Price */}
          <div>
            <p className="text-sm font-semibold text-foreground tabular-nums">
              {formatInr(unitPrice)}
              <span className="font-normal text-muted-foreground">/device</span>
            </p>
            <p className="text-xs text-primary font-medium mt-0.5">
              Corporate price incl. 18% GST
            </p>
          </div>

          {/* Color selector */}
          <ProductColorSelector
            colors={product.colors}
            selectedColor={selectedColor}
            onColorChange={(color) => handleColorChange(color)}
          />

          {/* Quantity stepper */}
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Quantity:</span>
            <div className="flex items-center gap-0 rounded-full border border-border/80 overflow-hidden bg-white shadow-sm">
              <button
                onClick={() => handleQtyChange(-1)}
                disabled={displayQty <= 0}
                className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-light"
                aria-label="Decrease quantity"
              >
                −
              </button>
              <span className="w-9 text-center text-sm font-bold text-foreground tabular-nums">
                {displayQty}
              </span>
              <button
                onClick={() => handleQtyChange(1)}
                className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors text-lg font-light"
                aria-label="Increase quantity"
              >
                +
              </button>
            </div>
          </div>

          {/* Add to order button */}
          <button
            onClick={handleAddToOrder}
            disabled={isInCart}
            className={cn(
              "w-full py-3 px-5 rounded-full font-semibold text-sm transition-all duration-200 flex items-center justify-center gap-2",
              isInCart
                ? "bg-emerald-50 text-emerald-700 border border-emerald-200 cursor-default"
                : "bg-primary text-white hover:bg-[#1A73E8]"
            )}
          >
            {isInCart ? (
              <>
                <span>✓</span>
                <span>Added to Order</span>
              </>
            ) : (
              "Add to Order"
            )}
          </button>

          {/* View specs link */}
          <Link
            href={`/products/${product.slug}`}
            className="text-xs text-primary hover:underline text-center mt-auto"
          >
            View full specs →
          </Link>
        </div>
      </div>
    </div>
  );
}