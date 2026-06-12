"use client";

import { useState } from "react";
import { ChevronDown, HelpCircle, MessageCircle, Sparkles, Star, Shield } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import { formatBrandText } from "@/components/ui/BrandText";

const faqs = [
  {
    q: "Why should businesses provide phones as office assets?",
    a: "Just as companies issue laptops, providing employees with a dedicated business phone is a smart operational decision. Your IT team gets full control — enforce security policies, remotely wipe data if a device is lost, and keep personal and work data cleanly separated via Android Work Profiles. Productivity improves because employees aren't juggling two devices or mixing personal apps with work calls. From a financial standpoint, phones purchased as business assets are eligible for depreciation under Indian tax law, reducing your effective cost. TaxPrint & Shivaami handles bulk procurement, zero-touch enrolment, and a 2-year protection plan — so the entire lifecycle is managed for you.",
  },
  {
    q: "What do the AI Productivity Workshops include?",
    a: "Our workshops are hands-on sessions (online or in-person in Mumbai) where your team learns to use Gemini Live, Call Assist, Magic Cue, and Camera Coach in real work scenarios. Sessions are customized to your industry and use case — typically 2–3 hours.",
  },
  {
    q: "How does the 2-year protection plan work?",
    a: "The TaxPrint & Shivaami business protection plan covers accidental water damage for 2 full years from purchase. Simply file a claim through our support team — we handle the replacement or repair process end-to-end so your team stays productive without interruption.",
  },
  {
    q: "What is zero-touch deployment?",
    a: "Zero-touch deployment means your Pixel devices arrive pre-enrolled and configured for your company's apps, email, and security policies. Employees simply turn on the device and sign in — no IT setup time required. Works seamlessly with Google Workspace.",
  },    
  {
    q: "How do I place an order through the marketplace?",
    a: "Use our Marketplace to select your Pixel model(s), choose colors and quantities, and place your order online. You can pay immediately via UPI, card, or net banking — or request a corporate invoice and pay via payment link after we review your order.",
  },
  {
    q: "How do I get corporate / SMB pricing?",
    a: "Pricing is based on your team size and the models you choose. Contact us via WhatsApp or email at pixel@shivaami.com with your team count and model preferences — we'll send you a custom quote within 24 hours. Volume discounts apply from 5 devices and above.",
  },
  
];

export default function FAQSection() {
  const [open, setOpen] = useState<number | null>(0);
  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="faq" className="relative py-28 bg-[#F5F0FF] overflow-hidden">
      {/* Floating icons */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <HelpCircle className="absolute top-16 left-12 w-9 h-9 text-[#7C3AED]/30 animate-float" style={{ animationDelay: "0s" }} />
        <Sparkles className="absolute top-24 right-20 w-8 h-8 text-[#4285F4]/30 animate-float-slow" style={{ animationDelay: "0.7s" }} />
        <Star className="absolute bottom-28 left-1/3 w-8 h-8 text-[#FBBC05]/38 animate-float-reverse" style={{ animationDelay: "0.4s" }} />
        <MessageCircle className="absolute bottom-16 right-20 w-8 h-8 text-[#1E8E3E]/28 animate-float" style={{ animationDelay: "1.3s" }} />
        <Shield className="absolute top-1/2 left-8 w-7 h-7 text-[#EA4335]/22 animate-float-slow" style={{ animationDelay: "1.8s" }} />
      </div>

      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header */}
        <div
          ref={ref as React.RefObject<HTMLDivElement>}
          className={`text-center mb-16 reveal ${isVisible ? "visible" : ""}`}
        >
          <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
            FAQ
          </p>
          <h2 className="text-3xl sm:text-5xl font-bold text-foreground mb-4">
            Common questions
          </h2>
          <p className="text-muted-foreground text-lg">
            Everything you need to know before getting started.
          </p>
        </div>

        {/* Accordion */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          {faqs.map((faq, i) => (
            <FAQItem key={i} faq={faq} index={i} open={open} setOpen={setOpen} />
          ))}
        </div>

        <p className="text-center text-sm text-muted-foreground mt-10">
          Still have questions?{" "}
          <a href="mailto:pixel@shivaami.com" className="text-primary hover:underline font-medium">
            Email us
          </a>{" "}
          or{" "}
          <a
            href="https://wa.me/919022223600"
            target="_blank"
            rel="noopener noreferrer"
            className="text-primary hover:underline font-medium"
          >
            WhatsApp us
          </a>
          .
        </p>
      </div>
    </section>
  );
}

function FAQItem({
  faq,
  index,
  open,
  setOpen,
}: {
  faq: { q: string; a: string };
  index: number;
  open: number | null;
  setOpen: (i: number | null) => void;
}) {
  const { ref, isVisible } = useInView(0.1);
  const isOpen = open === index;

  return (
    <div
      ref={ref as React.RefObject<HTMLDivElement>}
      className={`reveal delay-${[0, 100, 200, 300, 400, 500][index] ?? 0} ${isVisible ? "visible" : ""} bg-white border border-border/50 rounded-2xl overflow-hidden hover:border-primary/25 hover:shadow-md transition-all duration-200`}
    >
      <button
        onClick={() => setOpen(isOpen ? null : index)}
        className="w-full flex items-center justify-between px-6 py-5 text-left gap-4 hover:bg-muted/20 transition-colors"
      >
        <span className="font-semibold text-base text-foreground">{faq.q}</span>
        <ChevronDown
          className={`w-5 h-5 text-muted-foreground shrink-0 transition-transform duration-200 ${isOpen ? "rotate-180 text-primary" : ""}`}
        />
      </button>
      {isOpen && (
        <div className="px-6 pb-5 border-t border-border/30">
          <p className="text-muted-foreground leading-relaxed pt-4">{formatBrandText(faq.a)}</p>
        </div>
      )}
    </div>
  );
}
