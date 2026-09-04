import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { BattleEngine } from "@/components/battle/BattleEngine";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
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
      <header className="mb-8 flex items-center justify-between gap-4 md:mb-10">
        <Link href={`/${locale}`} className="font-bold tracking-tight">
          PixelDojo
        </Link>
        <div className="flex items-center gap-4">
          <span className="hidden text-sm text-neutral-500 md:inline">
            {locale === "es" ? "Entrena tu criterio de diseño." : "Train your design judgment."}
          </span>
          <LanguageSwitcher locale={locale} suffix="/play" />
        </div>
      </header>
      <BattleEngine locale={locale} />
    </main>
  );
}
