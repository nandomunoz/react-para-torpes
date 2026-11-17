import { useState } from "react";

type ContadorProps = {
  inicial?: number;
  max?: number;
};

// Componente pensado para probarse: roles y textos claros
export function Contador({ inicial = 0, max = 10 }: ContadorProps) {
  const [cuenta, setCuenta] = useState(inicial);
  const enLimite = cuenta >= max;

  return (
    <div className="card">
      <p>Cuenta: {cuenta}</p>
      <div className="row">
        <button onClick={() => setCuenta((c) => c + 1)} disabled={enLimite}>
          Sumar
        </button>
        <button className="secondary" onClick={() => setCuenta((c) => c - 1)}>
          Restar
        </button>
        <button className="secondary" onClick={() => setCuenta(inicial)}>
          Reiniciar
        </button>
      </div>
      {enLimite && <p className="error">Has llegado al máximo ({max})</p>}
    </div>
  );
}

export default function App() {
  return <Contador inicial={8} max={10} />;
}
