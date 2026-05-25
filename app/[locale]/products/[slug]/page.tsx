import Image from "next/image";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { Container } from "@/components/ui/Container";
import { Price } from "@/components/ui/Price";
import { AddToCartButton } from "@/components/AddToCartButton";
import { getProduct, PRODUCTS } from "@/lib/products";
import { routing, type Locale } from "@/i18n/routing";

export function generateStaticParams() {
  return PRODUCTS.flatMap((p) =>
    routing.locales.map((locale) => ({ locale, slug: p.slug })),
  );
}

export default async function ProductPage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale, slug } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const product = getProduct(slug);
  if (!product) notFound();
  const t = await getTranslations();
  const loc = locale as Locale;

  return (
    <Container className="py-16 md:py-24">
      <div className="grid gap-12 lg:grid-cols-[1.2fr_1fr] lg:gap-20">
        <div className="relative aspect-[4/5] overflow-hidden bg-ivory-soft">
          <Image
            src={product.images[0]}
            alt={product.name[loc]}
            fill
            priority
            sizes="(min-width: 1024px) 55vw, 100vw"
            className="object-cover"
          />
        </div>
        <div className="flex flex-col gap-8 lg:pt-12">
          <div className="flex flex-col gap-4">
            <span className="tracked text-[11px] text-brass-deep">
              {t(`categories.${product.category}`)}
            </span>
            <h1 className="font-serif text-4xl md:text-5xl leading-[1.05]">
              {product.name[loc]}
            </h1>
            <Price
              cents={product.priceCents}
              locale={loc}
              className="font-serif text-2xl text-taupe"
            />
          </div>
          <p className="text-charcoal-soft/85 leading-relaxed max-w-md">
            {product.description[loc]}
          </p>
          <AddToCartButton slug={product.slug} />
          <dl className="mt-8 grid grid-cols-1 gap-y-6 border-t hairline pt-8 text-sm">
            {product.dimensions && (
              <div className="flex justify-between gap-6">
                <dt className="tracked text-[11px] text-brass-deep">
                  {t("products.dimensions")}
                </dt>
                <dd className="text-charcoal-soft/85">
                  {product.dimensions.w} × {product.dimensions.d} ×{" "}
                  {product.dimensions.h} {product.dimensions.unit}
                </dd>
              </div>
            )}
            {product.materials && (
              <div className="flex justify-between gap-6">
                <dt className="tracked text-[11px] text-brass-deep">
                  {t("products.materials")}
                </dt>
                <dd className="text-charcoal-soft/85 text-right">
                  {product.materials[loc]}
                </dd>
              </div>
            )}
            <div className="flex justify-between gap-6">
              <dt className="tracked text-[11px] text-brass-deep">
                {t("products.details")}
              </dt>
              <dd className="text-charcoal-soft/85 text-right">
                {t("products.leadTime")}
              </dd>
            </div>
          </dl>
        </div>
      </div>
    </Container>
  );
}
