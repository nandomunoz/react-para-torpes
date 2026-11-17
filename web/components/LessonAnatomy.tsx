"use client";

import { useState } from "react";
import { Step, Tip, Warning } from "./Callouts";

const PARTS = [
  {
    title: "Objetivo",
    desc: "Una frase y un tiempo estimado. Sabes qué vas a lograr antes de empezar.",
    sample: (
      <div className="rounded-lg border border-line bg-panel p-4">
        <p className="font-mono text-xs text-lime">DÍA 4 · 30 MIN · BÁSICO</p>
        <p className="mt-2 font-display text-xl">useState: tu primer contador</p>
        <p className="mt-1 text-muted">Hacer que un botón recuerde cuántas veces lo pulsaste.</p>
      </div>
    ),
  },
  {
    title: "Concepto",
    desc: "Tres o cuatro párrafos con una analogía cotidiana. Nada de jerga innecesaria.",
    sample: (
      <p className="rounded-lg border border-line bg-panel p-4 text-paper/85">
        El estado es como la pizarra de la cocina: cada vez que alguien la cambia, todos ven el nuevo
        pedido. React solo vuelve a dibujar lo que depende de esa pizarra.
      </p>
    ),
  },
  {
    title: "Paso a paso",
    desc: "Pasos numerados, como en un manual de instrucciones.",
    sample: (
      <div>
        <Step n={1} title="Importa el hook">Importa useState desde react.</Step>
        <Step n={2} title="Declara el estado">Un valor y su función para cambiarlo.</Step>
      </div>
    ),
  },
  {
    title: "Pruébalo en vivo",
    desc: "Un editor con el resultado al lado. Rompe cosas: no pasa nada.",
    sample: (
      <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-line font-mono text-xs">
        <pre className="bg-[#0d1117] p-3 text-paper/80">{`const [n, setN] = useState(0);\n<button onClick={() =>\n  setN(n + 1)}>\n  Clic {n}\n</button>`}</pre>
        <div className="flex items-center justify-center bg-panel p-3">
          <span className="rounded bg-lime px-3 py-1 font-sans font-semibold text-ink">Clic 3</span>
        </div>
      </div>
    ),
  },
  {
    title: "Error típico",
    desc: "El tropiezo que todos damos, explicado antes de que te pase.",
    sample: (
      <Warning title="Nunca mutes el estado directamente">
        Hacer contador++ no avisa a React. Usa siempre la función setContador.
      </Warning>
    ),
  },
  {
    title: "Ejercicio y solución",
    desc: "Una lista de criterios que marcas tú. La solución está oculta hasta que la pidas.",
    sample: (
      <Tip title="Ejercicio">
        Añade un botón de reiniciar y evita que el contador baje de 0.
      </Tip>
    ),
  },
];

export function LessonAnatomy() {
  const [i, setI] = useState(0);
  const part = PARTS[i];
  return (
    <div className="grid gap-8 lg:grid-cols-2">
      <ol className="space-y-2" aria-label="Partes de una lección">
        {PARTS.map((p, idx) => (
          <li key={p.title}>
            <button
              type="button"
              onClick={() => setI(idx)}
              aria-current={idx === i ? "step" : undefined}
              className={`flex w-full items-start gap-4 rounded-lg border p-3 text-left transition focus-visible:outline-2 focus-visible:outline-lime ${
                idx === i ? "border-lime bg-lime/10" : "border-line hover:border-muted"
              }`}
            >
              <span className={`flex h-7 w-7 shrink-0 items-center justify-center rounded-sm font-mono text-sm font-bold ${idx === i ? "bg-lime text-ink" : "bg-line text-paper"}`}>
                {idx + 1}
              </span>
              <span>
                <span className="block font-semibold">{p.title}</span>
                {idx === i && <span className="mt-1 block text-sm text-muted">{p.desc}</span>}
              </span>
            </button>
          </li>
        ))}
      </ol>
      <div className="flex flex-col justify-between rounded-lg border border-line bg-ink p-5">
        <div key={i} aria-live="polite" className="animate-swap">
          <p className="mb-4 font-mono text-xs uppercase tracking-widest text-muted">Así se ve</p>
          {part.sample}
        </div>
        <div className="mt-6 flex justify-between">
          <button type="button" disabled={i === 0} onClick={() => setI(i - 1)} className="rounded border border-line px-4 py-2 text-sm disabled:opacity-30">
            ← Anterior
          </button>
          <button type="button" disabled={i === PARTS.length - 1} onClick={() => setI(i + 1)} className="rounded bg-lime px-4 py-2 text-sm font-semibold text-ink disabled:opacity-30">
            Siguiente →
          </button>
        </div>
      </div>
    </div>
  );
}
