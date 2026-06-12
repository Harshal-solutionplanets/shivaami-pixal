"use client";

import { useState } from "react";
import { formatInr } from "@/lib/marketplace";

interface ProductPricingRow {
  slug: string;
  name: string;
  priceInr: number;
  oneAssist: number;
  extWarranty: number;
}

interface PricingEditorProps {
  initialRows: ProductPricingRow[];
}

function PricingRow({ row }: { row: ProductPricingRow }) {
  const [priceInr, setPriceInr] = useState(row.priceInr);
  const [oneAssist, setOneAssist] = useState(row.oneAssist);
  const [extWarranty, setExtWarranty] = useState(row.extWarranty);
  const [saving, setSaving] = useState(false);
  const [saved, setSaved] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Track the last successfully saved values — isDirty compares against these,
  // NOT the original props. This means reverting to the initial value after a
  // save still correctly enables the Save button.
  const [lastSaved, setLastSaved] = useState({
    priceInr: row.priceInr,
    oneAssist: row.oneAssist,
    extWarranty: row.extWarranty,
  });

  const isDirty =
    priceInr !== lastSaved.priceInr ||
    oneAssist !== lastSaved.oneAssist ||
    extWarranty !== lastSaved.extWarranty;

  async function handleSave() {
    setSaving(true);
    setError(null);
    setSaved(false);

    const res = await fetch("/api/admin/pricing", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        slug: row.slug,
        price_inr: priceInr,
        one_assist: oneAssist,
        ext_warranty: extWarranty,
      }),
    });

    setSaving(false);

    if (res.ok) {
      // Update lastSaved so future changes compare against the newly saved values
      setLastSaved({ priceInr, oneAssist, extWarranty });
      setSaved(true);
      setTimeout(() => setSaved(false), 3000);
    } else {
      const data = await res.json().catch(() => ({}));
      setError(data.error ?? "Failed to save. Please try again.");
    }
  }

  return (
    <div className="bg-white rounded-2xl border border-border/60 shadow-sm p-6">
      <div className="flex items-center justify-between mb-4">
        <div>
          <h3 className="text-base font-bold text-foreground">{row.name}</h3>
          <p className="text-xs text-muted-foreground font-mono mt-0.5">{row.slug}</p>
        </div>
        {isDirty && (
          <span className="text-[10px] bg-amber-100 text-amber-700 border border-amber-200 px-2.5 py-0.5 rounded-full font-semibold">
            Unsaved changes
          </span>
        )}
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 mb-5">
        {/* Retail Price */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Retail Price (₹ incl. GST)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
            <input
              type="number"
              value={priceInr}
              min={0}
              step={1}
              onChange={(e) => setPriceInr(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border/80 rounded-xl text-sm font-semibold text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>

        {/* OneAssist */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            OneAssist Savings (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
            <input
              type="number"
              value={oneAssist}
              min={0}
              step={1}
              onChange={(e) => setOneAssist(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border/80 rounded-xl text-sm font-semibold text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>

        {/* Extended Warranty */}
        <div>
          <label className="block text-xs font-semibold text-muted-foreground uppercase tracking-wide mb-1.5">
            Ext. Warranty Savings (₹)
          </label>
          <div className="relative">
            <span className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground text-sm">₹</span>
            <input
              type="number"
              value={extWarranty}
              min={0}
              step={1}
              onChange={(e) => setExtWarranty(Number(e.target.value))}
              className="w-full pl-7 pr-3 py-2 border border-border/80 rounded-xl text-sm font-semibold text-foreground bg-white focus:outline-none focus:ring-2 focus:ring-primary/30 focus:border-primary transition"
            />
          </div>
        </div>
      </div>

      {/* Summary & Save */}
      <div className="flex items-center justify-between flex-wrap gap-3 pt-4 border-t border-border/40">
        <div className="flex items-center gap-4 text-xs text-muted-foreground">
          <span>
            Total savings/device:{" "}
            <strong className="text-emerald-600">{formatInr(oneAssist + extWarranty)}</strong>
          </span>
        </div>
        <div className="flex items-center gap-3">
          {error && <p className="text-xs text-red-500">{error}</p>}
          {saved && (
            <span className="text-xs text-emerald-600 font-semibold flex items-center gap-1">
              ✓ Saved
            </span>
          )}
          <button
            onClick={handleSave}
            disabled={saving || !isDirty}
            className="bg-primary text-white text-sm font-semibold px-5 py-2 rounded-full hover:bg-[#1A73E8] disabled:opacity-50 disabled:cursor-not-allowed transition-colors flex items-center gap-2"
          >
            {saving ? (
              <>
                <span className="w-3.5 h-3.5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                Saving…
              </>
            ) : (
              "Save"
            )}
          </button>
        </div>
      </div>
    </div>
  );
}

export default function PricingEditor({ initialRows }: PricingEditorProps) {
  return (
    <div className="space-y-4">
      <div className="flex items-start justify-between mb-6 flex-wrap gap-3">
        <div>
          <h2 className="text-lg font-bold text-foreground">Product Pricing</h2>
          <p className="text-sm text-muted-foreground mt-0.5">
            Changes take effect immediately on the marketplace — no deployment required.
          </p>
        </div>
        <span className="text-xs bg-blue-50 text-blue-700 border border-blue-200 px-3 py-1.5 rounded-full font-medium">
          Live DB — changes go live instantly
        </span>
      </div>

      {initialRows.map((row) => (
        <PricingRow key={row.slug} row={row} />
      ))}
    </div>
  );
}
