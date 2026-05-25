# Maison Lumière — Bilingual Furniture E-commerce

A luxury-styled furniture e-commerce MVP built with Next.js 16 (App Router), TypeScript, Tailwind v4, next-intl (EN/ZH), Zustand for the cart, and Stripe Checkout for payments.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`)
- next-intl (route-based `/en/...`, `/zh/...`)
- Zustand (cart, persisted to localStorage)
- Stripe Checkout (hosted, test mode)
- Cormorant Garamond + Inter via Google Fonts CDN

## Getting started

```bash
npm install
cp .env.example .env.local   # then fill in Stripe test keys
npm run dev
```

Open <http://localhost:3000> — the middleware redirects to `/en`. Switch to `/zh` from the top-right locale switcher.

## Environment variables

| Variable | Purpose |
| --- | --- |
| `STRIPE_SECRET_KEY` | Server-side Stripe key. Use a `sk_test_…` value in development. |
| `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` | Reserved for future Stripe.js usage. Not required for hosted Checkout. |
| `NEXT_PUBLIC_SITE_URL` | Optional fallback origin for Stripe `success_url`/`cancel_url`. |

Without `STRIPE_SECRET_KEY`, browsing/cart work; only the **Proceed to checkout** call fails.

## Project layout

```
app/
  [locale]/
    layout.tsx              # html/body, Header, Footer, NextIntlClientProvider
    page.tsx                # home: hero, featured, philosophy, collections, CTA
    products/page.tsx       # catalog with category filter
    products/[slug]/page.tsx
    cart/page.tsx
    checkout/{success,cancel}/page.tsx
    about/page.tsx
    contact/page.tsx
  api/
    checkout/route.ts       # POST → creates Stripe Checkout Session
    contact/route.ts        # POST → logs inquiry (stub: wire to Resend later)
components/                 # Header, Footer, ProductCard, CartView, etc.
i18n/                       # routing.ts, navigation.ts, request.ts
lib/
  products.ts               # PRODUCTS array — single source of truth
  cart-store.ts             # Zustand store
  stripe.ts                 # lazy server-side Stripe client
  formatPrice.ts            # USD/CNY formatting
messages/en.json, messages/zh.json
middleware.ts
```

## Editing products

All catalog data lives in [`lib/products.ts`](./lib/products.ts). Each product is bilingual:

```ts
{
  slug: "lumiere-sofa",
  name: { en: "Lumière Sofa", zh: "镜光沙发" },
  description: { en: "...", zh: "..." },
  category: "sofas",
  priceCents: 489000,
  images: ["https://..."],
  dimensions: { w: 224, d: 96, h: 78, unit: "cm" },
  materials: { en: "...", zh: "..." },
  featured: true,
}
```

Categories live in `CATEGORIES` (sofas | chairs | tables | beds | storage) and are translated in `messages/{en,zh}.json` under `categories`.

## Stripe test checkout

1. Set `STRIPE_SECRET_KEY=sk_test_…` in `.env.local`
2. Add items to cart, click **Proceed to checkout**
3. Use Stripe's test card: `4242 4242 4242 4242`, any future expiry, any CVC
4. On success you land at `/[locale]/checkout/success` — the cart is cleared client-side

The Checkout Session is created from `price_data` on the fly, so you don't need to mirror products into Stripe's dashboard. Currency is USD; the CNY price shown on `/zh` pages is a display-only conversion (see `CNY_PER_USD` in `lib/formatPrice.ts`).

## Build & deploy

```bash
npm run build
npm start
```

Deploys cleanly to Vercel. Add the env vars in the Vercel dashboard. Remote images use `images.unsplash.com` (allowlisted in `next.config.ts`).

## Roadmap (out of scope for MVP)

- Admin/CMS for product editing (migrate `lib/products.ts` → Sanity)
- Real contact email delivery (wire `app/api/contact/route.ts` to Resend)
- Stripe webhooks + a real orders DB
- User accounts, order history, wishlist
- Search, advanced filters, reviews
- Inventory tracking
