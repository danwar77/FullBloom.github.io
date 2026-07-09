import { describe, expect, it } from 'vitest';
import { validateContent } from './contentSchema';
import { resolveAct1, resolveAct2, resolveChallenge } from './gameLogic';

describe('game logic', () => {
  it('validates placeholder content shape', () => {
    expect(() => validateContent()).not.toThrow();
  });

  it('resolves act 1 archetype and dominant shadow', () => {
    const result = resolveAct1(['c1', 'c4', 'c6', 'c8']);
    expect(result.archetype.id).toBeTruthy();
    expect(result.dominantShadow).toBe('impaciencia');
  });

  it('detects act 2 traps and neglected axis', () => {
    const result = resolveAct2({
      estandar: 'estandar-suave',
      conexion: 'conexion-cafe',
      conversaciones: 'conversaciones-quincenal',
      equipo: 'equipo-sombra',
    });

    expect(result.trapsFallen).toContain('estandar');
    expect(result.neglectedAxis).toBe('estandar');
    expect(result.followupFrequency).toBe('quincenal');
  });

  it('falls back to an available challenge', () => {
    expect(resolveChallenge('unknown-shadow', 'unknown-axis').id).toBeTruthy();
  });
});
