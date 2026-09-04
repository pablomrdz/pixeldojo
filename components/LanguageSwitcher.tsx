import { TrackedLink } from "@/components/TrackedLink";
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
      <TrackedLink
        href={`/en${enSuffix ?? suffix}`}
        eventName="language_changed"
        eventPayload={{ from: locale, to: "en" }}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "en" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950"
        }`}
      >
        EN
      </TrackedLink>
      <TrackedLink
        href={`/es${esSuffix ?? suffix}`}
        eventName="language_changed"
        eventPayload={{ from: locale, to: "es" }}
        className={`rounded-full px-3 py-1.5 transition ${
          locale === "es" ? "bg-neutral-950 text-white" : "text-neutral-500 hover:text-neutral-950"
        }`}
      >
        ES
      </TrackedLink>
    </div>
  );
}
