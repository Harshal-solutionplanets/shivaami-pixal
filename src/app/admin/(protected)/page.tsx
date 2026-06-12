import type { Metadata } from "next";
import { createAdminClient } from "@/lib/supabase/admin";
import StatsCards from "@/components/admin/StatsCards";
import OrdersTable, { type OrderRow } from "@/components/admin/OrdersTable";
import PhonesSoldChart from "@/components/admin/PhonesSoldChart";
import BrandText from "@/components/ui/BrandText";

export const metadata: Metadata = {
  title: "Admin Dashboard | tax print & shivaami",
};

export const dynamic = "force-dynamic";

export default async function AdminPage() {
  const supabase = createAdminClient();

  // Fetch orders with items in parallel
  const [ordersResult, itemsResult] = await Promise.all([
    supabase
      .from("orders")
      .select("id, user_id, status, total_amount, created_at, company_name, contact_name, email, phone, gst_number, city, shipping_address, billing_address, razorpay_payment_id")
      .order("created_at", { ascending: false })
      .limit(100),
    supabase
      .from("order_items")
      .select("order_id, product_slug, product_name, color_name, quantity"),
  ]);

  const orders = ordersResult.data ?? [];
  const items = itemsResult.data ?? [];

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
      paymentId: o.razorpay_payment_id,
    };
  });



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

    </div>
  );
}
