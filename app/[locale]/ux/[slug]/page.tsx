import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { LanguageSwitcher } from "@/components/LanguageSwitcher";
import { getPrincipleBySlug, principleHref, principles } from "@/data/learning";
import type { Locale } from "@/lib/types";

export function generateStaticParams() {
  return principles.flatMap((item) => [
    { locale: "en", slug: item.slug.en },
    { locale: "es", slug: item.slug.es },
  ]);
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}): Promise<Metadata> {
  const { locale: rawLocale, slug } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") return {};
  const locale = rawLocale as Locale;
  const item = getPrincipleBySlug(locale, slug);
  if (!item) return {};

  return {
    title: `${item.title[locale]} — PixelDojo`,
    description: item.description[locale],
    alternates: {
      canonical: `/${locale}/ux/${item.slug[locale]}`,
      languages: {
        en: `/en/ux/${item.slug.en}`,
        es: `/es/ux/${item.slug.es}`,
      },
    },
    openGraph: {
      title: item.title[locale],
      description: item.description[locale],
      type: "article",
    },
  };
}

export default async function PrinciplePage({
  params,
}: {
  params: Promise<{ locale: string; slug: string }>;
}) {
  const { locale: rawLocale, slug } = await params;
  if (rawLocale !== "en" && rawLocale !== "es") notFound();

  const locale = rawLocale as Locale;
  const item = getPrincipleBySlug(locale, slug);
  if (!item) notFound();

  const related = principles.filter((p) => p.key !== item.key).slice(0, 3);

  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "WebPage",
    name: item.title[locale],
    description: item.description[locale],
    inLanguage: locale,
    isPartOf: {
      "@type": "WebSite",
      name: "PixelDojo",
    },
  };

  return (
    <main className="shell py-7 md:py-10">
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />

      <nav className="flex items-center justify-between gap-4">
        <Link href={`/${locale}`} className="text-lg font-bold tracking-tight">
          PixelDojo
        </Link>
        <LanguageSwitcher
          locale={locale}
          suffix={`/ux/${locale === "en" ? item.slug.en : item.slug.es}`}
        />
      </nav>

      <article className="mx-auto max-w-3xl py-16 md:py-24">
        <p className="text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
          {item.eyebrow[locale]}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-tight md:text-6xl">
          {item.title[locale]}
        </h1>
        <p className="mt-6 text-xl leading-8 text-neutral-600">
          {item.description[locale]}
        </p>

        <div className="mt-10 rounded-3xl border border-neutral-200 bg-white p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            {locale === "es" ? "En una frase" : "In one sentence"}
          </p>
          <p className="mt-3 text-2xl font-semibold leading-9">{item.short[locale]}</p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">
            {locale === "es" ? "Por qué importa" : "Why it matters"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">{item.why[locale]}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            {locale === "es" ? "Ejemplo aplicado" : "Applied example"}
          </h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">{item.example[locale]}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">
            {locale === "es" ? "Qué recordar" : "What to remember"}
          </h2>
          <ul className="mt-4 space-y-3">
            {item.takeaways[locale].map((takeaway) => (
              <li key={takeaway} className="flex gap-3 text-lg leading-7 text-neutral-700">
                <span aria-hidden="true">→</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        <section className="mt-14 rounded-3xl bg-neutral-950 p-7 text-white md:p-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">
            PixelDojo
          </p>
          <h2 className="mt-3 text-3xl font-semibold">
            {locale === "es"
              ? "No memorices el principio. Practica detectándolo."
              : "Don't just memorize the principle. Practice spotting it."}
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-neutral-300">
            {locale === "es"
              ? "Pon a prueba tu criterio con retos visuales rápidos y feedback inmediato."
              : "Test your judgment with fast visual challenges and immediate feedback."}
          </p>
          <Link
            href={`/${locale}/play`}
            className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-neutral-950"
          >
            {locale === "es" ? "Empezar entrenamiento" : "Start training"}
          </Link>
        </section>

        <section className="mt-14 border-t border-neutral-200 pt-10">
          <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            {locale === "es" ? "Principios relacionados" : "Related principles"}
          </h2>
          <div className="mt-5 grid gap-3 md:grid-cols-3">
            {related.map((relatedItem) => (
              <Link
                key={relatedItem.key}
                href={principleHref(relatedItem.key, locale)}
                className="rounded-2xl border border-neutral-200 p-4 transition hover:-translate-y-0.5 hover:border-neutral-400"
              >
                <span className="text-sm font-semibold">{relatedItem.title[locale]}</span>
              </Link>
            ))}
          </div>
        </section>
      </article>
    </main>
  );
}
