"use client";

import Link from "next/link";
import { useEffect, useMemo, useRef, useState } from "react";
import { battles } from "@/data/battles";
import { battlePrinciple, getPrinciple, principleHref } from "@/data/learning";
import type { BattleAnswer, Difficulty, Locale } from "@/lib/types";
import { ChallengeReveal } from "@/components/challenges/ChallengeReveal";
import { SpotProblemBattle } from "@/components/challenges/SpotProblemBattle";
import { AnimatedBar, BattleStage, FeedbackMotion, XPPop } from "@/components/battle/MotionPrimitives";
import { track } from "@/lib/analytics";

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
  const startedRef = useRef(false);
  const completedRef = useRef(false);

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

  useEffect(() => {
    if (!startedRef.current) {
      startedRef.current = true;
      track("training_started", { locale, battle_count: battles.length });
    }
  }, [locale]);

  useEffect(() => {
    if (!battle) return;
    track("battle_viewed", {
      locale,
      battle_id: battle.id,
      skill: battle.skill,
      index: index + 1,
      difficulty: battle.difficulty,
    });
  }, [battle, index, locale]);

  useEffect(() => {
    if (!done || completedRef.current) return;
    completedRef.current = true;
    track("training_completed", {
      locale,
      score,
      total: battles.length,
      xp,
    });
  }, [done, locale, score, xp]);

  if (done || !battle) {
    const strongest = [...breakdown].sort(
      (a, b) => b[1].correct / b[1].total - a[1].correct / a[1].total
    )[0];
    const weakest = [...breakdown].sort(
      (a, b) => a[1].correct / a[1].total - b[1].correct / b[1].total
    )[0];

    return (
      <section className="card overflow-hidden">
        <div className="flex flex-col gap-4 border-b border-neutral-200 p-6 md:flex-row md:items-center md:justify-between md:px-8">
          <div>
            <p className="text-sm font-medium text-neutral-500">
              {locale === "es" ? "Entrenamiento completado" : "Training complete"}
            </p>
            <div className="mt-1 flex items-center gap-3">
              <h1 className="text-4xl font-semibold tracking-tight">
                {score}/{battles.length}
              </h1>
              <span className="rounded-full bg-neutral-950 px-3 py-1.5 text-sm font-semibold text-white">
                {xp} XP
              </span>
            </div>
          </div>
          <button
            onClick={() => {
              track("train_again_clicked", { locale, score, xp });
              completedRef.current = false;
              setIndex(0);
              setAnswer(null);
              setAttempts({});
              setXp(0);
              setXpDelta(0);
              setReasonOpen(false);
              setReasonAnswers({});
              setReasonBonus({});
            }}
            className="rounded-xl bg-neutral-950 px-5 py-3 font-semibold text-white"
          >
            {locale === "es" ? "Entrenar de nuevo" : "Train again"}
          </button>
        </div>

        <div className="grid gap-6 p-6 md:grid-cols-[1fr_240px] md:px-8 md:py-7">
          <div className="grid gap-3 sm:grid-cols-2">
            {breakdown.map(([skill, result]) => {
              const pct = Math.round((result.correct / result.total) * 100);
              return (
                <div key={skill} className="rounded-xl border border-neutral-200 p-3.5">
                  <div className="flex items-center justify-between gap-3">
                    <span className="text-sm font-medium">
                      {skillLabel[locale][skill] ?? skill}
                    </span>
                    <span className="text-xs text-neutral-500">{pct}%</span>
                  </div>
                  <div className="mt-2 h-1.5 overflow-hidden rounded-full bg-neutral-200">
                    <AnimatedBar value={pct} />
                  </div>
                </div>
              );
            })}
          </div>

          <aside className="grid gap-3 sm:grid-cols-2 md:grid-cols-1">
            {strongest && (
              <div className="rounded-xl border border-neutral-200 p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  {locale === "es" ? "Fortaleza" : "Strongest"}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {skillLabel[locale][strongest[0]] ?? strongest[0]}
                </p>
              </div>
            )}
            {weakest && (
              <div className="rounded-xl border border-neutral-200 p-3.5">
                <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                  {locale === "es" ? "Practica después" : "Practice next"}
                </p>
                <p className="mt-1 text-sm font-semibold">
                  {skillLabel[locale][weakest[0]] ?? weakest[0]}
                </p>
              </div>
            )}
            <Link
              href={`/${locale}/ux`}
              className="rounded-xl border border-neutral-200 bg-neutral-50 p-3.5 transition hover:border-neutral-400"
            >
              <p className="text-[11px] font-semibold uppercase tracking-wider text-neutral-500">
                {locale === "es" ? "Seguir aprendiendo" : "Keep learning"}
              </p>
              <p className="mt-1 text-sm font-semibold">
                {locale === "es" ? "Explorar principios →" : "Explore principles →"}
              </p>
            </Link>
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
    setAttempts((current) => ({ ...current, [battle.id]: correct }));
    track("battle_answered", {
      locale,
      battle_id: battle.id,
      skill: battle.skill,
      index: index + 1,
      answer: value,
      correct,
      xp_earned: earned,
      mode: battle.mode ?? "compare",
    });
  };

  const chooseReason = (reasonId: string, isBestReason: boolean) => {
    if (reasonAnswers[battle.id]) return;
    setReasonAnswers((current) => ({ ...current, [battle.id]: reasonId }));
    track("reason_answered", {
      locale,
      battle_id: battle.id,
      reason_id: reasonId,
      correct: isBestReason,
    });
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
  const principleKey = battlePrinciple[battle.id];
  const principle = principleKey ? getPrinciple(principleKey) : undefined;

  const optionFor = (value: BattleAnswer) => {
    const original = shouldFlip ? opposite(value) : value;
    return original === "a" ? battle.optionA : battle.optionB;
  };

  return (
    <BattleStage stageKey={battle.id}>
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
          <AnimatedBar value={progress} />
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

      {battle.mode === "spot" && battle.spot ? (
        <SpotProblemBattle
          locale={locale}
          prompt={battle.spot.prompt}
          hotspots={battle.spot.hotspots}
          resolved={Boolean(answer)}
          onResolve={(correct) => {
            if (answer) return;
            choose(correct ? displayedCorrectAnswer : opposite(displayedCorrectAnswer));
          }}
        />
      ) : (
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
                } ${correct ? "accent-ring" : ""}`}
              >
                <div className="mb-3 px-1">
                  <strong>{value.toUpperCase()}</strong>
                </div>
                <ChallengeReveal
                  variant={option.variant}
                  locale={locale}
                  revealed={Boolean(answer)}
                  isCorrectVariant={correct}
                />
              </button>
            );
          })}
        </div>
      )}

      {answer && (
        <div className="fixed bottom-4 left-1/2 z-50 w-[min(820px,calc(100%-24px))] -translate-x-1/2">
          <FeedbackMotion>
          <div className="card border-neutral-300 p-5 shadow-xl md:p-6">
            <div className="flex flex-col gap-4">
              <div className="flex flex-col gap-3 md:flex-row md:items-start md:justify-between">
                <div>
                  <div className="flex flex-wrap items-center gap-2.5">
                    <p className="font-semibold">
                      {isCorrect
                        ? locale === "es" ? "✓ Buena elección" : "✓ Good call"
                        : locale === "es" ? "No exactamente" : "Not quite"}
                    </p>
                    <XPPop>+{xpDelta} XP</XPPop>
                    {principle && (
                      <span className="rounded-full border border-neutral-300 px-2.5 py-1 text-xs font-medium text-neutral-600">
                        {principle.eyebrow[locale]} · {principle.title[locale]}
                      </span>
                    )}
                  </div>
                  <p className="mt-2 max-w-2xl text-sm leading-6 text-neutral-600 md:text-base">
                    {battle.explanation[locale]}
                  </p>
                  {principle && (
                    <Link
                      href={principleHref(principle.key, locale)}
                      onClick={() =>
                        track("principle_learn_more_clicked", {
                          locale,
                          battle_id: battle.id,
                          principle: principle.key,
                        })
                      }
                      className="mt-2 inline-flex text-sm font-semibold underline decoration-neutral-300 underline-offset-4"
                    >
                      {locale === "es" ? "Aprender más →" : "Learn more →"}
                    </Link>
                  )}
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
                      onClick={() => {
                        setReasonOpen(true);
                        track("reason_opened", { locale, battle_id: battle.id });
                      }}
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
          </FeedbackMotion>
        </div>
      )}
      </section>
    </BattleStage>
  );
}
