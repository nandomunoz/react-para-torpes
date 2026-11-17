import { useState } from "react";

// Servidor: solo marcado, nada de estado.
function Cabecera() {
  return (
    <>
      <h2>Mi blog</h2>
      <p className="muted">Escribo sobre React sin llorar.</p>
    </>
  );
}

// Cliente: la isla con estado y evento (en Next llevaría "use client").
function ContadorVisitas() {
  const [visitas, setVisitas] = useState(0);
  return (
    <button type="button" onClick={() => setVisitas((n) => n + 1)}>
      Visitas: {visitas}
    </button>
  );
}

export default function App() {
  return (
    <div className="card">
      <Cabecera />
      <ContadorVisitas />
    </div>
  );
}
