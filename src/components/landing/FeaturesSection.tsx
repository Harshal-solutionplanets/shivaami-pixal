"use client";

import Image from "next/image";
import { Badge } from "@/components/ui/badge";
import { Mic2, Phone, Wand2, Camera, Sparkles, Star, BrainCircuit, Zap, Battery, Cpu, Shield } from "lucide-react";
import { useInView } from "@/hooks/useInView";

const features = [
  {
    icon: Mic2,
    name: "Gemini Live",
    tagline: "Your AI assistant that listens and acts",
    description:
      "Have natural, real-time voice conversations with Gemini. Draft emails, summarize meetings, or answer complex business questions — hands-free while you work.",
    color: "#D2E3FC",
    iconColor: "#4285F4",
    tag: "AI",
  },
  {
    icon: Phone,
    name: "Call Assist",
    tagline: "Never miss what matters in a call",
    description:
      "Get live call transcripts, automatic summaries, and AI-suggested follow-ups after every business call. Stay present in the conversation while Pixel takes notes.",
    color: "#E6F4EA",
    iconColor: "#1E8E3E",
    tag: "Productivity",
  },
  {
    icon: Wand2,
    name: "Magic Cue",
    tagline: "Smart prompts exactly when you need them",
    description:
      "Context-aware suggestions that surface the right action at the right time — whether you're in a meeting, reviewing a document, or replying to a message.",
    color: "#E8D5FF",
    iconColor: "#7C3AED",
    tag: "Smart",
  },
  {
    icon: Camera,
    name: "Camera Coach",
    tagline: "Professional photos, zero photography skills",
    description:
      "Real-time coaching that helps anyone on your team capture great product shots, event photos, or executive portraits that look genuinely professional.",
    color: "#FEF0CD",
    iconColor: "#F9AB00",
    tag: "Camera",
  },
];

const hardwareFeatures = [
  {
    icon: Camera,
    name: "AI Camera",
    description: "Camera Coach, Add Me, Magic Eraser - every photo is stunning",
    color: "#E8F0FE",
    iconColor: "#1A73E8",
  },
  {
    icon: Battery,
    name: "30+ Hours Battery",
    description: "All-day power with fast charging and wireless charging",
    color: "#E6F4EA",
    iconColor: "#1E8E3E",
  },
  {
    icon: Cpu,
    name: "Tensor G5 Chip",
    description: "Next-gen chip built by Google for peak AI performance",
    color: "#FCE8E6",
    iconColor: "#D93025",
  },
  {
    icon: Shield,
    name: "Titan M2 Security",
    description: "7 years of updates, IP68 water resistance, built to last",
    color: "#FEF0CD",
    iconColor: "#F9AB00",
  },
];

export default function FeaturesSection() {
  const { ref: headerRef, isVisible: headerVisible } = useInView(0.1);

  return (
    <section id="features" className="relative py-28 bg-[#F2FFF7] overflow-hidden">
      {/* Floating icons */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <Mic2 className="absolute top-14 left-10 w-8 h-8 text-[#1E8E3E]/30 animate-float" style={{ animationDelay: "0.3s" }} />
        <Sparkles className="absolute top-24 right-20 w-9 h-9 text-[#7C3AED]/30 animate-float-slow" style={{ animationDelay: "0.8s" }} />
        <BrainCircuit className="absolute bottom-32 left-1/4 w-8 h-8 text-[#4285F4]/30 animate-float-reverse" style={{ animationDelay: "1.2s" }} />
        <Star className="absolute bottom-20 right-12 w-7 h-7 text-[#FBBC05]/40 animate-float" style={{ animationDelay: "0.5s" }} />
        <Camera className="absolute top-1/2 right-8 w-8 h-8 text-[#F9AB00]/30 animate-float-slow" style={{ animationDelay: "1.8s" }} />
        <Zap className="absolute top-1/3 left-1/3 w-6 h-6 text-[#34A853]/25 animate-float-reverse" style={{ animationDelay: "0.6s" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">

        {/* Header */}
        <div
          ref={headerRef as React.RefObject<HTMLDivElement>}
          className={`text-center mb-20 reveal ${headerVisible ? "visible" : ""}`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            Built-in AI Features
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Google AI that works{" "}
            <span className="text-primary">for your business</span>
          </h2>
          <p className="max-w-2xl mx-auto text-muted-foreground text-lg">
            Every Pixel 10 comes with a suite of intelligent features designed to
            save your team hours every week.
          </p>
        </div>

        {/* Big Lifestyle Image Banner */}
        <LifestyleBanner />

        {/* Feature Grid */}
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 gap-6">
          {features.map((feature, i) => (
            <FeatureCard key={feature.name} feature={feature} index={i} />
          ))}
        </div>

        {/* Hardware Specs Row */}
        <div className="mt-8 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
          {hardwareFeatures.map((hw, i) => (
            <HardwareCard key={hw.name} hw={hw} index={i} />
          ))}
        </div>
      </div>
    </section>
  );
}

function LifestyleBanner() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal ${isVisible ? "visible" : ""} relative rounded-3xl overflow-hidden h-72 sm:h-96 group`}
    >
      {/* Background image */}
      <Image
        src="/assets/pixel-hero-duo.png"
        alt="Google Pixel 10 series for business"
        fill
        className="object-cover object-center group-hover:scale-105 transition-transform duration-700"
        sizes="(max-width: 1280px) 100vw, 1280px"
      />
      {/* Overlay */}
      <div className="absolute inset-0 bg-linear-to-r from-[#1a1a2e]/80 via-[#1a1a2e]/40 to-transparent" />

      {/* Content */}
      <div className="absolute inset-0 flex flex-col justify-center px-8 sm:px-14">
        <div className="flex items-center gap-2 mb-4">
          <Sparkles className="w-5 h-5 text-[#FBBC05]" />
          <span className="text-sm font-semibold text-white/80 uppercase tracking-wider">
            Powered by Gemini
          </span>
        </div>
        <h3 className="text-3xl sm:text-4xl font-bold text-white max-w-md leading-tight mb-4">
          Ask more of your phone.
        </h3>
        <p className="text-white/70 max-w-sm text-sm sm:text-base leading-relaxed">
          Every Pixel 10 comes with Google AI built in — not an add-on, not a subscription.
        </p>
      </div>

      {/* Floating chips on the banner */}
      <div className="absolute bottom-6 right-6 flex flex-col gap-2">
        {["Gemini Live", "Call Assist", "Magic Cue"].map((label, i) => (
          <span
            key={label}
            className="bg-mauve-400 backdrop-blur text-mauve-950 text-xs font-medium px-3 py-1.5 rounded-full border border-white/20 animate-float"
            style={{ animationDelay: `${i * 0.4}s` }}
          >
            {label}
          </span>
        ))}
      </div>
    </div>
  );
}

function FeatureCard({
  feature,
  index,
}: {
  feature: (typeof features)[0];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.1);
  const Icon = feature.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal delay-${[0, 200, 100, 300][index] ?? 0} ${isVisible ? "visible" : ""} group flex gap-5 items-start bg-white rounded-3xl p-6 sm:p-8 border border-border/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300`}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 group-hover:scale-110 transition-transform duration-300"
        style={{ background: feature.color }}
      >
        <Icon className="w-7 h-7" style={{ color: feature.iconColor }} />
      </div>

      <div className="flex-1 min-w-0">
        <div className="flex items-center gap-2 mb-1">
          <Badge variant="outline" className="text-xs rounded-full border-border px-2 py-0.5">
            {feature.tag}
          </Badge>
          <h3 className="font-bold text-base text-foreground">{feature.name}</h3>
        </div>
        <p className="font-medium text-primary text-sm mb-2">{feature.tagline}</p>
        <p className="text-sm text-muted-foreground leading-relaxed">{feature.description}</p>
      </div>
    </div>
  );
}

function HardwareCard({
  hw,
  index,
}: {
  hw: (typeof hardwareFeatures)[0];
  index: number;
}) {
  const { ref, isVisible } = useInView(0.1);
  const Icon = hw.icon;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal delay-${[0, 100, 200, 300][index] ?? 0} ${isVisible ? "visible" : ""} group bg-white rounded-3xl p-6 border border-border/60 hover:shadow-lg hover:shadow-primary/5 hover:-translate-y-1 hover:border-primary/20 transition-all duration-300 flex flex-col items-center text-center`}
    >
      <div
        className="w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 mb-4 group-hover:scale-110 transition-transform duration-300"
        style={{ background: hw.color }}
      >
        <Icon className="w-7 h-7" style={{ color: hw.iconColor }} />
      </div>
      <h4 className="font-bold text-base text-foreground mb-2">{hw.name}</h4>
      <p className="text-sm text-muted-foreground leading-relaxed">{hw.description}</p>
    </div>
  );
}
