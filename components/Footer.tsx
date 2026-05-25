import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./ui/Container";

export async function Footer() {
  const t = await getTranslations();
  const year = new Date().getFullYear();
  return (
    <footer className="mt-32 border-t hairline bg-ivory-soft">
      <Container className="py-16 grid gap-12 md:grid-cols-4">
        <div className="md:col-span-2 flex flex-col gap-3">
          <span className="font-serif text-2xl">{t("brand.name")}</span>
          <p className="max-w-sm text-sm text-charcoal-soft/80 leading-relaxed">
            {t("brand.tagline")}
          </p>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <span className="tracked text-[11px] text-brass-deep">
            {t("nav.products")}
          </span>
          <Link href="/products" className="hover:text-brass-deep">
            {t("products.title")}
          </Link>
          <Link href="/about" className="hover:text-brass-deep">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="hover:text-brass-deep">
            {t("nav.contact")}
          </Link>
        </div>
        <div className="flex flex-col gap-3 text-sm">
          <span className="tracked text-[11px] text-brass-deep">Atelier</span>
          <span className="text-charcoal-soft/80">
            12 Rue de la Lumière
            <br />
            75011 Paris
          </span>
          <span className="text-charcoal-soft/80">+33 1 00 00 00 00</span>
        </div>
      </Container>
      <div className="border-t hairline">
        <Container className="py-6 flex flex-col md:flex-row justify-between gap-2 text-xs text-charcoal-soft/60">
          <span>
            © {year} {t("brand.name")}. {t("footer.rights")}
          </span>
          <span>{t("footer.designed")}</span>
        </Container>
      </div>
    </footer>
  );
}
