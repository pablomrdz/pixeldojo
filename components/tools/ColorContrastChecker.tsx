"use client";

import { useMemo, useState } from "react";
import type { Locale } from "@/lib/types";

function normalizeHex(value: string) {
  let hex = value.trim();
  if (!hex.startsWith("#")) hex = `#${hex}`;
  if (/^#[0-9a-fA-F]{6}$/.test(hex)) return hex.toUpperCase();
  return null;
}

function hexToRgb(hex: string) {
  const clean = hex.replace("#", "");
  return {
    r: parseInt(clean.slice(0, 2), 16),
    g: parseInt(clean.slice(2, 4), 16),
    b: parseInt(clean.slice(4, 6), 16),
  };
}

function luminance(hex: string) {
  const { r, g, b } = hexToRgb(hex);
  const values = [r, g, b].map((channel) => {
    const value = channel / 255;
    return value <= 0.04045 ? value / 12.92 : Math.pow((value + 0.055) / 1.055, 2.4);
  });
  return 0.2126 * values[0] + 0.7152 * values[1] + 0.0722 * values[2];
}

function ratio(foreground: string, background: string) {
  const a = luminance(foreground);
  const b = luminance(background);
  const lighter = Math.max(a, b);
  const darker = Math.min(a, b);
  return (lighter + 0.05) / (darker + 0.05);
}

export function ColorContrastChecker({ locale }: { locale: Locale }) {
  const [foreground, setForeground] = useState("#151515");
  const [background, setBackground] = useState("#F3F0EA");
  const [foregroundDraft, setForegroundDraft] = useState(foreground);
  const [backgroundDraft, setBackgroundDraft] = useState(background);

  const contrast = useMemo(() => ratio(foreground, background), [foreground, background]);
  const formatted = contrast.toFixed(2);

  const statuses = [
    { label: locale === "es" ? "AA texto normal" : "AA normal text", pass: contrast >= 4.5 },
    { label: locale === "es" ? "AA texto grande" : "AA large text", pass: contrast >= 3 },
    { label: locale === "es" ? "AAA texto normal" : "AAA normal text", pass: contrast >= 7 },
  ];

  const commit = (kind: "fg" | "bg", value: string) => {
    const normalized = normalizeHex(value);
    if (!normalized) return;
    if (kind === "fg") {
      setForeground(normalized);
      setForegroundDraft(normalized);
    } else {
      setBackground(normalized);
      setBackgroundDraft(normalized);
    }
  };

  const swap = () => {
    setForeground(background);
    setBackground(foreground);
    setForegroundDraft(background);
    setBackgroundDraft(foreground);
  };

  return (
    <div className="rounded-3xl border border-neutral-300 bg-white p-5 md:p-7">
      <div className="grid gap-5 md:grid-cols-2">
        <ColorField
          label={locale === "es" ? "Texto" : "Foreground"}
          value={foreground}
          draft={foregroundDraft}
          onDraft={setForegroundDraft}
          onCommit={(value) => commit("fg", value)}
        />
        <ColorField
          label={locale === "es" ? "Fondo" : "Background"}
          value={background}
          draft={backgroundDraft}
          onDraft={setBackgroundDraft}
          onCommit={(value) => commit("bg", value)}
        />
      </div>

      <div className="mt-5 flex flex-wrap items-center justify-between gap-3 border-t border-neutral-200 pt-5">
        <div>
          <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
            {locale === "es" ? "Ratio de contraste" : "Contrast ratio"}
          </p>
          <p className="mt-1 text-4xl font-semibold tracking-tight">{formatted}:1</p>
        </div>
        <button
          type="button"
          onClick={swap}
          className="rounded-xl border border-neutral-300 px-4 py-2.5 text-sm font-semibold transition hover:border-neutral-500"
        >
          {locale === "es" ? "Intercambiar colores" : "Swap colors"}
        </button>
      </div>

      <div className="mt-5 grid gap-3 sm:grid-cols-3">
        {statuses.map((status) => (
          <div key={status.label} className="rounded-xl border border-neutral-200 p-3">
            <p className="text-xs text-neutral-500">{status.label}</p>
            <p className={`mt-1 font-semibold ${status.pass ? "text-neutral-950" : "text-neutral-400"}`}>
              {status.pass ? (locale === "es" ? "✓ Pasa" : "✓ Pass") : locale === "es" ? "No pasa" : "Fail"}
            </p>
          </div>
        ))}
      </div>

      <div
        className="mt-5 rounded-2xl border border-black/5 p-6"
        style={{ color: foreground, backgroundColor: background }}
      >
        <p className="text-xs font-semibold uppercase tracking-wider opacity-70">PixelDojo preview</p>
        <p className="mt-3 text-2xl font-semibold">
          {locale === "es" ? "El contraste también es jerarquía." : "Contrast is hierarchy too."}
        </p>
        <p className="mt-2 max-w-xl text-sm leading-6 opacity-80">
          {locale === "es"
            ? "Prueba combinaciones reales antes de usarlas en texto, controles y contenido esencial."
            : "Test real combinations before using them for text, controls, and essential content."}
        </p>
      </div>
    </div>
  );
}

function ColorField({
  label,
  value,
  draft,
  onDraft,
  onCommit,
}: {
  label: string;
  value: string;
  draft: string;
  onDraft: (value: string) => void;
  onCommit: (value: string) => void;
}) {
  return (
    <label className="block">
      <span className="text-sm font-semibold">{label}</span>
      <div className="mt-2 flex items-center gap-3 rounded-xl border border-neutral-300 p-2">
        <input
          type="color"
          value={value}
          onChange={(event) => {
            const next = event.target.value.toUpperCase();
            onDraft(next);
            onCommit(next);
          }}
          className="h-11 w-14 cursor-pointer rounded-lg border-0 bg-transparent p-0"
          aria-label={label}
        />
        <input
          value={draft}
          onChange={(event) => onDraft(event.target.value)}
          onBlur={() => onCommit(draft)}
          onKeyDown={(event) => {
            if (event.key === "Enter") onCommit(draft);
          }}
          className="min-w-0 flex-1 bg-transparent px-2 font-mono text-sm outline-none"
          spellCheck={false}
        />
      </div>
    </label>
  );
}
