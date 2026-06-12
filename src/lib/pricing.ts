/**
 * pricing.ts — SERVER-ONLY
 * Fetches product pricing (retail price, OneAssist, extended warranty)
 * from the Supabase `products` table.
 *
 * Falls back to the hardcoded constants in marketplace.ts if the DB
 * is unreachable or a row is missing values, ensuring the site never breaks.
 */

import { createAdminClient } from "@/lib/supabase/admin";
import {
  RETAIL_PRICES as FALLBACK_PRICES,
  SAVINGS_VALUES as FALLBACK_SAVINGS,
} from "@/lib/marketplace";

export interface ProductPricing {
  slug: string;
  priceInr: number;
  oneAssist: number;
  extWarranty: number;
}

export type RetailPricesMap = Record<string, number>;
export type SavingsValuesMap = Record<string, { oneAssist: number; extWarranty: number }>;

/**
 * Fetch pricing for all products from the DB.
 * Returns { retailPrices, savingsValues } in the same shape used by the
 * existing marketplace constants so they can be used as drop-in replacements.
 */
export async function fetchProductPricing(): Promise<{
  retailPrices: RetailPricesMap;
  savingsValues: SavingsValuesMap;
  rows: ProductPricing[];
}> {
  try {
    const supabase = createAdminClient();
    const { data, error } = await supabase
      .from("products")
      .select("slug, price_inr, one_assist, ext_warranty")
      .not("slug", "is", null);

    if (error || !data || data.length === 0) {
      console.warn("[pricing] DB fetch failed, using fallback constants:", error?.message);
      return buildFallback();
    }

    const retailPrices: RetailPricesMap = {};
    const savingsValues: SavingsValuesMap = {};
    const rows: ProductPricing[] = [];

    for (const row of data) {
      const slug = row.slug as string;
      const priceInr = (row.price_inr as number | null) ?? FALLBACK_PRICES[slug] ?? 0;
      const oneAssist = (row.one_assist as number | null) ?? FALLBACK_SAVINGS[slug]?.oneAssist ?? 0;
      const extWarranty = (row.ext_warranty as number | null) ?? FALLBACK_SAVINGS[slug]?.extWarranty ?? 0;

      retailPrices[slug] = priceInr;
      savingsValues[slug] = { oneAssist, extWarranty };
      rows.push({ slug, priceInr, oneAssist, extWarranty });
    }

    return { retailPrices, savingsValues, rows };
  } catch (err) {
    console.warn("[pricing] Unexpected error, using fallback constants:", err);
    return buildFallback();
  }
}

function buildFallback() {
  const rows: ProductPricing[] = Object.entries(FALLBACK_PRICES).map(([slug, priceInr]) => ({
    slug,
    priceInr,
    oneAssist: FALLBACK_SAVINGS[slug]?.oneAssist ?? 0,
    extWarranty: FALLBACK_SAVINGS[slug]?.extWarranty ?? 0,
  }));
  return {
    retailPrices: { ...FALLBACK_PRICES },
    savingsValues: { ...FALLBACK_SAVINGS },
    rows,
  };
}
