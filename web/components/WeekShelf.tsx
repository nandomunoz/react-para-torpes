"use client";

import Link from "next/link";
import { useState } from "react";
import { DoneMark } from "./ProgressWidgets";

export type ShelfWeek = {
  n: number;
  title: string;
  tagline: string;
  spine: string;
  lessons: { slug: string; day: string; title: string; minutes: number }[];
};

/** Estante de libros: cada lomo es una semana (inspirado en los manuales "para dummies"). */
export function WeekShelf({ weeks }: { weeks: ShelfWeek[] }) {
  const [selected, setSelected] = useState(1);
  const week = weeks.find((w) => w.n === selected) ?? weeks[0];

  return (
    <div className="grid gap-8 lg:grid-cols-[auto_1fr]">
      <div role="tablist" aria-label="Semanas del curso" className="flex items-end justify-center gap-2 border-b-8 border-line px-2 lg:justify-start">
        {weeks.map((w) => {
          const active = w.n === selected;
          return (
            <button
              key={w.n}
              role="tab"
              id={`tab-semana-${w.n}`}
              aria-selected={active}
              aria-controls="panel-semana"
              onClick={() => setSelected(w.n)}
              className={`${w.spine} flex w-14 flex-col items-center justify-between rounded-t-md border-x-2 border-t-4 border-ink py-3 font-display text-sm shadow-[inset_-4px_0_0_rgba(0,0,0,0.2)] transition-all focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-lime sm:w-16 ${
                active ? "h-64 -translate-y-3" : "h-56 opacity-70 hover:opacity-100"
              }`}
            >
              <span className="text-xs">SEM</span>
              <span className="[writing-mode:vertical-rl] rotate-180 whitespace-nowrap tracking-wide">
                {w.title}
              </span>
              <span className="text-xl">{w.n}</span>
            </button>
          );
        })}
      </div>

      <div key={week.n} id="panel-semana" role="tabpanel" aria-labelledby={`tab-semana-${week.n}`} className="animate-swap min-w-0">
        <p className="font-mono text-xs uppercase tracking-widest text-lime">Semana {week.n}</p>
        <h3 className="mt-1 font-display text-3xl">{week.title}</h3>
        <p className="mt-1 text-muted">{week.tagline}</p>
        <ul className="mt-6 divide-y divide-line rounded-lg border border-line">
          {week.lessons.map((l) => (
            <li key={l.slug}>
              <Link
                href={`/dia/${l.slug}/`}
                className="group flex items-center gap-4 px-4 py-3 transition hover:bg-panel focus-visible:outline-2 focus-visible:outline-lime"
              >
                <DoneMark slug={l.slug} />
                <span className="w-16 shrink-0 font-mono text-sm text-sun transition-transform group-hover:translate-x-1">Día {l.day}</span>
                <span className="min-w-0 flex-1 truncate text-paper">{l.title}</span>
                <span className="shrink-0 font-mono text-xs text-muted">{l.minutes} min</span>
              </Link>
            </li>
          ))}
          {week.lessons.length === 0 && <li className="px-4 py-3 text-muted">Próximamente…</li>}
        </ul>
      </div>
    </div>
  );
}
