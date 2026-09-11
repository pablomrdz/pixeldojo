import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { principleHref, principles } from "@/data/learning";
import { seoPrinciples } from "@/data/seo-principles";
import type { Locale } from "@/lib/types";

const allPrinciples = [...principles, ...seoPrinciples];

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
        ? "Aprende principios de UX y UI con explicaciones breves, ejemplos visuales y práctica interactiva."
        : "Learn UX and UI principles through short explanations, visual examples and interactive practice.",
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

  const featured = allPrinciples.slice(0, 8);

  return (
    <main className="shell py-7 md:py-10">
      <SiteHeader locale={locale} enSuffix="/ux" esSuffix="/ux" />

      <section className="py-16 md:py-24">
        <p className="brand-eyebrow text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {locale === "es" ? "Biblioteca de principios" : "Principle library"}
        </p>
        <h1 className="mt-4 max-w-4xl text-4xl font-semibold tracking-[-0.05em] md:text-6xl">
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
          <Link
            href={`/${locale}/ux/laws`}
            className="group rounded-3xl border border-neutral-300 bg-neutral-950 p-7 text-white transition hover:-translate-y-0.5"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
              {locale === "es" ? "Cluster" : "Cluster"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {locale === "es" ? "Leyes de UX" : "UX Laws"}
            </h2>
            <p className="mt-3 max-w-md leading-7 text-neutral-300">
              {locale === "es"
                ? "Fitts, Hick, Miller, Jakob y los modelos que ayudan a razonar sobre interacción y decisiones."
                : "Fitts, Hick, Miller, Jakob and the models that help explain interaction and decisions."}
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold underline decoration-neutral-600 underline-offset-4">
              {locale === "es" ? "Explorar leyes →" : "Explore laws →"}
            </span>
          </Link>

          <Link
            href={`/${locale}/ux/gestalt`}
            className="group rounded-3xl border border-neutral-300 bg-white p-7 transition hover:-translate-y-0.5 hover:border-neutral-500"
          >
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {locale === "es" ? "Percepción visual" : "Visual perception"}
            </p>
            <h2 className="mt-3 text-3xl font-semibold tracking-tight">
              {locale === "es" ? "Leyes Gestalt" : "Gestalt principles"}
            </h2>
            <p className="mt-3 max-w-md leading-7 text-neutral-600">
              {locale === "es"
                ? "Proximidad, similitud, región común y otros principios que explican cómo agrupamos información visual."
                : "Proximity, similarity, common region and other principles that explain visual grouping."}
            </p>
            <span className="mt-6 inline-flex text-sm font-semibold underline decoration-neutral-300 underline-offset-4">
              {locale === "es" ? "Explorar Gestalt →" : "Explore Gestalt →"}
            </span>
          </Link>
        </div>

        <div className="mt-14 flex items-end justify-between gap-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {locale === "es" ? "Principios individuales" : "Individual principles"}
            </p>
            <h2 className="mt-2 text-3xl font-semibold tracking-tight">
              {locale === "es" ? "Aprende uno. Practícalo después." : "Learn one. Practice it next."}
            </h2>
          </div>
        </div>

        <div className="mt-7 grid gap-4 md:grid-cols-2">
          {featured.map((item) => (
            <Link
              key={item.key}
              href={`/${locale}/ux/${item.slug[locale]}`}
              className="rounded-3xl border border-neutral-300 bg-white p-6 transition hover:-translate-y-0.5 hover:border-neutral-500"
            >
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {item.eyebrow[locale]}
              </p>
              <h3 className="mt-2 text-xl font-semibold">{item.title[locale]}</h3>
              <p className="mt-2 leading-6 text-neutral-600">{item.short[locale]}</p>
            </Link>
          ))}
        </div>

        <div className="mt-10 rounded-3xl border border-neutral-300 bg-white p-6 md:flex md:items-center md:justify-between md:gap-8 md:p-8">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">PixelDojo</p>
            <h2 className="mt-2 text-2xl font-semibold">
              {locale === "es" ? "¿Ya entendiste el principio? Ahora detectalo en una interfaz." : "Understand the principle? Now spot it in an interface."}
            </h2>
          </div>
          <Link
            href={`/${locale}/play`}
            className="brand-cta mt-5 inline-flex shrink-0 rounded-xl px-5 py-3 font-semibold md:mt-0"
          >
            {locale === "es" ? "Entrenar" : "Train"}
          </Link>
        </div>
      </section>

      <SiteFooter locale={locale} />
    </main>
  );
}
