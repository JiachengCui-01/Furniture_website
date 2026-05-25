import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { Button } from "@/components/ui/Button";
import { Link } from "@/i18n/navigation";
import { routing } from "@/i18n/routing";
import { ClearCartOnMount } from "@/components/ClearCartOnMount";

export default async function SuccessPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Container className="py-32 flex flex-col items-center text-center gap-8">
      <ClearCartOnMount />
      <span className="tracked text-[11px] text-brass-deep">
        {t("brand.name")}
      </span>
      <h1 className="font-serif text-4xl md:text-6xl max-w-2xl leading-[1.05]">
        {t("checkout.successTitle")}
      </h1>
      <p className="text-charcoal-soft/80 max-w-md leading-relaxed">
        {t("checkout.successBody")}
      </p>
      <Link href="/">
        <Button variant="ghost">{t("checkout.backHome")}</Button>
      </Link>
    </Container>
  );
}
