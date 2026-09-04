import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ContentPage } from "@/components/ContentPage";
import type { Locale } from "@/lib/types";

export async function generateMetadata({ params }: { params: Promise<{ locale: string }> }): Promise<Metadata> {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";
  return {
    title: locale === "es" ? "Política de privacidad — PixelDojo" : "Privacy Policy — PixelDojo",
    alternates: { languages: { en: "/en/privacy", es: "/es/privacy" } },
  };
}

export default async function PrivacyPage({ params }: { params: Promise<{ locale: string }> }) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();
  const locale = rawLocale as Locale;

  const sections = locale === "es"
    ? [
        ["Datos que podemos recopilar", "Podemos recopilar datos técnicos y de uso, como páginas visitadas, respuestas a retos, idioma, tipo de dispositivo y eventos de interacción. Si en el futuro habilitamos cuentas o newsletters, la información adicional se solicitará de forma explícita."],
        ["Cómo se usan", "Usamos estos datos para entender el uso del producto, mejorar los retos, detectar errores y medir qué contenidos ayudan más a aprender."],
        ["Analítica y terceros", "PixelDojo puede utilizar servicios de analítica, hosting y publicidad. Cuando activemos servicios adicionales, esta política se actualizará para reflejarlos."],
        ["Tus opciones", "Puedes dejar de usar el servicio en cualquier momento. Cuando habilitemos cuentas o listas de correo, también ofreceremos opciones para gestionar o eliminar esos datos."],
      ]
    : [
        ["Data we may collect", "We may collect technical and usage data such as pages visited, challenge answers, language, device type, and interaction events. If accounts or newsletters are enabled later, additional information will be requested explicitly."],
        ["How it is used", "We use this data to understand product usage, improve challenges, detect errors, and measure which content helps people learn."],
        ["Analytics and third parties", "PixelDojo may use analytics, hosting, and advertising services. When additional services are activated, this policy will be updated to reflect them."],
        ["Your choices", "You can stop using the service at any time. When accounts or mailing lists are enabled, we will also provide ways to manage or delete that data."],
      ];

  return (
    <ContentPage locale={locale} enSuffix="/privacy" esSuffix="/privacy">
      <p className="brand-eyebrow text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500">
        {locale === "es" ? "Legal" : "Legal"}
      </p>
      <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
        {locale === "es" ? "Política de privacidad" : "Privacy Policy"}
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
