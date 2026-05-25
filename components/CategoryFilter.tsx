"use client";

import { useState } from "react";
import clsx from "clsx";
import { ProductCard } from "./ProductCard";
import type { Product, Category } from "@/lib/products";
import { CATEGORIES } from "@/lib/products";
import type { Locale } from "@/i18n/routing";
import { useTranslations } from "next-intl";

export function CategoryFilter({
  products,
  locale,
}: {
  products: Product[];
  locale: Locale;
}) {
  const t = useTranslations();
  const [active, setActive] = useState<Category | "all">("all");
  const filtered =
    active === "all" ? products : products.filter((p) => p.category === active);

  return (
    <div className="flex flex-col gap-12">
      <div className="flex flex-wrap items-center gap-x-8 gap-y-3 border-b hairline pb-5">
        {(["all", ...CATEGORIES] as const).map((c) => (
          <button
            key={c}
            type="button"
            onClick={() => setActive(c)}
            className={clsx(
              "tracked text-[11px] transition-colors",
              active === c
                ? "text-charcoal border-b border-brass pb-1"
                : "text-taupe hover:text-charcoal",
            )}
          >
            {c === "all" ? t("products.all") : t(`categories.${c}`)}
          </button>
        ))}
      </div>
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
        {filtered.map((p) => (
          <ProductCard key={p.slug} product={p} locale={locale} />
        ))}
      </div>
    </div>
  );
}
