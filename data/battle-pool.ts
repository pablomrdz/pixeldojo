import { battlePool } from "@/data/battles";
import type { Battle } from "@/lib/types";

export { battlePool };

export const spotBattles = battlePool.filter((battle) => battle.mode === "spot");
export const compareBattles = battlePool.filter((battle) => battle.mode !== "spot");

export const battlePoolStats = {
  total: battlePool.length,
  spot: spotBattles.length,
  compare: compareBattles.length,
};

export function getCuratedTrainingSession(size = 10): Battle[] {
  const requiredSpotCount = Math.min(3, spotBattles.length, size);
  const selectedSpots = spotBattles.slice(0, requiredSpotCount);
  const selectedComparisons = compareBattles.slice(0, Math.max(0, size - selectedSpots.length));
  const selected = [...selectedComparisons, ...selectedSpots];

  return selected
    .sort((a, b) => {
      const aIndex = battlePool.findIndex((battle) => battle.id === a.id);
      const bIndex = battlePool.findIndex((battle) => battle.id === b.id);
      return aIndex - bIndex;
    })
    .slice(0, size);
}
