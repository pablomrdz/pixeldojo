import type { Battle } from "@/lib/types";

export const battles: Battle[] = [
  {
    id: "hierarchy-cta-001",
    slug: "visual-hierarchy-cta",
    skill: "visual-hierarchy",
    difficulty: "beginner",
    question: {
      en: "Which interface communicates the primary action more clearly?",
      es: "¿Qué interfaz comunica con mayor claridad la acción principal?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "cta-subtle" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "cta-clear" },
    correctAnswer: "b",
    principle: { en: "Visual hierarchy", es: "Jerarquía visual" },
    explanation: {
      en: "The stronger version gives the primary action more visual weight through contrast, spacing, and scale.",
      es: "La versión más clara da mayor peso visual a la acción principal mediante contraste, espacio y escala.",
    },
  },
  {
    id: "hierarchy-pricing-002",
    slug: "visual-hierarchy-pricing",
    skill: "visual-hierarchy",
    difficulty: "beginner",
    question: {
      en: "Which pricing card is easier to scan?",
      es: "¿Qué tarjeta de precios es más fácil de escanear?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "pricing-flat" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "pricing-structured" },
    correctAnswer: "b",
    principle: { en: "Visual hierarchy", es: "Jerarquía visual" },
    explanation: {
      en: "The clearer card separates plan name, price, features, and action into an easier reading order.",
      es: "La tarjeta más clara separa nombre del plan, precio, beneficios y acción en un orden de lectura más fácil.",
    },
  },
  {
    id: "spacing-card-003",
    slug: "spacing-card",
    skill: "spacing",
    difficulty: "beginner",
    question: {
      en: "Which card feels easier to understand at a glance?",
      es: "¿Qué tarjeta resulta más fácil de entender de un vistazo?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "card-tight" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "card-grouped" },
    correctAnswer: "b",
    principle: { en: "Proximity", es: "Proximidad" },
    explanation: {
      en: "The stronger version uses spacing to show which elements belong together, reducing interpretation effort.",
      es: "La versión más clara usa el espacio para mostrar qué elementos pertenecen juntos y reduce el esfuerzo de interpretación.",
    },
  },
  {
    id: "spacing-form-004",
    slug: "spacing-form",
    skill: "spacing",
    difficulty: "beginner",
    question: {
      en: "Which form makes field groups easier to recognize?",
      es: "¿Qué formulario hace más reconocibles los grupos de campos?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "form-uniform" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "form-semantic" },
    correctAnswer: "b",
    principle: { en: "Gestalt proximity", es: "Proximidad Gestalt" },
    explanation: {
      en: "The better grouping varies spacing intentionally so related fields read as groups rather than isolated inputs.",
      es: "La mejor agrupación varía el espaciado intencionalmente para que los campos relacionados se perciban como grupos.",
    },
  },
  {
    id: "typography-content-005",
    slug: "typography-content-hierarchy",
    skill: "typography",
    difficulty: "beginner",
    question: {
      en: "Which version creates a clearer reading hierarchy?",
      es: "¿Qué versión crea una jerarquía de lectura más clara?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "type-flat" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "type-hierarchy" },
    correctAnswer: "b",
    principle: { en: "Typographic hierarchy", es: "Jerarquía tipográfica" },
    explanation: {
      en: "The stronger version creates distinct levels for title, supporting text, and metadata without relying on decoration.",
      es: "La versión más clara crea niveles distintos para título, texto de apoyo y metadatos sin depender de decoración.",
    },
  },
  {
    id: "typography-dashboard-006",
    slug: "typography-dashboard",
    skill: "typography",
    difficulty: "intermediate",
    question: {
      en: "Which dashboard makes the key metric easier to identify?",
      es: "¿Qué dashboard hace más fácil identificar la métrica principal?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "dashboard-equal" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "dashboard-metric" },
    correctAnswer: "b",
    principle: { en: "Information hierarchy", es: "Jerarquía de información" },
    explanation: {
      en: "The clearer dashboard gives the key metric stronger typographic emphasis while keeping secondary data available.",
      es: "El dashboard más claro da mayor énfasis tipográfico a la métrica principal sin ocultar los datos secundarios.",
    },
  },
  {
    id: "forms-errors-007",
    slug: "form-error-handling",
    skill: "forms",
    difficulty: "intermediate",
    mode: "spot",
    question: {
      en: "Spot the usability problem in this form.",
      es: "Detecta el problema de usabilidad en este formulario.",
    },
    scenario: {
      en: "A user entered an invalid email and is trying to understand what went wrong.",
      es: "Un usuario escribió un email inválido e intenta entender qué salió mal.",
    },
    optionA: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "error-inline" },
    optionB: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "error-inline" },
    correctAnswer: "a",
    principle: { en: "Error recovery", es: "Recuperación de errores" },
    explanation: {
      en: "The real issue is the generic error message: it does not tell the user which field failed or how to recover.",
      es: "El problema real es el mensaje genérico: no indica qué campo falló ni cómo puede recuperarse el usuario.",
    },
    spot: {
      prompt: {
        en: "Tap the area that makes recovery hardest.",
        es: "Toca el área que dificulta más la recuperación.",
      },
      hotspots: [
        {
          id: "global-error",
          label: { en: "Generic error message", es: "Mensaje de error genérico" },
          isProblem: true,
        },
        {
          id: "email-field",
          label: { en: "Email field", es: "Campo de email" },
          isProblem: false,
        },
        {
          id: "submit-button",
          label: { en: "Submit button", es: "Botón enviar" },
          isProblem: false,
        },
      ],
    },
  },
  {
    id: "checkout-friction-008",
    slug: "checkout-friction",
    skill: "checkout",
    difficulty: "intermediate",
    question: {
      en: "Which checkout reduces unnecessary friction?",
      es: "¿Qué checkout reduce fricción innecesaria?",
    },
    scenario: {
      en: "A first-time customer wants to buy one product quickly.",
      es: "Un cliente nuevo quiere comprar rápidamente un solo producto.",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "checkout-account" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "checkout-guest" },
    correctAnswer: "b",
    principle: { en: "Friction reduction", es: "Reducción de fricción" },
    explanation: {
      en: "The lower-friction checkout lets the customer complete the immediate goal without forcing an unrelated commitment first.",
      es: "El checkout con menos fricción permite completar el objetivo inmediato sin forzar antes un compromiso innecesario.",
    },
    reasonPrompt: {
      en: "Want to explain why?",
      es: "¿Quieres explicar por qué?",
    },
    reasonOptions: [
      {
        id: "shorter",
        label: { en: "It simply looks shorter", es: "Simplemente se ve más corto" },
        isBestReason: false,
      },
      {
        id: "friction",
        label: {
          en: "It removes an unnecessary prerequisite from the purchase flow",
          es: "Elimina un requisito innecesario del flujo de compra",
        },
        isBestReason: true,
      },
      {
        id: "modern",
        label: { en: "It feels more modern", es: "Se siente más moderno" },
        isBestReason: false,
      },
    ],
  },
  {
    id: "accessibility-contrast-009",
    slug: "accessibility-contrast",
    skill: "accessibility",
    difficulty: "beginner",
    question: {
      en: "Which interface makes the text easier to perceive?",
      es: "¿Qué interfaz hace el texto más fácil de percibir?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "contrast-low" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "contrast-readable" },
    correctAnswer: "b",
    principle: { en: "Contrast", es: "Contraste" },
    explanation: {
      en: "The more readable version creates stronger separation between text and background.",
      es: "La versión más legible crea una separación más fuerte entre texto y fondo.",
    },
    reasonPrompt: {
      en: "Want to explain why?",
      es: "¿Quieres explicar por qué?",
    },
    reasonOptions: [
      {
        id: "larger",
        label: { en: "The text is larger", es: "El texto es más grande" },
        isBestReason: false,
      },
      {
        id: "contrast",
        label: {
          en: "Foreground and background have stronger visual separation",
          es: "Texto y fondo tienen una separación visual más fuerte",
        },
        isBestReason: true,
      },
      {
        id: "minimal",
        label: { en: "The layout is more minimal", es: "El layout es más minimalista" },
        isBestReason: false,
      },
    ],
  },
  {
    id: "accessibility-touch-010",
    slug: "accessibility-touch-target",
    skill: "accessibility",
    difficulty: "beginner",
    question: {
      en: "Which mobile control is easier to activate reliably?",
      es: "¿Qué control móvil es más fácil de activar con precisión?",
    },
    optionA: { label: { en: "Option A", es: "Opción A" }, variant: "touch-small" },
    optionB: { label: { en: "Option B", es: "Opción B" }, variant: "touch-comfortable" },
    correctAnswer: "b",
    principle: { en: "Touch target size", es: "Tamaño del área táctil" },
    explanation: {
      en: "The easier control provides a larger interactive target, reducing accidental misses.",
      es: "El control más fácil ofrece un área interactiva mayor y reduce la probabilidad de toques fallidos.",
    },
  },
];
