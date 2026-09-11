import { battles as coreBattles } from "@/data/battles";
import { extraBattles } from "@/data/extra-battles";
import { volumeBattles } from "@/data/volume-battles";
import type { Battle } from "@/lib/types";

export const battlePool: Battle[] = [...coreBattles, ...extraBattles, ...volumeBattles];

export const spotBattles = battlePool.filter((battle) => battle.mode === "spot");
export const rankBattles = battlePool.filter((battle) => battle.mode === "rank");
export const compareBattles = battlePool.filter((battle) => !battle.mode || battle.mode === "compare");

export const battlePoolStats = {
  total: battlePool.length,
  spot: spotBattles.length,
  rank: rankBattles.length,
  compare: compareBattles.length,
};

function rotate<T>(items: T[], offset: number): T[] {
  if (!items.length) return items;
  const normalized = ((offset % items.length) + items.length) % items.length;
  return [...items.slice(normalized), ...items.slice(0, normalized)];
}

export function getCuratedTrainingSession(size = 10, seed = 0): Battle[] {
  const spotCount = Math.min(3, spotBattles.length, size);
  const rankCount = Math.min(2, rankBattles.length, Math.max(0, size - spotCount));
  const compareCount = Math.max(0, size - spotCount - rankCount);

  const spots = rotate(spotBattles, seed * 2).slice(0, spotCount);
  const ranks = rotate(rankBattles, seed).slice(0, rankCount);
  const compares = rotate(compareBattles, seed * 3).slice(0, compareCount);

  const session: Battle[] = [];
  const pattern = [
    compares[0],
    spots[0],
    compares[1],
    ranks[0],
    compares[2],
    spots[1],
    compares[3],
    ranks[1],
    spots[2],
    compares[4],
  ];

  pattern.forEach((battle) => {
    if (battle && !session.some((item) => item.id === battle.id)) session.push(battle);
  });

  const fallback = [...compares, ...spots, ...ranks, ...battlePool];
  for (const battle of fallback) {
    if (session.length >= size) break;
    if (!session.some((item) => item.id === battle.id)) session.push(battle);
  }

  return session.slice(0, size);
}
