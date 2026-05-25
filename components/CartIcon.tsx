"use client";

import { useCart } from "@/lib/cart-store";
import { Link } from "@/i18n/navigation";
import { useEffect, useState } from "react";

export function CartIcon() {
  const items = useCart((s) => s.items);
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const count = mounted ? items.reduce((n, i) => n + i.qty, 0) : 0;

  return (
    <Link
      href="/cart"
      className="tracked text-[11px] text-charcoal hover:text-brass-deep transition-colors"
    >
      Cart {count > 0 && <span className="text-brass-deep">({count})</span>}
    </Link>
  );
}
