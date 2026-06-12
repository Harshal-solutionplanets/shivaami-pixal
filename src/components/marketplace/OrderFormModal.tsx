"use client";

import { useState } from "react";
import { useCart } from "@/context/CartContext";
import { calcSavings, formatInr, RETAIL_PRICES } from "@/lib/marketplace";
import { loadRazorpayScript } from "@/lib/razorpay";
import { cn } from "@/lib/utils";

interface OrderFormModalProps {
  open: boolean;
  onClose: () => void;
  onSuccess: (orderId: string) => void;
  retailPrices?: Record<string, number>;
}

interface OrderForm {
  companyName: string;
  contactName: string;
  email: string;
  phone: string;
  gstNumber: string;
  city: string;
  shippingAddress: string;
  billingAddress: string;
  notes: string;
  paymentMode: "pay_now" | "invoice";
}

const initialForm: OrderForm = {
  companyName: "",
  contactName: "",
  email: "",
  phone: "",
  gstNumber: "",
  city: "",
  shippingAddress: "",
  billingAddress: "",
  notes: "",
  paymentMode: "pay_now",
};

function validate(form: OrderForm): Partial<Record<keyof OrderForm, string>> {
  const errors: Partial<Record<keyof OrderForm, string>> = {};
  if (!form.companyName.trim() || form.companyName.trim().length < 2)
    errors.companyName = "Company name is required";
  if (!form.contactName.trim())
    errors.contactName = "Contact name is required";
  if (!form.email.trim() || !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(form.email))
    errors.email = "Valid email is required";
  if (!form.phone.trim() || !/^\d{10}$/.test(form.phone.replace(/\s/g, "")))
    errors.phone = "10-digit phone number required";
  if (!form.gstNumber.trim()) {
    errors.gstNumber = "GST number is required";
  } else if (!/^[0-9]{2}[a-zA-Z]{5}[0-9]{4}[a-zA-Z]{1}[a-zA-Z0-9]{1}[zZ]{1}[a-zA-Z0-9]{1}$/.test(form.gstNumber.trim())) {
    errors.gstNumber = "Invalid 15-digit GST number format";
  }
  if (!form.city.trim())
    errors.city = "Delivery city is required";
  if (!form.shippingAddress.trim())
    errors.shippingAddress = "Shipping address is required";
  if (!form.billingAddress.trim())
    errors.billingAddress = "Billing address is required";
  return errors;
}

export default function OrderFormModal({
  open,
  onClose,
  onSuccess,
  retailPrices,
}: OrderFormModalProps) {
  const { items, clearCart } = useCart();
  const [form, setForm] = useState<OrderForm>(initialForm);
  const [errors, setErrors] = useState<Partial<Record<keyof OrderForm, string>>>({});
  const [sameAsBilling, setSameAsBilling] = useState(false);
  const [submitting, setSubmitting] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);

  const calcItems = items.map((i) => ({
    slug: i.productSlug,
    quantity: i.quantity,
    unitPriceInr: retailPrices?.[i.productSlug] ?? i.unitPriceInr,
  }));
  const summary = calcSavings(calcItems);

  if (!open) return null;

  function update<K extends keyof OrderForm>(key: K, value: OrderForm[K]) {
    setForm((prev) => {
      const next = { ...prev, [key]: value };
      if (key === "billingAddress" && sameAsBilling) {
        next.shippingAddress = value as string;
      }
      return next;
    });
    setErrors((prev) => {
      const nextErrors = { ...prev, [key]: undefined };
      if (key === "billingAddress" && sameAsBilling) {
        nextErrors.shippingAddress = undefined;
      }
      return nextErrors;
    });
    setApiError(null);
  }

  const handleSameAsBillingChange = (checked: boolean) => {
    setSameAsBilling(checked);
    if (checked) {
      setForm((prev) => ({ ...prev, shippingAddress: prev.billingAddress }));
      setErrors((prev) => ({ ...prev, shippingAddress: undefined }));
    }
  };

  async function submitInvoiceOrder() {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form,
        items: items.map((i) => ({
          productSlug: i.productSlug,
          productName: i.productName,
          colorName: i.color.name,
          quantity: i.quantity,
          unitPriceInr: retailPrices?.[i.productSlug] ?? i.unitPriceInr,
        })),
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to place order");
    return data.orderId as string;
  }

  async function submitPayNowOrder(
    razorpayOrderId: string,
    razorpayPaymentId: string,
    razorpaySignature: string
  ) {
    const res = await fetch("/api/orders", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        form,
        items: items.map((i) => ({
          productSlug: i.productSlug,
          productName: i.productName,
          colorName: i.color.name,
          quantity: i.quantity,
          unitPriceInr: retailPrices?.[i.productSlug] ?? i.unitPriceInr,
        })),
        razorpayOrderId,
        razorpayPaymentId,
        razorpaySignature,
      }),
    });
    const data = await res.json();
    if (!res.ok) throw new Error(data.error ?? "Failed to confirm order");
    return data.orderId as string;
  }

  async function handleSubmit(e: React.FormEvent) {
    e.preventDefault();
    const validationErrors = validate(form);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    if (items.length === 0) {
      setApiError("Your order is empty. Add devices first.");
      return;
    }

    setSubmitting(true);
    setApiError(null);

    try {
      if (form.paymentMode === "invoice") {
        const orderId = await submitInvoiceOrder();
        clearCart();
        onSuccess(orderId);
      } else {
        // Pay Now via Razorpay
        const loaded = await loadRazorpayScript();
        if (!loaded) {
          setApiError(
            "Payment system unavailable. Please use the Invoice option."
          );
          setSubmitting(false);
          return;
        }

        const orderRes = await fetch("/api/razorpay/create-order", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ amountInr: summary.effectivePrice }),
        });
        const { razorpayOrderId, key } = await orderRes.json();
        if (!razorpayOrderId) {
          setApiError("Could not initiate payment. Please try again.");
          setSubmitting(false);
          return;
        }

        const rzp = new window.Razorpay({
          key,
          amount: summary.effectivePrice * 100,
          currency: "INR",
          name: "tax print & shivaami",
          description: `B2B Pixel Order — ${summary.totalQty} device(s)`,
          order_id: razorpayOrderId,
          prefill: {
            name: form.contactName,
            email: form.email,
            contact: form.phone,
          },
          notes: { company: form.companyName },
          theme: { color: "#4285F4" },
          handler: async (response: {
            razorpay_order_id: string;
            razorpay_payment_id: string;
            razorpay_signature: string;
          }) => {
            try {
              const orderId = await submitPayNowOrder(
                response.razorpay_order_id,
                response.razorpay_payment_id,
                response.razorpay_signature
              );
              clearCart();
              onSuccess(orderId);
            } catch {
              setApiError(
                "Payment received but order save failed. Contact pixel@shivaami.com."
              );
              setSubmitting(false);
            }
          },
          modal: {
            ondismiss: () => setSubmitting(false),
          },
        });
        rzp.open();
      }
    } catch (err) {
      setApiError(err instanceof Error ? err.message : "Something went wrong");
      setSubmitting(false);
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Backdrop */}
      <div
        className="absolute inset-0 bg-black/40 backdrop-blur-sm"
        onClick={submitting ? undefined : onClose}
      />

      {/* Modal */}
      <div className="relative bg-white rounded-3xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white rounded-t-3xl px-6 py-5 border-b border-border/60 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg font-bold text-foreground">
              Complete Your Order
            </h2>
            <p className="text-xs text-muted-foreground mt-0.5">
              {summary.totalQty} device(s) · {formatInr(summary.retailTotal)} · Corporate pricing incl. GST
            </p>
          </div>
          {!submitting && (
            <button
              onClick={onClose}
              className="text-muted-foreground hover:text-foreground transition-colors p-1"
              aria-label="Close"
            >
              ✕
            </button>
          )}
        </div>

        <form onSubmit={handleSubmit} className="px-6 py-6 flex flex-col gap-6">
          {/* Business info */}
          <div>
            <h3 className="text-sm font-semibold text-foreground mb-4">
              Business Details
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <Field
                label="Company Name *"
                value={form.companyName}
                onChange={(v) => update("companyName", v)}
                error={errors.companyName}
                placeholder="Acme Technologies Pvt Ltd"
                disabled={submitting}
              />
              <Field
                label="Contact Name *"
                value={form.contactName}
                onChange={(v) => update("contactName", v)}
                error={errors.contactName}
                placeholder="Rahul Sharma"
                disabled={submitting}
              />
              <Field
                label="Work Email *"
                type="email"
                value={form.email}
                onChange={(v) => update("email", v)}
                error={errors.email}
                placeholder="rahul@acme.com"
                disabled={submitting}
              />
              <Field
                label="Phone Number *"
                type="tel"
                value={form.phone}
                onChange={(v) => update("phone", v)}
                error={errors.phone}
                placeholder="9876543210"
                disabled={submitting}
              />
              <Field
                label="GST Number *"
                value={form.gstNumber}
                onChange={(v) => update("gstNumber", v)}
                error={errors.gstNumber}
                placeholder="27AAPFU0939F1ZV"
                disabled={submitting}
              />
              <Field
                label="Delivery City *"
                value={form.city}
                onChange={(v) => update("city", v)}
                error={errors.city}
                placeholder="Mumbai"
                disabled={submitting}
              />
              <Field
                label="Billing Address *"
                value={form.billingAddress}
                onChange={(v) => update("billingAddress", v)}
                error={errors.billingAddress}
                placeholder="Enter billing address for invoice"
                disabled={submitting}
              />
              <div className="flex flex-col gap-1.5">
                <div className="flex items-center gap-2 mt-1">
                  <input
                    type="checkbox"
                    id="sameAsBilling"
                    checked={sameAsBilling}
                    onChange={(e) => handleSameAsBillingChange(e.target.checked)}
                    disabled={submitting}
                    className="w-4 h-4 rounded text-primary focus:ring-primary/30 border-border bg-background cursor-pointer"
                  />
                  <label htmlFor="sameAsBilling" className="text-xs font-semibold text-foreground cursor-pointer select-none">
                    Same as billing address
                  </label>
                </div>
                <Field
                  label="Shipping Address *"
                  value={form.shippingAddress}
                  onChange={(v) => update("shippingAddress", v)}
                  error={errors.shippingAddress}
                  placeholder="mohan building, opp my cafe, kurla,400070"
                  disabled={submitting || sameAsBilling}
                />
              </div>
              <div className="sm:col-span-2">
                <label className="block text-xs font-medium text-foreground mb-1.5">
                  Additional Notes
                </label>
                <textarea
                  value={form.notes}
                  onChange={(e) => update("notes", e.target.value)}
                  placeholder="Delivery instructions, special requirements..."
                  rows={3}
                  disabled={submitting}
                  className="w-full rounded-xl border border-border/80 px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 resize-none disabled:opacity-60"
                />
              </div>
            </div>
          </div>

          {/* API error */}
          {apiError && (
            <div className="bg-destructive/10 text-destructive text-sm rounded-xl px-4 py-3">
              {apiError}
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={submitting || items.length === 0}
            className={cn(
              "w-full py-4 rounded-full font-bold text-sm transition-all duration-200 flex items-center justify-center gap-2",
              submitting || items.length === 0
                ? "bg-muted text-muted-foreground cursor-not-allowed"
                : "bg-primary text-white hover:bg-[#1A73E8]"
            )}
          >
            {submitting ? (
              <>
                <span className="animate-spin inline-block w-4 h-4 border-2 border-white/30 border-t-white rounded-full" />
                Processing…
              </>
            ) : (
              "Confirm Order"
            )}
          </button>

          <p className="text-xs text-center text-muted-foreground">
            By placing this order you agree to our terms. Questions?{" "}
            <a
              href="https://wa.me/919022223600"
              target="_blank"
              rel="noopener noreferrer"
              className="text-primary hover:underline"
            >
              WhatsApp us
            </a>
          </p>
        </form>
      </div>
    </div>
  );
}

// Reusable form field
interface FieldProps {
  label: string;
  value: string;
  onChange: (v: string) => void;
  error?: string;
  placeholder?: string;
  type?: string;
  disabled?: boolean;
}

function Field({
  label,
  value,
  onChange,
  error,
  placeholder,
  type = "text",
  disabled,
}: FieldProps) {
  return (
    <div>
      <label className="block text-xs font-medium text-foreground mb-1.5">
        {label}
      </label>
      <input
        type={type}
        value={value}
        onChange={(e) => onChange(e.target.value)}
        placeholder={placeholder}
        disabled={disabled}
        className={cn(
          "w-full rounded-xl border px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary/30 disabled:opacity-60",
          error ? "border-destructive" : "border-border/80"
        )}
      />
      {error && <p className="mt-1 text-xs text-destructive">{error}</p>}
    </div>
  );
}

// Payment option card
interface PaymentOptionProps {
  selected: boolean;
  onSelect: () => void;
  disabled?: boolean;
  title: string;
  description: string;
  badge: string;
}

function PaymentOption({
  selected,
  onSelect,
  disabled,
  title,
  description,
  badge,
}: PaymentOptionProps) {
  return (
    <button
      type="button"
      onClick={onSelect}
      disabled={disabled}
      className={cn(
        "text-left p-4 rounded-2xl border-2 transition-all duration-200 disabled:opacity-60 disabled:cursor-not-allowed",
        selected
          ? "border-primary bg-primary/5"
          : "border-border/60 hover:border-primary/40"
      )}
    >
      <div className="flex items-center gap-2 mb-1.5">
        <span
          className={cn(
            "w-4 h-4 rounded-full border-2 shrink-0",
            selected
              ? "border-primary bg-primary"
              : "border-muted-foreground"
          )}
        />
        <span className="text-sm font-semibold text-foreground">{title}</span>
      </div>
      <p className="text-xs text-muted-foreground pl-6 leading-relaxed">
        {description}
      </p>
      <span className="mt-2 ml-6 inline-block text-[10px] font-semibold bg-accent text-foreground/70 px-2 py-0.5 rounded-full">
        {badge}
      </span>
    </button>
  );
}
