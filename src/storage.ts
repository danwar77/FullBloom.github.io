import type { GameSession } from './types';

const SESSION_KEY = 'gema-tiempo-session';
const OUTBOX_KEY = 'gema-tiempo-outbox';

export function loadSession(): GameSession | null {
  const raw = localStorage.getItem(SESSION_KEY);
  if (!raw) return null;

  try {
    return JSON.parse(raw) as GameSession;
  } catch {
    localStorage.removeItem(SESSION_KEY);
    return null;
  }
}

export function saveSession(session: GameSession) {
  localStorage.setItem(SESSION_KEY, JSON.stringify(session));
}

export function clearSession() {
  localStorage.removeItem(SESSION_KEY);
}

export function queueSession(session: GameSession) {
  const outbox = loadOutbox();
  const next = [session, ...outbox.filter((item) => item.startedAt !== session.startedAt)].slice(0, 10);
  localStorage.setItem(OUTBOX_KEY, JSON.stringify(next));
}

export function loadOutbox(): GameSession[] {
  const raw = localStorage.getItem(OUTBOX_KEY);
  if (!raw) return [];

  try {
    return JSON.parse(raw) as GameSession[];
  } catch {
    localStorage.removeItem(OUTBOX_KEY);
    return [];
  }
}

export function removeFromOutbox(startedAt: string) {
  const next = loadOutbox().filter((item) => item.startedAt !== startedAt);
  localStorage.setItem(OUTBOX_KEY, JSON.stringify(next));
}

export async function syncSession(session: GameSession) {
  const endpoint = import.meta.env.VITE_SUPABASE_SYNC_URL as string | undefined;
  const token = import.meta.env.VITE_SUPABASE_SYNC_TOKEN as string | undefined;

  if (!endpoint) {
    queueSession({ ...session, syncStatus: 'pending' });
    return { ok: false, reason: 'missing-endpoint' };
  }

  const response = await fetch(endpoint, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      ...(token ? { authorization: `Bearer ${token}` } : {}),
    },
    body: JSON.stringify(session),
  });

  if (!response.ok) {
    queueSession({ ...session, syncStatus: 'failed' });
    return { ok: false, reason: response.statusText };
  }

  removeFromOutbox(session.startedAt);
  return { ok: true };
}
