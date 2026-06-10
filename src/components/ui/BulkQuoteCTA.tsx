import Link from "next/link";
import { ArrowRight } from "lucide-react";

export default function BulkQuoteCTA() {
  return (
    <div className="mt-16 text-center max-w-3xl mx-auto px-4 py-8 relative z-10" style={{ animation: "slide-up 0.8s ease both" }}>
      <h3 className="text-3xl sm:text-4xl font-extrabold text-[#1a1a2e] tracking-tight mb-2">
        Your Team Deserves Smarter Tools.
      </h3>
      <p className="text-3xl sm:text-4xl font-extrabold text-[#00A5FF] tracking-tight mb-6">
        Let&apos;s Make It Happen.
      </p>
      <p className="text-muted-foreground text-sm sm:text-base max-w-xl mx-auto mb-8 leading-relaxed">
        Get exclusive SMB pricing, GST benefits, and a dedicated Shivaami account manager, all in one call.
      </p>
      <div>
        <Link
          href="/#contact"
          className="inline-flex items-center justify-center gap-2 bg-[#00A5FF] hover:bg-[#0094E0] text-white text-sm sm:text-base font-bold px-8 py-4 rounded-full shadow-lg shadow-[#00A5FF]/20 hover:shadow-xl hover:shadow-[#00A5FF]/30 hover:-translate-y-0.5 active:translate-y-0 transition-all duration-200"
        >
          Get a Bulk Quote Today
          <ArrowRight className="w-4 h-4" />
        </Link>
      </div>
    </div>
  );
}
