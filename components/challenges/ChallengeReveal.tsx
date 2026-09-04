"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import { DemoInterface } from "@/components/challenges/DemoInterface";
import type { Locale } from "@/lib/types";

type Props = {
  variant: string;
  locale: Locale;
  revealed: boolean;
  isCorrectVariant: boolean;
};

const annotationCopy: Record<string, Record<Locale, string[]>> = {
  "cta-clear": {
    en: ["Primary action gets stronger contrast", "Spacing creates clear priority"],
    es: ["La acción principal gana contraste", "El espacio crea una prioridad clara"],
  },
  "pricing-structured": {
    en: ["Price becomes the visual anchor", "Features stay secondary"],
    es: ["El precio se vuelve el ancla visual", "Los beneficios permanecen secundarios"],
  },
  "card-grouped": {
    en: ["Related content stays closer", "Larger gaps separate groups"],
    es: ["El contenido relacionado permanece cerca", "Espacios mayores separan grupos"],
  },
  "form-semantic": {
    en: ["Fields form meaningful groups", "Spacing communicates structure"],
    es: ["Los campos forman grupos con sentido", "El espacio comunica estructura"],
  },
  "type-hierarchy": {
    en: ["Title, body and metadata have distinct roles"],
    es: ["Título, cuerpo y metadatos tienen roles distintos"],
  },
  "dashboard-metric": {
    en: ["The key metric gets the strongest emphasis"],
    es: ["La métrica clave recibe el mayor énfasis"],
  },
  "error-inline": {
    en: ["Guidance appears next to the problem", "Recovery becomes obvious"],
    es: ["La guía aparece junto al problema", "La recuperación se vuelve evidente"],
  },
  "checkout-guest": {
    en: ["No forced account before purchase", "The goal stays uninterrupted"],
    es: ["No se obliga a crear cuenta antes de comprar", "El objetivo no se interrumpe"],
  },
  "contrast-readable": {
    en: ["Foreground and background separate clearly"],
    es: ["Texto y fondo se separan con claridad"],
  },
  "touch-comfortable": {
    en: ["Larger hit areas require less precision"],
    es: ["Áreas táctiles mayores requieren menos precisión"],
  },
};

export function ChallengeReveal({ variant, locale, revealed, isCorrectVariant }: Props) {
  const reduceMotion = useReducedMotion();
  const annotations = annotationCopy[variant]?.[locale] ?? [];

  return (
    <div className="relative">
      <motion.div
        animate={
          revealed && !isCorrectVariant
            ? { opacity: 0.55, scale: reduceMotion ? 1 : 0.992 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <DemoInterface variant={variant} locale={locale} />
      </motion.div>

      <AnimatePresence>
        {revealed && isCorrectVariant && annotations.length > 0 && (
          <motion.div
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-2xl"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.18 }}
          >
            <motion.div
              className="absolute inset-3 rounded-2xl border-2 border-[var(--accent)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.02 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.24, ease: [0.22, 1, 0.36, 1] }}
            />
            <div className="absolute bottom-4 left-4 right-4 flex flex-col gap-2">
              {annotations.slice(0, 2).map((label, index) => (
                <motion.div
                  key={label}
                  className="guided-note"
                  initial={reduceMotion ? false : { opacity: 0, y: 8 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.1, duration: 0.22 }}
                >
                  <span className="guided-note__dot" />
                  <span>{label}</span>
                </motion.div>
              ))}
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
