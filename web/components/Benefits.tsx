import Link from "next/link";
import { Warning } from "./Callouts";
import { btnPrimary, container, eyebrow } from "@/lib/site";

function Row({
  eyebrowText,
  title,
  text,
  cta,
  href,
  reverse,
  children,
}: {
  eyebrowText: string;
  title: string;
  text: string;
  cta: string;
  href: string;
  reverse?: boolean;
  children: React.ReactNode;
}) {
  return (
    <div className="grid items-center gap-10 py-12 lg:grid-cols-2">
      <div className={reverse ? "lg:order-2" : ""}>
        <p className={eyebrow}>{eyebrowText}</p>
        <h3 className="mt-2 font-display text-3xl">{title}</h3>
        <p className="mt-4 text-lg text-paper/80">{text}</p>
        <Link href={href} className={`${btnPrimary} mt-6`}>
          {cta} →
        </Link>
      </div>
      <div className={reverse ? "lg:order-1" : ""}>{children}</div>
    </div>
  );
}

export function Benefits() {
  return (
    <section className="border-t border-line" aria-labelledby="beneficios">
      <div className={`${container} py-16`}>
        <p className={eyebrow}>Por qué funciona</p>
        <h2 id="beneficios" className="mt-2 font-display text-4xl">Aprende haciendo, no leyendo</h2>
        <div className="divide-y divide-line">
          <Row
            eyebrowText="Beneficio 1"
            title="Un concepto por día"
            text="Treinta días, una idea cada vez. Ves el calendario completo y siempre sabes qué toca hoy."
            cta="Ver el plan"
            href="/plan/"
          >
            <div className="grid grid-cols-6 gap-2" aria-hidden>
              {Array.from({ length: 30 }, (_, i) => (
                <div
                  key={i}
                  className={`flex aspect-square items-center justify-center rounded border font-mono text-xs ${
                    i === 3 ? "border-lime bg-lime text-ink" : "border-line text-muted"
                  }`}
                >
                  {i + 1}
                </div>
              ))}
            </div>
          </Row>
          <Row
            eyebrowText="Beneficio 2"
            title="Código que corre en tu navegador"
            text="Cada lección trae un editor en vivo. Cambias una línea y ves el resultado al instante, sin instalar nada."
            cta="Probar el Día 4"
            href="/dia/dia-04/"
            reverse
          >
            <div className="grid grid-cols-2 overflow-hidden rounded-lg border border-line font-mono text-xs" aria-hidden>
              <pre className="bg-[#0d1117] p-4 text-paper/80">{`function App() {\n  const [n, setN] =\n    useState(0);\n  return (\n    <button\n      onClick={() =>\n        setN(n + 1)}>\n      {n}\n    </button>\n  );\n}`}</pre>
              <div className="flex items-center justify-center bg-panel">
                <span className="rounded bg-lime px-4 py-2 font-sans text-base font-semibold text-ink">7</span>
              </div>
            </div>
          </Row>
          <Row
            eyebrowText="Beneficio 3"
            title="Los errores típicos, explicados"
            text="Cada lección avisa del tropiezo más común antes de que lo des, con la forma correcta de evitarlo."
            cta="Empezar ahora"
            href="/dia/dia-01/"
          >
            <Warning title="Olvidaste la key">
              Si renderizas una lista sin key, React no sabe qué elemento es cuál. Usa un id estable, no el índice.
            </Warning>
          </Row>
        </div>
      </div>
    </section>
  );
}
