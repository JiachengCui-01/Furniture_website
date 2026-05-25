# Maison Lumière — Bilingual Furniture E-commerce

A luxury-styled furniture e-commerce MVP built with Next.js 16 (App Router), TypeScript, Tailwind v4, next-intl (EN/ZH), Zustand for the cart, and Stripe Checkout for payments.

## Stack

- Next.js 16 + React 19 + TypeScript
- Tailwind CSS v4 (CSS-first `@theme`)
- next-intl (route-based `/en/...`, `/zh/...`)
- Zustand (cart, persisted to localStorage)
- Stripe Checkout (hosted, test mode)
- Cormorant Garamond + Inter via Google Fonts CDN

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
