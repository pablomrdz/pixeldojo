import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import type { Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Términos de uso — PixelDojo" : "Terms of Use — PixelDojo",
    alternates: { languages: { en: "/en/terms", es: "/es/terms" } },
  };
}

export default async function TermsPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  const sections = locale === "es"
    ? [
        ["Uso educativo", "PixelDojo ofrece contenido educativo y práctico sobre diseño. Los resultados, puntajes y recomendaciones no deben interpretarse como una certificación profesional."],
        ["Disponibilidad", "El producto está en desarrollo y puede cambiar, experimentar interrupciones o modificar retos y funcionalidades sin previo aviso."],
        ["Contenido y propiedad", "Salvo indicación contraria, la interfaz, textos, retos y materiales propios de PixelDojo no pueden redistribuirse o revenderse como producto propio."],
        ["Uso aceptable", "No debes intentar interferir con el servicio, automatizar abuso del sistema ni utilizar PixelDojo para actividades ilegales o dañinas."],
      ]
    : [
        ["Educational use", "PixelDojo provides educational and practical design content. Scores, results, and recommendations should not be treated as a professional certification."],
        ["Availability", "The product is under development and may change, experience interruptions, or modify challenges and features without notice."],
        ["Content and ownership", "Unless otherwise stated, PixelDojo's original interface, text, challenges, and materials may not be redistributed or resold as your own product."],
        ["Acceptable use", "You must not attempt to interfere with the service, automate abuse of the system, or use PixelDojo for illegal or harmful activity."],
      ];

  return (
    <ContentPage locale={locale} enSuffix="/terms" esSuffix="/terms">
      <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">Legal</p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
        {locale === "es" ? "Términos de uso" : "Terms of Use"}
      </h1>
      <p className="mt-4 text-sm text-neutral-500">
        {locale === "es" ? "Última actualización: septiembre de 2026" : "Last updated: September 2026"}
      </p>
      <div className="mt-10 space-y-9">
        {sections.map(([title, body]) => (
          <section key={title}>
            <h2 className="text-xl font-semibold">{title}</h2>
            <p className="mt-3 leading-7 text-neutral-600">{body}</p>
          </section>
        ))}
      </div>
    </ContentPage>
  );
}
