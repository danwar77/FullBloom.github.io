import { useEffect, useMemo, useState } from 'react';
import type { ReactNode } from 'react';
import {
  Check,
  ChevronRight,
  CircleHelp,
  Clock3,
  Download,
  Gem,
  RefreshCw,
  Sparkles,
  WifiOff,
} from 'lucide-react';
import { axes, characteristics, t, timings, ui } from './content';
import {
  advance,
  createSession,
  phaseLabel,
  resolveAct1,
  resolveAct2,
  resolveChallenge,
} from './gameLogic';
import { clearSession, loadOutbox, loadSession, saveSession, syncSession } from './storage';
import type { Challenge, GameSession, Lang, Step } from './types';

const act2Budget = 8;
const phaseSteps: Step[] = ['phase1', 'phase2', 'phase3', 'phase4'];

function useOnlineStatus() {
  const [online, setOnline] = useState(() => navigator.onLine);

  useEffect(() => {
    const update = () => setOnline(navigator.onLine);
    window.addEventListener('online', update);
    window.addEventListener('offline', update);
    return () => {
      window.removeEventListener('online', update);
      window.removeEventListener('offline', update);
    };
  }, []);

  return online;
}

function useTimer(session: GameSession | null) {
  const [now, setNow] = useState(Date.now());

  useEffect(() => {
    const id = window.setInterval(() => setNow(Date.now()), 500);
    return () => window.clearInterval(id);
  }, []);

  if (!session) {
    return { elapsed: 0, remaining: 0, ready: true, showHint: false };
  }

  const duration =
    session.currentStep === 'trapReveal'
      ? timings.revealSeconds
      : phaseSteps.includes(session.currentStep)
        ? timings.phaseSeconds
        : session.currentStep === 'act1' || session.currentStep === 'act2' || session.currentStep === 'act3Intro'
          ? timings.actSeconds
          : 0;
  const elapsed = Math.max(0, Math.floor((now - session.stepStartedAt) / 1000));
  const remaining = duration > 0 ? Math.max(0, duration - elapsed) : 0;

  return {
    elapsed,
    remaining,
    ready: elapsed >= timings.deliberationSeconds,
    showHint: phaseSteps.includes(session.currentStep) && elapsed >= timings.hintAfterSeconds,
  };
}

function formatTime(seconds: number) {
  const minutes = Math.floor(seconds / 60);
  const rest = seconds % 60;
  return `${minutes}:${rest.toString().padStart(2, '0')}`;
}

function StepShell({
  session,
  remaining,
  online,
  children,
}: {
  session: GameSession;
  remaining: number;
  online: boolean;
  children: ReactNode;
}) {
  const stepIndex = ['act1', 'act2', 'trapReveal', 'act3Intro', 'phase1', 'phase2', 'phase3', 'phase4', 'followup', 'close'].indexOf(
    session.currentStep,
  );

  return (
    <main className="app-shell">
      <header className="topbar">
        <div>
          <p className="eyebrow">Pandora LATAM</p>
          <h1>La Gema del Tiempo</h1>
        </div>
        {remaining > 0 && (
          <div className="timer" aria-label={`Tiempo restante ${formatTime(remaining)}`}>
            <Clock3 size={18} />
            <span>{formatTime(remaining)}</span>
          </div>
        )}
      </header>

      <div className="progress-track" aria-hidden="true">
        <span style={{ width: `${Math.max(8, ((stepIndex + 1) / 10) * 100)}%` }} />
      </div>

      {!online && (
        <div className="offline-banner" role="status">
          <WifiOff size={18} />
          {t(ui.offline, session.lang)}
        </div>
      )}

      {children}
    </main>
  );
}

function ActionButton({
  children,
  disabled,
  onClick,
  variant = 'primary',
}: {
  children: ReactNode;
  disabled?: boolean;
  onClick: () => void;
  variant?: 'primary' | 'secondary' | 'ghost';
}) {
  return (
    <button className={`action ${variant}`} disabled={disabled} onClick={onClick}>
      <span>{children}</span>
      {variant === 'primary' && <ChevronRight size={20} />}
    </button>
  );
}

function LanguageScreen({ onSelect }: { onSelect: (lang: Lang) => void }) {
  return (
    <main className="hero-screen">
      <section className="hero-orbit" aria-hidden="true">
        <Gem size={104} />
      </section>
      <p className="eyebrow">Store Manager Conference 2026</p>
      <h1>La Gema del Tiempo</h1>
      <p className="lead">Una experiencia de liderazgo bajo tiempo, diseñada para conversar antes de decidir.</p>
      <div className="language-grid">
        <button onClick={() => onSelect('es')}>Español LATAM</button>
        <button onClick={() => onSelect('pt')}>Português BR</button>
      </div>
    </main>
  );
}

function RegisterScreen({ lang, onStart }: { lang: Lang; onStart: (alias: string) => void }) {
  const [alias, setAlias] = useState('');

  return (
    <main className="hero-screen compact">
      <p className="eyebrow">{lang === 'es' ? 'Registro del equipo' : 'Registro da equipe'}</p>
      <h1>{lang === 'es' ? 'Nombrad vuestra mesa' : 'Nomeiem a mesa'}</h1>
      <p className="lead">{t(ui.noScore, lang)}</p>
      <label className="field">
        <span>{lang === 'es' ? 'Alias del equipo' : 'Apelido da equipe'}</span>
        <input
          value={alias}
          onChange={(event) => setAlias(event.target.value)}
          maxLength={32}
          placeholder={lang === 'es' ? 'Ej. Los Cronos' : 'Ex. Os Cronos'}
        />
      </label>
      <ActionButton disabled={alias.trim().length < 2} onClick={() => onStart(alias.trim())}>
        {lang === 'es' ? 'Entrar al juego' : 'Entrar no jogo'}
      </ActionButton>
    </main>
  );
}

function Act1({
  session,
  ready,
  onUpdate,
}: {
  session: GameSession;
  ready: boolean;
  onUpdate: (session: GameSession) => void;
}) {
  const chosen = session.act1.chosen;
  const delta = 4 - chosen.length;
  const canConfirm = chosen.length === 4 && ready;

  function toggle(id: string) {
    const next = chosen.includes(id)
      ? chosen.filter((item) => item !== id)
      : chosen.length < 4
        ? [...chosen, id]
        : chosen;
    onUpdate({ ...session, act1: { ...session.act1, chosen: next } });
  }

  function confirm() {
    const result = resolveAct1(chosen);
    onUpdate(
      advance(
        {
          ...session,
          act1: {
            chosen,
            archetypeId: result.archetype.id,
            dominantShadow: result.dominantShadow,
          },
          syncStatus: 'pending',
        },
        'act1Reveal',
      ),
    );
  }

  return (
    <section className="screen">
      <p className="eyebrow">Acto 1 · La selección</p>
      <h2>Elegid 4 facetas</h2>
      <p className="muted">
        {delta > 0 ? `Faltan ${delta}.` : delta < 0 ? `Sobran ${Math.abs(delta)}.` : 'Selección completa.'}{' '}
        {!ready && 'Deliberad unos segundos antes de confirmar.'}
      </p>
      <div className="facet-grid">
        {characteristics.map((item) => {
          const selected = chosen.includes(item.id);
          return (
            <button key={item.id} className={`facet ${selected ? 'selected' : ''}`} onClick={() => toggle(item.id)}>
              <span className="facet-name">{t(item.name, session.lang)}</span>
              <span>{t(item.faceA, session.lang)}</span>
            </button>
          );
        })}
      </div>
      <div className="sticky-action">
        <ActionButton disabled={!canConfirm} onClick={confirm}>
          Confirmar selección
        </ActionButton>
      </div>
    </section>
  );
}

function Act1Reveal({ session, onUpdate }: { session: GameSession; onUpdate: (session: GameSession) => void }) {
  const result = resolveAct1(session.act1.chosen);
  const selected = characteristics.filter((item) => session.act1.chosen.includes(item.id));

  return (
    <section className="screen">
      <p className="eyebrow">Revelación</p>
      <h2>{t(result.archetype.name, session.lang)}</h2>
      <p className="birthday">{result.archetype.birthday}</p>
      <p className="lead-card">{t(result.archetype.blurb, session.lang)}</p>
      <div className="two-column">
        <div>
          <h3>Caras A</h3>
          {selected.map((item) => (
            <p key={item.id}>{t(item.faceA, session.lang)}</p>
          ))}
        </div>
        <div>
          <h3>Caras B</h3>
          {selected.map((item) => (
            <p key={item.id}>{t(item.faceB, session.lang)}</p>
          ))}
        </div>
      </div>
      <ActionButton onClick={() => onUpdate(advance(session, 'act2'))}>Ir al onboarding</ActionButton>
    </section>
  );
}

function Act2({ session, onUpdate }: { session: GameSession; onUpdate: (session: GameSession) => void }) {
  const choices = session.act2.choicesByAxis;
  const spent = axes.reduce((total, axis) => total + (axis.options.find((option) => option.id === choices[axis.id])?.cost || 0), 0);
  const complete = axes.every((axis) => choices[axis.id]) && spent <= act2Budget;

  function choose(axisId: string, optionId: string) {
    onUpdate({
      ...session,
      act2: {
        ...session.act2,
        choicesByAxis: { ...choices, [axisId]: optionId },
      },
    });
  }

  function confirm() {
    const result = resolveAct2(choices);
    onUpdate(
      advance(
        {
          ...session,
          act2: { ...session.act2, ...result },
          syncStatus: 'pending',
        },
        'trapReveal',
      ),
    );
  }

  return (
    <section className="screen">
      <p className="eyebrow">Acto 2 · El onboarding</p>
      <div className="budget-ring">
        <span>{act2Budget - spent}</span>
        <small>fichas</small>
      </div>
      <h2>Invertid recursos donde más importa</h2>
      <p className="muted">Elegid una opción por eje. Algunas decisiones cálidas esconden una trampa.</p>
      <div className="axis-list">
        {axes.map((axis) => (
          <article className="axis" key={axis.id}>
            <h3>{t(axis.label, session.lang)}</h3>
            {axis.options.map((option) => (
              <button
                className={`option ${choices[axis.id] === option.id ? 'selected' : ''}`}
                key={option.id}
                onClick={() => choose(axis.id, option.id)}
              >
                <span>{t(option.text, session.lang)}</span>
                <b>{option.cost}</b>
              </button>
            ))}
          </article>
        ))}
      </div>
      {spent > act2Budget && <p className="error">El presupuesto se ha excedido. Recalibrad una decisión.</p>}
      <div className="sticky-action">
        <ActionButton disabled={!complete} onClick={confirm}>
          Cerrar onboarding
        </ActionButton>
      </div>
    </section>
  );
}

function TrapReveal({ session, onUpdate }: { session: GameSession; onUpdate: (session: GameSession) => void }) {
  const traps = axes
    .filter((axis) => session.act2.trapsFallen.includes(axis.id))
    .map((axis) => {
      const selected = axis.options.find((option) => option.id === session.act2.choicesByAxis[axis.id]);
      return { axis, selected };
    });

  return (
    <section className="screen">
      <p className="eyebrow">Revelación de trampas</p>
      <h2>Lo invisible también lidera</h2>
      {traps.length === 0 ? (
        <p className="lead-card">No caísteis en trampas ocultas. Ahora el reto se apoyará en vuestra sombra dominante y el eje más descuidado.</p>
      ) : (
        <div className="reveal-list">
          {traps.map(({ axis, selected }) => (
            <article className="reveal-card" key={axis.id}>
              <h3>{t(axis.label, session.lang)}</h3>
              <p>{selected?.trapExplain ? t(selected.trapExplain, session.lang) : 'Esta elección crea una tensión no evidente.'}</p>
            </article>
          ))}
        </div>
      )}
      <ActionButton onClick={() => onUpdate(advance(session, 'act3Intro'))}>Abrir Acto 3</ActionButton>
    </section>
  );
}

function challengeFor(session: GameSession): Challenge {
  return resolveChallenge(session.act1.dominantShadow, session.act2.neglectedAxis);
}

function Act3Intro({ session, onUpdate }: { session: GameSession; onUpdate: (session: GameSession) => void }) {
  const challenge = challengeFor(session);

  return (
    <section className="screen dark-panel">
      <p className="eyebrow">Acto 3 · El método</p>
      <h2>{t(challenge.title, session.lang)}</h2>
      <p className="lead-card">{t(challenge.scene, session.lang)}</p>
      <blockquote>{t(challenge.excuse, session.lang)}</blockquote>
      <ActionButton
        onClick={() =>
          onUpdate(
            advance(
              {
                ...session,
                act3: { ...session.act3, challengeId: challenge.id },
              },
              'phase1',
            ),
          )
        }
      >
        Empezar fases
      </ActionButton>
    </section>
  );
}

function PhaseHint({ visible }: { visible: boolean }) {
  if (!visible) return null;
  return (
    <div className="hint">
      <CircleHelp size={18} />
      Ordenad el método antes de decidir la respuesta de liderazgo. La app registra, no puntúa.
    </div>
  );
}

function Phase1({
  session,
  ready,
  showHint,
  onUpdate,
}: {
  session: GameSession;
  ready: boolean;
  showHint: boolean;
  onUpdate: (session: GameSession) => void;
}) {
  const challenge = challengeFor(session);
  const selected = session.act3.phase1?.factsSelected || [];

  function toggle(id: string) {
    const next = selected.includes(id) ? selected.filter((item) => item !== id) : [...selected, id];
    onUpdate({ ...session, act3: { ...session.act3, phase1: { factsSelected: next, priorityRevealed: false } } });
  }

  return (
    <section className="screen">
      <p className="eyebrow">Fase 1 · Tablero de hechos</p>
      <h2>Separad hechos de interpretación</h2>
      <PhaseHint visible={showHint} />
      <div className="choice-list">
        {challenge.phases.facts.map((fact) => (
          <button key={fact.id} className={`choice ${selected.includes(fact.id) ? 'selected' : ''}`} onClick={() => toggle(fact.id)}>
            {t(fact.text, session.lang)}
          </button>
        ))}
      </div>
      <p className="lead-card">{t(challenge.phases.priority, session.lang)}</p>
      <div className="sticky-action">
        <ActionButton disabled={!ready || selected.length === 0} onClick={() => onUpdate(advance(session, 'phase2'))}>
          Registrar y seguir
        </ActionButton>
      </div>
    </section>
  );
}

function Phase2({ session, ready, showHint, onUpdate }: { session: GameSession; ready: boolean; showHint: boolean; onUpdate: (session: GameSession) => void }) {
  const challenge = challengeFor(session);
  const selected = session.act3.phase2?.settingSelected;

  return (
    <section className="screen">
      <p className="eyebrow">Fase 2 · El momento correcto</p>
      <h2>Elegid contexto</h2>
      <PhaseHint visible={showHint} />
      <div className="choice-list">
        {challenge.phases.settings.map((setting) => (
          <button
            key={setting.id}
            className={`choice ${selected === setting.id ? 'selected' : ''}`}
            onClick={() =>
              onUpdate({ ...session, act3: { ...session.act3, phase2: { settingSelected: setting.id } } })
            }
          >
            {t(setting.text, session.lang)}
          </button>
        ))}
      </div>
      <div className="sticky-action">
        <ActionButton disabled={!ready || !selected} onClick={() => onUpdate(advance(session, 'phase3'))}>
          Continuar
        </ActionButton>
      </div>
    </section>
  );
}

function Phase3({ session, ready, showHint, onUpdate }: { session: GameSession; ready: boolean; showHint: boolean; onUpdate: (session: GameSession) => void }) {
  const challenge = challengeFor(session);
  const ordered = session.act3.phase3?.ordered || [];

  function add(id: string) {
    if (ordered.includes(id)) return;
    onUpdate({
      ...session,
      act3: { ...session.act3, phase3: { ordered: [...ordered, id], trapsKept: [] } },
    });
  }

  function reset() {
    onUpdate({ ...session, act3: { ...session.act3, phase3: { ordered: [], trapsKept: [] } } });
  }

  return (
    <section className="screen">
      <p className="eyebrow">Fase 3 · EIC</p>
      <h2>Construid el mensaje</h2>
      <PhaseHint visible={showHint} />
      <div className="method-strip">
        {['E', 'I', 'C'].map((slot, index) => (
          <span key={slot}>{ordered[index] ? challenge.phases.fragments.find((item) => item.id === ordered[index])?.role : slot}</span>
        ))}
      </div>
      <div className="choice-list">
        {challenge.phases.fragments.map((fragment) => (
          <button key={fragment.id} className={`choice ${ordered.includes(fragment.id) ? 'selected' : ''}`} onClick={() => add(fragment.id)}>
            {t(fragment.text, session.lang)}
          </button>
        ))}
      </div>
      <ActionButton variant="secondary" onClick={reset}>Reordenar</ActionButton>
      <div className="sticky-action">
        <ActionButton disabled={!ready || ordered.length < 3} onClick={() => onUpdate(advance(session, 'phase4'))}>
          Registrar método
        </ActionButton>
      </div>
    </section>
  );
}

function Phase4({ session, ready, showHint, onUpdate }: { session: GameSession; ready: boolean; showHint: boolean; onUpdate: (session: GameSession) => void }) {
  const challenge = challengeFor(session);
  const phase = session.act3.phase4 || { pullSelected: [] };

  function setPhase(next: GameSession['act3']['phase4']) {
    onUpdate({ ...session, act3: { ...session.act3, phase4: next } });
  }

  return (
    <section className="screen">
      <p className="eyebrow">Fase 4 · Push / Pull</p>
      <h2>Escuchad debajo de la queja</h2>
      <PhaseHint visible={showHint} />
      <h3>Preguntas pull</h3>
      <div className="choice-list">
        {challenge.phases.responses.map((response) => (
          <button
            key={response.id}
            className={`choice ${phase.pullSelected.includes(response.id) ? 'selected' : ''}`}
            onClick={() => {
              const pullSelected = phase.pullSelected.includes(response.id)
                ? phase.pullSelected.filter((item) => item !== response.id)
                : [...phase.pullSelected, response.id];
              setPhase({ ...phase, pullSelected });
            }}
          >
            {t(response.text, session.lang)}
          </button>
        ))}
      </div>
      <h3>Petición debajo de la queja</h3>
      <div className="pill-row">
        {challenge.phases.requests.map((request) => (
          <button
            key={request.id}
            className={phase.requestChosen === request.id ? 'selected' : ''}
            onClick={() => setPhase({ ...phase, requestChosen: request.id })}
          >
            {t(request.text, session.lang)}
          </button>
        ))}
      </div>
      <h3>Compromiso</h3>
      <div className="choice-list">
        {challenge.phases.commitments.map((commitment) => (
          <button
            key={commitment.id}
            className={`choice ${phase.commitmentChosen === commitment.id ? 'selected' : ''}`}
            onClick={() => setPhase({ ...phase, commitmentChosen: commitment.id })}
          >
            {t(commitment.text, session.lang)}
          </button>
        ))}
      </div>
      <div className="sticky-action">
        <ActionButton
          disabled={!ready || !phase.requestChosen || !phase.commitmentChosen}
          onClick={() => onUpdate(advance(session, 'followup'))}
        >
          Pasar al seguimiento
        </ActionButton>
      </div>
    </section>
  );
}

function Followup({ session, onUpdate }: { session: GameSession; onUpdate: (session: GameSession) => void }) {
  const challenge = challengeFor(session);
  const value = session.act3.followup || '';

  return (
    <section className="screen">
      <p className="eyebrow">Cierre · Seguimiento</p>
      <h2>{t(challenge.phases.followupPrompt, session.lang)}</h2>
      <label className="field">
        <span>Compromiso del equipo</span>
        <textarea
          value={value}
          onChange={(event) => onUpdate({ ...session, act3: { ...session.act3, followup: event.target.value } })}
          placeholder="Ej. Observaremos dos turnos y haremos seguimiento el viernes..."
        />
      </label>
      <ActionButton
        disabled={value.trim().length < 8}
        onClick={() =>
          onUpdate(
            advance(
              {
                ...session,
                finishedAt: new Date().toISOString(),
                syncStatus: 'pending',
              },
              'close',
            ),
          )
        }
      >
        Ver resumen
      </ActionButton>
    </section>
  );
}

function Close({ session, onUpdate, onReset }: { session: GameSession; onUpdate: (session: GameSession) => void; onReset: () => void }) {
  const challenge = challengeFor(session);
  const archetype = resolveAct1(session.act1.chosen).archetype;
  const exportPayload = () => {
    const blob = new Blob([JSON.stringify(session, null, 2)], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.download = `gema-del-tiempo-${session.teamAlias.replace(/\s+/g, '-').toLowerCase()}.json`;
    link.click();
    URL.revokeObjectURL(url);
  };

  return (
    <section className="screen summary">
      <p className="eyebrow">Lo construisteis vosotros</p>
      <h2>{session.teamAlias}</h2>
      <div className="summary-card">
        <Sparkles size={22} />
        <p><b>Asociada:</b> {t(archetype.name, session.lang)}</p>
        <p><b>Sombra dominante:</b> {session.act1.dominantShadow}</p>
        <p><b>Eje descuidado:</b> {session.act2.neglectedAxis}</p>
        <p><b>Reto:</b> {t(challenge.title, session.lang)}</p>
        <p><b>Seguimiento:</b> {session.act3.followup}</p>
      </div>
      <div className="sync-panel">
        <p>Estado de captura: <b>{session.syncStatus}</b></p>
        <ActionButton
          variant="secondary"
          onClick={async () => {
            const result = await syncSession(session);
            onUpdate({ ...session, syncStatus: result.ok ? 'synced' : 'pending' });
          }}
        >
          <RefreshCw size={18} /> Sincronizar
        </ActionButton>
        <ActionButton variant="ghost" onClick={exportPayload}>
          <Download size={18} /> Exportar respaldo
        </ActionButton>
      </div>
      <ActionButton variant="ghost" onClick={onReset}>Nueva partida</ActionButton>
    </section>
  );
}

export default function App() {
  const [lang, setLang] = useState<Lang | null>(null);
  const [session, setSession] = useState<GameSession | null>(() => loadSession());
  const [outboxCount, setOutboxCount] = useState(() => loadOutbox().length);
  const online = useOnlineStatus();
  const timer = useTimer(session);

  const currentStep = session?.currentStep || (lang ? 'register' : 'language');

  useEffect(() => {
    if (session) {
      saveSession(session);
      setOutboxCount(loadOutbox().length);
    }
  }, [session]);

  useEffect(() => {
    const phase = session ? phaseLabel(session.currentStep) : undefined;
    if (!session || !phase || timer.remaining !== 0 || session.act3.timeouts.includes(phase)) return;

    const nextStep = session.currentStep === 'phase1' ? 'phase2' : session.currentStep === 'phase2' ? 'phase3' : session.currentStep === 'phase3' ? 'phase4' : 'followup';
    setSession(
      advance(
        {
          ...session,
          act3: { ...session.act3, timeouts: [...session.act3.timeouts, phase] },
          syncStatus: 'pending',
        },
        nextStep,
      ),
    );
  }, [session, timer.remaining]);

  const content = useMemo(() => {
    if (currentStep === 'language') {
      return <LanguageScreen onSelect={setLang} />;
    }
    if (currentStep === 'register' && lang) {
      return <RegisterScreen lang={lang} onStart={(alias) => setSession(createSession(lang, alias))} />;
    }
    if (!session) return null;

    const wrapped = (children: ReactNode) => (
      <StepShell session={session} remaining={timer.remaining} online={online}>
        {outboxCount > 0 && <p className="outbox"><Check size={16} /> {outboxCount} respaldo pendiente de sincronizar.</p>}
        {children}
      </StepShell>
    );

    switch (session.currentStep) {
      case 'act1':
        return wrapped(<Act1 session={session} ready={timer.ready} onUpdate={setSession} />);
      case 'act1Reveal':
        return wrapped(<Act1Reveal session={session} onUpdate={setSession} />);
      case 'act2':
        return wrapped(<Act2 session={session} onUpdate={setSession} />);
      case 'trapReveal':
        return wrapped(<TrapReveal session={session} onUpdate={setSession} />);
      case 'act3Intro':
        return wrapped(<Act3Intro session={session} onUpdate={setSession} />);
      case 'phase1':
        return wrapped(<Phase1 session={session} ready={timer.ready} showHint={timer.showHint} onUpdate={setSession} />);
      case 'phase2':
        return wrapped(<Phase2 session={session} ready={timer.ready} showHint={timer.showHint} onUpdate={setSession} />);
      case 'phase3':
        return wrapped(<Phase3 session={session} ready={timer.ready} showHint={timer.showHint} onUpdate={setSession} />);
      case 'phase4':
        return wrapped(<Phase4 session={session} ready={timer.ready} showHint={timer.showHint} onUpdate={setSession} />);
      case 'followup':
        return wrapped(<Followup session={session} onUpdate={setSession} />);
      case 'close':
        return wrapped(
          <Close
            session={session}
            onUpdate={setSession}
            onReset={() => {
              clearSession();
              setSession(null);
              setLang(null);
            }}
          />,
        );
      default:
        return null;
    }
  }, [currentStep, lang, online, outboxCount, session, timer.ready, timer.remaining, timer.showHint]);

  return content;
}
