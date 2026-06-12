import { NextRequest, NextResponse } from "next/server";
import crypto from "crypto";
import { Resend } from "resend";
import { createAdminClient } from "@/lib/supabase/admin";
import { calcSavings, formatInr } from "@/lib/marketplace";

interface OrderItem {
  productSlug: string;
  productName: string;
  colorName: string;
  quantity: number;
  unitPriceInr: number;
}

interface OrderRequestBody {
  form: {
    companyName: string;
    contactName: string;
    email: string;
    phone: string;
    gstNumber?: string;
    city: string;
    shippingAddress: string;
    billingAddress: string;
    notes?: string;
    paymentMode: "pay_now" | "invoice";
  };
  items: OrderItem[];
  razorpayOrderId?: string;
  razorpayPaymentId?: string;
  razorpaySignature?: string;
}

function itemsTableHtml(items: OrderItem[]): string {
  const rows = items
    .map(
      (i) =>
        `<tr>
          <td style="padding:8px 12px;border-bottom:1px solid #DADCE0">${i.productName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #DADCE0">${i.colorName}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #DADCE0;text-align:center">${i.quantity}</td>
          <td style="padding:8px 12px;border-bottom:1px solid #DADCE0;text-align:right">${formatInr(i.unitPriceInr)}</td>
        </tr>`
    )
    .join("");
  return `<table style="width:100%;border-collapse:collapse;font-size:14px">
    <thead>
      <tr style="background:#F0F4FF">
        <th style="padding:8px 12px;text-align:left">Device</th>
        <th style="padding:8px 12px;text-align:left">Color</th>
        <th style="padding:8px 12px;text-align:center">Qty</th>
        <th style="padding:8px 12px;text-align:right">MRP/unit</th>
      </tr>
    </thead>
    <tbody>${rows}</tbody>
  </table>`;
}

export async function POST(req: NextRequest) {
  let body: OrderRequestBody;
  try {
    body = await req.json();
  } catch {
    return NextResponse.json({ error: "Invalid JSON" }, { status: 400 });
  }

  const { form, items } = body;

  if (!form?.companyName?.trim() || !form?.email?.trim() || !items?.length) {
    return NextResponse.json(
      { error: "Missing required fields" },
      { status: 400 }
    );
  }

  // Verify Razorpay signature for pay_now orders
  if (form.paymentMode === "pay_now") {
    const { razorpayOrderId, razorpayPaymentId, razorpaySignature } = body;
    if (!razorpayOrderId || !razorpayPaymentId || !razorpaySignature) {
      return NextResponse.json(
        { error: "Missing payment data" },
        { status: 400 }
      );
    }
    const expected = crypto
      .createHmac("sha256", process.env.RAZORPAY_KEY_SECRET!)
      .update(`${razorpayOrderId}|${razorpayPaymentId}`)
      .digest("hex");
    if (expected !== razorpaySignature) {
      return NextResponse.json(
        { error: "Payment verification failed" },
        { status: 400 }
      );
    }
  }

  // Calculate totals
  const calcItems = items.map((i) => ({
    slug: i.productSlug,
    quantity: i.quantity,
    unitPriceInr: i.unitPriceInr,
  }));
  const summary = calcSavings(calcItems);
  const totalInr = summary.effectivePrice;
  const totalPaise = totalInr * 100;

  const supabase = createAdminClient();

  // Insert order row
  const { data: order, error: orderError } = await supabase
    .from("orders")
    .insert({
      company_name: form.companyName,
      contact_name: form.contactName,
      email: form.email,
      phone: form.phone,
      gst_number: form.gstNumber || null,
      city: form.city,
      shipping_address: form.shippingAddress,
      billing_address: form.billingAddress,
      notes: form.notes || null,
      payment_mode: form.paymentMode,
      status:
        form.paymentMode === "pay_now" ? "confirmed" : "invoice_requested",
      razorpay_order_id: body.razorpayOrderId || null,
      razorpay_payment_id: body.razorpayPaymentId || null,
      total_amount: totalPaise,
      total_inr: totalInr,
      user_id: null,
    })
    .select("id")
    .single();

  if (orderError || !order) {
    console.error("Order insert error:", orderError);
    return NextResponse.json(
      { error: "Failed to create order" },
      { status: 500 }
    );
  }

  // Insert order items
  const orderItemRows = items.map((item) => ({
    order_id: order.id,
    product_slug: item.productSlug,
    product_name: item.productName,
    color_name: item.colorName,
    quantity: item.quantity,
    unit_price: item.unitPriceInr * 100,
  }));

  const { error: itemsError } = await supabase
    .from("order_items")
    .insert(orderItemRows);

  if (itemsError) {
    console.error("Order items insert error:", itemsError);
  }

  // Send emails — never block the response if emails fail
  const shortId = order.id.slice(0, 8).toUpperCase();
  const resend = new Resend(process.env.RESEND_API_KEY);
  const from = "Taxprint <orders@pixel.taxprint.com>";

  const shivamiHtml = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#202124">
      <div style="background:#4285F4;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:20px">🔔 New B2B Order — ${form.companyName}</h1>
        <p style="color:rgba(255,255,255,0.85);margin:4px 0 0">Order ID: <strong>${shortId}</strong></p>
      </div>
      <div style="background:white;padding:32px;border:1px solid #DADCE0;border-top:none;border-radius:0 0 12px 12px">
        <h2 style="font-size:15px;color:#5F6368;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 16px">Business Details</h2>
        <table style="width:100%;font-size:14px;margin-bottom:24px">
          <tr><td style="padding:4px 0;color:#5F6368;width:140px">Company</td><td><strong>${form.companyName}</strong></td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Contact</td><td>${form.contactName}</td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Email</td><td><a href="mailto:${form.email}" style="color:#4285F4">${form.email}</a></td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Phone</td><td><a href="tel:${form.phone}" style="color:#4285F4">${form.phone}</a></td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">City</td><td>${form.city}</td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Shipping Address</td><td>${form.shippingAddress}</td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Billing Address</td><td>${form.billingAddress}</td></tr>
          ${form.gstNumber ? `<tr><td style="padding:4px 0;color:#5F6368">GST</td><td>${form.gstNumber}</td></tr>` : ""}
          <tr><td style="padding:4px 0;color:#5F6368">Payment</td><td>${form.paymentMode === "pay_now" ? "✅ Paid via Razorpay" : "📄 Invoice Requested"}</td></tr>
          ${body.razorpayPaymentId ? `<tr><td style="padding:4px 0;color:#5F6368">Payment ID</td><td>${body.razorpayPaymentId}</td></tr>` : ""}
          ${form.notes ? `<tr><td style="padding:4px 0;color:#5F6368">Notes</td><td>${form.notes}</td></tr>` : ""}
        </table>
        <h2 style="font-size:15px;color:#5F6368;text-transform:uppercase;letter-spacing:0.05em;margin:0 0 16px">Devices Ordered (${summary.totalQty})</h2>
        ${itemsTableHtml(items)}
        <div style="margin-top:20px;padding:16px;background:#F0F4FF;border-radius:8px;display:flex;justify-content:space-between">
          <span style="font-size:14px;color:#5F6368">Total (after ${summary.discountPct}% bulk discount)</span>
          <strong style="font-size:16px">${formatInr(totalInr)}</strong>
        </div>
        ${
          form.paymentMode === "invoice"
            ? `<div style="margin-top:20px;padding:16px;background:#FEF7E0;border-radius:8px;border-left:4px solid #FBBC05">
                <strong style="font-size:14px">Action needed:</strong>
                <p style="margin:4px 0 0;font-size:13px;color:#5F6368">Send a Razorpay Payment Link to <a href="mailto:${form.email}" style="color:#4285F4">${form.email}</a> for ${formatInr(totalInr)}.</p>
              </div>`
            : ""
        }
        <div style="margin-top:28px;text-align:center">
          <a href="https://pixel.taxprint.com/admin" style="display:inline-block;background:#4285F4;color:white;padding:12px 32px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600">View Admin Dashboard →</a>
        </div>
      </div>
    </div>`;

  const customerHtml = `
    <div style="font-family:Inter,sans-serif;max-width:600px;margin:0 auto;color:#202124">
      <div style="background:#4285F4;padding:24px 32px;border-radius:12px 12px 0 0">
        <h1 style="color:white;margin:0;font-size:20px">✅ Your order is confirmed</h1>
        <p style="color:rgba(255,255,255,0.85);margin:4px 0 0">Order ID: <strong>${shortId}</strong></p>
      </div>
      <div style="background:white;padding:32px;border:1px solid #DADCE0;border-top:none;border-radius:0 0 12px 12px">
        <p style="font-size:15px">Hi <strong>${form.contactName}</strong>,</p>
        <p style="font-size:14px;color:#5F6368">Thank you for choosing <span style="color:#1ca0dc;font-family:'Vilane',sans-serif;font-weight:200">shivaami</span> for your team's Google Pixel upgrade. Here's a summary of your order:</p>
        ${itemsTableHtml(items)}
        <div style="margin-top:20px;padding:16px;background:#CEEAD6;border-radius:8px">
          <span style="font-size:14px">Total (${summary.discountPct}% bulk discount applied)</span>
          <strong style="font-size:16px;display:block;margin-top:4px">${formatInr(totalInr)}</strong>
        </div>
        <h2 style="font-size:15px;margin:28px 0 12px">Delivery Details</h2>
        <table style="width:100%;font-size:14px;margin-bottom:24px">
          <tr><td style="padding:4px 0;color:#5F6368;width:140px">Company</td><td><strong>${form.companyName}</strong></td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">City</td><td>${form.city}</td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Shipping Address</td><td>${form.shippingAddress}</td></tr>
          <tr><td style="padding:4px 0;color:#5F6368">Billing Address</td><td>${form.billingAddress}</td></tr>
          ${form.notes ? `<tr><td style="padding:4px 0;color:#5F6368">Notes</td><td>${form.notes}</td></tr>` : ""}
        </table>
        <h2 style="font-size:15px;margin:28px 0 12px">What happens next?</h2>
        <ol style="padding-left:20px;font-size:14px;color:#5F6368;line-height:1.8">
          <li>Our business team will call you within 2 hours (Mon–Sat, 10 am–7 pm IST)</li>
          <li>You'll receive a detailed quote with final pricing and delivery timeline</li>
          <li>Zero-touch deployment configuration and IT onboarding discussion</li>
          <li>Pan-India delivery across 12,000+ pin codes — fully insured</li>
        </ol>
        <div style="margin-top:28px;padding:20px;background:#F0F4FF;border-radius:8px;text-align:center">
          <p style="margin:0 0 12px;font-size:14px;color:#5F6368">Questions? Reach us anytime</p>
          <a href="https://wa.me/919022223600?text=Hi%2C%20my%20B2B%20order%20ID%20is%20${shortId}" style="display:inline-block;background:#25D366;color:white;padding:10px 24px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600;margin-right:8px">WhatsApp</a>
          <a href="mailto:pixel@shivaami.com" style="display:inline-block;background:#4285F4;color:white;padding:10px 24px;border-radius:999px;text-decoration:none;font-size:14px;font-weight:600">Email us</a>
        </div>
        <p style="font-size:12px;color:#5F6368;margin-top:24px;text-align:center"><span style="color:#1ca0dc;font-family:'Vilane',sans-serif;font-weight:200">shivaami</span> — Authorized Google Partner, Mumbai<br/>pixel@shivaami.com · +91 90 2222 3600</p>
      </div>
    </div>`;

  await Promise.allSettled([
    resend.emails.send({
      from,
      to: ["harshal.patil@solutionplanets.com", "jinesh.mehta@solutionplanets.com"],
      subject: `New B2B Order — ${form.companyName} · ${summary.totalQty} device(s) · ${formatInr(totalInr)}`,
      html: shivamiHtml,
    }),
    resend.emails.send({
      from,
      to: form.email,
      subject: `Your Pixel order is confirmed — Order #${shortId}`,
      html: customerHtml,
    }),
  ]).then((results) => {
    results.forEach((r, i) => {
      if (r.status === "rejected")
        console.warn(`Email ${i} failed:`, r.reason);
    });
  });

  return NextResponse.json({ orderId: order.id }, { status: 201 });
}
