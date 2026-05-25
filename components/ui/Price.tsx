import { formatPrice } from "@/lib/formatPrice";
import type { Locale } from "@/i18n/routing";

export function Price({
  cents,
  locale,
  className,
}: {
  cents: number;
  locale: Locale;
  className?: string;
}) {
  return <span className={className}>{formatPrice(cents, locale)}</span>;
}
