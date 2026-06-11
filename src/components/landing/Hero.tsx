import Link from "next/link";
import Image from "next/image";
import { buttonVariants } from "@/components/ui/button";
import { Badge } from "@/components/ui/badge";
import BrandText from "@/components/ui/BrandText";
import {
  ArrowRight,
  MessageCircle,
  Shield,
  Zap,
  Award,
  Sparkles,
  BrainCircuit,
  Camera,
  PhoneCall,
  Calculator,
  Banknote,
  ShieldCheck,
} from "lucide-react";
import { cn } from "@/lib/utils";

const FLOATING_CARDS = [
  {
    icon: ShieldCheck,
    iconColor: "text-[#00838F]",
    bgColor: "bg-[#E0F7FA]",
    title: "1 Year Extended warranty",
    desc: "Total 2 years of manufacturer warranty coverage",
    delay: "0s",
    mobileClass: "top-2 left-2",
    desktopClass: "md:top-2 md:left-0",
    animationClass: "animate-float"
  },
  {
    icon: Banknote,
    iconColor: "text-[#137333]",
    bgColor: "bg-[#E6F4EA]",
    title: "SMB Pricing",
    desc: "with GST benefits",
    delay: "1.5s",
    mobileClass: "top-[18%] left-2",
    desktopClass: "md:top-[28%] md:-left-8",
    animationClass: "animate-float-slow"
  },
  {
    icon: Sparkles,
    iconColor: "text-[#7C3AED]",
    bgColor: "bg-[#E8D5FF]",
    title: "Gemini AI",
    desc: "Built right in",
    delay: "0.4s",
    mobileClass: "top-[34%] left-2",
    desktopClass: "md:top-[62%] md:-left-8",
    animationClass: "animate-float"
  },
  {
    icon: Camera,
    iconColor: "text-[#F9AB00]",
    bgColor: "bg-[#FEF0CD]",
    title: "Camera Coach",
    desc: "Pro shots, anyone",
    delay: "1.2s",
    mobileClass: "top-3 right-2",
    desktopClass: "md:top-3 md:right-6",
    animationClass: "animate-float-slow"
  },
  {
    icon: Shield,
    iconColor: "text-[#1A73E8]",
    bgColor: "bg-[#D2E3FC]",
    title: "2-Years Comprehensive Device Protection",
    desc: "Accidental · Liquid",
    delay: "0.5s",
    mobileClass: "bottom-2 left-2",
    desktopClass: "md:bottom-2 md:left-0",
    animationClass: "animate-float-reverse"
  },
  {
    icon: PhoneCall,
    iconColor: "text-[#EA4335]",
    bgColor: "bg-[#FCE8E6]",
    title: "Call Assist",
    desc: "Live transcripts",
    delay: "0.8s",
    mobileClass: "bottom-3 right-2",
    desktopClass: "md:bottom-3 md:right-6",
    animationClass: "animate-float"
  },
  {
    icon: BrainCircuit,
    iconColor: "text-[#1E8E3E]",
    bgColor: "bg-[#CEEAD6]",
    title: "AI Workshops",
    desc: "Free for your team",
    delay: "1s",
    mobileClass: "top-[22%] right-2 translate-y-0",
    desktopClass: "md:top-1/2 md:-translate-y-1/2 md:-right-4",
    animationClass: "animate-float-slow"
  }
];

export default function Hero() {
  return (
    <section className="relative min-h-screen flex items-center overflow-hidden bg-[#FFF9F0] pt-24">

      {/* ── Large animated blobs ── */}
      <div
        aria-hidden
        className="absolute -top-40 -left-40 w-[600px] h-[600px] rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, #c7d2fe 10%, transparent 100%)" }}
      />
      <div
        aria-hidden
        className="absolute -bottom-40 -right-20 w-[500px] h-[500px] rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, #bbf7d0 10%, transparent 100%)", animationDelay: "2s" }}
      />
      <div
        aria-hidden
        className="absolute top-1/3 left-1/3 w-96 h-96 rounded-full animate-pulse-glow pointer-events-none"
        style={{ background: "radial-gradient(circle, #ddd6fe 10%, transparent 100%)", animationDelay: "1s" }}
      />

      {/* ── Spinning ring decoration ── */}
      <div
        aria-hidden
        className="absolute top-20 right-[42%] w-64 h-64 rounded-full border border-dashed border-primary/15 animate-spin-slow pointer-events-none"
      />

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 w-full">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center min-h-[calc(100vh-4rem)] py-16">

          {/* ── LEFT — Copy ── */}
          <div className="relative z-10 lg:-mt-10">

            {/* Google Partner badge */}
            <div className="mb-6" style={{ animation: "slide-up 0.6s ease both" }}>
              <Badge className="px-4 py-2 text-sm font-medium rounded-full bg-white/80 backdrop-blur border border-white/60 shadow-sm gap-2 text-foreground">
                <div className="flex gap-0.5">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                  <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
                </div>
                Authorized Google Partner · Mumbai
              </Badge>
            </div>

            {/* Headline */}
            <h1
              className="text-4xl sm:text-5xl lg:text-6xl font-bold tracking-tight text-[#1a1a2e] leading-[1.05] mb-6"
              style={{ animation: "slide-up 0.7s 0.1s ease both" }}
            >
              Empower
              <br />
              <span className="text-primary">Your Team.</span>
              <br />
              Elevate
              <br />
              <span className="text-primary">Productivity.</span>
            </h1>

            {/* Subheadline */}
            <p
              className="text-lg text-[#3d3d5c]/80 leading-relaxed mb-6 max-w-lg"
              style={{ animation: "slide-up 0.7s 0.2s ease both" }}
            >
              Google Pixel 10 series with{" "}
              <strong className="text-foreground">2-year protection</strong>,
              zero-touch deployment, AI workshops, and exclusive SMB pricing —
              only from <BrandText />.
            </p>

            {/* SMB Feature list */}
            <div 
              className="mb-8 text-sm sm:text-base text-[#3d3d5c]/90 space-y-3"
              style={{ animation: "slide-up 0.7s 0.25s ease both" }}
            >
              <p className="font-semibold text-[#1a1a2e] text-base">
                Built for SMBs. Powered for Productivity.
              </p>
              <ul className="space-y-2 text-[#3d3d5c]/80">
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>Corporate pricing + 18% GST input credit.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>Free 2 years accidental & liquid damage protection.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>Free pan-India doorstep pickup & drop for repairs - 2 Years.</span>
                </li>
                <li className="flex items-start gap-2">
                  <span className="text-primary font-bold shrink-0">•</span>
                  <span>1-year extended warranty (Total 2 years).</span>
                </li>
              </ul>
            </div>

            {/* Trust row */}
            <div
              className="flex flex-wrap gap-x-6 gap-y-3 text-sm text-[#3d3d5c]/70"
              style={{ animation: "slide-up 0.7s 0.4s ease both" }}
            >
              {[
                { icon: Shield, label: "2-Year Protection" },
                { icon: Zap, label: "Zero-Touch Deploy" },
                { icon: Award, label: "SMB Pricing" },
              ].map(({ icon: Icon, label }) => (
                <div key={label} className="flex items-center gap-1.5">
                  <Icon className="w-4 h-4 text-primary" />
                  <span>{label}</span>
                </div>
              ))}
            </div>
          </div>

          {/* ── RIGHT — Big Phone Image + floating chips ── */}
          <div
            className="relative flex flex-col items-center lg:items-end lg:-mt-10"
            style={{ animation: "scale-in 0.9s 0.15s ease both" }}
          >
            {/*
              Layout strategy:
              • Outer wrapper has pt-16 pb-16 pl-0 pr-2 creating chip zones above and below the frame
              • Image sits inside a white card frame — chips cannot cover it
              • Top row: 2 chips sit in the 64px top padding zone (above the photo)
              • Bottom row: 2 chips sit in the 64px bottom padding zone (below the photo)
              • Right chip: hangs off the right edge of the image frame
            */}
            <div className="relative w-full max-w-lg lg:max-w-none pt-16 pb-16 pr-2">

              {/* ── Image frame — white card border ── */}
              <div className="rounded-3xl overflow-hidden ring-[6px] ring-white shadow-2xl shadow-primary/10">
                <Image
                  src="/assets/pixel-hero-duo.png"
                  alt="Google Pixel 10 Pro and Pixel 10a"
                  width={660}
                  height={500}
                  priority
                  className="w-full h-auto block"
                />
              </div>

              {/* ── FLOATING CHIPS (Dynamic & Responsive) ── */}
              {FLOATING_CARDS.map((card, idx) => {
                const Icon = card.icon;
                return (
                  <div
                    key={idx}
                    className={cn(
                      "absolute bg-white/95 backdrop-blur rounded-2xl shadow-xl flex items-center transition-all duration-300",
                      // Mobile layout: small size, compact padding
                      "p-1.5 gap-1.5 w-[135px] sm:w-[155px] md:w-auto md:p-4 md:gap-3",
                      card.mobileClass,
                      card.desktopClass,
                      card.animationClass
                    )}
                    style={{ animationDelay: card.delay }}
                  >
                    <div
                      className={cn(
                        "rounded-xl flex items-center justify-center shrink-0",
                        "w-7 h-7 md:w-9 md:h-9",
                        card.bgColor
                      )}
                    >
                      <Icon className="w-3.5 h-3.5 md:w-4 md:h-4" />
                    </div>
                    <div className="min-w-0 flex-1">
                      <p className="text-[9px] md:text-xs font-bold text-foreground leading-tight truncate md:whitespace-normal md:leading-none">
                        {card.title}
                      </p>
                      <p className="text-[8px] md:text-xs text-muted-foreground mt-0.5 leading-tight truncate md:whitespace-normal">
                        {card.desc}
                      </p>
                    </div>
                  </div>
                );
              })}

            </div>

            {/* Shop and Calculator buttons exactly below the image wrapper */}
            <div
              className="w-full max-w-lg lg:max-w-none flex flex-col sm:flex-row flex-wrap justify-center lg:justify-start gap-3 mt-4 relative z-20 px-2"
              style={{ animation: "slide-up 0.7s 0.35s ease both" }}
            >
              <Link
                href="/marketplace"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-8 h-13 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-xl shadow-primary/30 gap-2 inline-flex items-center justify-center"
                )}
              >
                Shop Pixel 10 Series
                <ArrowRight className="w-4 h-4" />
              </Link>
              <Link
                href="/marketplace#savings-calculator"
                className={cn(
                  buttonVariants({ size: "lg" }),
                  "rounded-full px-8 h-13 text-base font-semibold gap-2 bg-emerald-600 hover:bg-emerald-700 text-white shadow-xl shadow-emerald-600/25 inline-flex items-center justify-center transition-all duration-200 hover:-translate-y-0.5"
                )}
              >
                <Calculator className="w-4 h-4" />
                Check Your Savings
              </Link>
            </div>
          </div>

        </div>
      </div>

      {/* ── Scroll indicator ── */}
      <div className="absolute bottom-8 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1 text-xs text-foreground/30" aria-hidden>
        <span>scroll</span>
        <div className="w-px h-8 bg-gradient-to-b from-foreground/30 to-transparent" />
      </div>
    </section>
  );
}
