import { useState } from "react";

// Ejercicio: panel de notificaciones con tres estados.

type Estado = "cargando" | "error" | "listo";

export default function App() {
  const [estado, setEstado] = useState<Estado>("cargando");
  void setEstado; // TODO: borra esta línea cuando uses setEstado

  return (
    <div className="card">
      {/* TODO: si estado es "cargando", muestra un párrafo "Cargando..." */}
      {/* TODO: si estado es "error", muestra un párrafo con className="error" */}
      {/* TODO: si estado es "listo", muestra un párrafo "Todo en orden ✅" */}
      <div className="row">
        {/* TODO: tres botones que cambien el estado a cada valor con setEstado */}
      </div>
      <p className="muted">Estado actual: {estado}</p>
    </div>
  );
}
