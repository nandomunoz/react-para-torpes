"use client";

import Link from "next/link";
import { useProgress } from "@/lib/progress";
import { btnGhost, btnPrimary } from "@/lib/site";

type Item = { slug: string; day: string; title: string };

/** Botón "Marcar día como hecho" al final de cada lección. */
export function MarkDone({ slug }: { slug: string }) {
  const { progress, toggleDone } = useProgress();
  const done = progress.done.includes(slug);
  return (
    <button
      type="button"
      onClick={() => toggleDone(slug)}
      aria-pressed={done}
      className={done ? btnGhost : btnPrimary}
    >
      {done ? "✓ Día completado (deshacer)" : "Marcar día como hecho"}
    </button>
  );
}

/** CTA que continúa donde lo dejaste. */
export function ContinueButton({ lessons, className = btnPrimary }: { lessons: Item[]; className?: string }) {
  const { progress } = useProgress();
  const next = lessons.find((l) => !progress.done.includes(l.slug));
  const started = progress.done.length > 0;

  if (!next) {
    return (
      <Link href="/plan/" className={className}>
        🎉 ¡Curso completado! Repasa el plan
      </Link>
    );
  }
  return (
    <Link href={`/dia/${next.slug}/`} className={className}>
      {started ? `Continúa: Día ${next.day}` : "Empieza el Día 1"} →
    </Link>
  );
}

export function ProgressBar({ slugs }: { slugs: string[] }) {
  const { progress, reset } = useProgress();
  const done = slugs.filter((s) => progress.done.includes(s)).length;
  const pct = slugs.length ? Math.round((done / slugs.length) * 100) : 0;
  return (
    <div className="rounded-lg border border-line bg-panel p-4">
      <div className="flex items-center justify-between text-sm">
        <span className="font-semibold text-paper">Tu progreso</span>
        <span className="font-mono text-lime">
          {done}/{slugs.length} lecciones · {pct}%
        </span>
      </div>
      <div
        className="mt-3 h-2 overflow-hidden rounded-full bg-line"
        role="progressbar"
        aria-valuenow={pct}
        aria-valuemin={0}
        aria-valuemax={100}
        aria-label="Progreso del curso"
      >
        <div className="h-full bg-lime transition-all" style={{ width: `${pct}%` }} />
      </div>
      {done > 0 && (
        <button type="button" onClick={reset} className="mt-3 text-xs text-muted underline hover:text-danger">
          Reiniciar progreso
        </button>
      )}
    </div>
  );
}

/** Marca ✓ junto a una lección ya completada. */
export function DoneMark({ slug }: { slug: string }) {
  const { progress } = useProgress();
  return progress.done.includes(slug) ? (
    <span aria-label="completada" className="text-lime">✓</span>
  ) : (
    <span aria-hidden className="text-line">○</span>
  );
}
