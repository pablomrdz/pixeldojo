import Link from "next/link";
import { PixelDojoLogo } from "@/components/PixelDojoLogo";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-neutral-300 py-9 text-sm text-neutral-500">
      <div className="flex flex-col gap-5 sm:flex-row sm:items-center sm:justify-between">
        <div>
          <PixelDojoLogo locale={locale} />
          <p className="mt-2 max-w-sm text-xs leading-5">
            {locale === "es"
              ? "Entrena tu criterio. Aprende los principios detrás de cada decisión."
              : "Train your judgment. Learn the principles behind every decision."}
          </p>
        </div>
        <div className="flex flex-wrap gap-x-5 gap-y-2">
          <Link href={`/${locale}/play`} className="hover:text-neutral-950">
            {locale === "es" ? "Entrenar" : "Train"}
          </Link>
          <Link href={`/${locale}/ux`} className="hover:text-neutral-950">
            {locale === "es" ? "Principios UX/UI" : "UX/UI principles"}
          </Link>
          <Link href={`/${locale}`} className="hover:text-neutral-950">
            {locale === "es" ? "Inicio" : "Home"}
          </Link>
        </div>
      </div>
      <div className="mt-6 border-t border-neutral-200 pt-5 text-xs">
        © {new Date().getFullYear()} PixelDojo
      </div>
    </footer>
  );
}
