"use client";

import { useState } from "react";
import { battles } from "@/data/battles";
import type { BattleAnswer, Locale } from "@/lib/types";
import { DemoInterface } from "@/components/challenges/DemoInterface";

export function BattleEngine({ locale = "en" }: { locale?: Locale }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<BattleAnswer | null>(null);
  const [score, setScore] = useState(0);

  const battle = battles[index];
  const done = index >= battles.length;

  if (done || !battle) {
    return (
      <section className="card p-8 text-center">
        <p className="text-sm text-neutral-500">Training complete</p>
        <h2 className="mt-2 text-3xl font-semibold">{score} / {battles.length}</h2>
        <p className="mt-3 text-neutral-600">Your first PixelDojo session is complete.</p>
      </section>
    );
  }

  const choose = (value: BattleAnswer) => {
    if (answer) return;
    setAnswer(value);
    if (value === battle.correctAnswer) setScore((current) => current + 1);
  };

  const next = () => {
    setAnswer(null);
    setIndex((current) => current + 1);
  };

  return (
    <section className="space-y-6">
      <div className="flex items-center justify-between text-sm text-neutral-500">
        <span>{index + 1} / {battles.length}</span>
        <span className="capitalize">{battle.difficulty}</span>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">{battle.principle[locale]}</p>
        <h1 className="mt-3 max-w-3xl text-3xl font-semibold tracking-tight">{battle.question[locale]}</h1>
        {battle.scenario && <p className="mt-3 text-neutral-600">{battle.scenario[locale]}</p>}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(["a", "b"] as BattleAnswer[]).map((value) => {
          const option = value === "a" ? battle.optionA : battle.optionB;
          const selected = answer === value;
          const correct = answer && value === battle.correctAnswer;

          return (
            <button
              key={value}
              onClick={() => choose(value)}
              className={`text-left rounded-3xl border p-3 transition ${selected ? "border-neutral-950" : "border-neutral-200 hover:border-neutral-400"} ${correct ? "ring-2 ring-neutral-950" : ""}`}
            >
              <div className="mb-3 flex items-center justify-between px-1">
                <strong>{value.toUpperCase()}</strong>
                <span className="text-sm text-neutral-500">{option.label[locale]}</span>
              </div>
              <DemoInterface variant={option.variant} />
            </button>
          );
        })}
      </div>

      {answer && (
        <div className="card p-6">
          <p className="font-semibold">{answer === battle.correctAnswer ? "✓ Good call" : "Not quite"}</p>
          <h2 className="mt-4 text-xl font-semibold">{battle.principle[locale]}</h2>
          <p className="mt-2 max-w-2xl text-neutral-600">{battle.explanation[locale]}</p>
          <button onClick={next} className="mt-6 rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white">
            {locale === "es" ? "Continuar →" : "Continue →"}
          </button>
        </div>
      )}
    </section>
  );
}
