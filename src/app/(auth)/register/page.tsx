import type { Metadata } from "next";
import Link from "next/link";
import RegisterForm from "@/components/auth/RegisterForm";

export const metadata: Metadata = {
  title: "Create Account | TaxPrint & Shivaami Pixel",
};

export default function RegisterPage() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-[#EEF2FF] via-[#F0F4FF] to-[#E8F5E9] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-md">
        {/* Logo / brand */}
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground font-bold text-xl">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold">S</span>
            TaxPrint & Shivaami
          </Link>
          <h1 className="mt-6 text-2xl font-bold text-foreground">Create your account</h1>
          <p className="mt-1 text-muted-foreground text-sm">Order Pixel phones for your business through TaxPrint & Shivaami</p>
        </div>

        <div className="bg-white rounded-3xl border border-border/60 shadow-xl shadow-black/5 p-8">
          <RegisterForm />
        </div>
      </div>
    </div>
  );
}
