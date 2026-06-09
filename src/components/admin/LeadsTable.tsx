"use client";

export interface LeadRow {
  id: string;
  name: string;
  company: string;
  email: string;
  phone: string;
  message: string;
  createdAt: string;
}

export default function LeadsTable({ leads }: { leads: LeadRow[] }) {
  if (leads.length === 0) {
    return (
      <div className="bg-white rounded-2xl border border-border/60 p-8 text-center shadow-sm">
        <p className="text-muted-foreground">No contact leads yet.</p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-sm overflow-hidden">
      <div className="px-6 py-4 border-b border-border/60">
        <h2 className="text-base font-semibold text-foreground">Contact Leads</h2>
      </div>
      <div className="overflow-x-auto">
        <table className="w-full text-sm min-w-[800px]">
          <thead>
            <tr className="border-b border-border/40 bg-[#FAFAFA]">
              {["Name", "Company", "Email", "Phone", "Message", "Submitted Date"].map((h) => (
                <th
                  key={h}
                  className="text-left px-6 py-3.5 text-xs font-semibold text-muted-foreground uppercase tracking-wider"
                >
                  {h}
                </th>
              ))}
            </tr>
          </thead>
          <tbody className="divide-y divide-border/30">
            {leads.map((lead, i) => (
              <tr
                key={lead.id}
                className={`hover:bg-[#FAFAFA] transition-colors ${
                  i % 2 === 0 ? "bg-white" : "bg-[#FAFAFA]/40"
                }`}
              >
                <td className="px-6 py-4 align-top font-medium text-foreground whitespace-nowrap">
                  {lead.name || "—"}
                </td>
                <td className="px-6 py-4 align-top text-foreground whitespace-nowrap">
                  {lead.company || "—"}
                </td>
                <td className="px-6 py-4 align-top text-muted-foreground">
                  {lead.email}
                </td>
                <td className="px-6 py-4 align-top text-muted-foreground whitespace-nowrap">
                  {lead.phone || "—"}
                </td>
                <td className="px-6 py-4 align-top text-foreground whitespace-pre-wrap max-w-sm">
                  {lead.message}
                </td>
                <td className="px-6 py-4 align-top text-muted-foreground text-xs whitespace-nowrap">
                  {new Date(lead.createdAt).toLocaleDateString("en-IN", {
                    day: "numeric",
                    month: "short",
                    year: "numeric",
                    hour: "2-digit",
                    minute: "2-digit",
                  })}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
