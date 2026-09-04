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

type Measure = {
  label: Record<Locale, string>;
  className: string;
  orientation?: "h" | "v";
};

const measures: Record<string, Measure[]> = {
  "cta-clear": [
    { label: { en: "Primary contrast", es: "Contraste principal" }, className: "measure-cta", orientation: "h" },
    { label: { en: "24px gap", es: "24px de espacio" }, className: "measure-cta-gap", orientation: "v" },
  ],
  "pricing-structured": [
    { label: { en: "Visual anchor", es: "Ancla visual" }, className: "measure-price", orientation: "h" },
    { label: { en: "Clear grouping", es: "Agrupación clara" }, className: "measure-price-group", orientation: "v" },
  ],
  "card-grouped": [
    { label: { en: "12px related", es: "12px relacionados" }, className: "measure-card-related", orientation: "v" },
    { label: { en: "24px between groups", es: "24px entre grupos" }, className: "measure-card-groups", orientation: "v" },
  ],
  "form-semantic": [
    { label: { en: "Grouped fields", es: "Campos agrupados" }, className: "measure-form-fields", orientation: "v" },
    { label: { en: "Section break", es: "Separación de sección" }, className: "measure-form-section", orientation: "h" },
  ],
  "type-hierarchy": [
    { label: { en: "24px title", es: "Título 24px" }, className: "measure-type-title", orientation: "h" },
    { label: { en: "12px metadata", es: "Metadatos 12px" }, className: "measure-type-meta", orientation: "h" },
  ],
  "dashboard-metric": [
    { label: { en: "2× emphasis", es: "2× énfasis" }, className: "measure-dashboard-primary", orientation: "h" },
    { label: { en: "Secondary data", es: "Datos secundarios" }, className: "measure-dashboard-secondary", orientation: "h" },
  ],
  "error-inline": [
    { label: { en: "Message at source", es: "Mensaje en el origen" }, className: "measure-error", orientation: "h" },
  ],
  "checkout-guest": [
    { label: { en: "No forced step", es: "Sin paso forzado" }, className: "measure-checkout", orientation: "h" },
  ],
  "contrast-readable": [
    { label: { en: "Readable contrast", es: "Contraste legible" }, className: "measure-contrast", orientation: "h" },
  ],
  "touch-comfortable": [
    { label: { en: "44px target", es: "Objetivo 44px" }, className: "measure-touch", orientation: "h" },
  ],
};

function Measurement({ measure, index, reduceMotion }: { measure: Measure; index: number; reduceMotion: boolean | null }) {
  return (
    <motion.div
      className={`measurement ${measure.className} ${measure.orientation === "v" ? "measurement--v" : "measurement--h"}`}
      initial={reduceMotion ? false : { opacity: 0, scale: 0.96 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ delay: reduceMotion ? 0 : 0.08 + index * 0.1, duration: 0.22, ease: [0.22, 1, 0.36, 1] }}
    >
      <span className="measurement__line" />
      <span className="measurement__label">{measure.label}</span>
    </motion.div>
  );
}

export function ChallengeReveal({ variant, locale, revealed, isCorrectVariant }: Props) {
  const reduceMotion = useReducedMotion();
  const currentMeasures = measures[variant] ?? [];

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <motion.div
        animate={
          revealed && !isCorrectVariant
            ? { opacity: 0.46, scale: reduceMotion ? 1 : 0.994 }
            : { opacity: 1, scale: 1 }
        }
        transition={{ duration: reduceMotion ? 0 : 0.22, ease: [0.22, 1, 0.36, 1] }}
      >
        <DemoInterface variant={variant} locale={locale} />
      </motion.div>

      <AnimatePresence>
        {revealed && isCorrectVariant && (
          <motion.div
            className="pointer-events-none absolute inset-0 rounded-2xl"
            initial={reduceMotion ? false : { opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            transition={{ duration: reduceMotion ? 0 : 0.22 }}
          >
            <div className="analysis-wash absolute inset-0 rounded-2xl" />
            <div className="analysis-frame absolute inset-3 rounded-xl" />
            {currentMeasures.map((measure, index) => (
              <Measurement
                key={measure.className}
                measure={{ ...measure, label: { en: measure.label.en, es: measure.label.es } }}
                index={index}
                reduceMotion={reduceMotion}
              />
            ))}
            {currentMeasures.length === 0 && <div className="analysis-grid absolute inset-0 rounded-2xl" />}
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
