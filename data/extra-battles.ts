import type { Battle } from "@/lib/types";

export const extraBattles: Battle[] = [
  {
    id: "checkout-cost-011",
    slug: "checkout-hidden-cost",
    skill: "checkout",
    difficulty: "intermediate",
    mode: "spot",
    question: {
      en: "Spot the checkout detail most likely to create last-second friction.",
      es: "Detecta el detalle del checkout con más probabilidad de generar fricción al final.",
    },
    scenario: {
      en: "The customer is ready to pay after already reviewing the product price.",
      es: "El cliente está listo para pagar después de haber revisado el precio del producto.",
    },
    optionA: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "checkout-guest" },
    optionB: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "checkout-guest" },
    correctAnswer: "a",
    principle: { en: "Friction reduction", es: "Reducción de fricción" },
    explanation: {
      en: "A fee revealed only at the final payment step creates surprise and forces the user to reevaluate a decision they thought was already settled.",
      es: "Un cargo revelado solo al final del pago genera sorpresa y obliga al usuario a reconsiderar una decisión que creía resuelta.",
    },
    spot: {
      scene: "checkout-total",
      prompt: { en: "Tap the element that creates the biggest trust problem.", es: "Toca el elemento que genera el mayor problema de confianza." },
      hotspots: [
        { id: "shipping-fee", label: { en: "Late shipping fee", es: "Cargo de envío tardío" }, isProblem: true },
        { id: "order-total", label: { en: "Order total", es: "Total del pedido" }, isProblem: false },
        { id: "pay-button", label: { en: "Pay button", es: "Botón pagar" }, isProblem: false },
      ],
    },
  },
  {
    id: "touch-target-012",
    slug: "tiny-mobile-target",
    skill: "accessibility",
    difficulty: "beginner",
    mode: "spot",
    question: {
      en: "Which control is most likely to cause missed taps?",
      es: "¿Qué control tiene más probabilidad de provocar toques fallidos?",
    },
    scenario: {
      en: "A user is holding the phone with one hand and wants to dismiss a preview.",
      es: "Un usuario sostiene el teléfono con una mano y quiere cerrar una vista previa.",
    },
    optionA: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "touch-small" },
    optionB: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "touch-small" },
    correctAnswer: "a",
    principle: { en: "Fitts's Law", es: "Ley de Fitts" },
    explanation: {
      en: "The tiny close control requires much more precision than the other actions. Increasing its hit area would make it faster and more reliable to use.",
      es: "El control de cierre diminuto exige mucha más precisión que las otras acciones. Aumentar su área táctil lo haría más rápido y confiable.",
    },
    spot: {
      scene: "touch-target",
      prompt: { en: "Tap the hardest control to activate reliably.", es: "Toca el control más difícil de activar con precisión." },
      hotspots: [
        { id: "close-button", label: { en: "Tiny close button", es: "Botón cerrar diminuto" }, isProblem: true },
        { id: "preview-card", label: { en: "Preview card", es: "Tarjeta de vista previa" }, isProblem: false },
        { id: "save-button", label: { en: "Save button", es: "Botón guardar" }, isProblem: false },
      ],
    },
  },
  {
    id: "hierarchy-competing-013",
    slug: "competing-primary-actions",
    skill: "visual-hierarchy",
    difficulty: "intermediate",
    mode: "spot",
    question: {
      en: "Spot the element that breaks the intended visual hierarchy.",
      es: "Detecta el elemento que rompe la jerarquía visual esperada.",
    },
    scenario: {
      en: "The page goal is to get users to start a free trial.",
      es: "El objetivo de la página es que el usuario inicie una prueba gratuita.",
    },
    optionA: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "cta-clear" },
    optionB: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "cta-clear" },
    correctAnswer: "a",
    principle: { en: "Visual hierarchy", es: "Jerarquía visual" },
    explanation: {
      en: "The promotional action is visually louder than the actual primary action, so attention is pulled away from the page goal.",
      es: "La acción promocional pesa visualmente más que la acción principal real, desviando la atención del objetivo de la página.",
    },
    spot: {
      scene: "hierarchy-banner",
      prompt: { en: "Tap the element stealing priority from the main action.", es: "Toca el elemento que le roba prioridad a la acción principal." },
      hotspots: [
        { id: "promo-cta", label: { en: "Oversized promo CTA", es: "CTA promocional sobredimensionado" }, isProblem: true },
        { id: "main-cta", label: { en: "Main CTA", es: "CTA principal" }, isProblem: false },
        { id: "headline", label: { en: "Headline", es: "Titular" }, isProblem: false },
      ],
    },
  },
  {
    id: "proximity-form-014",
    slug: "form-label-proximity",
    skill: "spacing",
    difficulty: "beginner",
    mode: "spot",
    question: {
      en: "Spot the spacing decision that makes this form harder to scan.",
      es: "Detecta la decisión de espaciado que hace más difícil escanear este formulario.",
    },
    scenario: {
      en: "Two form sections are visually close, but one label has drifted away from its field.",
      es: "Dos secciones del formulario están próximas, pero una etiqueta quedó demasiado lejos de su campo.",
    },
    optionA: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "form-uniform" },
    optionB: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "form-uniform" },
    correctAnswer: "a",
    principle: { en: "Gestalt proximity", es: "Proximidad Gestalt" },
    explanation: {
      en: "The email label is spaced closer to the previous section than to its own field, weakening the perceived relationship between label and input.",
      es: "La etiqueta de email está más cerca de la sección anterior que de su propio campo, debilitando la relación percibida entre etiqueta e input.",
    },
    spot: {
      scene: "proximity-form",
      prompt: { en: "Tap the element whose spacing creates the wrong relationship.", es: "Toca el elemento cuyo espaciado crea una relación incorrecta." },
      hotspots: [
        { id: "email-label", label: { en: "Email label", es: "Etiqueta de email" }, isProblem: true },
        { id: "email-input", label: { en: "Email input", es: "Campo de email" }, isProblem: false },
        { id: "newsletter-section", label: { en: "Newsletter section", es: "Sección newsletter" }, isProblem: false },
      ],
    },
  },
  {
    id: "contrast-status-015",
    slug: "low-contrast-status",
    skill: "accessibility",
    difficulty: "beginner",
    mode: "spot",
    question: {
      en: "Spot the information most at risk of becoming unreadable.",
      es: "Detecta la información con mayor riesgo de volverse ilegible.",
    },
    scenario: {
      en: "A delivery status card uses muted text to reduce visual noise.",
      es: "Una tarjeta de estado de entrega usa texto tenue para reducir ruido visual.",
    },
    optionA: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "contrast-low" },
    optionB: { label: { en: "Spot mode", es: "Modo detectar" }, variant: "contrast-low" },
    correctAnswer: "a",
    principle: { en: "Color contrast", es: "Contraste de color" },
    explanation: {
      en: "The delivery status is essential information, but its foreground-background contrast is so weak that some users may struggle to perceive it.",
      es: "El estado de entrega es información esencial, pero su contraste con el fondo es tan bajo que algunos usuarios pueden tener dificultad para percibirlo.",
    },
    spot: {
      scene: "contrast-status",
      prompt: { en: "Tap the essential information with insufficient contrast.", es: "Toca la información esencial con contraste insuficiente." },
      hotspots: [
        { id: "status-text", label: { en: "Delivery status", es: "Estado de entrega" }, isProblem: true },
        { id: "order-number", label: { en: "Order number", es: "Número de pedido" }, isProblem: false },
        { id: "details-button", label: { en: "Details button", es: "Botón detalles" }, isProblem: false },
      ],
    },
  },
];
