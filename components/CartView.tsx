"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useCart } from "@/lib/cart-store";
import { PRODUCTS } from "@/lib/products";
import { formatPrice } from "@/lib/formatPrice";
import type { Locale } from "@/i18n/routing";
import { Link } from "@/i18n/navigation";
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export function CartView({ locale }: { locale: Locale }) {
  const t = useTranslations();
  const items = useCart((s) => s.items);
  const setQty = useCart((s) => s.setQty);
  const remove = useCart((s) => s.remove);
  const [mounted, setMounted] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);
  useEffect(() => setMounted(true), []);

  const lines = items
    .map((i) => ({ item: i, product: PRODUCTS.find((p) => p.slug === i.slug) }))
    .filter((l): l is { item: typeof l.item; product: NonNullable<typeof l.product> } => !!l.product);

  const subtotalCents = lines.reduce(
    (sum, l) => sum + l.product.priceCents * l.item.qty,
    0,
  );

  if (!mounted) {
    return <div className="py-24 text-center text-taupe">…</div>;
  }

  if (lines.length === 0) {
    return (
      <div className="flex flex-col items-center gap-8 py-24 text-center">
        <p className="text-charcoal-soft/80">{t("cart.empty")}</p>
        <Link href="/products">
          <Button variant="ghost">{t("cart.continue")}</Button>
        </Link>
      </div>
    );
  }

  async function checkout() {
    setLoading(true);
    setError(null);
    try {
      const res = await fetch("/api/checkout", {
        method: "POST",
        headers: { "content-type": "application/json" },
        body: JSON.stringify({ items, locale }),
      });
      const data = await res.json();
      if (!res.ok || !data.url) throw new Error(data.error || "failed");
      window.location.href = data.url;
    } catch (e) {
      setError(t("checkout.error"));
      setLoading(false);
    }
  }

  return (
    <div className="grid gap-16 lg:grid-cols-[1fr_360px]">
      <div className="flex flex-col divide-y hairline">
        {lines.map(({ item, product }) => (
          <div key={item.slug} className="flex gap-6 py-8">
            <div className="relative h-32 w-28 shrink-0 overflow-hidden bg-ivory-soft">
              <Image
                src={product.images[0]}
                alt={product.name[locale]}
                fill
                sizes="120px"
                className="object-cover"
              />
            </div>
            <div className="flex flex-1 flex-col gap-3">
              <div className="flex items-baseline justify-between gap-4">
                <Link
                  href={`/products/${product.slug}`}
                  className="font-serif text-xl hover:text-brass-deep"
                >
                  {product.name[locale]}
                </Link>
                <span className="text-sm text-taupe">
                  {formatPrice(product.priceCents * item.qty, locale)}
                </span>
              </div>
              <div className="mt-auto flex items-center justify-between">
                <div className="flex items-center gap-3 border hairline">
                  <button
                    type="button"
                    className="px-3 py-1.5 text-charcoal-soft hover:text-charcoal"
                    onClick={() => setQty(item.slug, item.qty - 1)}
                  >
                    −
                  </button>
                  <span className="text-sm w-6 text-center">{item.qty}</span>
                  <button
                    type="button"
                    className="px-3 py-1.5 text-charcoal-soft hover:text-charcoal"
                    onClick={() => setQty(item.slug, item.qty + 1)}
                  >
                    +
                  </button>
                </div>
                <button
                  type="button"
                  onClick={() => remove(item.slug)}
                  className="tracked text-[11px] text-taupe hover:text-charcoal"
                >
                  {t("cart.remove")}
                </button>
              </div>
            </div>
          </div>
        ))}
      </div>
      <aside className="flex flex-col gap-6 border hairline bg-ivory-soft p-8 h-fit">
        <div className="flex items-baseline justify-between">
          <span className="tracked text-[11px] text-brass-deep">
            {t("cart.subtotal")}
          </span>
          <span className="font-serif text-2xl">
            {formatPrice(subtotalCents, locale)}
          </span>
        </div>
        <p className="text-xs text-charcoal-soft/70 leading-relaxed">
          {t("cart.shippingNote")}
        </p>
        <Button onClick={checkout} disabled={loading} className="w-full">
          {loading ? t("checkout.processing") : t("cart.checkout")}
        </Button>
        {error && <p className="text-xs text-red-700">{error}</p>}
      </aside>
    </div>
  );
}
