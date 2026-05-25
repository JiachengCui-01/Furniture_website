import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ProductCard } from "@/components/ProductCard";
import { CATEGORIES, getFeatured } from "@/lib/products";
import { hasLocale } from "next-intl";
import { routing, type Locale } from "@/i18n/routing";
import { notFound } from "next/navigation";

export default async function Home({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();
  const featured = getFeatured();

  return (
    <>
      {/* Hero */}
      <section className="relative">
        <div className="relative h-[78vh] min-h-[560px] w-full overflow-hidden">
          <Image
            src="/images/pages/hero.jpg"
            alt=""
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-b from-charcoal/10 via-charcoal/20 to-charcoal/55" />
          <Container className="relative h-full flex flex-col justify-end pb-20 md:pb-28 text-ivory fade-up">
            <span className="tracked text-[11px] text-ivory/80">
              {t("home.heroEyebrow")}
            </span>
            <h1 className="mt-6 font-serif text-4xl md:text-6xl lg:text-7xl leading-[1.02] max-w-3xl">
              {t("home.heroTitle")}
            </h1>
            <p className="mt-6 max-w-xl text-base md:text-lg text-ivory/85 leading-relaxed">
              {t("home.heroSubtitle")}
            </p>
            <div className="mt-10 flex flex-wrap gap-4">
              <Link href="/products">
                <Button className="!border-ivory !bg-ivory !text-charcoal hover:!bg-brass hover:!text-ivory hover:!border-brass">
                  {t("home.heroCta")}
                </Button>
              </Link>
              <Link href="/about">
                <Button
                  variant="ghost"
                  className="!border-ivory/70 !text-ivory hover:!bg-ivory hover:!text-charcoal"
                >
                  {t("home.heroCtaSecondary")}
                </Button>
              </Link>
            </div>
          </Container>
        </div>
      </section>

      {/* Featured */}
      <Container className="py-24 md:py-32">
        <SectionHeading
          eyebrow={t("home.featuredTitle")}
          title={t("brand.tagline")}
          subtitle={t("home.featuredSubtitle")}
        />
        <div className="mt-16 grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-x-8 gap-y-14">
          {featured.map((p) => (
            <ProductCard key={p.slug} product={p} locale={locale as Locale} />
          ))}
        </div>
        <div className="mt-16 flex justify-center">
          <Link href="/products">
            <Button variant="ghost">{t("home.heroCta")}</Button>
          </Link>
        </div>
      </Container>

      {/* Philosophy */}
      <section className="bg-charcoal text-ivory">
        <Container className="py-28 md:py-36 grid gap-16 md:grid-cols-2 items-center">
          <div className="relative aspect-[4/5] overflow-hidden">
            <Image
              src="/images/pages/philosophy.jpg"
              alt=""
              fill
              sizes="(min-width: 768px) 50vw, 100vw"
              className="object-cover"
            />
          </div>
          <div className="flex flex-col gap-6">
            <span className="tracked text-[11px] text-brass">
              {t("home.philosophyEyebrow")}
            </span>
            <h2 className="font-serif text-3xl md:text-5xl leading-[1.05]">
              {t("home.philosophyTitle")}
            </h2>
            <p className="text-ivory/75 leading-relaxed max-w-lg">
              {t("home.philosophyBody")}
            </p>
            <div className="pt-4">
              <Link href="/about">
                <Button
                  variant="ghost"
                  className="!border-ivory/70 !text-ivory hover:!bg-ivory hover:!text-charcoal"
                >
                  {t("home.heroCtaSecondary")}
                </Button>
              </Link>
            </div>
          </div>
        </Container>
      </section>

      {/* Collections grid */}
      <Container className="py-24 md:py-32">
        <SectionHeading
          eyebrow={t("home.collectionsTitle")}
          title={t("home.collectionsTitle")}
          align="left"
        />
        <div className="mt-12 grid grid-cols-2 md:grid-cols-5 gap-3">
          {CATEGORIES.map((c) => (
            <Link
              key={c}
              href="/products"
              className="group relative aspect-square overflow-hidden bg-ivory-soft"
            >
              <div className="absolute inset-0 flex items-end p-5 z-10">
                <span className="font-serif text-xl text-charcoal group-hover:text-brass-deep transition-colors">
                  {t(`categories.${c}`)}
                </span>
              </div>
              <div className="absolute inset-0 border hairline" />
            </Link>
          ))}
        </div>
      </Container>

      {/* CTA */}
      <section className="bg-ivory-soft border-y hairline">
        <Container className="py-24 flex flex-col items-center text-center gap-6">
          <span className="tracked text-[11px] text-brass-deep">
            {t("home.ctaTitle")}
          </span>
          <h2 className="font-serif text-3xl md:text-5xl max-w-2xl leading-[1.1]">
            {t("home.ctaBody")}
          </h2>
          <div className="pt-2">
            <Link href="/contact">
              <Button>{t("home.ctaButton")}</Button>
            </Link>
          </div>
        </Container>
      </section>
    </>
  );
}
