"use client";

import { Suspense } from "react";
import { useSearchParams } from "next/navigation";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import BrandText from "@/components/ui/BrandText";
import Footer from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";

const NEXT_STEPS = [
  "Our business team will call you within 2 hours (Mon–Sat, 10 am–7 pm IST)",
  "You'll receive a detailed quote with final pricing and delivery timeline",
  "Zero-touch deployment configuration and IT onboarding discussion",
  "Pan-India delivery across 12,000+ pin codes — fully insured",
];

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const orderId = searchParams.get("order");
  const shortId = orderId ? orderId.slice(0, 8).toUpperCase() : "—";
  const waMessage = encodeURIComponent(
    `Hi, I just placed a B2B Pixel order on tax print & shivaami. My order ID is ${shortId}.`
  );

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-full bg-accent flex items-center justify-center mx-auto mb-8 animate-float">
          <svg
            className="w-12 h-12 text-emerald-600"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M5 13l4 4L19 7"
            />
          </svg>
        </div>

        <div className="text-center mb-8">
          <h1 className="text-3xl font-bold text-foreground mb-2">
            Order Received!
          </h1>
          <p className="text-muted-foreground mb-3">
            Thank you for choosing <BrandText />  for your team&apos;s Pixel upgrade.
          </p>
          {orderId && (
            <div className="inline-flex items-center gap-2 bg-muted/50 rounded-full px-4 py-2">
              <span className="text-xs text-muted-foreground">Order ID:</span>
              <span className="font-mono text-sm font-bold text-foreground">
                {shortId}
              </span>
            </div>
          )}
        </div>

        {/* What happens next */}
        <div className="bg-white rounded-3xl border border-border/60 shadow-sm p-6 mb-8">
          <h2 className="font-bold text-foreground mb-5">What happens next?</h2>
          <ol className="flex flex-col gap-4">
            {NEXT_STEPS.map((step, i) => (
              <li key={i} className="flex gap-3">
                <span className="w-6 h-6 rounded-full bg-primary text-white text-xs font-bold flex items-center justify-center shrink-0 mt-0.5">
                  {i + 1}
                </span>
                <span className="text-sm text-muted-foreground leading-relaxed">
                  {step}
                </span>
              </li>
            ))}
          </ol>
        </div>

        {/* CTAs */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-full px-6 flex-1 text-center justify-center"
            )}
          >
            Back to Home
          </Link>
          <a
            href={`https://wa.me/919022223600?text=${waMessage}`}
            target="_blank"
            rel="noopener noreferrer"
            className={cn(
              buttonVariants(),
              "rounded-full px-6 flex-1 text-center justify-center bg-primary text-white gap-2"
            )}
          >
            <svg
              className="w-4 h-4"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
            </svg>
            Chat on WhatsApp
          </a>
        </div>

        {/* Contact info */}
        <p className="text-center text-xs text-muted-foreground mt-6">
          Questions? Email{" "}
          <a
            href="mailto:pixel@shivaami.com"
            className="text-primary hover:underline"
          >
            pixel@shivaami.com
          </a>{" "}
          or call{" "}
          <a href="tel:+919022223600" className="text-primary hover:underline">
            +91 90 2222 3600
          </a>
        </p>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <ConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
