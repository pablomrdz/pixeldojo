"use client";

import { AnimatePresence, motion, useReducedMotion } from "motion/react";
import type { ReactNode } from "react";

export function BattleStage({ stageKey, children }: { stageKey: string; children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <AnimatePresence mode="wait" initial={false}>
      <motion.div
        key={stageKey}
        initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 10 }}
        animate={{ opacity: 1, y: 0 }}
        exit={reduceMotion ? { opacity: 0 } : { opacity: 0, y: -8 }}
        transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
      >
        {children}
      </motion.div>
    </AnimatePresence>
  );
}

export function FeedbackMotion({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.div
      initial={reduceMotion ? { opacity: 1 } : { opacity: 0, y: 18, scale: 0.985 }}
      animate={{ opacity: 1, y: 0, scale: 1 }}
      exit={{ opacity: 0, y: 10 }}
      transition={{ duration: reduceMotion ? 0 : 0.26, ease: [0.22, 1, 0.36, 1] }}
    >
      {children}
    </motion.div>
  );
}

export function XPPop({ children }: { children: ReactNode }) {
  const reduceMotion = useReducedMotion();

  return (
    <motion.span
      className="accent-chip rounded-full border px-2.5 py-1 text-xs font-semibold"
      initial={reduceMotion ? false : { opacity: 0, scale: 0.78 }}
      animate={{ opacity: 1, scale: 1 }}
      transition={{ type: "spring", stiffness: 430, damping: 24 }}
    >
      {children}
    </motion.span>
  );
}

export function AnimatedBar({ value }: { value: number }) {
  const reduceMotion = useReducedMotion();
  return (
    <motion.div
      className="accent-progress h-full rounded-full"
      initial={reduceMotion ? { width: `${value}%` } : { width: 0 }}
      animate={{ width: `${value}%` }}
      transition={{ duration: reduceMotion ? 0 : 0.48, ease: [0.22, 1, 0.36, 1] }}
    />
  );
}
