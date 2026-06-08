"use client";

import Link from "next/link";
import { useInView } from "@/hooks/useInView";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { ArrowRight, Shield, Rocket, BadgePercent, MessageCircle } from "lucide-react";
import BrandText from "@/components/ui/BrandText";

const shivaamiBenefits = [
  {
    icon: Shield,
    title: "2-Year Protection Plan",
    desc: "Water + theft insurance & extended warranty",
    color: "#D2E3FC",
    iconColor: "#1A73E8",
  },
  {
    icon: Rocket,
    title: "Zero-Touch Deployment",
    desc: "Pre-configured and ready on arrival",
    color: "#CEEAD6",
    iconColor: "#1E8E3E",
  },
  {
    icon: BadgePercent,
    title: "Corporate SMB Pricing",
    desc: "Volume discounts unavailable in retail",
    color: "#E8D5FF",
    iconColor: "#7C3AED",
  },
];

interface ProductOrderCTAProps {
  productName: string;
  ecosystemBenefits: string[];
}

export default function ProductOrderCTA({ productName, ecosystemBenefits }: ProductOrderCTAProps) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="py-24 bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8F5E9]">
      <div className="max-w-5xl mx-auto px-4 sm:px-6 lg:px-8">
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`reveal ${isVisible ? "visible" : ""}`}
        >
          {/* Heading */}
          <div className="text-center mb-12">
            <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
              Ready to equip your team
              <br />
              <span className="text-primary">with {productName}?</span>
            </h2>
            <p className="text-lg text-muted-foreground max-w-xl mx-auto">
              Order through <BrandText /> and get exclusive business benefits not available anywhere else.
            </p>
          </div>

          {/* Brand Benefits */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-10">
            {shivaamiBenefits.map((benefit) => {
              const Icon = benefit.icon;
              return (
                <div
                  key={benefit.title}
                  className="bg-white rounded-2xl border border-border/60 p-5 flex gap-4 items-start hover:shadow-md transition-shadow"
                >
                  <div
                    className="w-10 h-10 rounded-xl shrink-0 flex items-center justify-center"
                    style={{ background: benefit.color }}
                  >
                    <Icon className="w-5 h-5" style={{ color: benefit.iconColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{benefit.title}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{benefit.desc}</p>
                  </div>
                </div>
              );
            })}
          </div>

          {/* Ecosystem benefits strip */}
          {ecosystemBenefits.length > 0 && (
            <div className="bg-foreground rounded-2xl px-6 py-4 mb-10 flex flex-wrap items-center justify-center gap-4">
              <p className="text-xs font-semibold text-white/60 uppercase tracking-wider">Included with device:</p>
              {ecosystemBenefits.map((b) => (
                <span key={b} className="text-sm text-white font-medium bg-white/10 rounded-full px-3 py-1">
                  {b}
                </span>
              ))}
            </div>
          )}

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-4">
            <Link
              href="/marketplace"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white gap-2 shadow-lg shadow-primary/20"
              )}
            >
              Place Order
              <ArrowRight className="w-4 h-4" />
            </Link>
            <a
              href="https://wa.me/919022223600?text=Hi%2C%20I%27m%20interested%20in%20ordering%20Google%20Pixel%20for%20Business"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 h-12 text-base font-semibold border-primary/30 text-primary hover:bg-primary/5 gap-2"
              )}
            >
              <MessageCircle className="w-4 h-4" />
              WhatsApp Us
            </a>
          </div>

          {/* Trust note */}
          <p className="text-center text-xs text-muted-foreground mt-6">
            Google exclusive service centres in Delhi, Mumbai, Bangalore & Hyderabad · 80% of service requests resolved same day · 12K+ pin codes covered by mail-in repair
          </p>
        </div>
      </div>
    </section>
  );
}
