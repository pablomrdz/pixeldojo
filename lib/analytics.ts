export type PixelDojoEvent =
  | "home_cta_clicked"
  | "principle_hub_opened"
  | "principle_page_opened"
  | "principle_learn_more_clicked"
  | "training_started"
  | "battle_viewed"
  | "battle_answered"
  | "reason_opened"
  | "reason_answered"
  | "training_completed"
  | "train_again_clicked"
  | "language_changed";

export type AnalyticsPayload = Record<string, string | number | boolean | null | undefined>;

declare global {
  interface Window {
    dataLayer?: Array<Record<string, unknown>>;
    gtag?: (...args: unknown[]) => void;
    plausible?: (event: string, options?: { props?: AnalyticsPayload }) => void;
  }
}

export function track(event: PixelDojoEvent, payload: AnalyticsPayload = {}) {
  if (typeof window === "undefined") return;

  const detail = { event, ...payload };

  window.dispatchEvent(new CustomEvent("pixeldojo:analytics", { detail }));

  window.dataLayer?.push({
    event,
    ...payload,
  });

  window.gtag?.("event", event, payload);

  window.plausible?.(event, { props: payload });

  if (process.env.NODE_ENV === "development") {
    console.info("[PixelDojo analytics]", detail);
  }
}
