import type { Locale } from "@/lib/types";

export function BrandHeroVisual({ locale }: { locale: Locale }) {
  return (
    <div className="dojo-visual" aria-hidden="true">
      <div className="dojo-visual__meta">
        <span>01 / 10</span>
        <span className="dojo-accent-text">+100 XP</span>
      </div>

      <div className="dojo-visual__question">
        <span className="dojo-kicker">{locale === "es" ? "JERARQUÍA VISUAL" : "VISUAL HIERARCHY"}</span>
        <strong>{locale === "es" ? "¿Cuál guía mejor tu atención?" : "Which one guides attention better?"}</strong>
      </div>

      <div className="dojo-visual__options">
        <div className="dojo-mini-card">
          <span className="dojo-option-label">A</span>
          <div className="dojo-lines">
            <i className="w-3/4" />
            <i className="w-full" />
            <i className="w-4/5" />
          </div>
          <div className="dojo-mini-action dojo-mini-action--quiet">
            {locale === "es" ? "Continuar" : "Continue"}
          </div>
        </div>

        <div className="dojo-mini-card dojo-mini-card--selected">
          <span className="dojo-option-label dojo-option-label--accent">B</span>
          <div className="dojo-lines">
            <i className="w-1/2 dojo-line-strong" />
            <i className="w-full" />
            <i className="w-2/3" />
          </div>
          <div className="dojo-mini-action dojo-mini-action--strong">
            {locale === "es" ? "Continuar" : "Continue"}
          </div>
        </div>
      </div>

      <div className="dojo-visual__feedback">
        <span className="dojo-feedback-dot" />
        <div>
          <strong>{locale === "es" ? "Buena elección." : "Good call."}</strong>
          <p>{locale === "es" ? "Contraste + espacio crean prioridad." : "Contrast + spacing create priority."}</p>
        </div>
      </div>
    </div>
  );
}
