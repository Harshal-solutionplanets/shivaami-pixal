export const RETAIL_PRICES: Record<string, number> = {
  "pixel-10a": 46_999,
  "pixel-10": 67_999,
  "pixel-10-pro-xl": 1_14_999,
  "pixel-10-pro-fold": 1_62_999,
};

// No bulk discount — these are fixed corporate prices (incl. 18% GST)
export const BULK_TIERS = [
  { min: 1, max: Infinity, discountPct: 0 },
] as const;

export const BENEFIT_VALUES = {
  protection_plan: 4_499,
  zero_touch_deployment: 999,
  cloud_storage: 2_400,
  ai_workshops: 5_000,
  dedicated_support: 1_200,
  google_ai_pro: 23_400,
} as const;

export const PRO_SLUGS = new Set(["pixel-10-pro-xl", "pixel-10-pro-fold"]);

export function getDiscountPct(totalQty: number): number {
  return (
    [...BULK_TIERS].reverse().find((t) => totalQty >= t.min)?.discountPct ?? 0
  );
}

export const CORPORATE_PRICING_NOTE =
  "Corporate Pricing. All prices are including 18% GST input credit.";

export const SAVINGS_VALUES: Record<string, { oneAssist: number; extWarranty: number }> = {
  "pixel-10a": { oneAssist: 5419, extWarranty: 4440 },
  "pixel-10": { oneAssist: 8059, extWarranty: 6516 },
  "pixel-10-pro-xl": { oneAssist: 13819, extWarranty: 11136 },
  "pixel-10-pro-fold": { oneAssist: 19619, extWarranty: 15756 },
};

export function calcItemBenefitValue(slug: string): number {
  const itemSavings = SAVINGS_VALUES[slug];
  if (!itemSavings) return 0;
  return itemSavings.oneAssist + itemSavings.extWarranty;
}


export interface SavingsSummary {
  retailTotal: number;
  discountPct: number;
  discountAmount: number;
  benefitsValue: number;
  grandTotalSavings: number;
  effectivePrice: number;
  totalQty: number;
}

export function calcSavings(
  items: Array<{ slug: string; quantity: number; unitPriceInr: number }>
): SavingsSummary {
  const totalQty = items.reduce((s, i) => s + i.quantity, 0);
  const retailTotal = items.reduce(
    (s, i) => s + i.quantity * i.unitPriceInr,
    0
  );
  const discountPct = getDiscountPct(totalQty);
  const discountAmount = Math.round(retailTotal * (discountPct / 100));
  const benefitsValue = items.reduce(
    (s, i) => s + i.quantity * calcItemBenefitValue(i.slug),
    0
  );
  return {
    retailTotal,
    discountPct,
    discountAmount,
    benefitsValue,
    grandTotalSavings: discountAmount + benefitsValue,
    effectivePrice: retailTotal - discountAmount,
    totalQty,
  };
}

export function formatInr(amount: number): string {
  return new Intl.NumberFormat("en-IN", {
    style: "currency",
    currency: "INR",
    maximumFractionDigits: 0,
  }).format(amount);
}
