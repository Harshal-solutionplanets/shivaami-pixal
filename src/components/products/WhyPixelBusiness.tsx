"use client";

import { useInView } from "@/hooks/useInView";
import { Shield, Brain, Rocket, Star } from "lucide-react";
import BulkQuoteCTA from "@/components/ui/BulkQuoteCTA";

const pillars = [
  {
    icon: Shield,
    iconBg: "#D2E3FC",
    iconColor: "#1A73E8",
    title: "Security Leader",
    subtitle: "#1 OMDIA rating · 4 years running",
    points: [
      "97% across all security parameters — outperforms Samsung, Apple, OnePlus, and Xiaomi",
      "Titan M2™ chip secures PINs, passwords, and sensitive business data",
      "Google Tensor G5 security core keeps your organization's information safe",
      "7 years of OS and security updates — your fleet stays protected longer",
      "Android Theft Protection, Factory Reset, Remote Lock, Passkeys",
    ],
  },
  {
    icon: Brain,
    iconBg: "#E8D5FF",
    iconColor: "#7C3AED",
    title: "AI-Powered Productivity",
    subtitle: "Gemini · Magic Cue · Camera Coach",
    points: [
      "Gemini Live with camera — show a document, whiteboard, or product and get instant AI support",
      "Magic Cue surfaces context-aware suggestions proactively, at exactly the right moment",
      "Camera Coach turns every employee into a professional photographer",
      "Pixel Recorder transcribes meetings in real time, on-device — audio never leaves the phone",
      "Live Translate enables your team to communicate securely across languages",
    ],
  },
  {
    icon: Rocket,
    iconBg: "#CEEAD6",
    iconColor: "#1E8E3E",
    title: "Enterprise-Ready",
    subtitle: "Zero-touch · Work Profiles · Managed Play",
    points: [
      "Zero-touch enrollment — devices arrive pre-configured, ready to deploy instantly",
      "Android Work Profiles create OS-level separation between personal and work data",
      "Managed Google Play Store — control which apps employees can install",
      "Pixel Drops deliver new features year-round, no IT intervention needed",
      "IP68 rated — built to handle the rigors of the workday, rain or shine",
    ],
  },
];

const stats = [
  { value: "97%", label: "Security score across all parameters (OMDIA 2025)" },
  { value: "70%", label: "Of enterprises purchase new devices at least once a year" },
  { value: "74%", label: "Of decision-makers say employee demand drives smartphone purchases" },
  { value: "7 yrs", label: "Of OS and security updates on every Pixel 10 device" },
];

export default function WhyPixelBusiness() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);
  const { ref: statsRef, isVisible: statsVisible } = useInView(0.1);

  return (
    <section className="py-24 bg-[#F5F0FF]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal ${headerVisible ? "visible" : ""}`}
        >
          <div className="inline-flex items-center gap-2 bg-primary/10 rounded-full px-4 py-1.5 mb-4">
            <Star className="w-3.5 h-3.5 text-primary" />
            <span className="text-xs font-semibold text-primary uppercase tracking-wider">
              Why Pixel for Business
            </span>
          </div>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            The smartphone built{" "}
            <span className="text-primary">for enterprise</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Advanced Google tools, a native Android OS experience that provides flexibility and customizability, and security you can count on — all so your business can do more.
          </p>
        </div>

        {/* 3 Pillars */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-20">
          {pillars.map((pillar, i) => (
            <PillarCard key={pillar.title} pillar={pillar} index={i} />
          ))}
        </div>

        {/* Stats strip */}
        <div
          ref={statsRef as React.RefObject<HTMLDivElement>}
          className={`reveal ${statsVisible ? "visible" : ""} rounded-3xl bg-foreground px-8 py-10`}
        >
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-8">
            {stats.map((stat) => (
              <div key={stat.value} className="text-center">
                <p className="text-3xl sm:text-4xl font-bold text-white mb-2">{stat.value}</p>
                <p className="text-xs sm:text-sm text-white/60 leading-snug">{stat.label}</p>
              </div>
            ))}
          </div>
        </div>

        <BulkQuoteCTA />
      </div>
    </section>
  );
}

function PillarCard({
  pillar,
  index,
}: {
  pillar: (typeof pillars)[0];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.1);
  const delays = ["delay-100", "delay-200", "delay-300"];
  const Icon = pillar.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${delays[index] ?? ""} ${isVisible ? "visible" : ""} bg-white rounded-3xl border border-border/60 p-7 hover:shadow-lg hover:shadow-primary/5 transition-shadow duration-300`}
    >
      <div
        className="w-12 h-12 rounded-2xl flex items-center justify-center mb-5"
        style={{ background: pillar.iconBg }}
      >
        <Icon className="w-6 h-6" style={{ color: pillar.iconColor }} />
      </div>
      <h3 className="font-bold text-lg text-foreground mb-1">{pillar.title}</h3>
      <p className="text-xs text-muted-foreground mb-4 font-medium">{pillar.subtitle}</p>
      <ul className="flex flex-col gap-2.5">
        {pillar.points.map((point) => (
          <li key={point} className="text-sm text-muted-foreground flex items-start gap-2">
            <span className="w-1.5 h-1.5 rounded-full bg-primary shrink-0 mt-1.5" />
            {point}
          </li>
        ))}
      </ul>
    </div>
  );
}
