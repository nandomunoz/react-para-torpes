import { useReducer, useState, type FormEvent } from "react";

type Tarea = { id: number; texto: string; hecha: boolean };

type Accion =
  | { tipo: "agregar"; texto: string }
  | { tipo: "alternar"; id: number }
  | { tipo: "borrar"; id: number }
  | { tipo: "limpiarHechas" };

function assertNever(valor: never): never {
  throw new Error(`Acción no manejada: ${JSON.stringify(valor)}`);
}

function tareasReducer(estado: Tarea[], accion: Accion): Tarea[] {
  switch (accion.tipo) {
    case "agregar":
      return [...estado, { id: Date.now(), texto: accion.texto, hecha: false }];
    case "alternar":
      return estado.map((t) => (t.id === accion.id ? { ...t, hecha: !t.hecha } : t));
    case "borrar":
      return estado.filter((t) => t.id !== accion.id);
    case "limpiarHechas":
      return estado.filter((t) => !t.hecha);
    default:
      return assertNever(accion);
  }
}

export default function App() {
  const [tareas, dispatch] = useReducer(tareasReducer, [
    { id: 1, texto: "Entender useReducer", hecha: false },
    { id: 2, texto: "Preparar café", hecha: true },
  ]);
  const [texto, setTexto] = useState("");

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (texto.trim() === "") return;
    dispatch({ tipo: "agregar", texto: texto.trim() });
    setTexto("");
  }

  return (
    <div className="card">
      <form className="row" onSubmit={enviar}>
        <input value={texto} onChange={(e) => setTexto(e.target.value)} placeholder="Nueva tarea" />
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {tareas.map((t) => (
          <li key={t.id}>
            <span
              onClick={() => dispatch({ tipo: "alternar", id: t.id })}
              style={{ textDecoration: t.hecha ? "line-through" : "none", cursor: "pointer" }}
            >
              {t.texto}
            </span>{" "}
            <button className="secondary" onClick={() => dispatch({ tipo: "borrar", id: t.id })}>
              Borrar
            </button>
          </li>
        ))}
      </ul>
      <button className="secondary" onClick={() => dispatch({ tipo: "limpiarHechas" })}>
        Limpiar hechas
      </button>
    </div>
  );
}
