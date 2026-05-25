"use client";

import { useState } from "react";
import { useCart } from "@/lib/cart-store";
import { useTranslations } from "next-intl";
import { Button } from "./ui/Button";

export function AddToCartButton({ slug }: { slug: string }) {
  const add = useCart((s) => s.add);
  const t = useTranslations("products");
  const [added, setAdded] = useState(false);

  return (
    <Button
      onClick={() => {
        add(slug, 1);
        setAdded(true);
        setTimeout(() => setAdded(false), 1500);
      }}
    >
      {added ? t("added") : t("addToCart")}
    </Button>
  );
}
