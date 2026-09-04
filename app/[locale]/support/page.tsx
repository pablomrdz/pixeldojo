import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Apoya PixelDojo" : "Support PixelDojo",
    description:
      locale === "es"
        ? "Ayuda a mantener PixelDojo rápido, independiente y accesible."
        : "Help keep PixelDojo fast, independent, and accessible.",
    alternates: { languages: { en: "/en/support", es: "/es/support" } },
  };
}

export default async function SupportPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  return (
    <ContentPage locale={locale} enSuffix="/support" esSuffix="/support">
      <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {locale === "es" ? "Apoya el proyecto" : "Support the project"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
        {locale === "es" ? "¿Te sirvió PixelDojo?" : "Did PixelDojo help?"}
      </h1>
      <p className="mt-6 text-xl leading-8 text-neutral-600">
        {locale === "es"
          ? "El entrenamiento seguirá siendo accesible. Si quieres ayudar a cubrir infraestructura y tiempo de desarrollo, puedes invitar un café."
          : "Training will remain accessible. If you want to help cover infrastructure and development time, you can buy a coffee."}
      </p>

      <div className="mt-10 rounded-3xl border border-neutral-300 bg-white p-7">
        <p className="font-semibold">
          {locale === "es" ? "Apoyo voluntario, sin paywall." : "Optional support, no paywall."}
        </p>
        <p className="mt-2 leading-7 text-neutral-600">
          {locale === "es"
            ? "No desbloquea respuestas ni ventajas competitivas. Es simplemente una forma de apoyar el producto."
            : "It does not unlock answers or competitive advantages. It is simply a way to support the product."}
        </p>
        {siteConfig.supportUrl ? (
          <a
            href={siteConfig.supportUrl}
            target="_blank"
            rel="noreferrer"
            className="brand-cta mt-6 inline-flex rounded-xl px-5 py-3 font-semibold"
          >
            {locale === "es" ? "Invítame un café" : "Buy me a coffee"}
          </a>
        ) : (
          <p className="mt-6 text-sm font-medium text-neutral-500">
            {locale === "es"
              ? "El enlace de apoyo se publicará antes del lanzamiento."
              : "The support link will be published before launch."}
          </p>
        )}
      </div>
    </ContentPage>
  );
}
