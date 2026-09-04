"use client";

import { useState } from "react";
import { battles } from "@/data/battles";
import type { BattleAnswer, Difficulty, Locale } from "@/lib/types";
import { DemoInterface } from "@/components/challenges/DemoInterface";

const difficultyLabel: Record<Locale, Record<Difficulty, string>> = {
  en: {
    beginner: "Beginner",
    intermediate: "Intermediate",
    advanced: "Advanced",
  },
  es: {
    beginner: "Principiante",
    intermediate: "Intermedio",
    advanced: "Avanzado",
  },
};

export function BattleEngine({ locale = "en" }: { locale?: Locale }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<BattleAnswer | null>(null);
  const [score, setScore] = useState(0);

  const battle = battles[index];
  const done = index >= battles.length;

  if (done || !battle) {
    return (
      <section className="card p-8 text-center">
        <p className="text-sm text-neutral-500">
          {locale === "es" ? "Entrenamiento completado" : "Training complete"}
        </p>
        <h2 className="mt-2 text-3xl font-semibold">{score} / {battles.length}</h2>
        <p className="mt-3 text-neutral-600">
          {locale === "es"
            ? "Completaste tu primera sesión en PixelDojo."
            : "Your first PixelDojo session is complete."}
        </p>
      </section>
    );
  }

  const choose = (value: BattleAnswer) => {
    if (answer) return;
    setAnswer(value);
    if (value === battle.correctAnswer) {
      setScore((current) => current + 1);
    }
  };

  const next = () => {
    setAnswer(null);
    setIndex((current) => current + 1);
  };

  const isCorrect = answer === battle.correctAnswer;

  return (
    <section className={`space-y-6 ${answer ? "pb-44" : ""}`}>
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>{index + 1} / {battles.length}</span>
        <span>{difficultyLabel[locale][battle.difficulty]}</span>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          {battle.principle[locale]}
        </p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">
          {battle.question[locale]}
        </h1>
        {battle.scenario && (
          <p className="mt-3 text-neutral-600">{battle.scenario[locale]}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(["a", "b"] as BattleAnswer[]).map((value) => {
          const option = value === "a" ? battle.optionA : battle.optionB;
          const selected = answer === value;
          const correct = Boolean(answer) && value === battle.correctAnswer;

          return (
            <button
              key={value}
              onClick={() => choose(value)}
              aria-label={locale === "es" ? `Elegir opción ${value.toUpperCase()}` : `Choose option ${value.toUpperCase()}`}
              className={`text-left rounded-3xl border p-3 transition ${
                selected
                  ? "border-neutral-950"
                  : "border-neutral-200 hover:border-neutral-400"
              } ${correct ? "ring-2 ring-neutral-950" : ""}`}
            >
              <div className="mb-3 px-1">
                <strong>{value.toUpperCase()}</strong>
              </div>
              <DemoInterface variant={option.variant} locale={locale} />
            </button>
          );
        })}
      </div>

      {answer && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(760px,calc(100%-24px))] -translate-x-1/2">
          <div className="card border-neutral-300 p-5 shadow-xl md:p-6">
            <div className="flex flex-col gap-4 md:flex-row md:items-end md:justify-between">
              <div>
                <p className="font-semibold">
                  {isCorrect
                    ? locale === "es" ? "✓ Buena elección" : "✓ Good call"
                    : locale === "es" ? "No exactamente" : "Not quite"}
                </p>
                <h2 className="mt-2 text-lg font-semibold">{battle.principle[locale]}</h2>
                <p className="mt-1 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base">
                  {battle.explanation[locale]}
                </p>
              </div>
              <button
                onClick={next}
                className="shrink-0 rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white"
              >
                {locale === "es" ? "Continuar →" : "Continue →"}
              </button>
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
