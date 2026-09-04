import type { Locale } from "@/lib/types";

export type PrincipleKey =
  | "visual-hierarchy"
  | "gestalt-proximity"
  | "typographic-hierarchy"
  | "error-recovery"
  | "friction-reduction"
  | "contrast-accessibility"
  | "fitts-law"
  | "hicks-law";

export type PrinciplePage = {
  key: PrincipleKey;
  slug: Record<Locale, string>;
  title: Record<Locale, string>;
  eyebrow: Record<Locale, string>;
  description: Record<Locale, string>;
  short: Record<Locale, string>;
  why: Record<Locale, string>;
  example: Record<Locale, string>;
  takeaways: Record<Locale, string[]>;
};

export const principles: PrinciplePage[] = [
  {
    key: "visual-hierarchy",
    slug: { en: "visual-hierarchy", es: "jerarquia-visual" },
    title: { en: "Visual hierarchy in UI design", es: "Jerarquía visual en diseño UI" },
    eyebrow: { en: "Design foundation", es: "Fundamento de diseño" },
    description: {
      en: "Learn how size, contrast, spacing and position guide attention and make interfaces easier to scan.",
      es: "Aprende cómo tamaño, contraste, espacio y posición guían la atención y hacen una interfaz más fácil de escanear.",
    },
    short: {
      en: "Visual hierarchy tells users what matters first, second and next.",
      es: "La jerarquía visual indica al usuario qué importa primero, después y a continuación.",
    },
    why: {
      en: "When every element competes with the same visual weight, users must work harder to understand what to do.",
      es: "Cuando todos los elementos compiten con el mismo peso visual, el usuario debe esforzarse más para entender qué hacer.",
    },
    example: {
      en: "A primary CTA can gain priority through stronger contrast and spacing without making every other element disappear.",
      es: "Un CTA principal puede ganar prioridad mediante mayor contraste y espacio sin hacer desaparecer el resto de la interfaz.",
    },
    takeaways: {
      en: ["Prioritize with contrast, not decoration.", "Use spacing to separate levels of importance.", "Make the primary action easy to identify."],
      es: ["Prioriza con contraste, no con decoración.", "Usa el espacio para separar niveles de importancia.", "Haz que la acción principal sea fácil de identificar."],
    },
  },
  {
    key: "gestalt-proximity",
    slug: { en: "gestalt-proximity", es: "ley-gestalt-proximidad" },
    title: { en: "Gestalt principle of proximity", es: "Principio Gestalt de proximidad" },
    eyebrow: { en: "Gestalt principle", es: "Principio Gestalt" },
    description: {
      en: "Understand why elements placed close together are perceived as related and how to use proximity in interfaces.",
      es: "Entiende por qué los elementos cercanos se perciben como relacionados y cómo usar la proximidad en interfaces.",
    },
    short: {
      en: "Proximity turns spacing into meaning.",
      es: "La proximidad convierte el espacio en significado.",
    },
    why: {
      en: "Users constantly infer relationships from distance. Good grouping reduces the amount of interpretation required.",
      es: "Los usuarios infieren relaciones constantemente a partir de la distancia. Una buena agrupación reduce el esfuerzo de interpretación.",
    },
    example: {
      en: "A label placed close to its input is understood as belonging to that field; larger gaps can separate form sections.",
      es: "Una etiqueta cercana a su input se entiende como parte de ese campo; espacios mayores pueden separar secciones del formulario.",
    },
    takeaways: {
      en: ["Keep related elements close.", "Use larger gaps between groups.", "Avoid uniform spacing when relationships differ."],
      es: ["Mantén cerca los elementos relacionados.", "Usa espacios mayores entre grupos.", "Evita el mismo espaciado cuando las relaciones son distintas."],
    },
  },
  {
    key: "typographic-hierarchy",
    slug: { en: "typographic-hierarchy", es: "jerarquia-tipografica" },
    title: { en: "Typographic hierarchy for interfaces", es: "Jerarquía tipográfica para interfaces" },
    eyebrow: { en: "Typography", es: "Tipografía" },
    description: {
      en: "Use size, weight and rhythm to create clear reading order in UI without relying on excessive decoration.",
      es: "Usa tamaño, peso y ritmo para crear un orden de lectura claro en UI sin depender de decoración excesiva.",
    },
    short: {
      en: "Typography should reveal structure before users read every word.",
      es: "La tipografía debe revelar la estructura antes de que el usuario lea cada palabra.",
    },
    why: {
      en: "Clear text roles help people scan titles, supporting content and metadata quickly.",
      es: "Los roles tipográficos claros permiten escanear títulos, contenido de apoyo y metadatos rápidamente.",
    },
    example: {
      en: "A dashboard metric can be larger and heavier than its label while secondary data remains quieter.",
      es: "Una métrica de dashboard puede ser más grande y pesada que su etiqueta mientras los datos secundarios permanecen más discretos.",
    },
    takeaways: {
      en: ["Define a small set of text roles.", "Use weight and size intentionally.", "Keep metadata visually quieter."],
      es: ["Define pocos roles de texto.", "Usa peso y tamaño con intención.", "Mantén los metadatos visualmente más discretos."],
    },
  },
  {
    key: "error-recovery",
    slug: { en: "error-recovery", es: "recuperacion-de-errores" },
    title: { en: "Error recovery in UX design", es: "Recuperación de errores en UX" },
    eyebrow: { en: "Interaction principle", es: "Principio de interacción" },
    description: {
      en: "Design error messages that explain what happened, where the problem is and how the user can recover.",
      es: "Diseña mensajes de error que expliquen qué ocurrió, dónde está el problema y cómo puede recuperarse el usuario.",
    },
    short: {
      en: "A useful error message helps the user recover, not merely announces failure.",
      es: "Un mensaje de error útil ayuda al usuario a recuperarse, no solo anuncia que algo falló.",
    },
    why: {
      en: "Generic errors force users to diagnose the interface themselves and often cause repeated failed attempts.",
      es: "Los errores genéricos obligan al usuario a diagnosticar la interfaz por su cuenta y suelen provocar intentos fallidos repetidos.",
    },
    example: {
      en: "Instead of “Something went wrong”, place a clear message next to the invalid field and explain the expected format.",
      es: "En lugar de “Algo salió mal”, coloca un mensaje claro junto al campo inválido y explica el formato esperado.",
    },
    takeaways: {
      en: ["Place guidance near the problem.", "Explain how to fix it.", "Preserve user input whenever possible."],
      es: ["Coloca la guía cerca del problema.", "Explica cómo corregirlo.", "Conserva la información del usuario cuando sea posible."],
    },
  },
  {
    key: "friction-reduction",
    slug: { en: "reduce-user-friction", es: "reducir-friccion-ux" },
    title: { en: "How to reduce friction in UX", es: "Cómo reducir fricción en UX" },
    eyebrow: { en: "UX principle", es: "Principio UX" },
    description: {
      en: "Learn to remove unnecessary steps, prerequisites and decisions from user flows without removing useful context.",
      es: "Aprende a eliminar pasos, requisitos y decisiones innecesarias de un flujo sin quitar contexto útil.",
    },
    short: {
      en: "Friction is any unnecessary effort between a user and their goal.",
      es: "La fricción es cualquier esfuerzo innecesario entre el usuario y su objetivo.",
    },
    why: {
      en: "Every additional requirement creates another opportunity for hesitation, error or abandonment.",
      es: "Cada requisito adicional crea otra oportunidad de duda, error o abandono.",
    },
    example: {
      en: "Guest checkout removes account creation as a prerequisite while still allowing registration after purchase.",
      es: "El checkout como invitado elimina la creación de cuenta como requisito y aún puede ofrecer registro después de la compra.",
    },
    takeaways: {
      en: ["Question every prerequisite.", "Delay optional commitments.", "Keep the user's immediate goal visible."],
      es: ["Cuestiona cada requisito previo.", "Retrasa compromisos opcionales.", "Mantén visible el objetivo inmediato del usuario."],
    },
  },
  {
    key: "contrast-accessibility",
    slug: { en: "color-contrast-accessibility", es: "contraste-accesibilidad" },
    title: { en: "Color contrast and accessibility", es: "Contraste de color y accesibilidad" },
    eyebrow: { en: "Accessibility", es: "Accesibilidad" },
    description: {
      en: "Learn why visual contrast affects readability and how stronger foreground-background separation improves interfaces.",
      es: "Aprende por qué el contraste afecta la legibilidad y cómo una separación más fuerte entre texto y fondo mejora las interfaces.",
    },
    short: {
      en: "Contrast helps users distinguish information from its background.",
      es: "El contraste ayuda al usuario a distinguir la información de su fondo.",
    },
    why: {
      en: "Low contrast can make essential text difficult or impossible to perceive, especially for users with low vision.",
      es: "El bajo contraste puede dificultar o impedir percibir texto esencial, especialmente para usuarios con baja visión.",
    },
    example: {
      en: "Secondary text can be visually quieter without becoming so light that it stops being comfortably readable.",
      es: "El texto secundario puede ser más discreto sin volverse tan claro que deje de ser cómodamente legible.",
    },
    takeaways: {
      en: ["Do not rely on subtle gray text for essential information.", "Check real contrast ratios.", "Test interfaces in different viewing conditions."],
      es: ["No dependas de grises muy sutiles para información esencial.", "Comprueba ratios reales de contraste.", "Prueba interfaces en distintas condiciones de visualización."],
    },
  },
  {
    key: "fitts-law",
    slug: { en: "fitts-law", es: "ley-de-fitts" },
    title: { en: "Fitts's Law in UX and UI design", es: "Ley de Fitts en UX y diseño UI" },
    eyebrow: { en: "UX law", es: "Ley UX" },
    description: {
      en: "Learn how target size and distance affect how quickly and reliably users can interact with controls.",
      es: "Aprende cómo el tamaño y la distancia de un objetivo afectan la rapidez y precisión con la que el usuario interactúa.",
    },
    short: {
      en: "Larger, easier-to-reach targets require less precision.",
      es: "Los objetivos más grandes y fáciles de alcanzar requieren menos precisión.",
    },
    why: {
      en: "Tiny or distant controls increase interaction time and make accidental misses more likely.",
      es: "Los controles pequeños o difíciles de alcanzar aumentan el tiempo de interacción y la probabilidad de fallos.",
    },
    example: {
      en: "Increasing a mobile icon's tappable area can improve usability even if the visible icon itself stays the same size.",
      es: "Aumentar el área táctil de un icono móvil puede mejorar la usabilidad aunque el icono visible conserve el mismo tamaño.",
    },
    takeaways: {
      en: ["Make important targets comfortably large.", "Increase hit areas around small icons.", "Consider reach, not only visual size."],
      es: ["Haz cómodamente grandes los objetivos importantes.", "Amplía el área táctil alrededor de iconos pequeños.", "Considera el alcance, no solo el tamaño visual."],
    },
  },
  {
    key: "hicks-law",
    slug: { en: "hicks-law", es: "ley-de-hick" },
    title: { en: "Hick's Law in UX design", es: "Ley de Hick en diseño UX" },
    eyebrow: { en: "UX law", es: "Ley UX" },
    description: {
      en: "Understand how the number and complexity of choices can increase decision time and cognitive effort.",
      es: "Entiende cómo la cantidad y complejidad de opciones puede aumentar el tiempo de decisión y el esfuerzo cognitivo.",
    },
    short: {
      en: "More meaningful choices usually require more decision time.",
      es: "Más opciones significativas suelen requerir más tiempo de decisión.",
    },
    why: {
      en: "Interfaces become harder to navigate when many competing choices are presented with equal priority.",
      es: "Las interfaces se vuelven más difíciles de navegar cuando muchas opciones compiten con la misma prioridad.",
    },
    example: {
      en: "A navigation menu can reduce decision effort by grouping related items and emphasizing common paths.",
      es: "Un menú de navegación puede reducir el esfuerzo de decisión agrupando elementos relacionados y destacando rutas frecuentes.",
    },
    takeaways: {
      en: ["Reduce unnecessary choices.", "Group related options.", "Prioritize common actions."],
      es: ["Reduce opciones innecesarias.", "Agrupa opciones relacionadas.", "Prioriza acciones frecuentes."],
    },
  },
];

export const battlePrinciple: Record<string, PrincipleKey> = {
  "hierarchy-cta-001": "visual-hierarchy",
  "hierarchy-pricing-002": "visual-hierarchy",
  "spacing-card-003": "gestalt-proximity",
  "spacing-form-004": "gestalt-proximity",
  "typography-content-005": "typographic-hierarchy",
  "typography-dashboard-006": "typographic-hierarchy",
  "forms-errors-007": "error-recovery",
  "checkout-friction-008": "friction-reduction",
  "accessibility-contrast-009": "contrast-accessibility",
  "accessibility-touch-010": "fitts-law",
};

export function getPrinciple(key: PrincipleKey) {
  return principles.find((item) => item.key === key);
}

export function getPrincipleBySlug(locale: Locale, slug: string) {
  return principles.find((item) => item.slug[locale] === slug);
}

export function principleHref(key: PrincipleKey, locale: Locale) {
  const item = getPrinciple(key);
  return item ? `/${locale}/ux/${item.slug[locale]}` : `/${locale}/ux`;
}
