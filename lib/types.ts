export type Locale = "en" | "es";
export type LocalizedText = Record<Locale, string>;
export type BattleAnswer = "a" | "b";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type BattleMode = "compare" | "spot" | "rank";

export type SpotScene =
  | "form-error"
  | "checkout-total"
  | "touch-target"
  | "hierarchy-banner"
  | "proximity-form"
  | "contrast-status";

export type RankKind =
  | "cta-hierarchy"
  | "spacing"
  | "error-recovery"
  | "touch-target"
  | "checkout-friction";

export type Battle = {
  id: string;
  slug: string;
  skill: string;
  difficulty: Difficulty;
  mode?: BattleMode;
  question: LocalizedText;
  scenario?: LocalizedText;
  optionA: {
    label: LocalizedText;
    variant: string;
  };
  optionB: {
    label: LocalizedText;
    variant: string;
  };
  correctAnswer: BattleAnswer;
  principle: LocalizedText;
  explanation: LocalizedText;
  spot?: {
    scene?: SpotScene;
    prompt: LocalizedText;
    hotspots: Array<{
      id: string;
      label: LocalizedText;
      isProblem: boolean;
    }>;
  };
  rank?: {
    kind: RankKind;
    prompt: LocalizedText;
    items: Array<{
      id: string;
      label: LocalizedText;
      quality: 1 | 2 | 3;
    }>;
    correctOrder: string[];
  };
  reasonPrompt?: LocalizedText;
  reasonOptions?: Array<{
    id: string;
    label: LocalizedText;
    isBestReason: boolean;
  }>;
};
