const QUESTIONS = [
  {
    q: "¿Necesito saber JavaScript antes de empezar?",
    a: "Con lo básico basta: variables, funciones, arrays y condicionales. Cada vez que aparece algo nuevo (map, desestructuración, async), lo explicamos en la lección.",
  },
  {
    q: "¿Por qué TypeScript desde el primer día?",
    a: "Porque los errores se ven en el editor, no en producción, y porque hoy es lo habitual en proyectos reales. Empezamos con tipos sencillos y subimos poco a poco.",
  },
  {
    q: "¿Y los componentes de clase?",
    a: "No los enseñamos. React moderno usa funciones y hooks. Los mencionamos solo para que los reconozcas en código antiguo.",
  },
  {
    q: "¿Por qué Vite y no Create React App?",
    a: "Create React App está descontinuado. Vite es rápido, simple y es el punto de partida recomendado para aprender. En la semana 5 damos el salto a Next.js.",
  },
  {
    q: "¿Cuánto tiempo necesito al día?",
    a: "Entre 30 y 60 minutos. Cada lección indica su duración estimada. Si un día no puedes, retómalo: tu progreso se guarda en tu navegador.",
  },
  {
    q: "¿Es gratis?",
    a: "Sí, completamente. Es código abierto bajo licencia MIT: puedes usarlo, copiarlo y mejorarlo en GitHub.",
  },
];

export function Faq() {
  return (
    <div className="divide-y divide-line rounded-lg border border-line">
      {QUESTIONS.map(({ q, a }) => (
        <details key={q} className="group">
          <summary className="flex cursor-pointer list-none items-center justify-between gap-4 px-5 py-4 font-semibold marker:hidden hover:text-lime focus-visible:outline-2 focus-visible:outline-lime">
            {q}
            <span aria-hidden className="font-mono text-xl text-lime transition group-open:rotate-45">+</span>
          </summary>
          <p className="px-5 pb-5 text-paper/80">{a}</p>
        </details>
      ))}
    </div>
  );
}
