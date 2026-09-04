import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { principleHref, principles } from "@/data/learning";
import type { Locale } from "@/lib/types";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";

  return {
    title: locale === "es" ? "Principios UX y UI — PixelDojo" : "UX & UI principles — PixelDojo",
    description:
      locale === "es"
        ? "Aprende principios de UX y UI con explicaciones breves y práctica visual."
        : "Learn UX and UI principles through short explanations and visual practice.",
    alternates: {
      canonical: `/${locale}/ux`,
      languages: { en: "/en/ux", es: "/es/ux" },
    },
  };
}

export default async function UXIndex({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  return (
    <main className="shell py-7 md:py-10">
      <SiteHeader locale={locale} enSuffix="/ux" esSuffix="/ux" />

      <section className="py-16 md:py-24">
        <p className="text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {locale === "es" ? "Biblioteca de principios" : "Principle library"}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-tight md:text-6xl">
          {locale === "es"
            ? "Entiende las reglas. Entrena el criterio."
            : "Understand the rules. Train the judgment."}
        </h1>
        <p className="mt-5 max-w-2xl text-lg leading-8 text-neutral-600">
          {locale === "es"
            ? "Explicaciones cortas de UX y UI diseñadas para llevarte rápidamente de la teoría a la práctica."
            : "Short UX and UI explanations designed to move quickly from theory into practice."}
        </p>

        <div className="mt-10 grid gap-4 md:grid-cols-2">
          {principles.map((item) => (
            <Link
              key={item.key}
              href={principleHref(item.key, locale)}
              className="rounded-3xl border border-neutral-200 bg-white p-6 transition hover:-translate-y-0.5 hover:border-neutral-400"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {item.eyebrow[locale]}
              </p>
              <h2 className="mt-2 text-xl font-semibold">{item.title[locale]}</h2>
              <p className="mt-2 leading-6 text-neutral-600">{item.short[locale]}</p>
            </Link>
          ))}
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
