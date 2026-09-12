"use client";

import { motion, useReducedMotion } from "motion/react";
import { track } from "@/lib/analytics";
import type { Locale, SpotScene } from "@/lib/types";

type Hotspot = {
  id: string;
  label: Record<Locale, string>;
  isProblem: boolean;
};

function inferScene(scene: SpotScene | undefined, hotspots: Hotspot[]): SpotScene {
  if (scene) return scene;
  const ids = new Set(hotspots.map((item) => item.id));
  if (ids.has("shipping-fee")) return "checkout-total";
  if (ids.has("close-button")) return "touch-target";
  if (ids.has("promo-cta")) return "hierarchy-banner";
  if (ids.has("email-label")) return "proximity-form";
  if (ids.has("status-text")) return "contrast-status";
  return "form-error";
}

export function SpotProblemBattle({
  locale,
  scene,
  prompt,
  hotspots,
  resolved,
  onResolve,
}: {
  locale: Locale;
  scene?: SpotScene;
  prompt: Record<Locale, string>;
  hotspots: Hotspot[];
  resolved: boolean;
  onResolve: (correct: boolean, hotspotId: string) => void;
}) {
  const reduceMotion = useReducedMotion();
  const activeScene = inferScene(scene, hotspots);
  const hotspot = (id: string) => hotspots.find((item) => item.id === id);
  const choose = (id: string) => {
    const item = hotspot(id);
    if (!resolved && item) {
      track("spot_problem_answered", {
        locale,
        scene: activeScene,
        hotspot_id: id,
        correct: item.isProblem,
      });
      onResolve(item.isProblem, id);
    }
  };
  const stateClass = (id: string) =>
    resolved && hotspot(id)?.isProblem ? "accent-ring border-[var(--accent)]" : "";
  const tap = reduceMotion ? undefined : { scale: 0.985 };

  return (
    <div className="rounded-3xl border border-neutral-300 bg-white p-4 md:p-6">
      <p className="mb-4 text-sm font-medium text-neutral-600">{prompt[locale]}</p>
      <div className="relative mx-auto max-w-2xl rounded-[28px] border border-neutral-300 bg-neutral-50 p-5 md:p-7">
        {activeScene === "form-error" && (
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
            <motion.button type="button" onClick={() => choose("global-error")} whileTap={tap}
              className={`mt-5 w-full rounded-xl border border-neutral-200 bg-neutral-100 p-3 text-left text-sm text-neutral-600 ${stateClass("global-error")}`}>
              {locale === "es" ? "Algo salió mal. Intenta de nuevo." : "Something went wrong. Try again."}
            </motion.button>
            <div className="mt-5 grid gap-4">
              <motion.button type="button" onClick={() => choose("email-field")} whileTap={tap}
                className={`rounded-xl text-left ${stateClass("email-field")}`}>
                <span className="text-xs font-medium text-neutral-600">Email</span>
                <div className="mt-1 flex h-11 items-center rounded-xl border border-neutral-300 bg-white px-3 text-sm text-neutral-500">juan@</div>
              </motion.button>
              <label>
                <span className="text-xs font-medium text-neutral-600">{locale === "es" ? "Contraseña" : "Password"}</span>
                <div className="mt-1 h-11 rounded-xl border border-neutral-300 bg-white" />
              </label>
            </div>
            <motion.button type="button" onClick={() => choose("submit-button")} whileTap={tap}
              className={`mt-6 w-full rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-3 text-sm font-semibold text-white ${stateClass("submit-button")}`}>
              {locale === "es" ? "Continuar" : "Continue"}
            </motion.button>
          </div>
        )}

        {activeScene === "checkout-total" && (
          <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="text-sm font-semibold">{locale === "es" ? "Resumen del pedido" : "Order summary"}</p>
            <div className="mt-5 flex justify-between text-sm"><span>Studio Pack</span><span>$48.00</span></div>
            <motion.button type="button" onClick={() => choose("shipping-fee")} whileTap={tap}
              className={`mt-5 flex w-full justify-between rounded-lg border border-dashed border-neutral-200 bg-neutral-50 px-3 py-2 text-left text-xs text-neutral-400 ${stateClass("shipping-fee")}`}>
              <span>{locale === "es" ? "Envío" : "Shipping"}</span><span>$12.00</span>
            </motion.button>
            <motion.button type="button" onClick={() => choose("order-total")} whileTap={tap}
              className={`mt-4 flex w-full justify-between rounded-lg border border-neutral-200 px-3 py-3 text-left font-semibold ${stateClass("order-total")}`}>
              <span>Total</span><span>$60.00</span>
            </motion.button>
            <motion.button type="button" onClick={() => choose("pay-button")} whileTap={tap}
              className={`mt-5 w-full rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-3 text-sm font-semibold text-white ${stateClass("pay-button")}`}>
              {locale === "es" ? "Pagar ahora" : "Pay now"}
            </motion.button>
          </div>
        )}

        {activeScene === "touch-target" && (
          <div className="mx-auto w-64 rounded-[30px] border border-neutral-300 bg-white p-4 shadow-sm">
            <div className="relative h-40 rounded-2xl bg-neutral-200">
              <motion.button type="button" onClick={() => choose("close-button")} whileTap={tap}
                className={`absolute right-2 top-2 flex h-5 w-5 items-center justify-center rounded-full border border-neutral-300 bg-white text-[9px] ${stateClass("close-button")}`}>×</motion.button>
              <motion.button type="button" onClick={() => choose("preview-card")} whileTap={tap}
                className={`flex h-full w-full items-end rounded-2xl p-3 text-left text-xs text-neutral-500 ${stateClass("preview-card")}`}>
                {locale === "es" ? "Vista previa" : "Preview"}
              </motion.button>
            </div>
            <motion.button type="button" onClick={() => choose("save-button")} whileTap={tap}
              className={`mt-4 w-full rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-3 text-sm font-semibold text-white ${stateClass("save-button")}`}>
              {locale === "es" ? "Guardar" : "Save"}
            </motion.button>
          </div>
        )}

        {activeScene === "hierarchy-banner" && (
          <div className="mx-auto max-w-lg rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <motion.button type="button" onClick={() => choose("promo-cta")} whileTap={tap}
              className={`w-full rounded-xl border border-neutral-950 bg-neutral-950 px-4 py-4 text-left text-lg font-bold text-white ${stateClass("promo-cta")}`}>
              {locale === "es" ? "🔥 50% OFF — Ver oferta" : "🔥 50% OFF — View deal"}
            </motion.button>
            <motion.button type="button" onClick={() => choose("headline")} whileTap={tap}
              className={`mt-6 w-full rounded-xl p-1 text-left ${stateClass("headline")}`}>
              <span className="block text-3xl font-semibold tracking-tight">{locale === "es" ? "Diseña mejor, más rápido" : "Design better, faster"}</span>
              <span className="mt-2 block text-sm leading-6 text-neutral-500">{locale === "es" ? "Todo lo que necesitas para organizar tu trabajo." : "Everything you need to organize your work."}</span>
            </motion.button>
            <motion.button type="button" onClick={() => choose("main-cta")} whileTap={tap}
              className={`mt-5 rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold ${stateClass("main-cta")}`}>
              {locale === "es" ? "Iniciar prueba gratis" : "Start free trial"}
            </motion.button>
          </div>
        )}

        {activeScene === "proximity-form" && (
          <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <p className="font-semibold">{locale === "es" ? "Perfil" : "Profile"}</p>
            <div className="mt-5 rounded-xl border border-neutral-200 p-4">
              <p className="text-xs font-medium text-neutral-600">{locale === "es" ? "Nombre" : "Name"}</p>
              <div className="mt-1 h-10 rounded-lg border border-neutral-300 bg-neutral-50" />
            </div>
            <motion.button type="button" onClick={() => choose("email-label")} whileTap={tap}
              className={`mt-4 block rounded-lg px-1 text-left text-xs font-medium text-neutral-600 ${stateClass("email-label")}`}>Email</motion.button>
            <motion.button type="button" onClick={() => choose("email-input")} whileTap={tap}
              className={`mt-8 h-10 w-full rounded-lg border border-neutral-300 bg-neutral-50 ${stateClass("email-input")}`} aria-label="Email input" />
            <motion.button type="button" onClick={() => choose("newsletter-section")} whileTap={tap}
              className={`mt-7 w-full rounded-xl border border-neutral-200 p-4 text-left ${stateClass("newsletter-section")}`}>
              <p className="text-sm font-semibold">Newsletter</p><p className="mt-1 text-xs text-neutral-500">{locale === "es" ? "Recibe novedades semanales" : "Get weekly updates"}</p>
            </motion.button>
          </div>
        )}

        {activeScene === "contrast-status" && (
          <div className="mx-auto max-w-md rounded-2xl border border-neutral-200 bg-white p-5 shadow-sm">
            <motion.button type="button" onClick={() => choose("order-number")} whileTap={tap}
              className={`w-full rounded-lg text-left ${stateClass("order-number")}`}>
              <span className="text-xs text-neutral-500">{locale === "es" ? "Pedido" : "Order"} #2048</span>
            </motion.button>
            <motion.button type="button" onClick={() => choose("status-text")} whileTap={tap}
              className={`mt-5 w-full rounded-xl bg-neutral-100 p-4 text-left ${stateClass("status-text")}`}>
              <span className="text-sm font-semibold text-neutral-300">{locale === "es" ? "En reparto · llega hoy" : "Out for delivery · arrives today"}</span>
            </motion.button>
            <motion.button type="button" onClick={() => choose("details-button")} whileTap={tap}
              className={`mt-5 rounded-xl border border-neutral-300 px-4 py-3 text-sm font-semibold ${stateClass("details-button")}`}>
              {locale === "es" ? "Ver detalles" : "View details"}
            </motion.button>
          </div>
        )}
      </div>
    </div>
  );
}
