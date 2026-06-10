"use client";

import { useInView } from "@/hooks/useInView";
import { Check, X, BadgePercent, Shield, Rocket, Star, Sparkles } from "lucide-react";
import BrandText, { formatBrandText } from "@/components/ui/BrandText";
import BulkQuoteCTA from "@/components/ui/BulkQuoteCTA";

const rows = [
  {
    feature: "Exclusive Corporate Bulk Pricing",
    business: true,
    retail: false,
  },
  {
    feature: "GST Input credit 18% Benefits",
    business: true,
    retail: false,
  },
  {
    feature: "2-Year Protection Plan for (Accidental & Liquid Damage)",
    business: true,
    retail: false,
    isFree: true,
  },
  {
    feature: "1-Year Extended Warranty (Total 2 years)",
    business: true,
    retail: false,
    isFree: true,
  },
  {
    feature: "Doorstep Pan India Pickup & Drop for repairs (for 2 years)",
    business: true,
    retail: false,
    isFree: true,
  },
  {
    feature: "Paperless Claims Support (no paper work at the time of claim)",
    business: true,
    retail: false,
  },
  {
    feature: "Zero Hidden Cost (Full Invoice value coverage No access fees No depreciation on claims)",
    business: true,
    retail: false,
  },
  {
    feature: "Mobile Device Management (MDM)",
    business: true,
    retail: false,
  },
  {
    feature: "AI Productivity Workshops",
    business: true,
    retail: false,
  },
  {
    feature: "Google AI Features (Gemini)",
    business: true,
    retail: true,
  },
  {
    feature: "Google One Benefits",
    business: true,
    retail: true,
  },
  {
    feature: "Google AI Pro",
    business: true,
    retail: true,
  },
  {
    feature: "Fitbit Premium",
    business: true,
    retail: true,
  },
  {
    feature: "YouTube Premium",
    business: true,
    retail: true,
  },
  {
    feature: "7 Years OS + Security Updates",
    business: true,
    retail: true,
  },
  {
    feature: "GST number Mandatory",
    business: true,
    retail: false,
  },
  {
    feature: "Pixel SMB Advantage Plan (something that usually costs 15% of your phone's value, completely FREE at TaxPrint & Shivaami)",
    business: true,
    retail: false,
  },
];

export default function PlanComparison() {
  const { ref, isVisible } = useInView(0.1);
  return (
    <section className="relative py-28 bg-[#FFF9F0] overflow-hidden">
      {/* Floating icons */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <BadgePercent className="absolute top-12 left-16 w-9 h-9 text-[#EA4335]/25 animate-float" style={{ animationDelay: "0.2s" }} />
        <Shield className="absolute top-28 right-16 w-8 h-8 text-[#4285F4]/30 animate-float-slow" style={{ animationDelay: "0.9s" }} />
        <Rocket className="absolute bottom-20 left-1/3 w-8 h-8 text-[#1E8E3E]/28 animate-float-reverse" style={{ animationDelay: "0.6s" }} />
        <Star className="absolute bottom-14 right-28 w-7 h-7 text-[#FBBC05]/40 animate-float" style={{ animationDelay: "1.4s" }} />
        <Sparkles className="absolute top-1/2 right-1/4 w-7 h-7 text-[#7C3AED]/25 animate-float-slow" style={{ animationDelay: "1.1s" }} />
      </div>
      <div className="relative max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div ref={ref as React.RefObject<HTMLDivElement>} className={`text-center mb-16 reveal ${isVisible ? "visible" : ""}`}>
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Why Choose <BrandText />
          </p>
          <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-4">
            Pixel for Business vs. Regular Retail
          </h2>
          <p className="max-w-xl mx-auto text-muted-foreground text-lg">
            The <BrandText />{" "}business plan gives your team far more than just a
            phone — at pricing retail can&apos;t match.
          </p>
        </div>

        {/* Comparison Table */}
        <div className="bg-white rounded-3xl border border-border/60 overflow-hidden shadow-sm">
          {/* Table Header */}
          <div className="grid grid-cols-3 border-b border-border">
            <div className="p-5 col-span-1" />
            <div className="p-5 text-center border-l border-border">
              <div className="inline-flex items-center gap-1.5 mb-1">
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                </div>
                <span className="font-bold text-sm text-foreground"><BrandText />{" "}Business</span>
              </div>
              <p className="text-xs text-primary font-medium">via Pixel for Business</p>
            </div>
            <div className="p-5 text-center border-l border-border">
              <p className="font-semibold text-sm text-muted-foreground">Retail Purchase</p>
              <p className="text-xs text-muted-foreground/70 mt-0.5">Any store</p>
            </div>
          </div>

          {/* Rows */}
          {rows.map((row, i) => (
            <div
              key={row.feature}
              className={`grid grid-cols-3 border-b border-border/50 last:border-0 ${
                i % 2 === 0 ? "bg-white" : "bg-muted/20"
              }`}
            >
              <div className="p-4 pl-5 flex items-center">
                <span className="text-sm text-foreground/80">{formatBrandText(row.feature)}</span>
              </div>
              <div className="p-4 flex items-center justify-center border-l border-border/50">
                {row.business ? (
                  <div className="w-6 h-6 rounded-full bg-[#E6F4EA] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#1E8E3E]" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
                  </div>
                )}
              </div>
              <div className="p-4 flex items-center justify-center border-l border-border/50">
                {row.retail ? (
                  <div className="w-6 h-6 rounded-full bg-[#E6F4EA] flex items-center justify-center">
                    <Check className="w-3.5 h-3.5 text-[#1E8E3E]" strokeWidth={2.5} />
                  </div>
                ) : (
                  <div className="w-6 h-6 rounded-full bg-muted flex items-center justify-center">
                    <X className="w-3.5 h-3.5 text-muted-foreground" strokeWidth={2} />
                  </div>
                )}
              </div>
            </div>
          ))}
        </div>

        <p className="text-center text-xs text-muted-foreground mt-4">
          * Benefits subject to <BrandText />{" "}business plan terms and conditions.
        </p>

        {/* Corporate Benefits Callout Box */}
        <div className="mt-8 bg-white/80 border border-border/80 rounded-3xl p-6 sm:p-8 backdrop-blur shadow-sm relative overflow-hidden">
          {/* Subtle decorative glow */}
          <div className="absolute top-0 right-0 w-24 h-24 bg-[#FFE2D1]/45 rounded-full blur-2xl pointer-events-none" />
          
          <h3 className="text-base sm:text-lg font-bold text-foreground mb-4 flex items-center gap-2">
            <span className="bg-[#FFE2D1] text-[#A73B00] px-2 py-0.5 rounded-lg text-xs font-black tracking-wider uppercase">
              Exclusive
            </span>
            <span>Corporate Benefits with <BrandText />:</span>
          </h3>
          
          <ul className="space-y-3 mb-5 text-sm text-foreground/80 font-medium">
            <li className="flex items-start gap-2.5">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>2-Year Protection Plan covering <strong className="text-foreground font-semibold">Accidental & Liquid Damage</strong></span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>Pan India Doorstep Pickup & Drop Support for Repairs <strong className="text-foreground font-semibold">(for 2 Years)</strong></span>
            </li>
            <li className="flex items-start gap-2.5">
              <span className="text-primary font-bold mt-0.5">•</span>
              <span>1-Year Extended Warranty <strong className="text-foreground font-semibold">(Total Coverage: 2 Years)</strong></span>
            </li>
          </ul>
          
          <div className="border-t border-border/40 pt-4 flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <p className="text-xs sm:text-sm text-muted-foreground leading-relaxed max-w-xl">
              These benefits that typically cost an additional <strong className="text-foreground font-semibold">15%–20%</strong>, now available absolutely <strong className="text-[#A73B00] font-black uppercase bg-[#FFE2D1] px-1.5 py-0.5 rounded">FREE</strong> with <BrandText />.
            </p>
          </div>
        </div>

        <BulkQuoteCTA />
      </div>
    </section>

  );
}
