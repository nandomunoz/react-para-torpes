"use client";

import { useCallback, useSyncExternalStore } from "react";

export type Progress = {
  done: string[];
  /** criterios de ejercicio marcados por lección */
  exercises: Record<string, number[]>;
};

const KEY = "rpt:progress";
const EMPTY: Progress = { done: [], exercises: {} };
const listeners = new Set<() => void>();
let cachedRaw: string | null = null;
let cachedValue: Progress = EMPTY;

function read(): Progress {
  try {
    const raw = window.localStorage.getItem(KEY);
    if (raw === cachedRaw) return cachedValue;
    cachedRaw = raw;
    cachedValue = raw ? { ...EMPTY, ...(JSON.parse(raw) as Partial<Progress>) } : EMPTY;
    return cachedValue;
  } catch {
    return EMPTY;
  }
}

function write(next: Progress) {
  try {
    window.localStorage.setItem(KEY, JSON.stringify(next));
  } catch {
    /* modo privado o almacenamiento bloqueado: seguimos sin persistir */
  }
  listeners.forEach((l) => l());
}

function subscribe(cb: () => void) {
  listeners.add(cb);
  window.addEventListener("storage", cb);
  return () => {
    listeners.delete(cb);
    window.removeEventListener("storage", cb);
  };
}

export function useProgress() {
  const progress = useSyncExternalStore(subscribe, read, () => EMPTY);

  const toggleDone = useCallback((slug: string) => {
    const p = read();
    const done = p.done.includes(slug) ? p.done.filter((s) => s !== slug) : [...p.done, slug];
    write({ ...p, done });
  }, []);

  const toggleCriterion = useCallback((slug: string, i: number) => {
    const p = read();
    const cur = p.exercises[slug] ?? [];
    const next = cur.includes(i) ? cur.filter((x) => x !== i) : [...cur, i];
    write({ ...p, exercises: { ...p.exercises, [slug]: next } });
  }, []);

  const reset = useCallback(() => write(EMPTY), []);

  return { progress, toggleDone, toggleCriterion, reset };
}
