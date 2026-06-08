import { redirect } from "next/navigation";
import { createClient } from "@/lib/supabase/server";
import SignOutButton from "@/components/admin/SignOutButton";
import Link from "next/link";
import BrandText from "@/components/ui/BrandText";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "").split(",").map((e) => e.trim().toLowerCase());

export default async function AdminLayout({ children }: { children: React.ReactNode }) {
  const supabase = await createClient();
  const { data: { user } } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) {
    redirect("/admin/login");
  }

  return (
    <div className="min-h-screen bg-[#F8F9FA]">
      {/* Top nav */}
      <header className="bg-white border-b border-border/60 sticky top-0 z-10">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-14 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <Link href="/" className="flex items-center gap-2 font-bold text-foreground">
              <span className="w-7 h-7 rounded-lg bg-primary flex items-center justify-center text-white text-xs font-bold">S</span>
              <BrandText />
            </Link>
            <span className="text-border/80">|</span>
            <span className="text-sm font-semibold text-muted-foreground">Admin Dashboard</span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-xs text-muted-foreground hidden sm:block">{user.email}</span>
            <SignOutButton />
          </div>
        </div>
      </header>

      <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {children}
      </main>
    </div>
  );
}
