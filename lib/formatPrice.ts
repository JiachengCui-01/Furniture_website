import type { Locale } from "@/i18n/routing";

const CNY_PER_USD = 7.25;

export function formatPrice(cents: number, locale: Locale) {
  if (locale === "zh") {
    const yuan = Math.round((cents / 100) * CNY_PER_USD);
    return new Intl.NumberFormat("zh-CN", {
      style: "currency",
      currency: "CNY",
      maximumFractionDigits: 0,
    }).format(yuan);
  }
  return new Intl.NumberFormat("en-US", {
    style: "currency",
    currency: "USD",
    maximumFractionDigits: 0,
  }).format(cents / 100);
}
