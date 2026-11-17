"use client";

import { useProgress } from "@/lib/progress";
import { usePathname } from "next/navigation";

/** Checklist de criterios; el progreso queda en localStorage. */
export function Exercise({ criteria, slug: slugProp }: { criteria: string[]; slug?: string }) {
  const pathname = usePathname();
  const slug = slugProp ?? pathname.split("/").filter(Boolean).pop() ?? "leccion";
  const { progress, toggleCriterion } = useProgress();
  const checked = progress.exercises[slug] ?? [];

  return (
    <section className="my-6 rounded-lg border border-line bg-panel p-5" aria-label="Ejercicio">
      <div className="flex items-center justify-between">
        <h3 className="m-0 text-lg font-semibold text-sun">✏️ Ejercicio</h3>
        <span className="font-mono text-xs text-muted">
          {checked.length}/{criteria.length}
        </span>
      </div>
      <ul className="mt-4 space-y-2">
        {criteria.map((c, i) => (
          <li key={c}>
            <label className="flex cursor-pointer items-start gap-3 text-paper/90">
              <input
                type="checkbox"
                checked={checked.includes(i)}
                onChange={() => toggleCriterion(slug, i)}
                className="mt-1 h-4 w-4 accent-lime"
              />
              <span className={checked.includes(i) ? "text-muted line-through" : ""}>{c}</span>
            </label>
          </li>
        ))}
      </ul>
    </section>
  );
}
