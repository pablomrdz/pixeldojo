import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPrinciple, principleHref } from "@/data/learning";
import type { Locale } from "@/lib/types";

const gestaltItems = {
  en: [
    ["Proximity", "Elements placed near each other are perceived as related."],
    ["Similarity", "Elements that look alike are often interpreted as belonging to the same group."],
    ["Common region", "A shared boundary can create grouping even when elements are separated."],
    ["Closure", "People tend to perceive complete forms even when visual information is incomplete."],
    ["Continuity", "The eye prefers smooth, continuous paths over abrupt visual breaks."],
  ],
  es: [
    ["Proximidad", "Los elementos cercanos tienden a percibirse como relacionados."],
    ["Similitud", "Los elementos visualmente parecidos suelen interpretarse como parte del mismo grupo."],
    ["Región común", "Un límite compartido puede crear agrupación aunque los elementos estén separados."],
    ["Cierre", "Las personas tienden a percibir formas completas incluso cuando falta información visual."],
    ["Continuidad", "El ojo prefiere recorridos suaves y continuos frente a rupturas visuales abruptas."],
  ],
} as const;

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Leyes Gestalt en diseño UX/UI — PixelDojo" : "Gestalt principles in UX/UI design — PixelDojo",
    description:
      locale === "es"
        ? "Aprende las leyes Gestalt aplicadas a UX y UI: proximidad, similitud, región común, cierre y continuidad."
        : "Learn Gestalt principles applied to UX and UI: proximity, similarity, common region, closure and continuity.",
    alternates: {
      canonical: `/${locale}/ux/gestalt`,
      languages: { en: "/en/ux/gestalt", es: "/es/ux/gestalt" },
    },
  };
}

export default async function GestaltHub({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;
  const proximity = getPrinciple("gestalt-proximity")!;

  return (
    <main className="shell py-8 md:py-10">
      <SiteHeader locale={locale} enSuffix="/ux/gestalt" esSuffix="/ux/gestalt" />

      <article className="mx-auto max-w-4xl py-16 md:py-24">
        <p className="brand-eyebrow text-sm font-semibold uppercase tracking-[0.14em] text-neutral-500">
          {locale === "es" ? "Percepción visual" : "Visual perception"}
        </p>
        <h1 className="mt-4 text-5xl font-semibold tracking-[-0.05em] md:text-7xl">
          {locale === "es" ? "Leyes Gestalt en diseño" : "Gestalt principles in design"}
        </h1>
        <p className="mt-6 max-w-3xl text-xl leading-8 text-neutral-600">
          {locale === "es"
            ? "Las leyes Gestalt explican cómo nuestra percepción organiza elementos visuales en grupos, patrones y estructuras antes de que leamos cada detalle."
            : "Gestalt principles explain how perception organizes visual elements into groups, patterns and structures before we read every detail."}
        </p>

        <section className="mt-12 rounded-3xl border border-neutral-300 bg-white p-6 md:p-8">
          <div className="grid gap-8 md:grid-cols-[1fr_1.15fr] md:items-center">
            <div>
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {locale === "es" ? "Ejemplo interactivo" : "Interactive example"}
              </p>
              <h2 className="mt-3 text-3xl font-semibold tracking-tight">
                {locale === "es" ? "Proximidad convierte espacio en significado." : "Proximity turns spacing into meaning."}
              </h2>
              <p className="mt-4 leading-7 text-neutral-600">{proximity.why[locale]}</p>
              <Link
                href={principleHref("gestalt-proximity", locale)}
                className="mt-5 inline-flex text-sm font-semibold underline decoration-neutral-300 underline-offset-4"
              >
                {locale === "es" ? "Explorar la ley de proximidad →" : "Explore proximity →"}
              </Link>
            </div>

            <div className="grid grid-cols-2 gap-4 rounded-2xl bg-neutral-50 p-5">
              <div className="rounded-xl border border-neutral-200 bg-white p-4">
                <div className="space-y-4">
                  <div className="h-4 w-16 rounded bg-neutral-800" />
                  <div className="h-3 w-24 rounded bg-neutral-200" />
                  <div className="h-3 w-20 rounded bg-neutral-200" />
                  <div className="h-3 w-28 rounded bg-neutral-200" />
                </div>
              </div>
              <div className="rounded-xl border border-[var(--accent)] bg-white p-4">
                <div className="space-y-2">
                  <div className="h-4 w-16 rounded bg-neutral-800" />
                  <div className="h-3 w-24 rounded bg-neutral-200" />
                </div>
                <div className="mt-6 space-y-2">
                  <div className="h-3 w-20 rounded bg-neutral-200" />
                  <div className="h-3 w-28 rounded bg-neutral-200" />
                </div>
              </div>
            </div>
          </div>
        </section>

        <section className="mt-16">
          <h2 className="text-3xl font-semibold tracking-tight">
            {locale === "es" ? "Principios Gestalt principales" : "Core Gestalt principles"}
          </h2>
          <div className="mt-7 grid gap-4 md:grid-cols-2">
            {gestaltItems[locale].map(([name, description], index) => (
              <div key={name} className="rounded-2xl border border-neutral-300 bg-white p-5">
                <div className="flex items-center justify-between gap-4">
                  <h3 className="text-lg font-semibold">{name}</h3>
                  <span className="text-sm font-bold dojo-accent-text">0{index + 1}</span>
                </div>
                <p className="mt-2 leading-7 text-neutral-600">{description}</p>
              </div>
            ))}
          </div>
        </section>

        <section className="mt-14 rounded-3xl bg-neutral-950 p-8 text-white">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">PixelDojo</p>
          <h2 className="mt-3 text-3xl font-semibold">
            {locale === "es" ? "Entrena tu ojo para detectar agrupación y estructura." : "Train your eye to spot grouping and structure."}
          </h2>
          <Link href={`/${locale}/play`} className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-neutral-950">
            {locale === "es" ? "Entrenar ahora" : "Start training"}
          </Link>
        </section>
      </article>

      <SiteFooter locale={locale} />
    </main>
  );
}
