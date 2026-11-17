import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Tarea = {
  id: number;
  texto: string;
  hecha: boolean;
};

type ItemTareaProps = {
  tarea: Tarea;
  onAlternar: (id: number) => void;
  onBorrar: (id: number) => void;
};

function ItemTarea({ tarea, onAlternar, onBorrar }: ItemTareaProps) {
  return (
    <li className="row">
      <input type="checkbox" checked={tarea.hecha} onChange={() => onAlternar(tarea.id)} />
      <span style={{ textDecoration: tarea.hecha ? "line-through" : "none" }}>{tarea.texto}</span>
      <button className="secondary" onClick={() => onBorrar(tarea.id)}>
        Borrar
      </button>
    </li>
  );
}

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: "Repasar JSX", hecha: true },
    { id: 2, texto: "Practicar useState", hecha: false },
  ]);
  const [nueva, setNueva] = useState<string>("");

  function agregar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const texto = nueva.trim();
    if (texto === "") return;
    // Creamos un array nuevo; nunca mutamos el estado
    setTareas([...tareas, { id: Date.now(), texto, hecha: false }]);
    setNueva("");
  }

  function alternar(id: number) {
    setTareas(tareas.map((t) => (t.id === id ? { ...t, hecha: !t.hecha } : t)));
  }

  function borrar(id: number) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  const pendientes = tareas.filter((t) => !t.hecha).length;

  return (
    <div className="card">
      <h1>Mis tareas</h1>
      <form className="row" onSubmit={agregar}>
        <input
          value={nueva}
          onChange={(e: ChangeEvent<HTMLInputElement>) => setNueva(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Añadir</button>
      </form>
      {tareas.length === 0 ? (
        <p className="muted">No tienes tareas. ¡Disfruta!</p>
      ) : (
        <ul style={{ listStyle: "none", paddingLeft: 0 }}>
          {tareas.map((t) => (
            <ItemTarea key={t.id} tarea={t} onAlternar={alternar} onBorrar={borrar} />
          ))}
        </ul>
      )}
      <p className="muted">Pendientes: {pendientes}</p>
    </div>
  );
}
