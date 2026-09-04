import Link from "next/link";
import type { Locale } from "@/lib/types";

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-neutral-200 py-8 text-sm text-neutral-500">
      <div className="flex flex-col gap-4 sm:flex-row sm:items-center sm:justify-between">
        <p>© {new Date().getFullYear()} PixelDojo</p>
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
    </footer>
  );
}
