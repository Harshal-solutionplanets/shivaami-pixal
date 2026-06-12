"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";

export default function AdminNav({ userEmail }: { userEmail?: string }) {
  const pathname = usePathname();
  const isAdminLeads = pathname === "/admin/leads";
  const isAdminPricing = pathname === "/admin/pricing";
  const isAdminDashboard = !isAdminLeads && !isAdminPricing;

  const linkClass = (active: boolean) =>
    `text-sm font-semibold transition-colors duration-200 ${
      active
        ? "text-primary border-b-2 border-primary pb-0.5"
        : "text-muted-foreground hover:text-foreground pb-0.5"
    }`;

  const restrictedEmails = ["jayesh.sanghavi@shivaami.com", "pixel@shivaami.com"];
  const showPricing = !restrictedEmails.includes(userEmail?.toLowerCase() ?? "");

  return (
    <div className="flex items-center gap-3">
      <Link href="/admin" className={linkClass(isAdminDashboard)}>
        Dashboard
      </Link>
      {showPricing && (
        <>
          <span className="text-border/80">|</span>
          <Link href="/admin/pricing" className={linkClass(isAdminPricing)}>
            Pricing
          </Link>
        </>
      )}
      <span className="text-border/80">|</span>
      <Link href="/admin/leads" className={linkClass(isAdminLeads)}>
        Contact Leads
      </Link>
    </div>
  );
}
