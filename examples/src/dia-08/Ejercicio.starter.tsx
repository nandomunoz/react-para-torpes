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

  // TODO: calcula `visibles` filtrando `libros` según `soloPendientes`
  const visibles: Libro[] = libros;

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
      {/* TODO: si `visibles` está vacío, muestra un mensaje con className="muted" */}
      <ul>
        {/* TODO: renderiza cada libro con map y una key estable (su id) */}
      </ul>
    </div>
  );
}
