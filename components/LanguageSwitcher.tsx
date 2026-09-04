import Link from "next/link";
import type { Locale } from "@/lib/types";

export function LanguageSwitcher({
  locale,
  suffix = "",
  enSuffix,
  esSuffix,
}: {
  locale: Locale;
  suffix?: string;
  enSuffix?: string;
  esSuffix?: string;
}) {
  return (
    <div
      className="flex items-center rounded-full border border-neutral-300 bg-white p-1 text-xs font-semibold"
      aria-label={locale === "es" ? "Selector de idioma" : "Language selector"}
    >
      <Link
        href={`/en${enSuffix ?? suffix}`}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "en" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950"
        }`}
      >
        EN
      </Link>
      <Link
        href={`/es${esSuffix ?? suffix}`}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "es" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950"
        }`}
      >
        ES
      </Link>
    </div>
  );
}
