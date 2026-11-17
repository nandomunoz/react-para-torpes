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
  const [pagina, setPagina] = useState<number>(1);

  const filtrados = useMemo(
    () => CURSOS.filter((c) => c.toLowerCase().includes(consulta.trim().toLowerCase())),
    [consulta],
  );

  const totalPaginas = Math.max(1, Math.ceil(filtrados.length / POR_PAGINA));
  const paginaActual = Math.min(pagina, totalPaginas);

  const visibles = useMemo(() => {
    const inicio = (paginaActual - 1) * POR_PAGINA;
    return filtrados.slice(inicio, inicio + POR_PAGINA);
  }, [filtrados, paginaActual]);

  return (
    <div className="card">
      <input
        value={consulta}
        onChange={(e) => {
          setConsulta(e.target.value);
          setPagina(1);
        }}
        placeholder="Buscar curso..."
      />
      <ul>
        {visibles.map((c) => (
          <li key={c}>{c}</li>
        ))}
      </ul>
      <div className="row">
        <button disabled={paginaActual <= 1} onClick={() => setPagina(paginaActual - 1)}>
          Anterior
        </button>
        <span className="muted">
          Página {paginaActual} de {totalPaginas}
        </span>
        <button disabled={paginaActual >= totalPaginas} onClick={() => setPagina(paginaActual + 1)}>
          Siguiente
        </button>
      </div>
    </div>
  );
}
