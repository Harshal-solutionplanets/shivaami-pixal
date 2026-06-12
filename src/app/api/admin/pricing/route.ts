import { NextRequest, NextResponse } from "next/server";
import { createClient } from "@/lib/supabase/server";
import { createAdminClient } from "@/lib/supabase/admin";

const ADMIN_EMAILS = (process.env.ADMIN_EMAILS ?? "")
  .split(",")
  .map((e) => e.trim().toLowerCase());

export async function PATCH(req: NextRequest) {
  // Auth check — must be a logged-in admin
  const supabase = await createClient();
  const {
    data: { user },
  } = await supabase.auth.getUser();

  if (!user || !ADMIN_EMAILS.includes(user.email?.toLowerCase() ?? "")) {
    return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
  }

  // Parse body
  const body = await req.json();
  const { slug, price_inr, one_assist, ext_warranty } = body as {
    slug: string;
    price_inr: number;
    one_assist: number;
    ext_warranty: number;
  };

  if (!slug) {
    return NextResponse.json({ error: "slug is required" }, { status: 400 });
  }

  // Validate numbers
  const fields: Record<string, number> = {};
  if (typeof price_inr === "number" && price_inr >= 0) fields.price_inr = price_inr;
  if (typeof one_assist === "number" && one_assist >= 0) fields.one_assist = one_assist;
  if (typeof ext_warranty === "number" && ext_warranty >= 0) fields.ext_warranty = ext_warranty;

  if (Object.keys(fields).length === 0) {
    return NextResponse.json({ error: "No valid fields to update" }, { status: 400 });
  }

  const adminClient = createAdminClient();
  const { error } = await adminClient
    .from("products")
    .update(fields)
    .eq("slug", slug);

  if (error) {
    console.error("[admin/pricing PATCH] Supabase error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }

  return NextResponse.json({ success: true, slug, updated: fields });
}
