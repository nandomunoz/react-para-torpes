import { useEffect, useState } from "react";

export default function App() {
  const [ancho, setAncho] = useState<number>(window.innerWidth);

  useEffect(() => {
    function alCambiar() {
      setAncho(window.innerWidth);
    }
    window.addEventListener("resize", alCambiar);
    // Cleanup: quitamos el listener al desmontar (y entre ejecuciones de StrictMode).
    return () => window.removeEventListener("resize", alCambiar);
  }, []);

  const tipo = ancho < 600 ? "Móvil" : "Escritorio";

  return (
    <div className="card">
      <p>Ancho de la ventana: {ancho}px</p>
      <p className="muted">Dispositivo: {tipo}</p>
    </div>
  );
}
