import { useEffect, useState } from "react";

type Tarea = { id: number; texto: string };

/* API simulada: ya está hecha, úsala */
let baseDeDatos: Tarea[] = [{ id: 1, texto: "Terminar el curso" }];
let siguienteId = 2;
const esperar = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

const api = {
  listar: async (): Promise<Tarea[]> => {
    await esperar(400);
    return [...baseDeDatos];
  },
  crear: async (texto: string): Promise<Tarea> => {
    await esperar(400);
    if (texto.toLowerCase().includes("fallo")) throw new Error("La API rechazó la tarea");
    const tarea = { id: siguienteId++, texto };
    baseDeDatos = [...baseDeDatos, tarea];
    return tarea;
  },
  borrar: async (id: number): Promise<void> => {
    await esperar(400);
    baseDeDatos = baseDeDatos.filter((t) => t.id !== id);
  },
};

export default function App() {
  const [tareas, setTareas] = useState<Tarea[]>([]);
  const [cargando, setCargando] = useState(true);
  const [texto, setTexto] = useState("");
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    let cancelado = false;
    api.listar().then((lista) => {
      if (!cancelado) {
        setTareas(lista);
        setCargando(false);
      }
    });
    return () => {
      cancelado = true;
    };
  }, []);

  // TODO: valida que el texto tenga al menos 3 letras y muestra el error
  // TODO: llama a api.crear, añade la tarea al estado y limpia el campo
  // TODO: captura el error de la API (escribe "fallo" para provocarlo) y muéstralo
  function crear() {
    setError(null);
  }

  // TODO: llama a api.borrar y quita la tarea del estado
  function borrar(id: number) {
    console.log("borrar", id);
  }

  if (cargando) return <p className="muted">Cargando...</p>;

  return (
    <div className="card">
      <div className="row">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea" />
        <button onClick={crear}>Añadir</button>
      </div>
      {error && <p className="error">{error}</p>}
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            {t.texto}{" "}
            <button className="secondary" onClick={() => borrar(t.id)}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
    </div>
  );
}
