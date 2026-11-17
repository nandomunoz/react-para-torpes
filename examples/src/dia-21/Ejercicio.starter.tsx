import { useMemo, useState } from "react";

const CURSOS: readonly string[] = [
  "Introducción a TypeScript", "Componentes y props", "Estado con useState", "Efectos con useEffect",
  "Hooks personalizados", "Contexto global", "useReducer en la práctica", "Refs y DOM",
  "Memoización", "Formularios controlados", "Rutas con React Router", "Pruebas con Vitest",
  "Redux Toolkit", "Next.js desde cero",
];

const POR_PAGINA = 5;

export default function App() {
  const [consulta, setConsulta] = useState("");
  // TODO 1: añade el estado `pagina` (number) iniciado en 1.

  const filtrados = useMemo(
    () => CURSOS.filter((c) => c.toLowerCase().includes(consulta.trim().toLowerCase())),
    [consulta],
  );

  // TODO 2: calcula totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA)).
  // TODO 3: calcula `visibles` con slice según la página (usa useMemo).
  const visibles = filtrados;

  return (
    <div className="card">
      <input
        value={consulta}
        onChange={(e) => {
          setConsulta(e.target.value);
          // TODO 4: vuelve a la página 1 cuando cambie la búsqueda.
        }}
        placeholder="Buscar curso..."
      />
      <ul>
        {visibles.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      {/* TODO 5: botones Anterior / Siguiente (deshabilitados en los extremos) y "Página X de Y". */}
    </div>
  );
}
