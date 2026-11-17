import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Nota = {
  id: number;
  texto: string;
};

const CLAVE = "react-para-torpes:notas";

function cargarNotas(): Nota[] {
  try {
    const crudo = localStorage.getItem(CLAVE);
    if (!crudo) return [];
    const datos: unknown = JSON.parse(crudo);
    return Array.isArray(datos) ? (datos as Nota[]) : [];
  } catch {
    return [];
  }
}

export default function App() {
  // Pasamos la función sin llamarla: React la ejecuta solo al montar.
  const [notas, setNotas] = useState<Nota[]>(cargarNotas);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    try {
      localStorage.setItem(CLAVE, JSON.stringify(notas));
    } catch {
      // Sin almacenamiento disponible: seguimos sin persistir.
    }
  }, [notas]);

  function agregar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (!texto.trim()) return;
    setNotas((prev) => [...prev, { id: Date.now(), texto: texto.trim() }]);
    setTexto("");
  }

  function borrar(id: number) {
    setNotas((prev) => prev.filter((n) => n.id !== id));
  }

  return (
    <div className="card">
      <h2>Notas rápidas</h2>
      <form className="row" onSubmit={agregar}>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva nota" />
        <button type="submit">Guardar</button>
      </form>
      <ul>
        {notas.map((n) => (
          <li key={n.id}>
            {n.texto}{" "}
            <button className="secondary" onClick={() => borrar(n.id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
      <p className="muted">Recarga la vista previa: tus notas deberían seguir ahí.</p>
    </div>
  );
}
