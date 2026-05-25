import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { ContactForm } from "@/components/ContactForm";
import { routing } from "@/i18n/routing";

export default async function ContactPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <Container className="py-24 md:py-32 grid gap-16 lg:grid-cols-2">
      <SectionHeading
        eyebrow={t("brand.name")}
        title={t("contact.title")}
        subtitle={t("contact.lead")}
      />
      <ContactForm />
    </Container>
  );
}
