"use client";

import { useInView } from "@/hooks/useInView";
import { Sparkles } from "lucide-react";

export default function ProductCatalogHero() {
  const { ref, isVisible } = useInView(0.1);

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-[#e1e6f8] via-[#F5F7FF] to-[#d4f3d7] pt-32 pb-20 sm:py-28">
  
  {/* Background glow */}
  <div className="absolute top-[-100px] left-[20%] w-[400px] h-[400px] bg-primary/10 rounded-full blur-3xl" />
  <div className="absolute bottom-[-80px] right-[15%] w-[300px] h-[300px] bg-purple-300/20 rounded-full blur-3xl" />

  {/* Main container */}
  <div className="relative max-w-7xl mx-auto px-6 lg:px-12 flex flex-col md:flex-row items-center gap-14">

    {/* LEFT: TEXT */}
    <div className="w-full md:w-1/2 text-center md:text-left">
      
      {/* Label */}
      <div className="inline-flex items-center gap-2 bg-white/70 border border-border/60 rounded-full px-4 py-1.5 mb-6 backdrop-blur-sm shadow-sm">
        <Sparkles className="w-3.5 h-3.5 text-primary animate-pulse" />
        <span className="text-xs font-semibold text-primary uppercase tracking-wider">
          Pixel for Business
        </span>
      </div>

      {/* Heading */}
      <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold leading-tight text-foreground mb-6">
        Find the right Pixel
        <br />
        <span className="text-primary">for your business</span>
      </h1>

      {/* Subtext */}
      <p className="text-lg sm:text-xl text-muted-foreground leading-relaxed max-w-xl mx-auto md:mx-0 mb-8">
        The only phone that brings the best of Google&apos;s hardware, software, and Gemini — built with enterprise in mind.
      </p>

      {/* Trust pills */}
      <div className="flex flex-wrap justify-center md:justify-start gap-3">
        {[
          "#1 Security Rating",
          "Gemini AI built-in",
          "Made in India",
          
        ].map((pill) => (
          <span
            key={pill}
            className="text-sm text-muted-foreground bg-blue-100 border border-border/50 rounded-full px-4 py-1.5 backdrop-blur-sm shadow-sm"
          >
            {pill}
          </span>
        ))}
      </div>
    </div>

    {/* RIGHT: VIDEO */}
    <div className="w-full md:w-1/2 relative">
      
      {/* Glass card effect */}
      <div className="relative rounded-3xl overflow-hidden shadow-2xl border border-white/40 backdrop-blur-xl">
        
        {/* Subtle gradient overlay */}
        <div className="absolute inset-0 bg-gradient-to-tr from-black/10 via-transparent to-white/10 pointer-events-none z-10" />

        <video
          className="w-full h-full object-cover"
          autoPlay
          loop
          muted
          playsInline
          src="/assets/producthero.mp4"
        />
      </div>
    </div>
  </div>
</section>
    
  );
}


