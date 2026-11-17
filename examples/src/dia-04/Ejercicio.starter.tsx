import { useState } from "react";

// Ejercicio: contador con sumar, restar y reiniciar (sin bajar de 0).

export default function App() {
  // TODO: crea el estado `cuenta` de tipo number, inicial 0
  const cuenta = 0;
  void useState; // TODO: borra esta línea cuando uses useState

  return (
    <div className="card">
      <h1>Cuenta: {cuenta}</h1>
      <div className="row">
        {/* TODO: botón "Sumar" que sume 1 */}
        {/* TODO: botón "Restar" que reste 1 y esté deshabilitado si cuenta es 0 */}
        {/* TODO: botón "Reiniciar" con className="secondary" que vuelva a 0 */}
      </div>
    </div>
  );
}
