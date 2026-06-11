"use client";

import { useState, useEffect, useRef } from "react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import { Button, buttonVariants } from "@/components/ui/button";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { Menu, X, Phone, ChevronDown, ArrowRight } from "lucide-react";
import { cn } from "@/lib/utils";
import { products } from "@/lib/products";
import Logo from "@/components/ui/Logo";

const navLinks = [
  { label: "Home", href: "/" },
  { label: "Marketplace", href: "/marketplace" },
  { label: "Contact", href: "/#contact" },
];

export default function Navbar() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [productsOpen, setProductsOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const pathname = usePathname();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 16);
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  // Close dropdown on outside click
  useEffect(() => {
    function handleClick(e: MouseEvent) {
      if (dropdownRef.current && !dropdownRef.current.contains(e.target as Node)) {
        setProductsOpen(false);
      }
    }
    document.addEventListener("mousedown", handleClick);
    return () => document.removeEventListener("mousedown", handleClick);
  }, []);

  // Close dropdown on route change
  useEffect(() => {
    setProductsOpen(false);
    setOpen(false);
  }, [pathname]);

  // Dispatch custom event when mobile menu state changes
  useEffect(() => {
    const event = new CustomEvent("menu-toggle", { detail: { open } });
    window.dispatchEvent(event);
  }, [open]);

  return (
    <header
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled
          ? "bg-white/95 backdrop-blur-md shadow-sm border-b border-border"
          : "bg-transparent"
      }`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-24">
          {/* Logo */}
          <Link href="/" className="flex items-center group">
            <Logo />
          </Link>

          {/* Desktop Nav */}
          <nav className="hidden md:flex items-center gap-1">
            <Link
              href="/"
              className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
            >
              Home
            </Link>

            {/* Products dropdown */}
            <div className="relative" ref={dropdownRef}>
              <button
                onClick={() => setProductsOpen((v) => !v)}
                className="flex items-center gap-1 px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                Products
                <ChevronDown
                  className={`w-3.5 h-3.5 transition-transform duration-200 ${productsOpen ? "rotate-180" : ""}`}
                />
              </button>

              {productsOpen && (
                <div className="absolute top-full left-1/2 -translate-x-1/2 mt-2 w-56 bg-white rounded-2xl border border-border/60 shadow-lg shadow-black/8 overflow-hidden z-50">
                  <div className="p-2">
                    {products.map((product) => (
                      <Link
                        key={product.slug}
                        href={`/products/${product.slug}`}
                        className="flex items-center justify-between px-3 py-2.5 rounded-xl text-sm font-medium text-foreground hover:bg-[#F0F4FF] hover:text-primary transition-colors group"
                      >
                        {product.name}
                        <ArrowRight className="w-3.5 h-3.5 text-muted-foreground group-hover:text-primary opacity-0 group-hover:opacity-100 transition-all" />
                      </Link>
                    ))}
                  </div>
                  <div className="border-t border-border/60 p-2">
                    <Link
                      href="/products"
                      className="flex items-center justify-center gap-1.5 px-3 py-2 rounded-xl text-sm font-semibold text-primary hover:bg-primary/8 transition-colors"
                    >
                      View All Products
                      <ArrowRight className="w-3.5 h-3.5" />
                    </Link>
                  </div>
                </div>
              )}
            </div>

            {navLinks.slice(1).map((link) => (
              <Link
                key={link.label}
                href={link.href}
                className="px-4 py-2 text-sm font-medium text-muted-foreground hover:text-foreground hover:bg-muted rounded-full transition-colors"
              >
                {link.label}
              </Link>
            ))}
          </nav>

          {/* Desktop CTA */}
          <div className="hidden md:flex items-center gap-3">
            <a
              href="tel:+919022223600"
              className="flex items-center gap-1.5 text-sm text-muted-foreground hover:text-foreground transition-colors"
            >
              <Phone className="w-3.5 h-3.5" />
              +91 90 2222 3600
            </a>
            <Link
              href="/marketplace"
              className={cn(
                buttonVariants({ size: "sm" }),
                "rounded-full bg-primary hover:bg-primary/90 text-white"
              )}
            >
              Order Now
            </Link>
          </div>

          {/* Mobile Menu */}
          <Sheet open={open} onOpenChange={setOpen}>
            <SheetTrigger className="md:hidden">
              <span
                className={cn(
                  buttonVariants({ variant: "ghost", size: "icon" }),
                  "rounded-full"
                )}
              >
                <Menu className="w-5 h-5" />
              </span>
            </SheetTrigger>
            <SheetContent side="right" className="w-80 p-5 flex flex-col h-full">
              <div className="flex items-start justify-between shrink-0 mb-4">
                <Logo className="scale-[0.78] origin-top-left" />
                <Button
                  variant="ghost"
                  size="icon"
                  className="rounded-full shrink-0 -mt-1 -mr-1.5"
                  onClick={() => setOpen(false)}
                >
                  <X className="w-4 h-4" />
                </Button>
              </div>
              <div className="flex-1 overflow-y-auto pr-1 -mr-1">
                <nav className="flex flex-col gap-0.5 py-2">
                  <Link
                    href="/"
                    onClick={() => setOpen(false)}
                    className="px-4 py-2.5 text-base font-medium rounded-xl hover:bg-muted transition-colors"
                  >
                    Home
                  </Link>

                  {/* Products with sub-links */}
                  <div>
                    <Link
                      href="/products"
                      onClick={() => setOpen(false)}
                      className="px-4 py-2.5 text-base font-medium rounded-xl hover:bg-muted transition-colors block"
                    >
                      Products
                    </Link>
                    <div className="ml-4 mt-0.5 flex flex-col gap-0.5">
                      {products.map((product) => (
                        <Link
                          key={product.slug}
                          href={`/products/${product.slug}`}
                          onClick={() => setOpen(false)}
                          className="px-4 py-2 text-sm text-muted-foreground font-medium rounded-xl hover:bg-muted hover:text-foreground transition-colors"
                        >
                          {product.name}
                        </Link>
                      ))}
                    </div>
                  </div>

                  {navLinks.slice(1).map((link) => (
                    <Link
                      key={link.label}
                      href={link.href}
                      onClick={() => setOpen(false)}
                      className="px-4 py-2.5 text-base font-medium rounded-xl hover:bg-muted transition-colors"
                    >
                      {link.label}
                    </Link>
                  ))}
                </nav>
              </div>
              <div className="flex flex-col gap-2.5 shrink-0 pt-4 border-t border-border/60">
                <a
                  href="tel:+919022223600"
                  className="flex items-center justify-center gap-1.5 text-sm font-medium text-muted-foreground hover:text-foreground transition-colors mb-1"
                >
                  <Phone className="w-3.5 h-3.5" />
                  +91 90 2222 3600
                </a>
                <Link
                  href="/marketplace"
                  onClick={() => setOpen(false)}
                  className={cn(
                    buttonVariants(),
                    "rounded-full bg-primary text-white justify-center py-2.5 h-auto text-sm"
                  )}
                >
                  Order Now
                </Link>
                <a
                  href="https://wa.me/919022223600"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-medium border border-border rounded-full hover:bg-muted transition-colors h-auto"
                >
                  WhatsApp Us
                </a>
              </div>
            </SheetContent>
          </Sheet>
        </div>
      </div>
    </header>
  );
}
