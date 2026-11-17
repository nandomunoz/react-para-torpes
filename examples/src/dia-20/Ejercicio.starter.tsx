import { memo, useEffect, useRef, useState } from "react";

type Tarea = { id: number; texto: string; hecha: boolean };

type ItemProps = {
  tarea: Tarea;
  onAlternar: (id: number) => void;
};

function useContadorRenders() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const cuenta = useRef(0);
  useEffect(() => {
    cuenta.current += 1;
    if (spanRef.current) spanRef.current.textContent = String(cuenta.current);
  });
  return spanRef;
}

// TODO 1: envuelve este componente con memo para que no se renderice si su tarea no cambió.
function Item({ tarea, onAlternar }: ItemProps) {
  const contador = useContadorRenders();
  return (
    <li>
      <label style={{ display: "inline" }}>
        <input type="checkbox" checked={tarea.hecha} onChange={() => onAlternar(tarea.id)} /> {tarea.texto}
      </label>{" "}
      <span className="muted">
        (renders: <span ref={contador}>0</span>)
      </span>
    </li>
  );
}

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: "Leer sobre memo", hecha: false },
    { id: 2, texto: "Medir renders", hecha: false },
    { id: 3, texto: "Pedir un café", hecha: false },
  ]);
  const [filtro, setFiltro] = useState("");

  // TODO 2: estabiliza esta función con useCallback (importa useCallback).
  // TODO 3: usa la forma funcional de setTareas para no depender de `tareas`.
  function alternar(id: number) {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  return (
    <div className="card">
      <label htmlFor="filtro">Escribe aquí: el padre se renderiza, los items no deberían</label>
      <input id="filtro" value={filtro} onChange={(e) => setFiltro(e.target.value)} />
      <ul>
        {tareas.map((t) => (
          <Item key={t.id} tarea={t} onAlternar={alternar} />
        ))}
      </ul>
    </div>
  );
}
