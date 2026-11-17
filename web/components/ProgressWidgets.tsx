"use client";

import Link from "next/link";
import { useEffect, useRef, useState } from "react";
import { useProgress } from "@/lib/progress";
import { btnGhost, btnPrimary } from "@/lib/site";

type Item = { slug: string; day: string; title: string };

const SPARKS = Array.from({ length: 10 }, (_, i) => {
  const angle = (i / 10) * Math.PI * 2;
  return { x: Math.round(Math.cos(angle) * 54), y: Math.round(Math.sin(angle) * 40 - 8), c: i % 3 };
});
const SPARK_COLORS = ["bg-lime", "bg-sun", "bg-paper"];

/** Botón "Marcar día como hecho" al final de cada lección (con un pequeño confeti al completar). */
export function MarkDone({ slug }: { slug: string }) {
  const { progress, toggleDone } = useProgress();
  const [burst, setBurst] = useState(0);
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);
  const done = progress.done.includes(slug);

  useEffect(() => () => { if (timer.current) clearTimeout(timer.current); }, []);

  function onClick() {
    if (!done) {
      setBurst((b) => b + 1);
      if (timer.current) clearTimeout(timer.current);
      timer.current = setTimeout(() => setBurst(0), 1000);
    }
    toggleDone(slug);
  }

  return (
    <span className="relative inline-flex">
      <button type="button" onClick={onClick} aria-pressed={done} className={done ? btnGhost : btnPrimary}>
        {done ? "✓ Día completado (deshacer)" : "Marcar día como hecho"}
      </button>
      {burst > 0 && (
        <span key={burst} aria-hidden className="pointer-events-none absolute inset-0 flex items-center justify-center">
          {SPARKS.map((p, i) => (
            <span
              key={i}
              className={`animate-burst absolute h-2 w-2 rounded-sm ${SPARK_COLORS[p.c]}`}
              style={{ "--x": `${p.x}px`, "--y": `${p.y}px` } as React.CSSProperties}
            />
          ))}
        </span>
      )}
    </span>
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
      {started ? `Continúa: Día ${next.day}` : "Empieza el Día 1"}{" "}
      <span aria-hidden className="transition-transform group-hover:translate-x-1">→</span>
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
