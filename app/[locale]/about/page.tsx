import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import type { Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Acerca de PixelDojo" : "About PixelDojo",
    description:
      locale === "es"
        ? "Conoce la idea detrás de PixelDojo y por qué entrenamos criterio de diseño mediante práctica visual."
        : "Learn the idea behind PixelDojo and why we train design judgment through visual practice.",
    alternates: { languages: { en: "/en/about", es: "/es/about" } },
  };
}

export default async function AboutPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  return (
    <ContentPage locale={locale} enSuffix="/about" esSuffix="/about">
      <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {locale === "es" ? "Acerca de" : "About"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
        {locale === "es"
          ? "PixelDojo existe para entrenar criterio, no para memorizar reglas."
          : "PixelDojo exists to train judgment, not memorize rules."}
      </h1>
      <p className="mt-6 text-xl leading-8 text-neutral-600">
        {locale === "es"
          ? "Creemos que aprender diseño mejora cuando ves decisiones reales, eliges, recibes feedback y entiendes el principio detrás de lo que acabas de observar."
          : "We believe design learning improves when you see real decisions, choose, get feedback, and understand the principle behind what you just observed."}
      </p>

      <div className="mt-12 grid gap-4 md:grid-cols-3">
        {[
          locale === "es" ? ["Práctica", "Retos visuales rápidos y deliberados."] : ["Practice", "Fast, deliberate visual challenges."],
          locale === "es" ? ["Principios", "Teoría corta, útil y opcional."] : ["Principles", "Short, useful, optional theory."],
          locale === "es" ? ["Progreso", "Feedback inmediato y señal de habilidades."] : ["Progress", "Immediate feedback and skill signals."],
        ].map(([title, text]) => (
          <div key={title} className="rounded-2xl border border-neutral-300 bg-white p-5">
            <h2 className="font-semibold">{title}</h2>
            <p className="mt-2 text-sm leading-6 text-neutral-600">{text}</p>
          </div>
        ))}
      </div>

      <section className="mt-12">
        <h2 className="text-2xl font-semibold">
          {locale === "es" ? "Qué queremos evitar" : "What we want to avoid"}
        </h2>
        <p className="mt-4 leading-7 text-neutral-600">
          {locale === "es"
            ? "Cursos interminables, listas de leyes sin contexto y quizzes que premian memoria más que criterio. PixelDojo intenta mantener el aprendizaje cerca de la decisión visual."
            : "Endless courses, context-free lists of laws, and quizzes that reward memory more than judgment. PixelDojo keeps learning close to the visual decision."}
        </p>
      </section>
    </ContentPage>
  );
}
