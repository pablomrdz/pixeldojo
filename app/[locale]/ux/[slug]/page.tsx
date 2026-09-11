import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { SiteHeader } from "@/components/SiteHeader";
import { SiteFooter } from "@/components/SiteFooter";
import { getPrincipleBySlug, principles } from "@/data/learning";
import { getSeoPrincipleBySlug, seoPrinciples } from "@/data/seo-principles";
import type { Locale } from "@/lib/types";

const allPrinciples = [...principles, ...seoPrinciples];

const relatedMap: Record<string, string[]> = {
  "visual-hierarchy": ["typographic-hierarchy", "gestalt-proximity", "hicks-law"],
  "typographic-hierarchy": ["visual-hierarchy", "gestalt-proximity", "millers-law"],
  "gestalt-proximity": ["gestalt-similarity", "gestalt-common-region", "visual-hierarchy"],
  "gestalt-similarity": ["gestalt-proximity", "gestalt-common-region", "gestalt-closure"],
  "gestalt-common-region": ["gestalt-proximity", "gestalt-similarity", "visual-hierarchy"],
  "gestalt-closure": ["gestalt-similarity", "visual-hierarchy", "jakobs-law"],
  "hicks-law": ["millers-law", "visual-hierarchy", "jakobs-law"],
  "fitts-law": ["hicks-law", "visual-hierarchy", "contrast-accessibility"],
  "millers-law": ["hicks-law", "visual-hierarchy", "jakobs-law"],
  "jakobs-law": ["hicks-law", "millers-law", "visual-hierarchy"],
  "contrast-accessibility": ["visual-hierarchy", "fitts-law", "typographic-hierarchy"],
  "error-recovery": ["friction-reduction", "jakobs-law", "hicks-law"],
  "friction-reduction": ["hicks-law", "error-recovery", "jakobs-law"],
};

function getAnyPrincipleBySlug(locale: Locale, slug: string) {
  return getPrincipleBySlug(locale, slug) ?? getSeoPrincipleBySlug(locale, slug);
}

function hrefFor(item: (typeof allPrinciples)[number], locale: Locale) {
  return `/${locale}/ux/${item.slug[locale]}`;
}

function clusterFor(key: string, locale: Locale) {
  if (key.startsWith("gestalt-")) {
    return { href: `/${locale}/ux/gestalt`, label: locale === "es" ? "Leyes Gestalt" : "Gestalt principles" };
  }
  if (["hicks-law", "fitts-law", "millers-law", "jakobs-law"].includes(key)) {
    return { href: `/${locale}/ux/laws`, label: locale === "es" ? "Leyes UX" : "UX laws" };
  }
  return { href: `/${locale}/ux`, label: locale === "es" ? "Biblioteca UX/UI" : "UX/UI library" };
}

export function generateStaticParams() {
  return allPrinciples.flatMap((item) => [
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
  const item = getAnyPrincipleBySlug(locale, slug);
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
  const item = getAnyPrincipleBySlug(locale, slug);
  if (!item) notFound();

  const preferred = relatedMap[item.key] ?? [];
  const related = preferred
    .map((key) => allPrinciples.find((candidate) => candidate.key === key))
    .filter((candidate): candidate is (typeof allPrinciples)[number] => Boolean(candidate))
    .slice(0, 3);
  const cluster = clusterFor(item.key, locale);
  const isVisualHierarchy = item.key === "visual-hierarchy";
  const isContrast = item.key === "contrast-accessibility";

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

      <SiteHeader
        locale={locale}
        enSuffix={`/ux/${item.slug.en}`}
        esSuffix={`/ux/${item.slug.es}`}
      />

      <article className="mx-auto max-w-3xl py-16 md:py-24">
        <Link href={cluster.href} className="text-xs font-semibold uppercase tracking-[0.14em] text-neutral-500 hover:text-neutral-950">
          ← {cluster.label}
        </Link>
        <p className="brand-eyebrow mt-6 text-xs font-semibold uppercase tracking-[0.15em] text-neutral-500">
          {item.eyebrow[locale]}
        </p>
        <h1 className="mt-4 text-4xl font-semibold tracking-[-0.045em] md:text-6xl">
          {item.title[locale]}
        </h1>
        <p className="mt-6 text-xl leading-8 text-neutral-600">{item.description[locale]}</p>

        <div className="mt-10 rounded-3xl border border-neutral-300 bg-white p-6 md:p-8">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
            {locale === "es" ? "En una frase" : "In one sentence"}
          </p>
          <p className="mt-3 text-2xl font-semibold leading-9">{item.short[locale]}</p>
        </div>

        <section className="mt-12">
          <h2 className="text-2xl font-semibold">{locale === "es" ? "Por qué importa" : "Why it matters"}</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">{item.why[locale]}</p>
        </section>

        {isVisualHierarchy && (
          <section className="mt-12">
            <h2 className="text-3xl font-semibold tracking-tight">
              {locale === "es" ? "Los 4 controles de la jerarquía visual" : "The 4 levers of visual hierarchy"}
            </h2>
            <p className="mt-4 leading-7 text-neutral-600">
              {locale === "es"
                ? "La jerarquía no depende de una sola propiedad. Normalmente combinamos tamaño, contraste, espacio y posición para crear un orden de atención claro."
                : "Hierarchy rarely comes from one property. Size, contrast, spacing, and position usually work together to create a clear order of attention."}
            </p>
            <div className="mt-6 grid gap-3 sm:grid-cols-2">
              {[
                [locale === "es" ? "Tamaño" : "Size", locale === "es" ? "Lo grande suele ganar atención primero, pero debe reflejar importancia real." : "Larger elements often win attention first, but size should reflect real importance."],
                [locale === "es" ? "Contraste" : "Contrast", locale === "es" ? "Diferencias de color, peso o tono separan lo prioritario de lo secundario." : "Differences in color, weight, or tone separate priority from supporting content."],
                [locale === "es" ? "Espacio" : "Spacing", locale === "es" ? "El espacio agrupa, separa niveles y evita que todo compita al mismo tiempo." : "Space groups content, separates levels, and prevents everything from competing at once."],
                [locale === "es" ? "Posición" : "Position", locale === "es" ? "Ubicación, alineación y flujo determinan qué encuentra el ojo a continuación." : "Placement, alignment, and flow shape what the eye finds next."],
              ].map(([title, body]) => (
                <div key={title} className="rounded-2xl border border-neutral-300 bg-white p-5">
                  <h3 className="font-semibold">{title}</h3>
                  <p className="mt-2 text-sm leading-6 text-neutral-600">{body}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-3xl border border-neutral-300 bg-neutral-50 p-6">
              <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                {locale === "es" ? "Error común" : "Common mistake"}
              </p>
              <p className="mt-3 text-lg font-semibold">
                {locale === "es" ? "Si todo destaca, nada destaca." : "If everything stands out, nothing stands out."}
              </p>
              <p className="mt-2 leading-7 text-neutral-600">
                {locale === "es"
                  ? "Botones grandes, títulos pesados, tarjetas con sombras y múltiples colores de acento pueden competir entre sí. Una buena jerarquía también decide qué debe permanecer silencioso."
                  : "Large buttons, heavy headings, shadowed cards, and multiple accent colors can all compete. Good hierarchy also decides what should stay quiet."}
              </p>
            </div>
          </section>
        )}

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{locale === "es" ? "Ejemplo aplicado" : "Applied example"}</h2>
          <p className="mt-4 text-lg leading-8 text-neutral-600">{item.example[locale]}</p>
        </section>

        <section className="mt-10">
          <h2 className="text-2xl font-semibold">{locale === "es" ? "Qué recordar" : "What to remember"}</h2>
          <ul className="mt-4 space-y-3">
            {item.takeaways[locale].map((takeaway) => (
              <li key={takeaway} className="flex gap-3 text-lg leading-7 text-neutral-700">
                <span aria-hidden="true" className="dojo-accent-text">→</span>
                <span>{takeaway}</span>
              </li>
            ))}
          </ul>
        </section>

        {isContrast && (
          <section className="mt-12 rounded-3xl border border-neutral-300 bg-white p-6 md:p-8">
            <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
              {locale === "es" ? "Herramienta" : "Free tool"}
            </p>
            <h2 className="mt-3 text-2xl font-semibold">
              {locale === "es" ? "Comprueba tus colores con un ratio real." : "Check your colors with a real contrast ratio."}
            </h2>
            <p className="mt-3 leading-7 text-neutral-600">
              {locale === "es"
                ? "Prueba foreground y background, revisa AA/AAA y después vuelve al principio para entender el porqué."
                : "Test foreground and background colors, review AA/AAA, then come back to the principle to understand why."}
            </p>
            <Link
              href={`/${locale}/tools/color-contrast-checker`}
              className="brand-cta mt-5 inline-flex rounded-xl px-5 py-3 text-sm font-semibold"
            >
              {locale === "es" ? "Abrir comprobador →" : "Open contrast checker →"}
            </Link>
          </section>
        )}

        <section className="mt-14 rounded-3xl bg-neutral-950 p-7 text-white md:p-9">
          <p className="text-sm font-semibold uppercase tracking-wider text-neutral-400">PixelDojo</p>
          <h2 className="mt-3 text-3xl font-semibold">
            {locale === "es" ? "No memorices el principio. Practica detectándolo." : "Don't just memorize the principle. Practice spotting it."}
          </h2>
          <p className="mt-3 max-w-xl leading-7 text-neutral-300">
            {locale === "es" ? "Pon a prueba tu criterio con retos visuales rápidos y feedback inmediato." : "Test your judgment with fast visual challenges and immediate feedback."}
          </p>
          <Link href={`/${locale}/play`} className="mt-6 inline-flex rounded-xl bg-white px-5 py-3 font-semibold text-neutral-950">
            {locale === "es" ? "Empezar entrenamiento" : "Start training"}
          </Link>
        </section>

        {related.length > 0 && (
          <section className="mt-14 border-t border-neutral-300 pt-10">
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              {locale === "es" ? "Sigue por aquí" : "Continue learning"}
            </h2>
            <div className="mt-5 grid gap-3 md:grid-cols-3">
              {related.map((relatedItem) => (
                <Link
                  key={relatedItem.key}
                  href={hrefFor(relatedItem, locale)}
                  className="rounded-2xl border border-neutral-300 bg-white p-4 transition hover:-translate-y-0.5 hover:border-neutral-500"
                >
                  <span className="text-sm font-semibold">{relatedItem.title[locale]}</span>
                  <span className="mt-3 block text-xs text-neutral-500">{relatedItem.short[locale]}</span>
                </Link>
              ))}
            </div>
          </section>
        )}
      </article>

      <SiteFooter locale={locale} />
    </main>
  );
}
