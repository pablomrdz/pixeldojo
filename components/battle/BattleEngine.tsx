"use client";

import { useMemo, useState } from "react";
import { battles } from "@/data/battles";
import type { BattleAnswer, Difficulty, Locale } from "@/lib/types";
import { DemoInterface } from "@/components/challenges/DemoInterface";

const difficultyLabel: Record<Locale, Record<Difficulty, string>> = {
  en: { beginner: "Beginner", intermediate: "Intermediate", advanced: "Advanced" },
  es: { beginner: "Principiante", intermediate: "Intermedio", advanced: "Avanzado" },
};

const skillLabel: Record<Locale, Record<string, string>> = {
  en: {
    "visual-hierarchy": "Visual hierarchy",
    spacing: "Spacing",
    typography: "Typography",
    forms: "Forms",
    checkout: "Checkout",
    accessibility: "Accessibility",
  },
  es: {
    "visual-hierarchy": "Jerarquía visual",
    spacing: "Espaciado",
    typography: "Tipografía",
    forms: "Formularios",
    checkout: "Checkout",
    accessibility: "Accesibilidad",
  },
};

function opposite(value: BattleAnswer): BattleAnswer {
  return value === "a" ? "b" : "a";
}

export function BattleEngine({ locale = "en" }: { locale?: Locale }) {
  const [index, setIndex] = useState(0);
  const [answer, setAnswer] = useState<BattleAnswer | null>(null);
  const [attempts, setAttempts] = useState<Record<string, boolean>>({});
  const [xp, setXp] = useState(0);
  const [xpDelta, setXpDelta] = useState(0);
  const [reasonOpen, setReasonOpen] = useState(false);
  const [reasonAnswers, setReasonAnswers] = useState<Record<string, string>>({});
  const [reasonBonus, setReasonBonus] = useState<Record<string, boolean>>({});

  const battle = battles[index];
  const done = index >= battles.length;

  const shouldFlip = index % 3 === 0 || index === 4 || index === 7;
  const displayedCorrectAnswer = battle
    ? shouldFlip
      ? opposite(battle.correctAnswer)
      : battle.correctAnswer
    : "a";

  const breakdown = useMemo(() => {
    const grouped: Record<string, { correct: number; total: number }> = {};

    battles.forEach((item) => {
      if (!grouped[item.skill]) grouped[item.skill] = { correct: 0, total: 0 };
      grouped[item.skill].total += 1;
      if (attempts[item.id]) grouped[item.skill].correct += 1;
    });

    return Object.entries(grouped);
  }, [attempts]);

  const score = Object.values(attempts).filter(Boolean).length;
  const progress = Math.min(100, Math.round((index / battles.length) * 100));

  if (done || !battle) {
    const strongest = [...breakdown].sort(
      (a, b) => b[1].correct / b[1].total - a[1].correct / a[1].total
    )[0];
    const weakest = [...breakdown].sort(
      (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total
    )[0];

    return (
      <section className="card overflow-hidden">
        <div className="border-b border-neutral-200 p-7 text-center md:p-10">
          <p className="text-sm font-medium text-neutral-500">
            {locale === "es" ? "Entrenamiento completado" : "Training complete"}
          </p>
          <h1 className="mt-2 text-4xl font-semibold tracking-tight">
            {score} / {battles.length}
          </h1>
          <div className="mt-4 inline-flex rounded-full bg-neutral-950 px-4 py-2 text-sm font-semibold text-white">
            {xp} XP
          </div>
          <p className="mt-4 text-neutral-600">
            {locale === "es"
              ? "Ya tienes una primera lectura de tu criterio de diseño."
              : "You now have a first snapshot of your design judgment."}
          </p>
        </div>

        <div className="grid gap-8 p-7 md:grid-cols-[1fr_280px] md:p-10">
          <div>
            <h2 className="text-sm font-semibold uppercase tracking-wider text-neutral-500">
              {locale === "es" ? "Por habilidad" : "By skill"}
            </h2>
            <div className="mt-4 divide-y divide-neutral-200">
              {breakdown.map(([skill, result]) => {
                const pct = Math.round((result.correct / result.total) * 100);
                return (
                  <div key={skill} className="grid grid-cols-[1fr_auto] gap-4 py-4">
                    <div>
                      <div className="flex items-center justify-between gap-4">
                        <span className="font-medium">
                          {skillLabel[locale][skill] ?? skill}
                        </span>
                        <span className="text-sm text-neutral-500">{pct}%</span>
                      </div>
                      <div className="mt-2 h-2 overflow-hidden rounded-full bg-neutral-200">
                        <div
                          className="h-full rounded-full bg-neutral-950"
                          style={{ width: `${pct}%` }}
                        />
                      </div>
                    </div>
                    <span className="self-center text-sm font-semibold">
                      {result.correct}/{result.total}
                    </span>
                  </div>
                );
              })}
            </div>
          </div>

          <aside className="space-y-4">
            {strongest && (
              <div className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {locale === "es" ? "Fortaleza" : "Strongest"}
                </p>
                <p className="mt-2 font-semibold">
                  {skillLabel[locale][strongest[0]] ?? strongest[0]}
                </p>
              </div>
            )}
            {weakest && (
              <div className="rounded-2xl border border-neutral-200 p-4">
                <p className="text-xs font-semibold uppercase tracking-wider text-neutral-500">
                  {locale === "es" ? "Sigue practicando" : "Keep practicing"}
                </p>
                <p className="mt-2 font-semibold">
                  {skillLabel[locale][weakest[0]] ?? weakest[0]}
                </p>
              </div>
            )}
            <button
              onClick={() => {
                setIndex(0);
                setAnswer(null);
                setAttempts({});
                setXp(0);
                setXpDelta(0);
                setReasonOpen(false);
                setReasonAnswers({});
                setReasonBonus({});
              }}
              className="w-full rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white"
            >
              {locale === "es" ? "Entrenar de nuevo" : "Train again"}
            </button>
          </aside>
        </div>
      </section>
    );
  }

  const choose = (value: BattleAnswer) => {
    if (answer) return;

    const correct = value === displayedCorrectAnswer;
    const earned = correct ? 100 : 20;

    setAnswer(value);
    setXp((current) => current + earned);
    setXpDelta(earned);
    setAttempts((current) => ({
      ...current,
      [battle.id]: correct,
    }));
  };

  const chooseReason = (reasonId: string, isBestReason: boolean) => {
    if (reasonAnswers[battle.id]) return;

    setReasonAnswers((current) => ({ ...current, [battle.id]: reasonId }));

    if (isBestReason) {
      setReasonBonus((current) => ({ ...current, [battle.id]: true }));
      setXp((current) => current + 25);
      setXpDelta((current) => current + 25);
    }
  };

  const next = () => {
    setAnswer(null);
    setReasonOpen(false);
    setXpDelta(0);
    setIndex((current) => current + 1);
  };

  const isCorrect = answer === displayedCorrectAnswer;

  const optionFor = (value: BattleAnswer) => {
    const original = shouldFlip ? opposite(value) : value;
    return original === "a" ? battle.optionA : battle.optionB;
  };

  return (
    <section className={`space-y-5 ${answer ? "pb-64 md:pb-52" : ""}`}>
      <div className="space-y-3">
        <div className="flex items-center justify-between text-sm text-neutral-500">
          <span>{index + 1} / {battles.length}</span>
          <div className="flex items-center gap-3">
            <span className="font-semibold text-neutral-950">{xp} XP</span>
            <span>{difficultyLabel[locale][battle.difficulty]}</span>
          </div>
        </div>
        <div className="h-2 overflow-hidden rounded-full bg-neutral-200">
          <div
            className="h-full rounded-full bg-neutral-950 transition-all duration-300"
            style={{ width: `${progress}%` }}
          />
        </div>
      </div>

      <div>
        <p className="text-xs font-semibold uppercase tracking-widest text-neutral-500">
          {battle.principle[locale]}
        </p>
        <h1 className="mt-3 max-w-3xl text-2xl font-semibold tracking-tight md:text-3xl">
          {battle.question[locale]}
        </h1>
        {battle.scenario && (
          <p className="mt-3 text-neutral-600">{battle.scenario[locale]}</p>
        )}
      </div>

      <div className="grid gap-4 md:grid-cols-2">
        {(["a", "b"] as BattleAnswer[]).map((value) => {
          const option = optionFor(value);
          const selected = answer === value;
          const correct = Boolean(answer) && value === displayedCorrectAnswer;

          return (
            <button
              key={value}
              onClick={() => choose(value)}
              aria-label={
                locale === "es"
                  ? `Elegir opción ${value.toUpperCase()}`
                  : `Choose option ${value.toUpperCase()}`
              }
              className={`text-left rounded-3xl border p-3 transition ${
                selected
                  ? "border-neutral-950"
                  : "border-neutral-200 hover:-translate-y-0.5 hover:border-neutral-400"
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
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(820px,calc(100%-24px))] -translate-x-1/2">
          <div className="card border-neutral-300 p-5 shadow-xl md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex items-center gap-3">
                    <p className="font-semibold">
                      {isCorrect
                        ? locale === "es"
                          ? "✓ Buena elección"
                          : "✓ Good call"
                        : locale === "es"
                          ? "No exactamente"
                          : "Not quite"}
                    </p>
                    <span className="rounded-full bg-neutral-100 px-2.5 py-1 text-xs font-semibold">
                      +{xpDelta} XP
                    </span>
                  </div>
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

              {battle.reasonOptions && battle.reasonPrompt && (
                <div className="border-t border-neutral-200 pt-4">
                  {!reasonOpen ? (
                    <button
                      onClick={() => setReasonOpen(true)}
                      className="text-sm font-semibold underline decoration-neutral-300 underline-offset-4"
                    >
                      {battle.reasonPrompt[locale]}
                      <span className="ml-2 text-neutral-500">+25 XP</span>
                    </button>
                  ) : (
                    <div>
                      <p className="text-sm font-semibold">
                        {locale === "es" ? "¿Cuál es la mejor razón?" : "What's the best reason?"}
                      </p>
                      <div className="mt-3 grid gap-2 md:grid-cols-3">
                        {battle.reasonOptions.map((reason) => {
                          const chosen = reasonAnswers[battle.id] === reason.id;
                          const locked = Boolean(reasonAnswers[battle.id]);
                          return (
                            <button
                              key={reason.id}
                              onClick={() => chooseReason(reason.id, reason.isBestReason)}
                              disabled={locked}
                              className={`rounded-xl border px-3 py-3 text-left text-sm transition ${
                                chosen
                                  ? reason.isBestReason
                                    ? "border-neutral-950 bg-neutral-950 text-white"
                                    : "border-neutral-400 bg-neutral-100"
                                  : "border-neutral-200 hover:border-neutral-400"
                              }`}
                            >
                              {reason.label[locale]}
                            </button>
                          );
                        })}
                      </div>
                      {reasonAnswers[battle.id] && (
                        <p className="mt-3 text-sm text-neutral-600">
                          {reasonBonus[battle.id]
                            ? locale === "es"
                              ? "✓ Exacto. Identificaste el principio detrás de la decisión. +25 XP"
                              : "✓ Exactly. You identified the principle behind the decision. +25 XP"
                            : locale === "es"
                              ? "Buena hipótesis. La clave está en el principio señalado arriba."
                              : "Good hypothesis. The key is the principle explained above."}
                        </p>
                      )}
                    </div>
                  )}
                </div>
              )}
            </div>
          </div>
        </div>
      )}
    </section>
  );
}
