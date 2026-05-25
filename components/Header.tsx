import { getTranslations } from "next-intl/server";
import { Link } from "@/i18n/navigation";
import { Container } from "./ui/Container";
import { LocaleSwitcher } from "./LocaleSwitcher";
import { CartIcon } from "./CartIcon";

export async function Header() {
  const t = await getTranslations();
  return (
    <header className="sticky top-0 z-30 border-b hairline bg-ivory/85 backdrop-blur">
      <Container className="flex h-16 items-center justify-between gap-6">
        <Link href="/" className="font-serif text-xl tracking-tight">
          {t("brand.name")}
        </Link>
        <nav className="hidden md:flex items-center gap-8 tracked text-[11px] text-charcoal">
          <Link href="/products" className="hover:text-brass-deep">
            {t("nav.products")}
          </Link>
          <Link href="/about" className="hover:text-brass-deep">
            {t("nav.about")}
          </Link>
          <Link href="/contact" className="hover:text-brass-deep">
            {t("nav.contact")}
          </Link>
        </nav>
        <div className="flex items-center gap-6">
          <LocaleSwitcher />
          <CartIcon />
        </div>
      </Container>
    </header>
  );
}
