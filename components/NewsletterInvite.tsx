import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

export function NewsletterInvite({ locale }: { locale: Locale }) {
  if (!siteConfig.newsletterUrl) return null;

  return (
    <section className="rounded-3xl border border-neutral-300 bg-white p-6 md:p-8">
      <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {locale === "es" ? "Entrenamiento semanal" : "Weekly training"}
      </p>
      <h2 className="mt-3 text-2xl font-semibold tracking-tight">
        {locale === "es"
          ? "Un reto de diseño útil. Sin ruido."
          : "One useful design challenge. No noise."}
      </h2>
      <p className="mt-3 max-w-xl leading-7 text-neutral-600">
        {locale === "es"
          ? "Recibe un reto visual y el principio detrás de la decisión. Solo aparecerá cuando tengamos algo que valga la pena enviar."
          : "Get one visual challenge and the principle behind it. Only when there is something worth sending."}
      </p>
      <a
        href={siteConfig.newsletterUrl}
        target="_blank"
        rel="noreferrer"
        className="brand-cta mt-5 inline-flex rounded-xl px-5 py-3 font-semibold"
      >
        {locale === "es" ? "Unirme" : "Join"}
      </a>
    </section>
  );
}
