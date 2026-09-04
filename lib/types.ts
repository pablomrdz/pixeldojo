export type Locale = "en" | "es";
export type LocalizedText = Record<Locale, string>;
export type BattleAnswer = "a" | "b";
export type Difficulty = "beginner" | "intermediate" | "advanced";
export type BattleMode = "compare" | "spot";

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
    prompt: LocalizedText;
    hotspots: Array<{
      id: string;
      label: LocalizedText;
      isProblem: boolean;
    }>;
  };
  reasonPrompt?: LocalizedText;
  reasonOptions?: Array<{
    id: string;
    label: LocalizedText;
    isBestReason: boolean;
  }>;
};
