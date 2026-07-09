import { archetypes, axes, challenges, characteristics } from './content';
import type { Axis, Characteristic, GameSession, Lang, Step } from './types';

export const orderedSteps: Step[] = [
  'language',
  'register',
  'act1',
  'act1Reveal',
  'act2',
  'trapReveal',
  'act3Intro',
  'phase1',
  'phase2',
  'phase3',
  'phase4',
  'followup',
  'close',
];

export function createSession(lang: Lang, teamAlias: string): GameSession {
  return {
    lang,
    teamAlias,
    startedAt: new Date().toISOString(),
    currentStep: 'act1',
    stepStartedAt: Date.now(),
    act1: { chosen: [] },
    act2: { choicesByAxis: {}, trapsFallen: [] },
    act3: { timeouts: [] },
    syncStatus: 'idle',
  };
}

export function dominantCategory(selected: Characteristic[]) {
  const totals = selected.reduce<Record<string, number>>((acc, item) => {
    acc[item.category] = (acc[item.category] || 0) + item.weight;
    return acc;
  }, {});

  return Object.entries(totals).sort((a, b) => b[1] - a[1])[0]?.[0] as Characteristic['category'];
}

export function resolveAct1(chosenIds: string[]) {
  const selected = characteristics.filter((item) => chosenIds.includes(item.id));
  const family = dominantCategory(selected);
  const key = [...selected].sort((a, b) => b.weight - a.weight)[0];
  const archetype =
    archetypes.find((item) => item.match.dominantFamily === family && item.match.keyCharacteristic === key?.id) ||
    archetypes.find((item) => item.match.dominantFamily === family && item.match.fallback) ||
    archetypes[0];
  const dominantShadow = key?.shadowId || selected[0]?.shadowId || 'impaciencia';

  return { archetype, dominantShadow };
}

export function optionForAxis(axis: Axis, optionId?: string) {
  return axis.options.find((option) => option.id === optionId);
}

export function resolveAct2(choicesByAxis: Record<string, string>) {
  const selected = axes
    .map((axis) => ({ axis, option: optionForAxis(axis, choicesByAxis[axis.id]) }))
    .filter((item) => item.option);

  const trapsFallen = selected
    .filter((item) => item.option?.isTrap)
    .map((item) => item.axis.id);

  const neglectedAxis =
    selected.sort((a, b) => (a.option?.cost || 0) - (b.option?.cost || 0))[0]?.axis.id || axes[0].id;

  const followupFrequency = choicesByAxis.conversaciones?.includes('semanal')
    ? 'semanal'
    : choicesByAxis.conversaciones?.includes('quincenal')
      ? 'quincenal'
      : 'reactivo';

  return { trapsFallen, neglectedAxis, followupFrequency };
}

export function resolveChallenge(shadow?: string, axis?: string) {
  return (
    challenges.find((challenge) => challenge.targetShadow === shadow && challenge.targetAxis === axis) ||
    challenges.find((challenge) => challenge.targetShadow === shadow) ||
    challenges[0]
  );
}

export function advance(session: GameSession, nextStep: Step): GameSession {
  return {
    ...session,
    currentStep: nextStep,
    stepStartedAt: Date.now(),
  };
}

export function phaseLabel(step: Step) {
  const labels: Partial<Record<Step, string>> = {
    phase1: 'phase1',
    phase2: 'phase2',
    phase3: 'phase3',
    phase4: 'phase4',
  };
  return labels[step];
}
