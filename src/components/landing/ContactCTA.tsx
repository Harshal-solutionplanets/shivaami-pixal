"use client";

import { useState } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, ArrowRight, Send, Sparkles, Star, Headphones } from "lucide-react";
import { useInView } from "@/hooks/useInView";

export default function ContactCTA() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    message: "",
  });
  const [sent, setSent] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const subject = encodeURIComponent(`Pixel for Business Enquiry — ${form.company}`);
    const body = encodeURIComponent(
      `Name: ${form.name}\nCompany: ${form.company}\nEmail: ${form.email}\n\nMessage:\n${form.message}`
    );
    window.open(`mailto:pixel@shivaami.com?subject=${subject}&body=${body}`);
    setSent(true);
  };

  const { ref, isVisible } = useInView(0.1);

  return (
    <section id="contact" className="relative py-28 bg-[#EEF2FF] overflow-hidden">
      <Script
        src="https://js-na2.hsforms.net/forms/embed/246441264.js"
        strategy="afterInteractive"
      />
      {/* Floating icons */}
      <div aria-hidden className="absolute inset-0 pointer-events-none overflow-hidden">
        <Mail className="absolute top-14 left-16 w-9 h-9 text-[#4285F4]/30 animate-float" style={{ animationDelay: "0.1s" }} />
        <MessageCircle className="absolute top-28 right-14 w-8 h-8 text-[#1E8E3E]/30 animate-float-slow" style={{ animationDelay: "0.8s" }} />
        <Headphones className="absolute bottom-24 left-1/4 w-9 h-9 text-[#7C3AED]/28 animate-float-reverse" style={{ animationDelay: "0.5s" }} />
        <Star className="absolute bottom-16 right-24 w-7 h-7 text-[#FBBC05]/38 animate-float" style={{ animationDelay: "1.4s" }} />
        <Sparkles className="absolute top-1/2 right-1/3 w-8 h-8 text-[#EA4335]/22 animate-float-slow" style={{ animationDelay: "1.1s" }} />
        <Phone className="absolute top-1/3 left-8 w-7 h-7 text-[#F9AB00]/30 animate-float-reverse" style={{ animationDelay: "0.6s" }} />
      </div>
      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-start">
          {/* Left — CTA copy */}
          <div ref={ref as React.RefObject<HTMLDivElement>} className={`reveal ${isVisible ? "visible" : ""}`}>
            <p className="text-sm font-semibold text-primary uppercase tracking-wider mb-3">
              Get in Touch
            </p>
            <h2 className="text-3xl sm:text-4xl font-bold text-foreground mb-6">
              Ready to equip your team with Pixel?
            </h2>
            <p className="text-muted-foreground text-lg mb-10 leading-relaxed">
              Talk to our business team for a custom quote, demo, or to learn
              more about the Pixel for Business plan. We respond within 24 hours.
            </p>

            {/* Contact Methods */}
            <div className="space-y-4">
              <a
                href="https://wa.me/919022223600?text=Hi%20tax%20print%20%26%20shivaami%2C%20I%27m%20interested%20in%20Google%20Pixel%20for%20Business"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/60 hover:border-[#25D366]/40 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#E6F4EA] flex items-center justify-center shrink-0">
                  <MessageCircle className="w-5 h-5 text-[#1E8E3E]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">WhatsApp</p>
                  <p className="text-sm text-muted-foreground">+91 90 2222 3600</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-[#25D366] group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="mailto:pixel@shivaami.com"
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#D2E3FC] flex items-center justify-center shrink-0">
                  <Mail className="w-5 h-5 text-primary" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Email</p>
                  <p className="text-sm text-muted-foreground">pixel@shivaami.com</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary group-hover:translate-x-0.5 transition-all" />
              </a>

              <a
                href="tel:+919022223600"
                className="flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-sm transition-all group"
              >
                <div className="w-10 h-10 rounded-full bg-[#FEF0CD] flex items-center justify-center shrink-0">
                  <Phone className="w-5 h-5 text-[#F9AB00]" />
                </div>
                <div>
                  <p className="font-semibold text-sm text-foreground">Call Us</p>
                  <p className="text-sm text-muted-foreground">+91 90 2222 3600</p>
                </div>
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto group-hover:text-[#F9AB00] group-hover:translate-x-0.5 transition-all" />
              </a>
            </div>
          </div>

          {/* Right — Enquiry Form */}
          <div className="bg-white rounded-3xl border border-border/60 p-8 shadow-sm">
            {sent ? (
              <div className="text-center py-12">
                <div className="w-16 h-16 rounded-full bg-[#E6F4EA] flex items-center justify-center mx-auto mb-4">
                  <Send className="w-8 h-8 text-[#1E8E3E]" />
                </div>
                <h3 className="font-bold text-xl text-foreground mb-2">Message sent!</h3>
                <p className="text-muted-foreground">
                  We&apos;ll get back to you within 24 hours at {form.email}.
                </p>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-5">
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Your Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.name}
                    onChange={(e) => setForm({ ...form, name: e.target.value })}
                    placeholder="Rahul Sharma"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Company Name
                  </label>
                  <input
                    type="text"
                    required
                    value={form.company}
                    onChange={(e) => setForm({ ...form, company: e.target.value })}
                    placeholder="Acme Pvt. Ltd."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Work Email
                  </label>
                  <input
                    type="email"
                    required
                    value={form.email}
                    onChange={(e) => setForm({ ...form, email: e.target.value })}
                    placeholder="rahul@acme.com"
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Message
                  </label>
                  <textarea
                    rows={4}
                    required
                    value={form.message}
                    onChange={(e) => setForm({ ...form, message: e.target.value })}
                    placeholder="I'm interested in getting Pixel 10 Pro for a team of 20 people..."
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none"
                  />
                </div>
                <Button
                  type="submit"
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold text-base gap-2"
                >
                  Send Enquiry
                  <Send className="w-4 h-4" />
                </Button>
                <p className="text-xs text-center text-muted-foreground">
                  We&apos;ll respond within 24 hours. No spam, ever.
                </p>
              </form>
            )}
          </div>
        </div>
      </div>
    </section>
  );
}
