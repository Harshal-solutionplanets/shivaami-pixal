import type { Metadata } from "next";
import { fetchProductPricing } from "@/lib/pricing";
import PricingEditor from "@/components/admin/PricingEditor";

export const metadata: Metadata = {
  title: "Pricing | Admin Dashboard",
};

export const dynamic = "force-dynamic";

const PRODUCT_LABELS: Record<string, string> = {
  "pixel-10a": "Pixel 10a",
  "pixel-10": "Pixel 10",
  "pixel-10-pro-xl": "Pixel 10 Pro XL",
  "pixel-10-pro-fold": "Pixel 10 Pro Fold",
};

export default async function AdminPricingPage() {
  const { rows } = await fetchProductPricing();

  const editorRows = rows.map((r) => ({
    slug: r.slug,
    name: PRODUCT_LABELS[r.slug] ?? r.slug,
    priceInr: r.priceInr,
    oneAssist: r.oneAssist,
    extWarranty: r.extWarranty,
  }));

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Pricing</h1>
        <p className="text-muted-foreground text-sm mt-1">
          Update product retail prices and savings values displayed in the marketplace.
        </p>
      </div>

      <PricingEditor initialRows={editorRows} />
    </div>
  );
}
