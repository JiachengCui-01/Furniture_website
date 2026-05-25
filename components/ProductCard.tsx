import Image from "next/image";
import { Link } from "@/i18n/navigation";
import type { Locale } from "@/i18n/routing";
import type { Product } from "@/lib/products";
import { Price } from "./ui/Price";

export function ProductCard({
  product,
  locale,
}: {
  product: Product;
  locale: Locale;
}) {
  return (
    <Link
      href={`/products/${product.slug}`}
      className="group flex flex-col gap-4"
    >
      <div className="relative aspect-[4/5] overflow-hidden bg-ivory-soft">
        <Image
          src={product.images[0]}
          alt={product.name[locale]}
          fill
          sizes="(min-width: 1024px) 25vw, (min-width: 768px) 33vw, 50vw"
          className="object-cover transition-transform duration-[1200ms] ease-out group-hover:scale-[1.03]"
        />
      </div>
      <div className="flex items-baseline justify-between gap-4">
        <h3 className="font-serif text-xl leading-tight">
          {product.name[locale]}
        </h3>
        <Price
          cents={product.priceCents}
          locale={locale}
          className="text-sm text-taupe"
        />
      </div>
    </Link>
  );
}
