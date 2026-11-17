import { useState } from "react";

// Ejercicio: añade a la lista de tareas un botón "Borrar completadas".

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
  void setTareas; // TODO: borra esta línea cuando uses setTareas

  function borrarCompletadas() {
    // TODO: deja en el estado solo las tareas con hecha === false
  }

  void borrarCompletadas; // TODO: bórrala al conectar el botón

  return (
    <div className="card">
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>{t.texto}</li>
        ))}
      </ul>
      {/* TODO: muestra el botón solo si hay completadas, con el texto "Borrar completadas (N)" */}
      <p className="muted">Completadas: {completadas}</p>
    </div>
  );
}
