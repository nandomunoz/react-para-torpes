import { version } from "react";

// Si ves esta tarjeta, tu entorno con React + TypeScript funciona.
export default function App() {
  const hoy: string = new Date().toLocaleDateString("es-ES");

  return (
    <div className="card">
      <h1>Entorno listo ✅</h1>
      <p>
        React <strong>{version}</strong> + TypeScript funcionando.
      </p>
      <p className="muted">Hoy es {hoy}</p>
    </div>
  );
}
