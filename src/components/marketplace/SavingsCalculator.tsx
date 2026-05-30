"use client";

import { useCart } from "@/context/CartContext";
import { products } from "@/lib/products";
import {
  RETAIL_PRICES,
  CORPORATE_PRICING_NOTE,
  formatInr,
  SAVINGS_VALUES,
} from "@/lib/marketplace";
import { useInView } from "@/hooks/useInView";

const MODELS = [
  { slug: "pixel-10a", label: "Pixel 10a" },
  { slug: "pixel-10", label: "Pixel 10" },
  { slug: "pixel-10-pro-xl", label: "Pixel 10 Pro XL" },
  { slug: "pixel-10-pro-fold", label: "Pixel 10 Pro Fold" },
];

const DEFAULT_QTYS: Record<string, number> = {
  "pixel-10a": 0,
  "pixel-10": 0,
  "pixel-10-pro-xl": 0,
  "pixel-10-pro-fold": 0,
};

const SMB_BENEFITS = [
  {
    key: "corporate",
    title: "Corporate Pricing",
    description:
      "All prices are inclusive of 18% GST with full input tax credit — reducing your effective cost.",
    icon: "🏢",
  },
  {
    key: "protection",
    title: "2-Year Protection Plan",
    description:
      "Covers accidental & liquid damage. Includes free pan-India pickup and drop for repairs in Year 1.",
    icon: "🛡️",
  },
  {
    key: "warranty",
    title: "1-Year Extended Warranty",
    description:
      "Total 2 years of manufacturer warranty coverage — double the standard period.",
    icon: "✅",
  },
  {
    key: "workshops",
    title: "Exclusive AI Workshops & Support",
    description:
      "Training and ongoing support by Google and Shivaami — Gemini Live, Call Assist, Camera Coach, and more.",
    icon: "🎓",
  },
];


export default function SavingsCalculator() {
  const { ref, isVisible } = useInView(0.1);
  const { items, addItem, removeItem, updateQuantity } = useCart();

  const qtys: Record<string, number> = {
    "pixel-10a": items.find((i) => i.productSlug === "pixel-10a")?.quantity ?? 0,
    "pixel-10": items.find((i) => i.productSlug === "pixel-10")?.quantity ?? 0,
    "pixel-10-pro-xl": items.find((i) => i.productSlug === "pixel-10-pro-xl")?.quantity ?? 0,
    "pixel-10-pro-fold": items.find((i) => i.productSlug === "pixel-10-pro-fold")?.quantity ?? 0,
  };

  const totalQty = MODELS.reduce((s, m) => s + qtys[m.slug], 0);
  const totalPrice = MODELS.reduce(
    (s, m) => s + qtys[m.slug] * RETAIL_PRICES[m.slug],
    0
  );

  const totalOneAssistSavings = MODELS.reduce(
    (s, m) => s + qtys[m.slug] * SAVINGS_VALUES[m.slug].oneAssist,
    0
  );
  const totalExtWarrantySavings = MODELS.reduce(
    (s, m) => s + qtys[m.slug] * SAVINGS_VALUES[m.slug].extWarranty,
    0
  );
  const totalSavings = totalOneAssistSavings + totalExtWarrantySavings;

  function changeQty(slug: string, delta: number) {
    const currentQty = qtys[slug];
    const newQty = currentQty + delta;

    if (newQty <= 0) {
      removeItem(slug);
    } else {
      const existing = items.find((i) => i.productSlug === slug);
      if (existing) {
        updateQuantity(slug, newQty);
      } else {
        const product = products.find((p) => p.slug === slug);
        if (product) {
          addItem({
            productSlug: product.slug,
            productName: product.name,
            color: product.colors[0],
            quantity: newQty,
            unitPriceInr: RETAIL_PRICES[product.slug] ?? 0,
            accentBg: product.accentBg,
            badge: product.badge,
          });
        }
      }
    }
  }


  return (
    <section
      ref={ref as React.RefObject<HTMLDivElement>}
      className="bg-[#F0F4FF] py-16 px-4"
    >
      <div className="max-w-6xl mx-auto">
        {/* Section header */}
        <div
          className={`text-center mb-10 reveal delay-100 ${isVisible ? "visible" : ""}`}
        >
          <span className="inline-block bg-primary/10 text-primary text-xs font-semibold px-4 py-1.5 rounded-full border border-primary/20 mb-4 tracking-wide uppercase">
            SMB Pricing Calculator
          </span>
          <h2 className="text-3xl md:text-4xl font-bold text-foreground mb-3">
            Calculate Your Corporate Price
          </h2>
          <p className="text-muted-foreground max-w-lg mx-auto">
            Adjust quantities to see the total — all prices include 18% GST
          </p>
        </div>

        <div
          className={`bg-white rounded-3xl shadow-sm border border-border/60 overflow-hidden reveal delay-200 ${isVisible ? "visible" : ""}`}
        >
          <div className="grid md:grid-cols-2 divide-y md:divide-y-0 md:divide-x divide-border/60">
            {/* LEFT — quantity inputs */}
            <div className="p-8">
              <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-6">
                How many devices?
              </h3>

              <div className="flex flex-col gap-5">
                {MODELS.map((model) => (
                  <div
                    key={model.slug}
                    className="flex items-center justify-between"
                  >
                    <div>
                      <p className="font-semibold text-foreground text-sm">
                        {model.label}
                      </p>
                      <p className="text-xs text-muted-foreground mb-0.5">
                        {formatInr(RETAIL_PRICES[model.slug])} incl. GST
                      </p>
                      {qtys[model.slug] > 0 ? (
                        <p className="text-[11px] text-emerald-600 font-semibold transition-all">
                          Save {formatInr((SAVINGS_VALUES[model.slug].oneAssist + SAVINGS_VALUES[model.slug].extWarranty) * qtys[model.slug])} ({formatInr(SAVINGS_VALUES[model.slug].oneAssist + SAVINGS_VALUES[model.slug].extWarranty)}/dev)
                        </p>
                      ) : (
                        <p className="text-[11px] text-muted-foreground/80 transition-all">
                          Save {formatInr(SAVINGS_VALUES[model.slug].oneAssist + SAVINGS_VALUES[model.slug].extWarranty)}/device
                        </p>
                      )}
                    </div>
                    {/* Stepper */}
                    <div className="flex items-center gap-0 rounded-full border border-border/80 overflow-hidden bg-white shadow-sm">
                      <button
                        onClick={() => changeQty(model.slug, -1)}
                        disabled={qtys[model.slug] === 0}
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 disabled:opacity-40 disabled:cursor-not-allowed transition-colors text-lg font-light"
                        aria-label={`Decrease ${model.label}`}
                      >
                        −
                      </button>
                      <span className="w-10 text-center text-sm font-bold text-foreground tabular-nums">
                        {qtys[model.slug]}
                      </span>
                      <button
                        onClick={() => changeQty(model.slug, 1)}
                        className="w-9 h-9 flex items-center justify-center text-muted-foreground hover:text-foreground hover:bg-muted/40 transition-colors text-lg font-light"
                        aria-label={`Increase ${model.label}`}
                      >
                        +
                      </button>
                    </div>
                  </div>
                ))}
              </div>

              {/* Totals */}
              <div className="mt-8 pt-6 border-t border-border/60">
                <div className="flex items-center justify-between mb-1">
                  <span className="text-sm text-muted-foreground">
                    Total devices
                  </span>
                  <span className="bg-emerald-100 text-emerald-700 text-base font-bold tabular-nums px-4 py-1.5 rounded-full border border-emerald-200">
                    {totalQty}
                  </span>
                </div>
                {totalQty > 0 && (
                  <div className="flex items-center justify-between mt-2">
                    <span className="text-sm text-muted-foreground">
                      Total amount
                    </span>
                    <span className="bg-emerald-100 text-emerald-700 font-bold text-base tabular-nums px-4 py-1.5 rounded-full border border-emerald-200">
                      {formatInr(totalPrice)}
                    </span>
                  </div>
                )}
                <p className="text-xs text-primary font-medium mt-3">
                  {CORPORATE_PRICING_NOTE}
                </p>
              </div>
            </div>

            {/* RIGHT — SMB Benefits */}
            <div className="p-8 flex flex-col justify-between">
              <div className="flex items-center justify-between gap-4 mb-6">
                <h3 className="text-xs font-semibold text-muted-foreground uppercase tracking-wide">
                  SMB Benefits included
                </h3>
                {totalQty > 0 && (
                  <div className="w-20 h-20 md:w-24 md:h-24 rounded-full bg-emerald-100 border border-emerald-300 flex flex-col items-center justify-center text-center shrink-0 hover:scale-105 transition-transform duration-300 shadow-sm animate-scale-in">
                    <span className="text-[9px] uppercase font-bold text-emerald-600 tracking-wider mb-0.5">
                      Total Save
                    </span>
                    <span className="text-xs md:text-sm font-extrabold text-emerald-800 tabular-nums">
                      {formatInr(totalSavings)}
                    </span>
                  </div>
                )}
              </div>

              <div className="flex flex-col gap-4 flex-1">
                {SMB_BENEFITS.map((benefit, i) => {
                  let savingsBadge = null;
                  if (benefit.key === "protection" && totalOneAssistSavings > 0) {
                    savingsBadge = (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                        Saved {formatInr(totalOneAssistSavings)}
                      </span>
                    );
                  } else if (benefit.key === "warranty" && totalExtWarrantySavings > 0) {
                    savingsBadge = (
                      <span className="text-[10px] bg-emerald-100 text-emerald-700 border border-emerald-200 px-2.5 py-0.5 rounded-full font-bold shadow-sm">
                        Saved {formatInr(totalExtWarrantySavings)}
                      </span>
                    );
                  }

                  return (
                    <div
                      key={i}
                      className="flex gap-4 p-4 rounded-2xl bg-muted/30 hover:bg-muted/50 transition-colors"
                    >
                      <span className="text-2xl shrink-0 mt-0.5">
                        {benefit.icon}
                      </span>
                      <div className="flex-1">
                        <p className="font-semibold text-foreground text-sm mb-1 flex items-center justify-between flex-wrap gap-1">
                          <span>{benefit.title}</span>
                          {savingsBadge}
                        </p>
                        <p className="text-xs text-muted-foreground leading-relaxed">
                          {benefit.description}
                        </p>
                      </div>
                    </div>
                  );
                })}
              </div>

              {/* CTA */}
              <button
                onClick={() =>
                  document
                    .getElementById("order-grid")
                    ?.scrollIntoView({ behavior: "smooth" })
                }
                className="w-full mt-6 bg-primary text-white font-semibold py-3 px-6 rounded-full hover:bg-[#1A73E8] transition-colors text-sm flex items-center justify-center gap-2"
              >
                Build Your Order →
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}