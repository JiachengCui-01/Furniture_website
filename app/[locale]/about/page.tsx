import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { hasLocale } from "next-intl";
import { notFound } from "next/navigation";
import { Container } from "@/components/ui/Container";
import { SectionHeading } from "@/components/ui/SectionHeading";
import { routing } from "@/i18n/routing";

export default async function AboutPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  if (!hasLocale(routing.locales, locale)) notFound();
  setRequestLocale(locale);
  const t = await getTranslations();

  return (
    <>
      <Container className="py-24 md:py-32 grid gap-16 lg:grid-cols-2 items-center">
        <div className="flex flex-col gap-8">
          <SectionHeading
            eyebrow={t("brand.name")}
            title={t("about.title")}
            subtitle={t("about.lead")}
          />
        </div>
        <div className="relative aspect-[4/5] overflow-hidden">
          <Image
            src="/images/pages/about.jpg"
            alt=""
            fill
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
        </div>
      </Container>
      <Container className="pb-32 max-w-3xl">
        <div className="flex flex-col gap-8 text-lg md:text-xl leading-relaxed text-charcoal-soft/85 font-serif">
          <p>{t("about.bodyOne")}</p>
          <p>{t("about.bodyTwo")}</p>
          <p>{t("about.bodyThree")}</p>
        </div>
      </Container>
    </>
  );
}
