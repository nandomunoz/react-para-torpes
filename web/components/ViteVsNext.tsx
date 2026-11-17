"use client";

import { useState } from "react";

const DATA = {
  vite: {
    label: "Vite + React",
    command: "pnpm create vite@latest mi-app --template react-ts",
    tree: `mi-app/\n├─ index.html\n├─ vite.config.ts\n└─ src/\n   ├─ main.tsx\n   └─ App.tsx`,
    when: [
      "Aplicaciones que viven detrás de un login (paneles, herramientas internas).",
      "Quieres aprender React sin nada más: cero convenciones del framework.",
      "Arranque y recarga instantáneos mientras desarrollas.",
    ],
  },
  next: {
    label: "Next.js",
    command: "pnpm create next-app@latest mi-app --typescript --app",
    tree: `mi-app/\n├─ next.config.ts\n└─ app/\n   ├─ layout.tsx\n   ├─ page.tsx\n   └─ dia/[slug]/page.tsx`,
    when: [
      "Páginas públicas que deben salir bien en buscadores (SEO) y cargar rápido.",
      "Quieres rutas basadas en carpetas y renderizado en el servidor.",
      "Un solo proyecto para frontend, datos y despliegue.",
    ],
  },
} as const;

export function ViteVsNext() {
  const [tool, setTool] = useState<keyof typeof DATA>("vite");
  const d = DATA[tool];
  return (
    <div>
      <div role="radiogroup" aria-label="Herramienta" className="inline-flex rounded-lg border border-line p-1">
        {(Object.keys(DATA) as (keyof typeof DATA)[]).map((k) => (
          <button
            key={k}
            role="radio"
            aria-checked={tool === k}
            onClick={() => setTool(k)}
            className={`rounded-md px-4 py-2 text-sm font-semibold transition focus-visible:outline-2 focus-visible:outline-lime ${tool === k ? "bg-lime text-ink" : "text-paper/80 hover:text-lime"}`}
          >
            {DATA[k].label}
          </button>
        ))}
      </div>
      <div className="mt-6 grid gap-6 lg:grid-cols-2">
        <div className="space-y-4">
          <pre className="overflow-x-auto rounded-lg border border-line bg-[#0d1117] p-4 font-mono text-sm text-lime">$ {d.command}</pre>
          <pre className="overflow-x-auto rounded-lg border border-line bg-[#0d1117] p-4 font-mono text-sm text-paper/80">{d.tree}</pre>
        </div>
        <div aria-live="polite">
          <p className="font-semibold text-sun">Elígelo cuando…</p>
          <ul className="mt-3 space-y-3">
            {d.when.map((w) => (
              <li key={w} className="flex gap-3 text-paper/85">
                <span aria-hidden className="mt-1 text-lime">✓</span>
                {w}
              </li>
            ))}
          </ul>
        </div>
      </div>
    </div>
  );
}
