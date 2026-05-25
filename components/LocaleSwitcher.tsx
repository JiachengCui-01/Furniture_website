"use client";

import { useLocale } from "next-intl";
import { usePathname, useRouter } from "@/i18n/navigation";
import { routing, type Locale } from "@/i18n/routing";
import clsx from "clsx";

export function LocaleSwitcher() {
  const current = useLocale() as Locale;
  const router = useRouter();
  const pathname = usePathname();

  return (
    <div className="flex items-center gap-2 text-[11px] tracked">
      {routing.locales.map((l, idx) => (
        <span key={l} className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => router.replace(pathname, { locale: l })}
            className={clsx(
              "transition-colors",
              l === current
                ? "text-charcoal"
                : "text-taupe hover:text-charcoal",
            )}
          >
            {l === "en" ? "EN" : "中文"}
          </button>
          {idx === 0 && <span className="text-line">/</span>}
        </span>
      ))}
    </div>
  );
}
