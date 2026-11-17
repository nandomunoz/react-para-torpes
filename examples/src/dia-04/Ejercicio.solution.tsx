import { useState } from "react";

export default function App() {
  const [cuenta, setCuenta] = useState<number>(0);

  return (
    <div className="card">
      <h1>Cuenta: {cuenta}</h1>
      <div className="row">
        <button onClick={() => setCuenta(cuenta + 1)}>Sumar</button>
        <button onClick={() => setCuenta(cuenta - 1)} disabled={cuenta === 0}>
          Restar
        </button>
        <button className="secondary" onClick={() => setCuenta(0)}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
