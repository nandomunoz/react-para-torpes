import { useState } from "react";

type Tarea = {
  id: number;
  texto: string;
  hecha: boolean;
};

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([
    { id: 1, texto: "Aprender props", hecha: true },
    { id: 2, texto: "Aprender estado", hecha: true },
    { id: 3, texto: "Aprender eventos", hecha: false },
  ]);

  const completadas = tareas.filter((t) => t.hecha).length;

  function borrarCompletadas() {
    setTareas(tareas.filter((t) => !t.hecha));
  }

  return (
    <div className="card">
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.texto}</li>
        ))}
      </ul>
      {completadas > 0 && (
        <button onClick={borrarCompletadas}>Borrar completadas ({completadas})</button>
      )}
      <p className="muted">Completadas: {completadas}</p>
    </div>
  );
}
