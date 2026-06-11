"use client";

import { useState, useRef, useEffect } from "react";
import Script from "next/script";
import { Button } from "@/components/ui/button";
import { MessageCircle, Mail, Phone, ArrowRight, Send, Sparkles, Star, Headphones, Copy, Check, ExternalLink } from "lucide-react";
import { useInView } from "@/hooks/useInView";
import ReCAPTCHA from "react-google-recaptcha";

export default function ContactCTA() {
  const [form, setForm] = useState({
    name: "",
    company: "",
    email: "",
    phone: "",
    message: "",
  });
  const [errors, setErrors] = useState<{ phone?: string }>({});
  const [captchaToken, setCaptchaToken] = useState<string | null>(null);
  const recaptchaRef = useRef<ReCAPTCHA>(null);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [sent, setSent] = useState(false);

  const [showEmailOptions, setShowEmailOptions] = useState(false);
  const [copied, setCopied] = useState(false);
  const [isMobile, setIsMobile] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    setIsMobile(/Mobi|Android|iPhone/i.test(navigator.userAgent));
    
    function handleClickOutside(event: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setShowEmailOptions(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleCopy = () => {
    navigator.clipboard.writeText("pixel@shivaami.com");
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setApiError(null);

    // Validation
    const cleanPhone = form.phone.replace(/\s/g, "");
    if (!form.phone.trim() || !/^\d{10}$/.test(cleanPhone)) {
      setErrors({ phone: "10-digit phone number required" });
      return;
    }

    if (!captchaToken) {
      setApiError("Please complete the reCAPTCHA verification.");
      return;
    }

    setErrors({});
    setSubmitting(true);

    try {
      const res = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ ...form, captchaToken }),
      });

      const data = await res.json();
      if (!res.ok) {
        throw new Error(data.error ?? "Failed to send enquiry. Please try again.");
      }

      setSent(true);
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } catch (err: any) {
      setApiError(err.message || "Failed to submit enquiry.");
      recaptchaRef.current?.reset();
      setCaptchaToken(null);
    } finally {
      setSubmitting(false);
    }
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

              {isMobile ? (
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
              ) : (
                <div className="relative" ref={dropdownRef}>
                  <button
                    onClick={() => setShowEmailOptions(!showEmailOptions)}
                    className="w-full flex items-center gap-4 p-4 bg-white rounded-2xl border border-border/60 hover:border-primary/40 hover:shadow-sm transition-all group text-left"
                  >
                    <div className="w-10 h-10 rounded-full bg-[#D2E3FC] flex items-center justify-center shrink-0">
                      <Mail className="w-5 h-5 text-primary" />
                    </div>
                    <div>
                      <p className="font-semibold text-sm text-foreground">Email</p>
                      <p className="text-sm text-muted-foreground">pixel@shivaami.com</p>
                    </div>
                    <ArrowRight className={`w-4 h-4 text-muted-foreground ml-auto group-hover:text-primary transition-all duration-200 ${
                      showEmailOptions ? "rotate-90 text-primary" : "group-hover:translate-x-0.5"
                    }`} />
                  </button>

                  {/* Dropdown Options */}
                  {showEmailOptions && (
                    <div className="absolute top-[calc(100%+8px)] left-0 right-0 z-50 p-2 bg-white rounded-2xl border border-border/80 shadow-lg animate-in fade-in slide-in-from-top-2 duration-200">
                      <div className="flex flex-col gap-1">
                        <a
                          href="https://mail.google.com/mail/?view=cm&fs=1&to=pixel@shivaami.com"
                          target="_blank"
                          rel="noopener noreferrer"
                          onClick={() => setShowEmailOptions(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-foreground group/item"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#EA4335]/10 flex items-center justify-center text-[#EA4335] shrink-0 font-bold text-xs">
                            G
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-xs text-foreground">Compose in Gmail</p>
                            <p className="text-[10px] text-muted-foreground">Opens in a new browser tab</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/item:text-[#EA4335] transition-colors" />
                        </a>

                        <a
                          href="mailto:pixel@shivaami.com"
                          onClick={() => setShowEmailOptions(false)}
                          className="flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-foreground group/item"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#4285F4]/10 flex items-center justify-center text-[#4285F4] shrink-0">
                            <Mail className="w-4 h-4" />
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-xs text-foreground">Open Default Mail App</p>
                            <p className="text-[10px] text-muted-foreground">Outlook, Mail, or system client</p>
                          </div>
                          <ExternalLink className="w-3.5 h-3.5 text-muted-foreground group-hover/item:text-[#4285F4] transition-colors" />
                        </a>

                        <button
                          onClick={handleCopy}
                          className="w-full flex items-center gap-3 p-3 rounded-xl hover:bg-slate-50 transition-colors text-sm font-medium text-foreground text-left group/item"
                        >
                          <div className="w-7 h-7 rounded-lg bg-[#F9AB00]/10 flex items-center justify-center text-[#F9AB00] shrink-0">
                            {copied ? <Check className="w-4 h-4 text-[#1E8E3E]" /> : <Copy className="w-4 h-4" />}
                          </div>
                          <div className="flex-1">
                            <p className="font-semibold text-xs text-foreground">{copied ? "Copied!" : "Copy Email Address"}</p>
                            <p className="text-[10px] text-muted-foreground">{copied ? "Address copied to clipboard" : "Copy to clipboard directly"}</p>
                          </div>
                        </button>
                      </div>
                    </div>
                  )}
                </div>
              )}

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
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:opacity-60"
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
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:opacity-60"
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
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:opacity-60"
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-foreground mb-1.5">
                    Mobile Number
                  </label>
                  <input
                    type="tel"
                    required
                    value={form.phone}
                    onChange={(e) => {
                      setForm({ ...form, phone: e.target.value });
                      setErrors((prev) => ({ ...prev, phone: undefined }));
                    }}
                    placeholder="9876543210"
                    disabled={submitting}
                    className={`w-full px-4 py-3 rounded-xl border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition disabled:opacity-60 ${
                      errors.phone ? "border-destructive focus:ring-destructive/40" : "border-border"
                    }`}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-destructive">{errors.phone}</p>
                  )}
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
                    disabled={submitting}
                    className="w-full px-4 py-3 rounded-xl border border-border bg-background text-sm focus:outline-none focus:ring-2 focus:ring-primary/40 transition resize-none disabled:opacity-60"
                  />
                </div>
                <div className="flex justify-center py-2">
                  <ReCAPTCHA
                    ref={recaptchaRef}
                    sitekey={process.env.NEXT_PUBLIC_CAPTCHA_SITE_KEY!}
                    onChange={(token) => {
                      setCaptchaToken(token);
                      setApiError(null);
                    }}
                  />
                </div>
                {apiError && (
                  <p className="text-xs text-center text-destructive font-medium">{apiError}</p>
                )}
                <Button
                  type="submit"
                  disabled={submitting}
                  className="w-full h-12 rounded-xl bg-primary hover:bg-primary/90 font-semibold text-base gap-2 disabled:opacity-60"
                >
                  {submitting ? "Sending..." : "Send Enquiry"}
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
