import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPrinciple, principleHref } from "@/data/learning";
import { seoPrinciples } from "@/data/seo-principles";
import type { Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Leyes de UX: guía visual — PixelDojo" : "UX Laws: visual guide — PixelDojo",
    description:
      locale === "es"
        ? "Aprende las leyes de UX más importantes con ejemplos visuales: Fitts, Hick, Miller y Jakob."
        : "Learn the most useful UX laws with visual examples: Fitts, Hick, Miller and Jakob.",
    alternates: {
      canonical: `/${locale}/ux/laws`,
      languages: { en: "/en/ux/laws", es: "/es/ux/laws" },
    },
  };
}

export default async function UXLawsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  const fitts = getPrinciple("fitts-law")!;
  const hick = getPrinciple("hicks-law")!;
  const miller = seoPrinciples.find((item) => item.key === "millers-law")!;
  const jakob = seoPrinciples.find((item) => item.key === "jakobs-law")!;
  const laws = [fitts, hick, miller, jakob];

  return (
    <main className="shell py-8 md:py-10">
      <SiteHeader locale={locale} enSuffix="/ux/laws" esSuffix="/ux/laws" />

      <article className="mx-auto max-w-4xl py-16 md:py-24">
        <p className="brand-eyebrow text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {locale === "es" ? "Hub de aprendizaje" : "Learning hub"}
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
          {locale === "es" ? "Leyes de UX" : "UX Laws"}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-neutral-600">
          {locale === "es"
            ? "Principios de psicología e interacción que ayudan a explicar por qué algunas interfaces se sienten más rápidas, claras y naturales que otras."
            : "Psychology and interaction principles that help explain why some interfaces feel faster, clearer and more natural than others."}
        </p>

        <div className="mt-12 grid gap-4 md:grid-cols-2">
          {laws.map((law, index) => (
            <Link
              key={law.key}
              href={`/${locale}/ux/${law.slug[locale]}`}
              className="group rounded-3xl border border-neutral-300 bg-white p-6 transition hover:-translate-y-0.5 hover:border-neutral-500"
            >
              <div className="flex items-center justify-between gap-4">
                <span className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {locale === "es" ? "Ley UX" : "UX law"}
                </span>
                <span className="text-sm font-bold dojo-accent-text">0{index + 1}</span>
              </div>
              <h2 className="mt-4 text-2xl font-semibold tracking-tight">{law.title[locale]}</h2>
              <p className="mt-3 leading-7 text-neutral-600">{law.short[locale]}</p>
              <span className="mt-5 inline-flex text-sm font-semibold underline decoration-neutral-300 underline-offset-4">
                {locale === "es" ? "Ver principio →" : "Explore principle →"}
              </span>
            </Link>
          ))}
        </div>

        <section className="mt-16 grid gap-6 border-t border-neutral-300 pt-12 md:grid-cols-2">
          <div>
            <h2 className="text-3xl font-semibold tracking-tight">
              {locale === "es" ? "No son reglas absolutas." : "They are not absolute rules."}
            </h2>
          </div>
          <p className="leading-8 text-neutral-600">
            {locale === "es"
              ? "Las leyes de UX sirven como modelos para razonar sobre decisiones de diseño. El contexto, la tarea y el usuario siguen importando. PixelDojo las usa como lentes para entrenar criterio, no como recetas que sustituyen el pensamiento."
              : "UX laws are models for reasoning about design decisions. Context, task and user still matter. PixelDojo uses them as lenses for training judgment, not recipes that replace thinking."}
          </p>
        </section>

        <section className="mt-14 rounded-3xl bg-neutral-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">PixelDojo</p>
          <h2 className="mt-3 text-3xl font-semibold">
            {locale === "es" ? "Pasa de memorizar leyes a reconocerlas." : "Move from memorizing laws to recognizing them."}
          </h2>
          <p className="mt-3 max-w-2xl leading-7 text-neutral-300">
            {locale === "es"
              ? "Practica con decisiones visuales rápidas y recibe feedback sobre el principio detrás de cada interfaz."
              : "Practice with fast visual decisions and get feedback on the principle behind each interface."}
          </p>
          <Link href={`/${locale}/play`} className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-neutral-950">
            {locale === "es" ? "Entrenar ahora" : "Start training"}
          </Link>
        </section>
      </article>

      <SiteFooter locale={locale} />
    </main>
  );
}
