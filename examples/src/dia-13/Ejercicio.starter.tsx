import { useEffect, useState } from "react";
import type { FormEvent } from "react";

type Nota = {
  id: number;
  texto: string;
};

const CLAVE = "react-para-torpes:notas";

// TODO 1: implementa cargarNotas con try/catch: lee CLAVE de localStorage,
// parsea el JSON y devuelve un array (o [] si algo falla).
function cargarNotas(): Nota[] {
  return [];
}

export default function App() {
  // TODO 2: usa cargarNotas como inicializador perezoso (pasa la función, sin llamarla)
  const [notas, setNotas] = useState<Nota[]>([]);
  const [texto, setTexto] = useState("");

  useEffect(() => {
    // TODO 3: guarda `notas` en localStorage dentro de un try/catch
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
