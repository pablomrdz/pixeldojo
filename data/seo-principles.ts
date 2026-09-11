import type { PrinciplePage } from "@/data/learning";
import type { Locale } from "@/lib/types";

export type SeoPrincipleKey =
  | "millers-law"
  | "jakobs-law"
  | "gestalt-similarity"
  | "gestalt-common-region"
  | "gestalt-closure";

export type SeoPrinciplePage = Omit<PrinciplePage, "key"> & { key: SeoPrincipleKey };

export const seoPrinciples: SeoPrinciplePage[] = [
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
  {
    key: "gestalt-similarity",
    slug: { en: "gestalt-similarity", es: "ley-de-similitud-gestalt" },
    title: { en: "Gestalt principle of similarity", es: "Principio Gestalt de similitud" },
    eyebrow: { en: "Gestalt principle", es: "Principio Gestalt" },
    description: {
      en: "Learn how shared color, shape, size and style make interface elements feel related before users read them.",
      es: "Aprende cómo color, forma, tamaño y estilo compartidos hacen que elementos de una interfaz se perciban relacionados antes de leerlos.",
    },
    short: {
      en: "Elements that look alike are usually perceived as belonging together.",
      es: "Los elementos que se parecen suelen percibirse como parte del mismo grupo.",
    },
    why: {
      en: "Visual similarity creates fast categories. When the same visual treatment means different things, users must stop and reinterpret the interface.",
      es: "La similitud visual crea categorías rápidas. Cuando el mismo tratamiento significa cosas distintas, el usuario debe detenerse y reinterpretar la interfaz.",
    },
    example: {
      en: "Using the same shape and color for all filter chips tells users they share the same interaction role, while a contrasting primary action stays distinct.",
      es: "Usar la misma forma y color en todos los filtros comunica que comparten el mismo rol, mientras una acción principal contrastante permanece distinta.",
    },
    takeaways: {
      en: ["Reuse visual treatment for the same role.", "Use differences to communicate meaningful distinctions.", "Do not create accidental categories with color or shape."],
      es: ["Reutiliza el mismo tratamiento para el mismo rol.", "Usa diferencias para comunicar distinciones reales.", "Evita crear categorías accidentales con color o forma."],
    },
  },
  {
    key: "gestalt-common-region",
    slug: { en: "gestalt-common-region", es: "region-comun-gestalt" },
    title: { en: "Gestalt principle of common region", es: "Principio Gestalt de región común" },
    eyebrow: { en: "Gestalt principle", es: "Principio Gestalt" },
    description: {
      en: "Understand why elements enclosed by the same boundary are perceived as a group, even when spacing alone is ambiguous.",
      es: "Entiende por qué los elementos contenidos por un mismo límite se perciben como grupo incluso cuando el espaciado es ambiguo.",
    },
    short: {
      en: "A shared boundary can turn separate elements into one perceived group.",
      es: "Un límite compartido puede convertir elementos separados en un solo grupo percibido.",
    },
    why: {
      en: "Containers, cards and panels provide an explicit grouping signal. Used carefully, they make structure clear without adding explanatory text.",
      es: "Contenedores, tarjetas y paneles ofrecen una señal explícita de agrupación. Bien usados, aclaran la estructura sin añadir texto explicativo.",
    },
    example: {
      en: "Placing billing fields inside one panel and shipping fields inside another makes two form sections obvious even when the fields use identical styling.",
      es: "Colocar facturación dentro de un panel y envío dentro de otro hace evidentes dos secciones aunque los campos tengan el mismo estilo.",
    },
    takeaways: {
      en: ["Use containers when proximity is not enough.", "Keep each region semantically coherent.", "Avoid wrapping every element in a card."],
      es: ["Usa contenedores cuando la proximidad no sea suficiente.", "Mantén cada región semánticamente coherente.", "Evita convertir cada elemento en una tarjeta."],
    },
  },
  {
    key: "gestalt-closure",
    slug: { en: "gestalt-closure", es: "principio-gestalt-cierre" },
    title: { en: "Gestalt principle of closure", es: "Principio Gestalt de cierre" },
    eyebrow: { en: "Gestalt principle", es: "Principio Gestalt" },
    description: {
      en: "Learn why people mentally complete incomplete shapes and how closure can simplify icons, logos and visual cues.",
      es: "Aprende por qué completamos mentalmente formas incompletas y cómo el cierre puede simplificar iconos, logotipos y señales visuales.",
    },
    short: {
      en: "The mind tends to complete missing visual information into a familiar whole.",
      es: "La mente tiende a completar información visual faltante hasta formar un conjunto familiar.",
    },
    why: {
      en: "Closure lets designers imply structure with less visual ink, but an incomplete form still needs enough cues to remain recognizable.",
      es: "El cierre permite sugerir estructura con menos elementos visuales, pero una forma incompleta necesita suficientes pistas para seguir siendo reconocible.",
    },
    example: {
      en: "An icon can omit part of an outline and still read as a complete object when the remaining edges strongly suggest the missing shape.",
      es: "Un icono puede omitir parte de su contorno y seguir leyéndose como objeto completo cuando los bordes restantes sugieren claramente la forma faltante.",
    },
    takeaways: {
      en: ["Remove detail only when recognition remains strong.", "Use closure to simplify, not obscure.", "Test incomplete forms at small sizes."],
      es: ["Elimina detalle solo si la forma sigue siendo reconocible.", "Usa el cierre para simplificar, no para ocultar.", "Prueba formas incompletas en tamaños pequeños."],
    },
  },
];

export function getSeoPrincipleBySlug(locale: Locale, slug: string) {
  return seoPrinciples.find((item) => item.slug[locale] === slug);
}
