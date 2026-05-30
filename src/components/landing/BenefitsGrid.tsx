"use client";

import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import { useInView } from "@/hooks/useInView";
import { cn } from "@/lib/utils";
import { Card, CardContent } from "@/components/ui/card";
import {
  Shield,
  Rocket,
  BadgePercent,
  BrainCircuit,
  Cloud,
  Headphones,
  ArrowRight,
  Sparkles,
  Star,
  Zap,
} from "lucide-react";

const benefits = [
  {
    icon: Shield,
    title: "2-Year Protection Plan",
    description:
      "Complete peace of mind — water damage and theft insurance, plus one full year of extended warranty beyond standard coverage.",
    color: "#D2E3FC",
    iconColor: "#4285F4",
  },
  {
    icon: Rocket,
    title: "Zero-Touch Deployment",
    description:
      "Get your entire team set up instantly. Devices arrive pre-configured and ready to use — no IT overhead required.",
    color: "#CEEAD6",
    iconColor: "#1E8E3E",
  },
  {
    icon: BadgePercent,
    title: "SMB Pricing with GST benefits",
    description:
      "Exclusive business pricing unavailable in retail. Volume discounts and flexible payment terms for teams of any size.",
    color: "#FCE8E6",
    iconColor: "#EA4335",
  },
  {
    icon: BrainCircuit,
    title: "AI Productivity Workshops",
    description:
      "Hands-on training with Gemini Live, Call Assist, Magic Cue, and Camera Coach — turn every employee into a power user.",
    color: "#FEF0CD",
    iconColor: "#F9AB00",
  },
  {
    icon: Cloud,
    title: "Free Google Cloud Storage",
    description:
      "Complimentary Google One storage included with every device — keep business files, photos, and backups safe in the cloud.",
    color: "#E6F4EA",
    iconColor: "#1E8E3E",
  },
  {
    icon: Headphones,
    title: "Dedicated Business Support",
    description:
      "A dedicated TaxPrint & Shivaami account manager for your business. Priority response, same-day troubleshooting, and proactive care.",
    color: "#EDE7F6",
    iconColor: "#7C3AED",
  },
];

export default function BenefitsGrid() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="benefits" className="relative py-28 bg-[#F5F0FF] overflow-hidden">
      
      {/* Decorative floating icons in background */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <Sparkles
          className="absolute top-16 left-12 w-8 h-8 text-primary/30 animate-float"
          style={{ animationDelay: "0s" }}
        />
        <Star
          className="absolute top-32 right-24 w-7 h-7 text-[#FBBC05]/40 animate-float-slow"
          style={{ animationDelay: "1s" }}
        />
        <Zap
          className="absolute bottom-24 left-1/4 w-7 h-7 text-[#34A853]/35 animate-float-reverse"
          style={{ animationDelay: "0.5s" }}
        />
        <Shield
          className="absolute bottom-16 right-16 w-9 h-9 text-primary/25 animate-float"
          style={{ animationDelay: "1.5s" }}
        />
        <BrainCircuit
          className="absolute top-1/2 left-6 w-8 h-8 text-[#7C3AED]/30 animate-float-slow"
          style={{ animationDelay: "2s" }}
        />
        <Cloud
          className="absolute top-20 right-1/3 w-10 h-10 text-[#4285F4]/25 animate-float"
          style={{ animationDelay: "0.8s" }}
        />
      </div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal ${isVisible ? "visible" : ""}`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            TaxPrint & Shivaami Exclusive
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Everything your business needs,{" "}
            <span className="text-primary">included</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            The Pixel for Business plan goes far beyond just a phone. Get a
            complete productivity ecosystem backed by Google and TaxPrint & Shivaami.
          </p>
        </div>

        {/* Big Portrait Hero Banner */}
        <HeroBanner />

        {/* Benefits Grid */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
          {benefits.map((benefit, i) => {
            const Icon = benefit.icon;
            return (
              <BenefitCard
                key={benefit.title}
                benefit={benefit}
                Icon={Icon}
                delay={i * 100}
              />
            );
          })}
        </div>
      </div>
    </section>
  );
}

function HeroBanner() {
  const { ref, isVisible } = useInView(0.1);
  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? "visible" : ""} relative rounded-3xl overflow-hidden bg-[#DDE5FF] mb-4`}
    >
      <div className="flex flex-col md:flex-row items-center">
        {/* Text side */}
        <div className="flex-1 px-8 py-10 md:py-14 md:px-12 z-10">
          <div className="flex items-center gap-2 mb-4">
            <Sparkles className="w-5 h-5 text-primary animate-float" />
            <span className="text-sm font-semibold text-primary uppercase tracking-wider">
              New · H1 2026
            </span>
          </div>
          <h3 className="text-3xl sm:text-4xl font-bold text-[#1a1a2e] mb-3 leading-tight">
            Google Pixel 10
            <br />
            <span className="text-primary">with Gemini</span>
          </h3>
          <p className="text-[#3d3d5c]/70 mb-6 max-w-xs leading-relaxed">
            The smartest, most protected business phone in India — available exclusively through TaxPrint & Shivaami.
          </p>
          <Link
            href="/products"
            className={cn(
              buttonVariants({ size: "sm" }),
              "rounded-full bg-primary text-white gap-1.5 inline-flex items-center hover:bg-primary/90"
            )}
          >
            Explore lineup <ArrowRight className="w-3.5 h-3.5" />
          </Link>
        </div>
        {/* Video side */}
        <div className="w-full md:w-3/4 shrink-0 self-stretch min-h-55 relative overflow-hidden">
          <video
            className="absolute inset-0 w-full h-full object-cover"
            autoPlay
            loop
            muted
            playsInline
            src="/assets/teaser.mp4"
          />
        </div>
      </div>
    </div>
  );
}

function BenefitCard({
  benefit,
  Icon,
  delay,
}: {
  benefit: (typeof benefits)[0];
  Icon: React.ElementType;
  delay: number;
}) {
  const { ref, isVisible } = useInView(0.1);

  return (
    <Card
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal delay-${Math.min(delay, 500)} ${isVisible ? "visible" : ""} group border border-border/60 shadow-none hover:shadow-xl hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 rounded-2xl overflow-hidden`}
    >
      <CardContent className="p-6 relative">
        {/* Subtle corner decoration */}
        <div
          className="absolute top-0 right-0 w-24 h-24 rounded-bl-[48px] opacity-30 group-hover:opacity-50 transition-opacity"
          style={{ background: benefit.color }}
          aria-hidden
        />

        <div
          className="w-14 h-14 rounded-2xl flex items-center justify-center mb-5 relative z-10 group-hover:scale-110 transition-transform duration-300"
          style={{ background: benefit.color }}
        >
          <Icon className="w-7 h-7" style={{ color: benefit.iconColor }} />
        </div>
        <h3 className="font-bold text-base text-foreground mb-2 relative z-10">
          {benefit.title}
        </h3>
        <p className="text-sm text-muted-foreground leading-relaxed relative z-10">
          {benefit.description}
        </p>
      </CardContent>
    </Card>
  );
}
