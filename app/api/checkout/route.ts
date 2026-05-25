import { NextResponse } from "next/server";
import { getStripe } from "@/lib/stripe";
import { PRODUCTS } from "@/lib/products";
import { routing } from "@/i18n/routing";

type Body = {
  items?: { slug: string; qty: number }[];
  locale?: string;
};

export async function POST(req: Request) {
  try {
    const body = (await req.json()) as Body;
    const items = body.items ?? [];
    const locale = routing.locales.includes(
      (body.locale ?? "en") as (typeof routing.locales)[number],
    )
      ? (body.locale as (typeof routing.locales)[number])
      : routing.defaultLocale;

    if (items.length === 0) {
      return NextResponse.json({ error: "empty cart" }, { status: 400 });
    }

    const line_items = items
      .map((i) => {
        const product = PRODUCTS.find((p) => p.slug === i.slug);
        if (!product) return null;
        return {
          quantity: Math.max(1, Math.floor(i.qty)),
          price_data: {
            currency: "usd",
            unit_amount: product.priceCents,
            product_data: {
              name: product.name[locale],
              description: product.description[locale].slice(0, 240),
              images: product.images.slice(0, 1),
            },
          },
        };
      })
      .filter(<T,>(x: T | null): x is T => x !== null);

    const origin =
      req.headers.get("origin") ??
      process.env.NEXT_PUBLIC_SITE_URL ??
      "http://localhost:3000";

    const stripe = getStripe();
    const session = await stripe.checkout.sessions.create({
      mode: "payment",
      line_items,
      success_url: `${origin}/${locale}/checkout/success`,
      cancel_url: `${origin}/${locale}/checkout/cancel`,
      shipping_address_collection: {
        allowed_countries: ["US", "CA", "GB", "FR", "DE", "CN", "HK", "SG", "AU", "JP"],
      },
    });

    return NextResponse.json({ url: session.url });
  } catch (e) {
    console.error("checkout error", e);
    const message = e instanceof Error ? e.message : "unknown";
    return NextResponse.json({ error: message }, { status: 500 });
  }
}
