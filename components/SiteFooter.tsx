import Link from "next/link";
import { PixelDojoLogo } from "@/components/PixelDojoLogo";
import { configuredSocials, siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

const socialLabel: Record<string, string> = {
  x: "X",
  instagram: "Instagram",
  linkedin: "LinkedIn",
};

export function SiteFooter({ locale }: { locale: Locale }) {
  return (
    <footer className="mt-16 border-t border-neutral-300 py-10 text-sm text-neutral-500">
      <div className="grid gap-8 md:grid-cols-[1.3fr_.7fr_.7fr]">
        <div>
          <PixelDojoLogo locale={locale} />
          <p className="mt-3 max-w-sm text-xs leading-5">
            {locale === "es"
              ? "Entrena tu criterio. Aprende los principios detrás de cada decisión."
              : "Train your judgment. Learn the principles behind every decision."}
          </p>
          <Link
            href={`/${locale}/support`}
            className="mt-4 inline-flex text-sm font-semibold text-neutral-900 underline decoration-neutral-400 underline-offset-4"
          >
            {locale === "es" ? "Apoyar PixelDojo →" : "Support PixelDojo →"}
          </Link>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
            {locale === "es" ? "Explorar" : "Explore"}
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href={`/${locale}/play`} className="hover:text-neutral-950">
              {locale === "es" ? "Entrenar" : "Train"}
            </Link>
            <Link href={`/${locale}/ux`} className="hover:text-neutral-950">
              {locale === "es" ? "Principios UX/UI" : "UX/UI principles"}
            </Link>
            <Link href={`/${locale}/about`} className="hover:text-neutral-950">
              {locale === "es" ? "Acerca de" : "About"}
            </Link>
            <Link href={`/${locale}/contact`} className="hover:text-neutral-950">
              {locale === "es" ? "Contacto" : "Contact"}
            </Link>
          </div>
        </div>

        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-700">
            Legal
          </p>
          <div className="mt-3 flex flex-col gap-2">
            <Link href={`/${locale}/privacy`} className="hover:text-neutral-950">
              {locale === "es" ? "Privacidad" : "Privacy"}
            </Link>
            <Link href={`/${locale}/terms`} className="hover:text-neutral-950">
              {locale === "es" ? "Términos" : "Terms"}
            </Link>
            {configuredSocials.map(([name, url]) => (
              <a key={name} href={url} target="_blank" rel="noreferrer" className="hover:text-neutral-950">
                {socialLabel[name] ?? name}
              </a>
            ))}
            {siteConfig.contactEmail && (
              <a href={`mailto:${siteConfig.contactEmail}`} className="hover:text-neutral-950">
                {siteConfig.contactEmail}
              </a>
            )}
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-neutral-200 pt-5 text-xs">
        © {new Date().getFullYear()} PixelDojo
      </div>
    </footer>
  );
}
