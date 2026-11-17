import { useState } from "react";

type Libro = {
  id: number;
  titulo: string;
  autor: string;
  leido: boolean;
};

const libros: Libro[] = [
  { id: 1, titulo: "Dune", autor: "Frank Herbert", leido: true },
  { id: 2, titulo: "Neuromante", autor: "William Gibson", leido: false },
  { id: 3, titulo: "Fundación", autor: "Isaac Asimov", leido: false },
];

export default function App() {
  const [soloPendientes, setSoloPendientes] = useState(false);

  // Dato derivado: no necesita su propio estado.
  const visibles = soloPendientes ? libros.filter((l) => !l.leido) : libros;

  return (
    <div className="card">
      <h2>Mi biblioteca</h2>
      <label>
        <input
          type="checkbox"
          checked={soloPendientes}
          onChange={(e) => setSoloPendientes(e.target.checked)}
        />{" "}
        Solo pendientes
      </label>
      {visibles.length === 0 ? (
        <p className="muted">Nada pendiente. ¡Eres una máquina lectora!</p>
      ) : (
        <ul>
          {visibles.map((l) => (
            <li key={l.id}>
              <strong>{l.titulo}</strong> de {l.autor} {l.leido ? "(leído)" : ""}
            </li>
          ))}
        </ul>
      )}
    </div>
  );
}
