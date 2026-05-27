# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## ⚠️ Next.js Version Warning

This project uses **Next.js 16.2.4** with **React 19**. APIs, conventions, and file-system behaviour differ from training data. Before writing any App Router code, read the relevant guide in `node_modules/next/dist/docs/01-app/`. Heed all deprecation notices.

Key difference: `params` in page components is now a **Promise** and must be awaited:
```ts
// Correct
export default async function Page({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
}
```

## Commands

```bash
npm run dev      # start dev server (http://localhost:3000)
npm run build    # production build (also runs TypeScript check)
npm run lint     # ESLint
npx tsc --noEmit # type-check without building
```

## Environment Setup

Copy `.env.local.example` → `.env.local` and fill in all values before running the app.
The app requires Supabase, Razorpay, and Resend to be configured — it will not start correctly without them.

See `.env.local.example` for instructions on where to get each key.

## Architecture

**Stack:** Next.js 16 App Router · React 19 · Tailwind CSS 4 · shadcn/ui (via `@base-ui/react`) · TypeScript 5 · Supabase (auth + DB) · Razorpay (payments) · Resend (transactional email)

**Path alias:** `@/` maps to `src/`

### Routing

| Route | Status | Notes |
|---|---|---|
| `/` | ✅ Built | Landing page (full marketing site) |
| `/products` | ✅ Built | Pixel 10 series catalog grid |
| `/products/[slug]` | ✅ Built | Individual product page (SSG via `generateStaticParams`) |
| `/marketplace` | ✅ Built | B2B order flow with cart + Razorpay payments |
| `/marketplace/confirmation` | ✅ Built | Post-order confirmation page |
| `/login` | ✅ Built | Supabase auth — email/password + OAuth |
| `/register` | ✅ Built | New user registration |
| `/admin/login` | ✅ Built | Admin sign-in (separate from customer login) |
| `/admin` | ✅ Built | Admin dashboard — orders, customers, revenue stats |
| `/auth/callback` | ✅ Built | Supabase OAuth callback handler |

All pages manually compose `<Navbar />` + `<main>` + `<Footer />` — there is no shared layout that wraps content pages.

### Component organisation

- `src/components/layout/` — `Navbar` (client, scroll-aware, mobile Sheet drawer), `Footer`
- `src/components/landing/` — one component per landing-page section
- `src/components/products/` — catalog and product-detail components; all consume typed data from `src/lib/products.ts`
- `src/components/marketplace/` — `ProductOrderCard`, `OrderFormModal`, `OrderSummary`, `SavingsCalculator`
- `src/components/admin/` — `StatsCards`, `OrdersTable`, `CustomersTable`, `PhonesSoldChart`, `SignOutButton`
- `src/components/auth/` — `LoginForm`, `RegisterForm`
- `src/components/ui/` — shadcn primitives: `Button`, `Badge`, `Card`, `Sheet`, `Separator`
- `src/hooks/useInView.ts` — Intersection Observer scroll-reveal hook; returns `{ ref, isVisible }`
- `src/context/CartContext.tsx` — React context + reducer for the B2B shopping cart (in-memory, not persisted)
- `src/lib/products.ts` — **single source of truth** for all product data (specs, colors, AI features, ecosystem benefits)
- `src/lib/marketplace.ts` — pricing constants, bulk-discount tiers, `calcSavings()`, `formatInr()`
- `src/lib/razorpay.ts` — browser-side script loader for Razorpay Checkout
- `src/lib/utils.ts` — `cn()` (clsx + tailwind-merge)
- `src/lib/supabase/client.ts` — browser Supabase client (`createBrowserClient`)
- `src/lib/supabase/server.ts` — server Supabase client (`createServerClient` + cookie adapter)
- `src/lib/supabase/admin.ts` — service-role client (bypasses RLS — **server-only**)

### API Routes

| Route | Method | Purpose |
|---|---|---|
| `/api/orders` | POST | Validate + insert order/order_items rows, verify Razorpay signature for `pay_now`, send emails via Resend |
| `/api/razorpay/create-order` | POST | Create a Razorpay order and return `razorpayOrderId` + public key |
| `/api/razorpay/webhook` | POST | Verify Razorpay webhook signature; update order `status → confirmed` on `payment.captured` |

### Database Schema (Supabase)

You need to create these tables in your Supabase project:

```sql
-- Orders placed by B2B customers
create table orders (
  id uuid primary key default gen_random_uuid(),
  user_id uuid references auth.users,
  company_name text not null,
  contact_name text,
  email text not null,
  phone text,
  gst_number text,
  city text,
  notes text,
  payment_mode text,          -- 'pay_now' | 'invoice'
  status text,                -- 'confirmed' | 'invoice_requested' | 'pending'
  razorpay_order_id text,
  razorpay_payment_id text,
  total_amount bigint,        -- in paise (INR × 100)
  total_inr numeric,
  created_at timestamptz default now()
);

-- Line items per order
create table order_items (
  id uuid primary key default gen_random_uuid(),
  order_id uuid references orders(id),
  product_slug text not null,
  product_name text,
  color_name text,
  quantity int,
  unit_price bigint           -- in paise
);

-- Customer profile (created alongside auth.users)
create table profiles (
  id uuid primary key references auth.users(id),
  full_name text,
  company_name text,
  phone text,
  created_at timestamptz default now()
);
```

Enable Row Level Security (RLS) on all tables. The admin dashboard uses the service-role key to bypass RLS.

### Marketplace / Order Flow

1. `CartContext` holds in-memory cart items (product slug, color, quantity, unit price).
2. `MarketplaceClient` renders `ProductOrderCard` per product (add to cart) + `OrderSummary` sidebar.
3. `OrderSummary` → `OrderFormModal` collects company details and payment mode.
4. **Pay Now:** calls `/api/razorpay/create-order` → opens Razorpay Checkout → on success calls `/api/orders` with payment IDs for signature verification.
5. **Invoice:** calls `/api/orders` directly (no Razorpay IDs required).
6. `/api/orders` inserts rows into Supabase, then fires two emails via Resend — one to `pixel@shivaami.com` (internal alert) and one to the customer.
7. Redirect to `/marketplace/confirmation`.

### Admin Dashboard (`/admin`)

- Protected by `ADMIN_EMAILS` env var. Only email addresses in that comma-separated list can access `/admin`.
- Uses the service-role Supabase client to fetch orders, order items, profiles, and auth users.
- Displays: revenue stats, units sold, pending orders, phones-sold chart, orders table, customers table.
- Sign-in at `/admin/login` (same Supabase auth as customers — just email-gated by the layout).

### Pricing

All prices are in `src/lib/marketplace.ts` → `RETAIL_PRICES`. These are fixed corporate prices **including 18% GST**. The `BULK_TIERS` array defines volume-discount brackets (currently set to 0% — update there to enable bulk discounts).

### Scroll-reveal pattern

All animated sections use `useInView` + CSS classes from `globals.css`:
```tsx
const { ref, isVisible } = useInView(0.1);
<div ref={ref as React.RefObject<HTMLDivElement>}
     className={`reveal delay-100 ${isVisible ? "visible" : ""}`}>
```
Available stagger delays: `delay-100` through `delay-500`.

### Design system

Tailwind 4 CSS-only config — no `tailwind.config.ts`. All tokens are CSS custom properties defined in `src/app/globals.css` `:root` block using OKLCH.

Key tokens:
- `primary` → Google Blue `#4285F4`
- `secondary` → Lavender `#E8D5FF`
- `accent` → Mint `#CEEAD6`
- `muted-foreground` → `#5F6368`
- `border` → `#DADCE0`
- Base radius `0.75rem`; cards use `rounded-2xl` / `rounded-3xl`; buttons/pills use `rounded-full`

Custom animation classes: `animate-float`, `animate-float-slow`, `animate-float-reverse`, `animate-pulse-glow`, `animate-spin-slow`.

### UI component notes

`Button` wraps `@base-ui/react/button` (not HTML `<button>`). For link-styled buttons use `buttonVariants()` + Next.js `<Link>`:
```tsx
import { buttonVariants } from "@/components/ui/button";
<Link href="/foo" className={cn(buttonVariants({ variant: "outline", size: "lg" }), "rounded-full")}>
```

### Product data

`src/lib/products.ts` exports the `Product` interface and an array of 4 products (Pixel 10a, Pixel 10, Pixel 10 Pro XL, Pixel 10 Pro Fold). Use `getProductBySlug(slug)` and `getAllProductSlugs()` — do not duplicate product data in components.

## Project context

**Client:** Shivaami (Mumbai) — authorised Google Partner, Pixel SMB dealership  
**Contact:** pixel@shivaami.com | +91 90 2222 3600  
**WhatsApp deep link:** `https://wa.me/919022223600`  
**Brand campaign headline:** "Empower Your Team. Elevate Productivity."

## What's left to build / improve

- **Supabase Auth flows:** OAuth providers (Google) not yet configured in Supabase dashboard — needs enabling in Auth → Providers.
- **Resend domain:** Currently uses `onboarding@resend.dev` (Resend sandbox sender). For production, verify a custom domain in Resend and update the `from` address in `src/app/api/orders/route.ts`.
- **Razorpay webhook registration:** The webhook endpoint `/api/razorpay/webhook` must be registered in the Razorpay dashboard with the correct `RAZORPAY_WEBHOOK_SECRET`.
- **RLS policies:** Row Level Security is enabled but policies need to be written in Supabase for customers to read/write only their own orders.
- **Profile creation trigger:** A Supabase database trigger or auth hook should auto-create a `profiles` row when a new user signs up.
- **Deployment:** Not yet deployed. Recommended: Vercel (configured to read `.env` from Vercel dashboard). Set `NEXTAUTH_URL` / `NEXT_PUBLIC_SITE_URL` as needed.
