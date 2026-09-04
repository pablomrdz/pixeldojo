import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { BrandHeroVisual } from "@/components/BrandHeroVisual";
import { TrackedLink } from "@/components/TrackedLink";
import { NewsletterInvite } from "@/components/NewsletterInvite";
import { principleHref, principles } from "@/data/learning";
import type { Locale } from "@/lib/types";

const copy = {
  en: {
    eyebrow: "Design judgment training",
    title: "Know why good design works.",
    description:
      "Train your design judgment through fast visual challenges and learn the principles behind every decision.",
    cta: "Start training",
    note: "No account required · 10-battle first session",
    learnTitle: "Learn the principles behind the decisions.",
    learnText: "Short explanations for when you want to go deeper — without slowing down the training loop.",
    browse: "Browse all UX principles →",
  },
  es: {
    eyebrow: "Entrenamiento de criterio de diseño",
    title: "Entiende por qué funciona un buen diseño.",
    description:
      "Entrena tu criterio de diseño mediante retos visuales rápidos y aprende los principios detrás de cada decisión.",
    cta: "Empezar entrenamiento",
    note: "Sin cuenta · Primera sesión de 10 retos",
    learnTitle: "Aprende los principios detrás de las decisiones.",
    learnText: "Explicaciones breves para cuando quieras profundizar, sin frenar el ritmo del entrenamiento.",
    browse: "Ver todos los principios UX →",
  },
} satisfies Record<Locale, Record<string, string>>;

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") return {};

  const locale = rawLocale as Locale;

  return {
    title:
      locale === "es"
        ? "PixelDojo — Entrena tu criterio de diseño"
        : "PixelDojo — Train your design judgment",
    description: copy[locale].description,
    alternates: {
      canonical: `/${locale}`,
      languages: {
        en: "/en",
        es: "/es",
        "x-default": "/",
      },
    },
  };
}

export default async function LocaleHome({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();

  const locale = rawLocale as Locale;
  const t = copy[locale];
  const featured = principles.filter((item) =>
    ["visual-hierarchy", "gestalt-proximity", "fitts-law", "hicks-law"].includes(item.key)
  );

  return (
    <main className="shell py-8 md:py-12">
      <SiteHeader locale={locale} />

      <section className="grid min-h-[calc(100svh-120px)] items-center gap-12 py-14 lg:grid-cols-[1.02fr_.98fr] lg:py-20">
        <div>
          <p className="brand-eyebrow text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-3xl text-5xl font-semibold tracking-[-0.055em] md:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-xl text-lg leading-8 text-neutral-600">{t.description}</p>
          <div className="mt-9">
            <TrackedLink
              href={`/${locale}/play`}
              eventName="home_cta_clicked"
              eventPayload={{ locale }}
              className="brand-cta inline-flex rounded-xl px-6 py-3 font-semibold"
            >
              {t.cta}
            </TrackedLink>
          </div>
          <p className="mt-5 text-sm text-neutral-500">{t.note}</p>
        </div>

        <BrandHeroVisual locale={locale} />
      </section>

      <section className="border-t border-neutral-300 py-16 md:py-20">
        <div className="max-w-2xl">
          <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {locale === "es" ? "Biblioteca UX" : "UX library"}
          </p>
          <h2 className="mt-3 text-3xl font-semibold tracking-[-0.04em] md:text-4xl">{t.learnTitle}</h2>
          <p className="mt-4 leading-7 text-neutral-600">{t.learnText}</p>
        </div>

        <div className="mt-8 grid gap-4 md:grid-cols-2 lg:grid-cols-4">
          {featured.map((item, index) => (
            <Link
              key={item.key}
              href={principleHref(item.key, locale)}
              className="group rounded-2xl border border-neutral-300 bg-white p-5 transition hover:-translate-y-0.5 hover:border-neutral-500"
            >
              <div className="flex items-center justify-between">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {item.eyebrow[locale]}
                </p>
                <span className={index === 0 ? "text-sm font-bold dojo-accent-text" : "text-sm text-neutral-300"}>0{index + 1}</span>
              </div>
              <h3 className="mt-3 font-semibold tracking-tight">{item.title[locale]}</h3>
            </Link>
          ))}
        </div>

        <Link
          href={`/${locale}/ux`}
          className="mt-7 inline-flex text-sm font-semibold underline decoration-neutral-400 underline-offset-4"
        >
          {t.browse}
        </Link>
      </section>

      <div className="pb-4">
        <NewsletterInvite locale={locale} />
      </div>

      <SiteFooter locale={locale} />
    </main>
  );
}
