import { useState } from "react";

type Estado = "cargando" | "error" | "listo";

export default function App() {
  const [estado, setEstado] = useState<Estado>("cargando");

  return (
    <div className="card">
      {estado === "cargando" && <p>Cargando...</p>}
      {estado === "error" && <p className="error">Algo salió mal</p>}
      {estado === "listo" && <p>Todo en orden ✅</p>}
      <div className="row">
        <button className="secondary" onClick={() => setEstado("cargando")}>
          Cargando
        </button>
        <button className="secondary" onClick={() => setEstado("error")}>
          Error
        </button>
        <button className="secondary" onClick={() => setEstado("listo")}>
          Listo
        </button>
      </div>
      <p className="muted">Estado actual: {estado}</p>
    </div>
  );
}
