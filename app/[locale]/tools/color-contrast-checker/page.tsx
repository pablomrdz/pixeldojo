import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { ColorContrastChecker } from "@/components/tools/ColorContrastChecker";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";

  return {
    title:
      locale === "es"
        ? "Comprobador de contraste de color — WCAG | PixelDojo"
        : "Color Contrast Checker — WCAG contrast ratio | PixelDojo",
    description:
      locale === "es"
        ? "Comprueba el ratio de contraste entre texto y fondo y revisa rápidamente niveles AA y AAA."
        : "Check the contrast ratio between foreground and background colors and quickly review AA and AAA thresholds.",
    alternates: {
      canonical: `/${locale}/tools/color-contrast-checker`,
      languages: {
        en: "/en/tools/color-contrast-checker",
        es: "/es/tools/color-contrast-checker",
        "x-default": "/en/tools/color-contrast-checker",
      },
    },
  };
}

export default async function ColorContrastCheckerPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebApplication",
    name: locale === "es" ? "Comprobador de contraste de color" : "Color Contrast Checker",
    applicationCategory: "DesignApplication",
    operatingSystem: "Any",
    inLanguage: locale,
    offers: { "@type": "Offer", price: "0", priceCurrency: "USD" },
  };

  return (
    <main className="shell py-7 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <SiteHeader
        locale={locale}
        enSuffix="/tools/color-contrast-checker"
        esSuffix="/tools/color-contrast-checker"
      />

      <section className="mx-auto max-w-4xl py-14 md:py-20">
        <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {locale === "es" ? "Herramienta gratuita" : "Free design tool"}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          {locale === "es" ? "Comprobador de contraste de color" : "Color Contrast Checker"}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
          {locale === "es"
            ? "Compara dos colores, obtén el ratio de contraste y revisa rápidamente si la combinación alcanza niveles comunes de accesibilidad WCAG."
            : "Compare two colors, get the contrast ratio, and quickly check whether the combination reaches common WCAG accessibility levels."}
        </p>

        <div className="mt-9">
          <ColorContrastChecker locale={locale} />
        </div>

        <div className="mt-12 grid gap-8 md:grid-cols-2">
          <section>
            <h2 className="text-2xl font-semibold">
              {locale === "es" ? "Cómo leer el resultado" : "How to read the result"}
            </h2>
            <p className="mt-3 leading-7 text-neutral-600">
              {locale === "es"
                ? "Un ratio mayor significa más separación luminosa entre los colores. Para texto normal, 4.5:1 es un umbral AA habitual; para texto grande, 3:1. AAA exige más contraste."
                : "A higher ratio means greater luminance separation between the colors. For normal text, 4.5:1 is a common AA threshold; large text uses 3:1. AAA requires stronger contrast."}
            </p>
          </section>
          <section>
            <h2 className="text-2xl font-semibold">
              {locale === "es" ? "No diseñes solo para pasar" : "Don't design only to pass"}
            </h2>
            <p className="mt-3 leading-7 text-neutral-600">
              {locale === "es"
                ? "El ratio es una comprobación importante, pero contexto, tamaño, peso tipográfico, estados de interacción y condiciones reales de visualización también afectan la legibilidad."
                : "The ratio is an important check, but context, type size, font weight, interaction states, and real viewing conditions also affect readability."}
            </p>
          </section>
        </div>

        <div className="mt-12 flex flex-col gap-3 rounded-3xl border border-neutral-300 bg-white p-6 sm:flex-row sm:items-center sm:justify-between">
          <div>
            <p className="text-sm font-semibold">
              {locale === "es" ? "Aprende el principio detrás del número" : "Learn the principle behind the number"}
            </p>
            <p className="mt-1 text-sm text-neutral-500">
              {locale === "es"
                ? "Contraste, jerarquía y percepción trabajan juntos."
                : "Contrast, hierarchy, and perception work together."}
            </p>
          </div>
          <Link
            href={`/${locale}/ux/${locale === "es" ? "contraste-accesibilidad" : "color-contrast-accessibility"}`}
            className="shrink-0 rounded-xl bg-neutral-950 px-5 py-3 text-center text-sm font-semibold text-white"
          >
            {locale === "es" ? "Ver principio →" : "Learn contrast →"}
          </Link>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
