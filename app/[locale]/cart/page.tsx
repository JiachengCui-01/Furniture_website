import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { CartView } from "@/components/CartView";
import { routing, type Locale } from "@/i18n/routing";

export default async function CartPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Container className="py-24 md:py-32 flex flex-col gap-12">
      <SectionHeading title={t("cart.title")} />
      <CartView locale={locale as Locale} />
    </Container>
  );
}
