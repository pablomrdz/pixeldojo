import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import { configuredSocials, siteConfig } from "@/lib/site";
import type { Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Contacto — PixelDojo" : "Contact — PixelDojo",
    description:
      locale === "es" ? "Contacta a PixelDojo para feedback, colaboraciones o preguntas." : "Contact PixelDojo for feedback, collaborations, or questions.",
    alternates: { languages: { en: "/en/contact", es: "/es/contact" } },
  };
}

export default async function ContactPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  const label: Record<string, string> = {
    x: "X",
    instagram: "Instagram",
    linkedin: "LinkedIn",
  };

  return (
    <ContentPage locale={locale} enSuffix="/contact" esSuffix="/contact">
      <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {locale === "es" ? "Contacto" : "Contact"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
        {locale === "es" ? "Feedback, dudas o colaboraciones." : "Feedback, questions, or collaborations."}
      </h1>
      <p className="mt-6 text-xl leading-8 text-neutral-600">
        {locale === "es"
          ? "PixelDojo está en construcción activa. El feedback sobre los retos, la claridad del aprendizaje y la experiencia general es especialmente útil."
          : "PixelDojo is under active development. Feedback on challenges, learning clarity, and the overall experience is especially useful."}
      </p>

      <div className="mt-10 grid gap-4 md:grid-cols-2">
        <div className="rounded-2xl border border-neutral-300 bg-white p-6">
          <h2 className="font-semibold">{locale === "es" ? "Correo" : "Email"}</h2>
          {siteConfig.contactEmail ? (
            <a className="mt-3 inline-flex font-semibold underline underline-offset-4" href={`mailto:${siteConfig.contactEmail}`}>
              {siteConfig.contactEmail}
            </a>
          ) : (
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              {locale === "es" ? "Publicaremos el correo oficial antes del lanzamiento." : "The official contact email will be published before launch."}
            </p>
          )}
        </div>

        <div className="rounded-2xl border border-neutral-300 bg-white p-6">
          <h2 className="font-semibold">{locale === "es" ? "Redes" : "Social"}</h2>
          {configuredSocials.length ? (
            <div className="mt-3 flex flex-wrap gap-3">
              {configuredSocials.map(([name, url]) => (
                <a key={name} href={url} target="_blank" rel="noreferrer" className="font-semibold underline underline-offset-4">
                  {label[name] ?? name}
                </a>
              ))}
            </div>
          ) : (
            <p className="mt-3 text-sm leading-6 text-neutral-500">
              {locale === "es" ? "Los perfiles oficiales se añadirán antes del lanzamiento." : "Official social profiles will be added before launch."}
            </p>
          )}
        </div>
      </div>
    </ContentPage>
  );
}
