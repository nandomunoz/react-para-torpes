import { useEffect, useState } from "react";

// Objetivo: mostrar el ancho de la ventana y si es "Móvil" o "Escritorio".
export default function App() {
  // TODO 1: crea el estado `ancho` (number) iniciado con window.innerWidth.
  const ancho = 0;

  // TODO 2: useEffect que escuche el evento "resize" de window
  //         y actualice `ancho` con window.innerWidth.
  // TODO 3: devuelve una función de limpieza que quite el listener.
  useEffect(() => {}, []);

  // TODO 4: cambia el texto a "Móvil" si ancho < 600 y "Escritorio" si no.
  const tipo = "?";

  return (
    <div className="card">
      <p>Ancho de la ventana: {ancho}px</p>
      <p className="muted">Dispositivo: {tipo}</p>
    </div>
  );
}
