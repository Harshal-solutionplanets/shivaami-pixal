"use client";

import { Suspense, useState, useEffect } from "react";
import Link from "next/link";
import Navbar from "@/components/layout/Navbar";
import BrandText from "@/components/ui/BrandText";
import Footer from "@/components/layout/Footer";
import { buttonVariants } from "@/components/ui/button";
import { cn } from "@/lib/utils";
import { Sparkles } from "lucide-react";

function EnquiryConfirmationContent() {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);

  useEffect(() => {
    if (typeof window !== "undefined") {
      const isLegit = sessionStorage.getItem("legit_enquiry_success");
      if (!isLegit) {
        window.location.replace("/not-found");
      } else {
        sessionStorage.removeItem("legit_enquiry_success");
        setIsVerified(true);
      }
    }
  }, []);

  if (isVerified === null) {
    return <div className="min-h-screen bg-background" />;
  }

  return (
    <div className="min-h-[80vh] flex items-center justify-center px-4 py-16">
      <div className="max-w-lg w-full text-center">
        {/* Success icon */}
        <div className="w-24 h-24 rounded-2xl bg-emerald-50 text-emerald-600 flex items-center justify-center mx-auto mb-8 animate-float">
          <Sparkles className="w-12 h-12" />
        </div>

        <div className="mb-10">
          <h1 className="text-3xl font-bold text-foreground mb-4">
            Enquiry Received!
          </h1>
          <p className="text-muted-foreground text-base leading-relaxed max-w-md mx-auto">
            Thank you for reaching out. A Google Pixel B2B specialist from our team will contact you shortly.
          </p>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 max-w-sm mx-auto">
          <Link
            href="/"
            className={cn(
              buttonVariants({ variant: "default" }),
              "rounded-xl h-12 px-6 flex-1 text-center justify-center font-semibold text-base"
            )}
          >
            Back to Home
          </Link>
          <Link
            href="/#contact"
            className={cn(
              buttonVariants({ variant: "outline" }),
              "rounded-xl h-12 px-6 flex-1 text-center justify-center font-semibold text-base"
            )}
          >
            Send Another Enquiry
          </Link>
        </div>

        {/* Contact info footer */}
        <p className="text-center text-xs text-muted-foreground mt-8">
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

export default function EnquiryConfirmationPage() {
  return (
    <>
      <Navbar />
      <main>
        <Suspense fallback={<div className="min-h-[80vh]" />}>
          <EnquiryConfirmationContent />
        </Suspense>
      </main>
      <Footer />
    </>
  );
}
