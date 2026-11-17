import { memo, useCallback, useEffect, useMemo, useRef, useState } from "react";

// Hook de apoyo: cuenta cuántas veces se "pinta" (commit) un componente
function useContadorRenders() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const veces = useRef(0);
  useEffect(() => {
    veces.current += 1;
    if (spanRef.current) spanRef.current.textContent = String(veces.current);
  });
  // StrictMode monta dos veces en desarrollo: reiniciamos en el "desmontaje" simulado
  useEffect(
    () => () => {
      veces.current = 0;
    },
    [],
  );
  return spanRef;
}

type Tarea = { id: number; texto: string };

type ItemProps = { tarea: Tarea; onBorrar: (id: number) => void };

// Sin memo: se vuelve a renderizar siempre que lo haga el padre
function ItemLento({ tarea, onBorrar }: ItemProps) {
  const ref = useContadorRenders();
  return (
    <li>
      {tarea.texto} <span className="muted">renders: <span ref={ref}>0</span></span>{" "}
      <button className="secondary" onClick={() => onBorrar(tarea.id)}>
        x
      </button>
    </li>
  );
}

// Con memo: solo se renderiza si cambian sus props (comparación superficial)
const ItemRapido = memo(function ItemRapido({ tarea, onBorrar }: ItemProps) {
  const ref = useContadorRenders();
  return (
    <li>
      {tarea.texto} <span className="muted">renders: <span ref={ref}>0</span></span>{" "}
      <button className="secondary" onClick={() => onBorrar(tarea.id)}>
        x
      </button>
    </li>
  );
});

const INICIALES: Tarea[] = [
  { id: 1, texto: "Medir antes de optimizar" },
  { id: 2, texto: "Usar keys estables" },
  { id: 3, texto: "No abusar de useMemo" },
];

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>(INICIALES);
  const [busqueda, setBusqueda] = useState("");
  const [pulsaciones, setPulsaciones] = useState(0);

  // Estado derivado: se calcula, no se guarda en otro useState.
  // useMemo mantiene la MISMA referencia mientras no cambien tareas/busqueda.
  const visibles = useMemo(
    () => tareas.filter((t) => t.texto.toLowerCase().includes(busqueda.toLowerCase())),
    [tareas, busqueda],
  );

  // Referencia estable: sin useCallback, memo no serviría de nada
  const borrar = useCallback((id: number) => {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }, []);

  return (
    <div className="card">
      <div className="row" style={{ marginBottom: 12 }}>
        <button onClick={() => setPulsaciones((n) => n + 1)}>Re-renderizar padre ({pulsaciones})</button>
        <input value={busqueda} onChange={(e) => setBusqueda(e.target.value)} placeholder="Filtrar..." />
      </div>

      <h3>Sin memo</h3>
      <ul>
        {visibles.map((t) => (
          <ItemLento key={t.id} tarea={t} onBorrar={borrar} />
        ))}
      </ul>

      <h3>Con memo + useCallback</h3>
      <ul>
        {visibles.map((t) => (
          <ItemRapido key={t.id} tarea={t} onBorrar={borrar} />
        ))}
      </ul>
    </div>
  );
}
