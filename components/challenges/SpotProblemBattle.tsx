"use client";

import { motion, useReducedMotion } from "motion/react";
import type { Locale } from "@/lib/types";

type Hotspot = {
  id: string;
  label: Record<Locale, string>;
  isProblem: boolean;
};

export function SpotProblemBattle({
  locale,
  prompt,
  hotspots,
  resolved,
  onResolve,
}: {
  locale: Locale;
  prompt: Record<Locale, string>;
  hotspots: Hotspot[];
  resolved: boolean;
  onResolve: (correct: boolean, hotspotId: string) => void;
}) {
  const reduceMotion = useReducedMotion();

  const hotspot = (id: string) => hotspots.find((item) => item.id === id)!;

  return (
    <div className="rounded-3xl border border-neutral-300 bg-white p-4 md:p-6">
      <p className="mb-4 text-sm font-medium text-neutral-600">{prompt[locale]}</p>

      <div className="relative mx-auto max-w-2xl rounded-[28px] border border-neutral-300 bg-neutral-50 p-5 md:p-7">
        <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
          <div className="flex items-center justify-between">
            <div>
              <p className="font-semibold">{locale === "es" ? "Crear cuenta" : "Create account"}</p>
              <p className="mt-1 text-xs text-neutral-500">
                {locale === "es" ? "Completa tus datos para continuar" : "Complete your details to continue"}
              </p>
            </div>
            <span className="text-xs text-neutral-400">Step 1/2</span>
          </div>

          <motion.button
            type="button"
            onClick={() => !resolved && onResolve(hotspot("global-error").isProblem, "global-error")}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className="mt-5 w-full rounded-xl border border-neutral-200 bg-neutral-100 p-3 text-left text-sm text-neutral-600"
          >
            {locale === "es" ? "Algo salió mal. Intenta de nuevo." : "Something went wrong. Try again."}
          </motion.button>

          <div className="mt-5 grid gap-4">
            <motion.button
              type="button"
              onClick={() => !resolved && onResolve(hotspot("email-field").isProblem, "email-field")}
              whileTap={reduceMotion ? undefined : { scale: 0.985 }}
              className="text-left"
            >
              <span className="text-xs font-medium text-neutral-600">Email</span>
              <div className="mt-1 flex h-11 items-center rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-500">
                juan@
              </div>
            </motion.button>

            <label>
              <span className="text-xs font-medium text-neutral-600">
                {locale === "es" ? "Contraseña" : "Password"}
              </span>
              <div className="mt-1 h-11 rounded-xl border border-neutral-300 bg-white" />
            </label>
          </div>

          <motion.button
            type="button"
            onClick={() => !resolved && onResolve(hotspot("submit-button").isProblem, "submit-button")}
            whileTap={reduceMotion ? undefined : { scale: 0.985 }}
            className="mt-6 w-full rounded-xl bg-neutral-950 px-4 py-3 text-sm font-semibold text-white"
          >
            {locale === "es" ? "Continuar" : "Continue"}
          </motion.button>
        </div>

        {resolved && (
          <motion.div
            className="pointer-events-none absolute left-5 right-5 top-[112px] mx-auto max-w-lg rounded-xl border-2 border-[var(--accent)]"
            initial={reduceMotion ? false : { opacity: 0, scale: 1.03 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: reduceMotion ? 0 : 0.24, ease: [0.22, 1, 0.36, 1] }}
            style={{ height: "48px" }}
          />
        )}
      </div>
    </div>
  );
}
