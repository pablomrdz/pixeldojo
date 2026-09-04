import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import type { Locale } from "@/lib/types";

const copy = {
  en: {
    eyebrow: "Design judgment training",
    title: "Know why good design works.",
    description:
      "Train your design judgment through fast visual challenges and learn the principles behind every decision.",
    cta: "Start training",
    note: "No account required · 10-battle first session",
    enter: "Enter the Dojo →",
  },
  es: {
    eyebrow: "Entrenamiento de criterio de diseño",
    title: "Entiende por qué funciona un buen diseño.",
    description:
      "Entrena tu criterio de diseño mediante retos visuales rápidos y aprende los principios detrás de cada decisión.",
    cta: "Empezar entrenamiento",
    note: "Sin cuenta · Primera sesión de 10 retos",
    enter: "Entrar al Dojo →",
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
  const isEs = locale === "es";

  return {
    title: isEs
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

  return (
    <main className="shell py-8 md:py-12">
      <nav className="flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="text-lg font-bold tracking-tight">
          PixelDojo
        </Link>
        <div className="flex items-center gap-5">
          <LanguageSwitcher locale={locale} />
          <Link href={`/${locale}/play`} className="hidden text-sm text-neutral-600 sm:inline">
            {t.enter}
          </Link>
        </div>
      </nav>

      <section className="flex min-h-[calc(100svh-120px)] items-center py-16 md:py-20">
        <div>
          <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
            {t.eyebrow}
          </p>
          <h1 className="mt-5 max-w-4xl text-5xl font-semibold tracking-tight md:text-7xl">
            {t.title}
          </h1>
          <p className="mt-6 max-w-2xl text-lg leading-8 text-neutral-600">
            {t.description}
          </p>
          <div className="mt-9">
            <Link
              href={`/${locale}/play`}
              className="inline-flex rounded-xl bg-neutral-950 px-6 py-3 font-semibold text-white"
            >
              {t.cta}
            </Link>
          </div>
          <p className="mt-4 text-sm text-neutral-500">{t.note}</p>
        </div>
      </section>
    </main>
  );
}
