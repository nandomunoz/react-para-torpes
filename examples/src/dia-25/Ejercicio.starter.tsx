import { useState } from "react";

// Componente a probar. Tu tarea: crea Saludo.test.tsx y escribe estos tests
// con Vitest + Testing Library (puedes copiar la estructura de Contador.test.tsx):
// TODO 1: sin texto, se ve "Escribe tu nombre"
// TODO 2: al escribir "Ana" en el campo, se ve "Hola, Ana"
// TODO 3: al borrar lo escrito, vuelve el mensaje inicial
export function Saludo() {
  const [nombre, setNombre] = useState("");

  return (
    <div className="card">
      <label htmlFor="nombre">Nombre</label>
      <input id="nombre" value={nombre} onChange={(e) => setNombre(e.target.value)} />
      <p>{nombre.trim() ? `Hola, ${nombre.trim()}` : "Escribe tu nombre"}</p>
    </div>
  );
}

export default function App() {
  return <Saludo />;
}
