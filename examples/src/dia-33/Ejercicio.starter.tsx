import { useState } from "react";

// Simula una página Next.js: decide qué parte sería Server y cuál Client.
// TODO: separa la parte interactiva (el contador) en su propio componente
// y deja Cabecera como componente "de servidor" (sin hooks ni eventos).

export default function App() {
  const [visitas, setVisitas] = useState(0);
  return (
    <div className="card">
      <h2>Mi blog</h2>
      <p className="muted">Escribo sobre React sin llorar.</p>
      <button type="button" onClick={() => setVisitas((n) => n + 1)}>
        Visitas: {visitas}
      </button>
    </div>
  );
}
