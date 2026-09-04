import type { ReactNode } from "react";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import type { Locale } from "@/lib/types";

export function ContentPage({
  locale,
  children,
  enSuffix,
  esSuffix,
}: {
  locale: Locale;
  children: ReactNode;
  enSuffix?: string;
  esSuffix?: string;
}) {
  return (
    <main className="shell py-8 md:py-10">
      <SiteHeader locale={locale} enSuffix={enSuffix} esSuffix={esSuffix} />
      <div className="mx-auto max-w-3xl py-14 md:py-20">{children}</div>
      <SiteFooter locale={locale} />
    </main>
  );
}
