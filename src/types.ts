export type Lang = 'es' | 'pt';

export type LocalizedText = {
  es: string;
  pt?: string;
};

export type Characteristic = {
  id: string;
  category: 'empuje' | 'relacion' | 'ejecucion';
  weight: number;
  name: LocalizedText;
  faceA: LocalizedText;
  faceB: LocalizedText;
  shadowId: string;
};

export type Archetype = {
  id: string;
  match: {
    dominantFamily: Characteristic['category'];
    keyCharacteristic?: string;
    fallback?: boolean;
  };
  name: LocalizedText;
  birthday: string;
  blurb: LocalizedText;
};

export type AxisOption = {
  id: string;
  text: LocalizedText;
  cost: number;
  isTrap: boolean;
  trapExplain?: LocalizedText;
};

export type Axis = {
  id: string;
  label: LocalizedText;
  options: AxisOption[];
};

export type Challenge = {
  id: string;
  targetShadow: string;
  targetAxis: string;
  title: LocalizedText;
  scene: LocalizedText;
  excuse: LocalizedText;
  phases: {
    facts: { id: string; text: LocalizedText; isFact: boolean }[];
    priority: LocalizedText;
    settings: { id: string; text: LocalizedText; correct: boolean }[];
    fragments: { id: string; text: LocalizedText; role: 'E' | 'I' | 'C' | 'TRAP' }[];
    responses: { id: string; text: LocalizedText; mode: 'push' | 'pull' }[];
    requests: { id: string; text: LocalizedText }[];
    commitments: { id: string; text: LocalizedText; real: boolean }[];
    followupPrompt: LocalizedText;
  };
};

export type Step =
  | 'language'
  | 'register'
  | 'act1'
  | 'act1Reveal'
  | 'act2'
  | 'trapReveal'
  | 'act3Intro'
  | 'phase1'
  | 'phase2'
  | 'phase3'
  | 'phase4'
  | 'followup'
  | 'close';

export type GameSession = {
  teamAlias: string;
  lang: Lang;
  startedAt: string;
  finishedAt?: string;
  currentStep: Step;
  stepStartedAt: number;
  act1: {
    chosen: string[];
    archetypeId?: string;
    dominantShadow?: string;
  };
  act2: {
    choicesByAxis: Record<string, string>;
    trapsFallen: string[];
    followupFrequency?: string;
    neglectedAxis?: string;
  };
  act3: {
    challengeId?: string;
    phase1?: { factsSelected: string[]; priorityRevealed: boolean };
    phase2?: { settingSelected?: string };
    phase3?: { ordered: string[]; trapsKept: string[] };
    phase4?: {
      pullSelected: string[];
      requestChosen?: string;
      commitmentChosen?: string;
    };
    followup?: string;
    timeouts: string[];
  };
  syncStatus: 'idle' | 'pending' | 'synced' | 'failed';
};
