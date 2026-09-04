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

export function ChallengeReveal({ variant, locale, revealed, isCorrectVariant }: Props) {
  const reduceMotion = useReducedMotion();

  return (
    <div className="relative overflow-hidden rounded-2xl">
      <motion.div
        animate={
          revealed && !isCorrectVariant
            ? { opacity: 0.5, scale: reduceMotion ? 1 : 0.994 }
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
            transition={{ duration: reduceMotion ? 0 : 0.24 }}
          >
            <motion.div
              className="analysis-grid absolute inset-0 rounded-2xl"
              initial={reduceMotion ? false : { opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: reduceMotion ? 0 : 0.05, duration: 0.28 }}
            />
            <motion.div
              className="absolute inset-3 rounded-xl border border-[var(--accent)]"
              initial={reduceMotion ? false : { opacity: 0, scale: 1.015 }}
              animate={{ opacity: 0.9, scale: 1 }}
              transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            />
            <motion.span
              className="analysis-corner analysis-corner--tl"
              initial={reduceMotion ? false : { opacity: 0, x: -4, y: -4 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.08, duration: 0.2 }}
            />
            <motion.span
              className="analysis-corner analysis-corner--br"
              initial={reduceMotion ? false : { opacity: 0, x: 4, y: 4 }}
              animate={{ opacity: 1, x: 0, y: 0 }}
              transition={{ delay: reduceMotion ? 0 : 0.12, duration: 0.2 }}
            />
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}
