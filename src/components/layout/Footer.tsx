import Link from "next/link";
import { Mail, Phone, MessageCircle } from "lucide-react";
import Logo from "@/components/ui/Logo";
import BrandText, { TaxPrintText } from "@/components/ui/BrandText";

const productLinks = [
  { label: "Pixel 10a", href: "/products/pixel-10a" },
  { label: "Pixel 10", href: "/products/pixel-10" },
  { label: "Pixel 10 Pro XL", href: "/products/pixel-10-pro-xl" },
  { label: "Pixel 10 Pro Fold", href: "/products/pixel-10-pro-fold" },
];

const quickLinks = [
  { label: "Home", href: "/" },
  { label: "Products", href: "/products" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Contact", href: "/#contact" },
  { label: "FAQ", href: "/#faq" },
];

export default function Footer() {
  return (
    <footer className="bg-foreground text-background/80">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-10">
          {/* Brand */}
          <div className="lg:col-span-1">
            <Logo light className="mb-4" />
            <p className="text-sm leading-relaxed mb-4 text-background/60">
              Mumbai&apos;s authorized Google Partner for Pixel SMB plans. Empowering
              businesses with the best of Google AI.
            </p>
            <div className="inline-flex items-center gap-1.5 px-3 py-1.5 rounded-full border border-background/20 text-xs text-background/60">
              <div className="flex gap-0.5">
                <span className="w-1.5 h-1.5 rounded-full bg-[#4285F4]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#EA4335]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#FBBC05]" />
                <span className="w-1.5 h-1.5 rounded-full bg-[#34A853]" />
              </div>
              Authorized Google Partner
            </div>
          </div>

          {/* Products */}
          <div>
            <h4 className="font-semibold text-background text-sm mb-4">Products</h4>
            <ul className="space-y-2.5">
              {productLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold text-background text-sm mb-4">Quick Links</h4>
            <ul className="space-y-2.5">
              {quickLinks.map((l) => (
                <li key={l.label}>
                  <Link
                    href={l.href}
                    className="text-sm text-background/60 hover:text-background transition-colors"
                  >
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h4 className="font-semibold text-background text-sm mb-4">Contact</h4>
            <ul className="space-y-3">
              <li>
                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=pixel@shivaami.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <Mail className="w-4 h-4 shrink-0" />
                  pixel@shivaami.com
                </a>
              </li>
              <li>
                <a
                  href="tel:+919022223600"
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <Phone className="w-4 h-4 shrink-0" />
                  +91 90 2222 3600
                </a>
              </li>
              <li>
                <a
                  href="https://wa.me/919022223600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center gap-2 text-sm text-background/60 hover:text-background transition-colors"
                >
                  <MessageCircle className="w-4 h-4 shrink-0" />
                  WhatsApp Us
                </a>
              </li>
              <li className="text-sm text-background/60">
                Mumbai, Maharashtra, India
              </li>
            </ul>
          </div>
        </div>

        {/* Bottom bar */}
        <div className="border-t border-background/10 mt-12 pt-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <p className="text-xs text-background/40">
            © {new Date().getFullYear()} <TaxPrintText /> in association with <BrandText />. All rights reserved.
          </p>
          <p className="text-xs text-background/40">
            Google and Pixel are trademarks of Google LLC. <BrandText /> is an
            authorized Google Partner.
          </p>
        </div>
      </div>
    </footer>
  );
}
