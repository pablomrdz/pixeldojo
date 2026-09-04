import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { BattleEngine } from "@/components/battle/BattleEngine";
import { SiteHeader } from "@/components/SiteHeader";
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
        ? "Entrenamiento de diseño — PixelDojo"
        : "Design training — PixelDojo",
    robots: { index: false, follow: true },
    alternates: {
      languages: {
        en: "/en/play",
        es: "/es/play",
      },
    },
  };
}

export default async function PlayPage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();

  const locale = rawLocale as Locale;

  return (
    <main className="shell py-6 md:py-8">
      <div className="mb-8 md:mb-10">
        <SiteHeader locale={locale} enSuffix="/play" esSuffix="/play" compact />
      </div>
      <BattleEngine locale={locale} />
    </main>
  );
}
