import { LanguageDocumentSync } from "@/components/LanguageDocumentSync";
import type { Locale } from "@/lib/types";

export default async function LocaleLayout({
  children,
  params,
}: {
  children: React.ReactNode;
  params: Promise<{ locale: string }>;
}) {
  const { locale: rawLocale } = await params;
  const locale: Locale = rawLocale === "es" ? "es" : "en";

  return (
    <>
      <LanguageDocumentSync locale={locale} />
      {children}
    </>
  );
}
