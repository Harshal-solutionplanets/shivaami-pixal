import Link from "next/link";
import { buttonVariants } from "@/components/ui/button";
import Navbar from "@/components/layout/Navbar";
import Footer from "@/components/layout/Footer";
import {
  Home,
  ArrowRight,
  MessageCircle,
  Sparkles,
  Rocket,
  Star,
  ShoppingBag,
  Wrench,
  Zap,
  BrainCircuit,
} from "lucide-react";
import { cn } from "@/lib/utils";

const comingSoonPages = [
  {
    label: "Marketplace",
    href: "/marketplace",
    description: "Browse & order all 4 Pixel 10 models",
    icon: ShoppingBag,
    color: "#D2E3FC",
    iconColor: "#4285F4",
  },
  {
    label: "Product Catalog",
    href: "/products",
    description: "Explore specs, colors, and comparisons",
    icon: Sparkles,
    color: "#E8D5FF",
    iconColor: "#7C3AED",
  },
  {
    label: "Individual Products",
    href: "/products/pixel-10",
    description: "Pixel 10a · 10 · 10 Pro · 10 Pro Max",
    icon: Zap,
    color: "#CEEAD6",
    iconColor: "#1E8E3E",
  },
];

export default function NotFound() {
  return (
    <>
      <Navbar />
      <main className="relative min-h-screen flex items-center justify-center overflow-hidden bg-[#F5F0FF] pt-24">

        {/* Background blobs */}
        <div
          aria-hidden
          className="absolute -top-32 -left-32 w-96 h-96 rounded-full opacity-40 blur-3xl animate-pulse-glow pointer-events-none"
          style={{ background: "radial-gradient(circle, #ddd6fe 0%, transparent 70%)" }}
        />
        <div
          aria-hidden
          className="absolute -bottom-32 -right-32 w-96 h-96 rounded-full opacity-40 blur-3xl animate-pulse-glow pointer-events-none"
          style={{ background: "radial-gradient(circle, #bbf7d0 0%, transparent 70%)", animationDelay: "2s" }}
        />
        <div
          aria-hidden
          className="absolute top-1/2 right-1/4 w-64 h-64 rounded-full opacity-30 blur-3xl animate-pulse-glow pointer-events-none"
          style={{ background: "radial-gradient(circle, #c7d2fe 0%, transparent 70%)", animationDelay: "1s" }}
        />

        {/* Floating decorative icons */}
        <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
          <Sparkles className="absolute top-24 left-16 w-8 h-8 text-[#7C3AED]/30 animate-float" style={{ animationDelay: "0s" }} />
          <Star className="absolute top-36 right-24 w-7 h-7 text-[#FBBC05]/40 animate-float-slow" style={{ animationDelay: "0.8s" }} />
          <Rocket className="absolute bottom-40 left-20 w-8 h-8 text-[#4285F4]/28 animate-float-reverse" style={{ animationDelay: "0.4s" }} />
          <BrainCircuit className="absolute bottom-32 right-20 w-9 h-9 text-[#1E8E3E]/25 animate-float" style={{ animationDelay: "1.3s" }} />
          <Wrench className="absolute top-1/2 left-10 w-6 h-6 text-[#EA4335]/22 animate-float-slow" style={{ animationDelay: "1.8s" }} />
          <Zap className="absolute top-1/3 right-12 w-7 h-7 text-[#F9AB00]/30 animate-float-reverse" style={{ animationDelay: "0.6s" }} />
        </div>

        <div className="relative max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 py-20 text-center">

          {/* 404 Number */}
          <div className="relative inline-block mb-6">
            <span
              className="text-[10rem] sm:text-[14rem] font-black leading-none select-none"
              style={{
                background: "linear-gradient(135deg, #c4b5fd 0%, #93c5fd 50%, #6ee7b7 100%)",
                WebkitBackgroundClip: "text",
                WebkitTextFillColor: "transparent",
                backgroundClip: "text",
              }}
            >
              404
            </span>
            {/* Floating chip on the 4 */}
            <div className="absolute -top-4 -right-6 bg-white rounded-2xl shadow-lg px-3 py-2 flex items-center gap-2 animate-float" style={{ animationDelay: "0.5s" }}>
              <Wrench className="w-4 h-4 text-[#7C3AED]" />
              <span className="text-xs font-bold text-foreground">Building...</span>
            </div>
          </div>

          {/* Heading */}
          <h1 className="text-2xl sm:text-4xl font-bold text-foreground mb-4">
            This page is coming soon
          </h1>
          <p className="text-muted-foreground text-lg mb-4 max-w-md mx-auto leading-relaxed">
            We&apos;re actively building out the full platform. The landing page is live —
            the marketplace and product pages are on their way.
          </p>

          {/* Google-dot progress indicator */}
          <div className="flex justify-center gap-2 mb-12">
            <span className="w-2.5 h-2.5 rounded-full bg-[#4285F4] animate-pulse" />
            <span className="w-2.5 h-2.5 rounded-full bg-[#EA4335] animate-pulse" style={{ animationDelay: "0.2s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-[#FBBC05] animate-pulse" style={{ animationDelay: "0.4s" }} />
            <span className="w-2.5 h-2.5 rounded-full bg-[#34A853] animate-pulse" style={{ animationDelay: "0.6s" }} />
          </div>

          {/* Coming Soon Cards */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-12 text-left">
            {comingSoonPages.map((page) => {
              const Icon = page.icon;
              return (
                <div
                  key={page.label}
                  className="bg-white/70 backdrop-blur border border-border/50 rounded-2xl p-5 flex flex-col gap-3"
                >
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center"
                    style={{ background: page.color }}
                  >
                    <Icon className="w-5 h-5" style={{ color: page.iconColor }} />
                  </div>
                  <div>
                    <p className="font-semibold text-sm text-foreground">{page.label}</p>
                    <p className="text-xs text-muted-foreground mt-0.5">{page.description}</p>
                  </div>
                  <span className="text-xs font-medium text-[#7C3AED] bg-[#E8D5FF] px-2.5 py-1 rounded-full self-start">
                    Coming soon
                  </span>
                </div>
              );
            })}
          </div>

          {/* CTAs */}
          <div className="flex flex-col sm:flex-row items-center justify-center gap-3">
            <Link
              href="/"
              className={cn(
                buttonVariants({ size: "lg" }),
                "rounded-full px-8 h-12 text-base font-semibold bg-primary hover:bg-primary/90 text-white shadow-lg shadow-primary/20 gap-2 inline-flex items-center"
              )}
            >
              <Home className="w-4 h-4" />
              Back to Home
            </Link>
            <a
              href="https://wa.me/919022223600?text=Hi%20TaxPrint & Shivaami%2C%20I%27d%20like%20to%20order%20a%20Pixel%20for%20Business"
              target="_blank"
              rel="noopener noreferrer"
              className={cn(
                buttonVariants({ variant: "outline", size: "lg" }),
                "rounded-full px-8 h-12 text-base font-semibold gap-2 bg-white/70 backdrop-blur border-border inline-flex items-center hover:bg-white"
              )}
            >
              <MessageCircle className="w-4 h-4 text-[#25D366]" />
              Order via WhatsApp
            </a>
          </div>

          {/* Contact nudge */}
          <p className="mt-10 text-sm text-muted-foreground">
            Need to order now?{" "}
            <a href="mailto:pixel@shivaami.com" className="text-primary hover:underline font-medium">
              Email pixel@shivaami.com
            </a>{" "}
            or call{" "}
            <a href="tel:+919022223600" className="text-primary hover:underline font-medium">
              +91 90 2222 3600
            </a>
          </p>
        </div>
      </main>
      <Footer />
    </>
  );
}
