import type { PrinciplePage } from "@/data/learning";
import type { Locale } from "@/lib/types";

export type SeoPrincipleKey = "millers-law" | "jakobs-law";

export const seoPrinciples: Array<PrinciplePage & { key: SeoPrincipleKey }> = [
  {
    key: "millers-law",
    slug: { en: "millers-law", es: "ley-de-miller" },
    title: { en: "Miller's Law in UX design", es: "Ley de Miller en diseño UX" },
    eyebrow: { en: "UX law", es: "Ley UX" },
    description: {
      en: "Learn how limits in working memory affect interface complexity, chunking and information design.",
      es: "Aprende cómo los límites de la memoria de trabajo afectan la complejidad, la agrupación y el diseño de información.",
    },
    short: {
      en: "People handle information better when it is grouped into meaningful chunks.",
      es: "Las personas procesan mejor la información cuando está agrupada en bloques con sentido.",
    },
    why: {
      en: "Dense interfaces force users to hold too many unrelated items in working memory at once. Grouping and progressive disclosure reduce that burden.",
      es: "Las interfaces densas obligan al usuario a mantener demasiados elementos no relacionados en la memoria de trabajo. Agrupar y revelar progresivamente reduce esa carga.",
    },
    example: {
      en: "A long settings screen becomes easier to scan when options are grouped into clear categories instead of presented as one continuous list.",
      es: "Una pantalla larga de ajustes se vuelve más fácil de escanear cuando las opciones se agrupan en categorías claras en lugar de mostrarse como una sola lista continua.",
    },
    takeaways: {
      en: ["Group related information into meaningful chunks.", "Avoid forcing users to remember many items at once.", "Use progressive disclosure for secondary detail."],
      es: ["Agrupa información relacionada en bloques con sentido.", "Evita obligar al usuario a recordar demasiados elementos a la vez.", "Usa divulgación progresiva para detalles secundarios."],
    },
  },
  {
    key: "jakobs-law",
    slug: { en: "jakobs-law", es: "ley-de-jakob" },
    title: { en: "Jakob's Law in UX design", es: "Ley de Jakob en diseño UX" },
    eyebrow: { en: "UX law", es: "Ley UX" },
    description: {
      en: "Understand why familiar patterns reduce learning effort and how conventions shape user expectations.",
      es: "Entiende por qué los patrones familiares reducen el esfuerzo de aprendizaje y cómo las convenciones crean expectativas.",
    },
    short: {
      en: "Users expect your interface to work like other interfaces they already know.",
      es: "Los usuarios esperan que tu interfaz funcione como otras interfaces que ya conocen.",
    },
    why: {
      en: "When common interactions behave in unexpected ways, users must stop relying on learned patterns and spend extra effort figuring out the interface.",
      es: "Cuando las interacciones comunes se comportan de forma inesperada, el usuario deja de apoyarse en patrones conocidos y dedica esfuerzo extra a entender la interfaz.",
    },
    example: {
      en: "Keeping navigation, search and checkout patterns recognizable lets users transfer knowledge from products they already use.",
      es: "Mantener reconocibles los patrones de navegación, búsqueda y checkout permite transferir conocimiento desde productos que el usuario ya conoce.",
    },
    takeaways: {
      en: ["Use conventions for common interactions.", "Innovate where it creates value, not where familiarity is useful.", "Make deviations from convention intentional."],
      es: ["Usa convenciones para interacciones comunes.", "Innova donde aporte valor, no donde la familiaridad sea útil.", "Haz intencionales las desviaciones de una convención."],
    },
  },
];

export function getSeoPrincipleBySlug(locale: Locale, slug: string) {
  return seoPrinciples.find((item) => item.slug[locale] === slug);
}
