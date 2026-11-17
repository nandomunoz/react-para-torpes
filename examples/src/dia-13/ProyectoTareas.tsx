import { useEffect, useState } from "react";
import type { FormEvent } from "react";

// ---------- Tipos ----------
type Tarea = {
  id: number;
  texto: string;
  hecha: boolean;
};

type Filtro = "todas" | "pendientes" | "hechas";

const CLAVE = "react-para-torpes:tareas";

// ---------- Persistencia ----------
// localStorage puede fallar (modo privado, JSON roto, cuota): siempre try/catch.
function cargarTareas(): Tarea[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos: unknown = JSON.parse(crudo);
    return Array.isArray(datos) ? (datos as Tarea[]) : [];
  } catch {
    return [];
  }
}

function guardarTareas(tareas: Tarea[]) {
  try {
    localStorage.setItem(CLAVE, JSON.stringify(tareas));
  } catch {
    // Si no se puede guardar, la app sigue funcionando sin persistencia.
  }
}

// ---------- Componentes internos ----------
type FormularioProps = {
  onAgregar: (texto: string) => void;
};

function FormularioTarea({ onAgregar }: FormularioProps) {
  const [texto, setTexto] = useState("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!texto.trim()) return;
    onAgregar(texto.trim());
    setTexto("");
  }

  return (
    <form className="row" onSubmit={enviar}>
      <input
        value={texto}
        onChange={(e) => setTexto(e.target.value)}
        placeholder="¿Qué toca hacer?"
      />
      <button type="submit">Añadir</button>
    </form>
  );
}

type FiltrosProps = {
  actual: Filtro;
  onCambio: (f: Filtro) => void;
};

function Filtros({ actual, onCambio }: FiltrosProps) {
  const opciones: Filtro[] = ["todas", "pendientes", "hechas"];
  return (
    <div className="row" style={{ margin: "12px 0" }}>
      {opciones.map((f) => (
        <button
          key={f}
          className={f === actual ? undefined : "secondary"}
          onClick={() => onCambio(f)}
        >
          {f}
        </button>
      ))}
    </div>
  );
}

type ItemProps = {
  tarea: Tarea;
  onAlternar: (id: number) => void;
  onBorrar: (id: number) => void;
};

function ItemTarea({ tarea, onAlternar, onBorrar }: ItemProps) {
  return (
    <li>
      <label style={{ display: "inline-block", margin: 0, color: "inherit" }}>
        <input
          type="checkbox"
          checked={tarea.hecha}
          onChange={() => onAlternar(tarea.id)}
        />{" "}
        <span style={{ textDecoration: tarea.hecha ? "line-through" : "none" }}>
          {tarea.texto}
        </span>
      </label>{" "}
      <button className="secondary" onClick={() => onBorrar(tarea.id)}>
        Borrar
      </button>
    </li>
  );
}

type ListaProps = {
  tareas: Tarea[];
  onAlternar: (id: number) => void;
  onBorrar: (id: number) => void;
};

function ListaTareas({ tareas, onAlternar, onBorrar }: ListaProps) {
  if (tareas.length === 0) return <p className="muted">Nada que mostrar aquí.</p>;
  return (
    <ul>
      {tareas.map((t) => (
        <ItemTarea key={t.id} tarea={t} onAlternar={onAlternar} onBorrar={onBorrar} />
      ))}
    </ul>
  );
}

// ---------- App ----------
export default function App() {
  // Inicializador perezoso: se lee localStorage solo en el primer render.
  const [tareas, setTareas] = useState<Tarea[]>(cargarTareas);
  const [filtro, setFiltro] = useState<Filtro>("todas");

  // Sincroniza con localStorage cada vez que cambian las tareas.
  useEffect(() => {
    guardarTareas(tareas);
  }, [tareas]);

  // Datos derivados: sin estado extra.
  const pendientes = tareas.filter((t) => !t.hecha).length;
  const visibles = tareas.filter((t) =>
    filtro === "todas" ? true : filtro === "hechas" ? t.hecha : !t.hecha
  );

  function agregar(texto: string) {
    setTareas((prev) => [...prev, { id: Date.now(), texto, hecha: false }]);
  }

  function alternar(id: number) {
    setTareas((prev) => prev.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  function borrar(id: number) {
    setTareas((prev) => prev.filter((t) => t.id !== id));
  }

  return (
    <div className="card">
      <h2>Mis tareas</h2>
      <FormularioTarea onAgregar={agregar} />
      <Filtros actual={filtro} onCambio={setFiltro} />
      <ListaTareas tareas={visibles} onAlternar={alternar} onBorrar={borrar} />
      <p className="muted">
        {pendientes === 1 ? "Queda 1 pendiente" : `Quedan ${pendientes} pendientes`}
      </p>
    </div>
  );
}
