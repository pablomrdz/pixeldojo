"use client";

import { Reorder, motion, useReducedMotion } from "motion/react";
import { useMemo, useState } from "react";
import type { Locale, RankKind } from "@/lib/types";

type RankItem = {
  id: string;
  label: Record<Locale, string>;
  quality: 1 | 2 | 3;
};

function MiniPreview({ kind, quality }: { kind: RankKind; quality: 1 | 2 | 3 }) {
  const strength = quality === 3 ? 1 : quality === 2 ? 0.68 : 0.38;

  if (kind === "touch-target") {
    const size = quality === 3 ? 42 : quality === 2 ? 30 : 20;
    return (
      <div className="flex h-14 items-center justify-center rounded-xl bg-neutral-50">
        <div className="rounded-full border border-neutral-500 bg-white" style={{ width: size, height: size }} />
      </div>
    );
  }

  if (kind === "spacing") {
    const gap = quality === 3 ? 10 : quality === 2 ? 5 : 2;
    return (
      <div className="flex h-14 flex-col justify-center rounded-xl bg-neutral-50 px-4" style={{ gap }}>
        <span className="h-2 w-2/3 rounded bg-neutral-800" />
        <span className="h-2 w-full rounded bg-neutral-300" />
        <span className="h-2 w-4/5 rounded bg-neutral-300" />
      </div>
    );
  }

  if (kind === "error-recovery") {
    return (
      <div className="h-14 rounded-xl bg-neutral-50 p-2.5">
        <div className="h-4 rounded border border-neutral-300 bg-white" />
        <div className="mt-1.5 h-2 rounded" style={{ width: quality === 3 ? "72%" : quality === 2 ? "46%" : "28%", background: `rgba(238,75,43,${strength})` }} />
      </div>
    );
  }

  if (kind === "checkout-friction") {
    return (
      <div className="h-14 rounded-xl bg-neutral-50 p-2.5">
        <div className="flex items-center justify-between text-[9px] text-neutral-500">
          <span>$48</span>
          <span>{quality === 3 ? "Guest" : quality === 2 ? "Email" : "Account"}</span>
        </div>
        <div className="mt-2 h-5 rounded bg-neutral-900" style={{ opacity: strength }} />
      </div>
    );
  }

  return (
    <div className="h-14 rounded-xl bg-neutral-50 p-2.5">
      <div className="h-2 w-3/4 rounded bg-neutral-300" />
      <div className="mt-2 h-6 rounded" style={{ width: quality === 3 ? "82%" : quality === 2 ? "62%" : "44%", background: `rgba(21,21,21,${strength})` }} />
    </div>
  );
}

export function RankBattle({
  locale,
  kind,
  prompt,
  items,
  correctOrder,
  resolved,
  onResolve,
}: {
  locale: Locale;
  kind: RankKind;
  prompt: Record<Locale, string>;
  items: RankItem[];
  correctOrder: string[];
  resolved: boolean;
  onResolve: (correct: boolean, order: string[]) => void;
}) {
  const reduceMotion = useReducedMotion();
  const initialOrder = useMemo(() => items.map((item) => item.id), [items]);
  const [order, setOrder] = useState(initialOrder);
  const itemById = (id: string) => items.find((item) => item.id === id)!;

  const submit = () => {
    if (resolved) return;
    const correct = order.every((id, index) => id === correctOrder[index]);
    onResolve(correct, order);
  };

  return (
    <div className="rounded-3xl border border-neutral-300 bg-white p-4 md:p-6">
      <div className="mb-4 flex items-center justify-between gap-4">
        <p className="text-sm font-medium text-neutral-600">{prompt[locale]}</p>
        <span className="text-xs font-semibold uppercase tracking-wider text-neutral-400">
          {locale === "es" ? "Mejor → peor" : "Best → worst"}
        </span>
      </div>

      <Reorder.Group axis="y" values={order} onReorder={resolved ? () => {} : setOrder} className="space-y-3">
        {order.map((id, index) => {
          const item = itemById(id);
          const correctPosition = resolved && correctOrder[index] === id;
          return (
            <Reorder.Item
              key={id}
              value={id}
              dragListener={!resolved}
              className={`grid cursor-grab grid-cols-[38px_1fr_120px] items-center gap-3 rounded-2xl border bg-white p-3 active:cursor-grabbing ${
                resolved ? (correctPosition ? "border-[var(--accent)]" : "border-neutral-300") : "border-neutral-200"
              }`}
              whileDrag={reduceMotion ? undefined : { scale: 1.01, boxShadow: "0 12px 36px rgba(0,0,0,.10)" }}
              layout
            >
              <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-neutral-100 text-sm font-semibold text-neutral-500">
                {index + 1}
              </div>
              <div>
                <p className="font-semibold">{item.label[locale]}</p>
                <p className="mt-1 text-xs text-neutral-500">{locale === "es" ? "Arrastra para reordenar" : "Drag to reorder"}</p>
              </div>
              <MiniPreview kind={kind} quality={item.quality} />
            </Reorder.Item>
          );
        })}
      </Reorder.Group>

      <motion.button
        type="button"
        onClick={submit}
        disabled={resolved}
        whileTap={reduceMotion ? undefined : { scale: 0.985 }}
        className="mt-5 rounded-xl bg-neutral-950 px-5 py-3 text-sm font-semibold text-white disabled:cursor-default disabled:opacity-50"
      >
        {locale === "es" ? "Comprobar orden" : "Check order"}
      </motion.button>
    </div>
  );
}
