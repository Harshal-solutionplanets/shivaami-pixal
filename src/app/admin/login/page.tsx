import type { Metadata } from "next";
import Link from "next/link";
import LoginForm from "@/components/auth/LoginForm";

export const metadata: Metadata = {
  title: "Admin Login | TaxPrint & Shivaami",
};

export default function AdminLoginPage() {
  return (
    <div className="min-h-screen bg-[#F8F9FA] flex items-center justify-center px-4 py-16">
      <div className="w-full max-w-sm">
        <div className="text-center mb-8">
          <Link href="/" className="inline-flex items-center gap-2 text-foreground font-bold text-xl">
            <span className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-white text-sm font-bold">S</span>
            TaxPrint & Shivaami
          </Link>
          <h1 className="mt-6 text-xl font-bold text-foreground">Admin Access</h1>
          <p className="mt-1 text-muted-foreground text-sm">Sign in with your TaxPrint & Shivaami admin credentials</p>
        </div>
        <div className="bg-white rounded-3xl border border-border/60 shadow-xl shadow-black/5 p-8">
          <LoginForm isAdmin />
        </div>
      </div>
    </div>
  );
}
