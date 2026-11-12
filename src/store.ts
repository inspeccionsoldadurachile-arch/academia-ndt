import { useCallback, useEffect, useState } from 'react';

// Progreso del alumno. Se guarda solo en este celular (localStorage).
export interface Progress {
  name: string;
  done: Record<string, boolean>; // "VT0", "PT2"...
  stats: Record<string, { ok: number; total: number }>; // por quiz: VT, PT, Práctica
  best: Record<string, number>; // mejor % por quiz
  xp: number;
  days: string[]; // fechas (YYYY-MM-DD) con actividad
}

const KEY = 'academia-ndt-v2';
const EMPTY: Progress = { name: '', done: {}, stats: {}, best: {}, xp: 0, days: [] };

const today = () => new Date().toISOString().slice(0, 10);

function load(): Progress {
  try {
    const raw = localStorage.getItem(KEY);
    if (raw) return { ...EMPTY, ...JSON.parse(raw) };
  } catch {}
  return EMPTY;
}

export function streak(days: string[]): number {
  const set = new Set(days);
  const d = new Date();
  if (!set.has(today())) d.setDate(d.getDate() - 1); // la racha sigue viva si hubo actividad ayer
  let n = 0;
  while (set.has(d.toISOString().slice(0, 10))) {
    n++;
    d.setDate(d.getDate() - 1);
  }
  return n;
}

export function useProgress() {
  const [p, setP] = useState<Progress>(load);

  useEffect(() => {
    try {
      localStorage.setItem(KEY, JSON.stringify(p));
    } catch {}
  }, [p]);

  const touch = (s: Progress): Progress =>
    s.days.includes(today()) ? s : { ...s, days: [...s.days, today()].slice(-120) };

  const completeLesson = useCallback((id: string) => {
    setP((s) => (s.done[id] ? s : touch({ ...s, done: { ...s.done, [id]: true }, xp: s.xp + 20 })));
  }, []);

  const recordAnswer = useCallback((quiz: string, ok: boolean) => {
    setP((s) => {
      const st = s.stats[quiz] || { ok: 0, total: 0 };
      return touch({
        ...s,
        stats: { ...s.stats, [quiz]: { ok: st.ok + (ok ? 1 : 0), total: st.total + 1 } },
        xp: s.xp + (ok ? 10 : 2)
      });
    });
  }, []);

  const recordResult = useCallback((quiz: string, pct: number) => {
    setP((s) => ({ ...s, best: { ...s.best, [quiz]: Math.max(s.best[quiz] || 0, pct) } }));
  }, []);

  const addXp = useCallback((n: number) => setP((s) => touch({ ...s, xp: s.xp + n })), []);
  const setName = useCallback((name: string) => setP((s) => ({ ...s, name })), []);
  const reset = useCallback(() => setP(EMPTY), []);

  return { p, completeLesson, recordAnswer, recordResult, addXp, setName, reset };
}

export type ProgressApi = ReturnType<typeof useProgress>;
