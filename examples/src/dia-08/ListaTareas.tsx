import { useState } from "react";
import type { FormEvent } from "react";

// Cada tarea tiene un id estable: será nuestra key.
type Tarea = {
  id: number;
  texto: string;
};

const inicial: Tarea[] = [
  { id: 1, texto: "Aprender listas" },
  { id: 2, texto: "Entender las keys" },
  { id: 3, texto: "Tomar café" },
];

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>(inicial);
  const [texto, setTexto] = useState("");

  function agregar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const limpio = texto.trim();
    if (!limpio) return;
    // Date.now() nos da un id único para este ejemplo.
    setTareas([...tareas, { id: Date.now(), texto: limpio }]);
    setTexto("");
  }

  function quitar(id: number) {
    setTareas(tareas.filter((t) => t.id !== id));
  }

  return (
    <div className="card">
      <h2>Mis tareas</h2>
      <form className="row" onSubmit={agregar}>
        <input
          value={texto}
          onChange={(e) => setTexto(e.target.value)}
          placeholder="Nueva tarea"
        />
        <button type="submit">Añadir</button>
      </form>
      {tareas.length === 0 ? (
        <p className="muted">No hay tareas. ¡Disfruta!</p>
      ) : (
        <ul>
          {tareas.map((t) => (
            // La key va en el elemento que devuelve el map.
            <li key={t.id}>
              {t.texto}{" "}
              <button className="secondary" onClick={() => quitar(t.id)}>
                Quitar
              </button>
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
