import { StrictMode, Suspense, lazy, useMemo, useState, type ComponentType } from "react";
import { createRoot } from "react-dom/client";
import "./base.css";

// Cada ejemplo es un archivo autocontenido con `export default` de un componente.
const modules = import.meta.glob<{ default: ComponentType }>(["./dia-*/*.tsx", "!./dia-*/*.test.tsx"]);

const entries = Object.keys(modules).sort();

function Gallery() {
  const [selected, setSelected] = useState(entries[0] ?? "");
  const Example = useMemo(
    () => (selected ? lazy(modules[selected] as () => Promise<{ default: ComponentType }>) : null),
    [selected],
  );

  return (
    <div style={{ display: "grid", gridTemplateColumns: "260px 1fr", gap: 16 }}>
      <nav aria-label="Ejemplos">
        <h1 style={{ fontSize: 18 }}>Ejemplos</h1>
        <ul style={{ listStyle: "none", padding: 0 }}>
          {entries.map((e) => (
            <li key={e}>
              <button
                className={e === selected ? "" : "secondary"}
                style={{ width: "100%", textAlign: "left", marginBottom: 4 }}
                onClick={() => setSelected(e)}
              >
                {e.replace("./", "")}
              </button>
            </li>
          ))}
        </ul>
      </nav>
      <main className="card">
        <Suspense fallback={<p className="muted">Cargando…</p>}>{Example && <Example />}</Suspense>
      </main>
    </div>
  );
}

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <Gallery />
  </StrictMode>,
);
