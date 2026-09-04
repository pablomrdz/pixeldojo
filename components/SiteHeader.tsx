import Link from "next/link";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/types";

export function SiteHeader({
  locale,
  enSuffix,
  esSuffix,
  compact = false,
}: {
  locale: Locale;
  enSuffix?: string;
  esSuffix?: string;
  compact?: boolean;
}) {
  return (
    <header className={`flex items-center justify-between gap-4 ${compact ? "" : "py-1"}`}>
      <Link href={`/${locale}`} className="text-lg font-bold tracking-tight">
        PixelDojo
      </Link>
      <div className="flex items-center gap-5">
        <nav className="hidden items-center gap-5 text-sm text-neutral-600 sm:flex" aria-label="Primary">
          <Link href={`/${locale}/play`} className="hover:text-neutral-950">
            {locale === "es" ? "Entrenar" : "Train"}
          </Link>
          <Link href={`/${locale}/ux`} className="hover:text-neutral-950">
            {locale === "es" ? "Principios" : "Principles"}
          </Link>
        </nav>
        <LanguageSwitcher locale={locale} enSuffix={enSuffix} esSuffix={esSuffix} />
      </div>
    </header>
  );
}
