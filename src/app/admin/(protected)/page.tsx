import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import StatsCards from "@/components/admin/StatsCards";
import OrdersTable, { type OrderRow } from "@/components/admin/OrdersTable";
import CustomersTable, { type CustomerRow } from "@/components/admin/CustomersTable";
import PhonesSoldChart from "@/components/admin/PhonesSoldChart";
import BrandText from "@/components/ui/BrandText";

export const metadata: Metadata = {
  title: "Admin Dashboard | tax print & shivaami",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createAdminClient();

  // Fetch orders with customer profiles and items in parallel
  const [ordersResult, profilesResult, itemsResult] = await Promise.all([
    supabase
      .from("orders")
      .select("id, user_id, status, total_amount, created_at, company_name, contact_name, email, phone, gst_number, city, shipping_address, billing_address")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("profiles")
      .select("id, full_name, company_name, phone, created_at"),
    supabase
      .from("order_items")
      .select("order_id, product_slug, product_name, color_name, quantity"),
  ]);

  const orders = ordersResult.data ?? [];
  const profiles = profilesResult.data ?? [];
  const items = itemsResult.data ?? [];

  // Build lookup maps
  const profileMap = new Map(profiles.map((p) => [p.id, p]));

  // Fetch auth users (emails) — requires service role
  const { data: usersData } = await supabase.auth.admin.listUsers({ perPage: 1000 });
  const authUsers = usersData?.users ?? [];
  const emailMap = new Map(authUsers.map((u) => [u.id, u.email ?? ""]));
  const createdAtMap = new Map(authUsers.map((u) => [u.id, u.created_at]));

  // --- Stats ---
  const totalOrders = orders.length;
  const totalRevenuePaise = orders.reduce((sum, o) => sum + (o.total_amount ?? 0), 0);
  const unitsSold = items.reduce((sum, i) => sum + (i.quantity ?? 0), 0);
  const pendingOrders = orders.filter((o) => o.status === "pending").length;

  // --- Units sold by slug ---
  const soldBySlug: Record<string, number> = {};
  for (const item of items) {
    soldBySlug[item.product_slug] = (soldBySlug[item.product_slug] ?? 0) + (item.quantity ?? 0);
  }

  // --- Order rows ---
  const itemsByOrderId = new Map<string, typeof items>();
  for (const item of items) {
    const existing = itemsByOrderId.get(item.order_id) ?? [];
    existing.push(item);
    itemsByOrderId.set(item.order_id, existing);
  }

  const orderRows: OrderRow[] = orders.map((o) => {
    const orderItems = itemsByOrderId.get(o.id) ?? [];
    return {
      id: o.id,
      companyName: o.company_name,
      contactName: o.contact_name,
      email: o.email,
      phone: o.phone,
      gstNumber: o.gst_number,
      city: o.city,
      shippingAddress: o.shipping_address,
      billingAddress: o.billing_address,
      items: orderItems.map((i) => ({
        productName: i.product_name,
        colorName: i.color_name,
        quantity: i.quantity ?? 0,
      })),
      totalAmount: o.total_amount,
      status: o.status,
      createdAt: o.created_at,
    };
  });

  // --- Customer rows ---
  const orderCountByUser = new Map<string, number>();
  for (const o of orders) {
    orderCountByUser.set(o.user_id, (orderCountByUser.get(o.user_id) ?? 0) + 1);
  }

  const customerRows: CustomerRow[] = authUsers.map((u) => {
    const profile = profileMap.get(u.id);
    return {
      id: u.id,
      fullName: profile?.full_name ?? "—",
      companyName: profile?.company_name ?? "—",
      email: u.email ?? "—",
      phone: profile?.phone ?? "—",
      orderCount: orderCountByUser.get(u.id) ?? 0,
      joinedAt: createdAtMap.get(u.id) ?? u.created_at,
    };
  }).sort((a, b) => new Date(b.joinedAt).getTime() - new Date(a.joinedAt).getTime());

  return (
    <div className="space-y-8">
      <div>
        <h1 className="text-2xl font-bold text-foreground">Overview</h1>
        <p className="text-muted-foreground text-sm mt-1"><BrandText /> Pixel B2B — real-time sales data</p>
      </div>

      <StatsCards stats={{ totalOrders, totalRevenuePaise, unitsSold, pendingOrders }} />

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-1">
          <PhonesSoldChart soldBySlug={soldBySlug} />
        </div>
        <div className="lg:col-span-2">
          <OrdersTable orders={orderRows} />
        </div>
      </div>

      <CustomersTable customers={customerRows} />
    </div>
  );
}
