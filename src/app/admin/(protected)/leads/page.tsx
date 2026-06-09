import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import LeadsTable, { type LeadRow } from "@/components/admin/LeadsTable";
import BrandText from "@/components/ui/BrandText";

export const metadata: Metadata = {
  title: "Contact Leads | Admin | tax print & shivaami",
};

export const dynamic = "force-dynamic";

export default async function LeadsPage() {
  const supabase = createAdminClient();

  const { data, error } = await supabase
    .from("contact")
    .select("id, name, company, email, phone, message, created_at")
    .order("created_at", { ascending: false });

  if (error) {
    console.error("Error fetching contact leads:", error);
  }

  const leads: LeadRow[] = (data ?? []).map((row) => ({
    id: row.id,
    name: row.name,
    company: row.company,
    email: row.email,
    phone: row.phone,
    message: row.message,
    createdAt: row.created_at,
  }));

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Contact Leads</h1>
        <p className="text-muted-foreground text-sm mt-1">
          <BrandText /> Pixel B2B — Customer enquiries received
        </p>
      </div>

      <LeadsTable leads={leads} />
    </div>
  );
}
