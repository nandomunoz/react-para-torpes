import { useEffect, useState } from "react";

// El estado es una unión de textos: TypeScript no te deja escribir "corriedo".
type Estado = "detenido" | "corriendo" | "pausado";

function formato(total: number): string {
  const m = Math.floor(total / 60).toString().padStart(2, "0");
  const s = (total % 60).toString().padStart(2, "0");
  return `${m}:${s}`;
}

export default function App() {
  const [segundos, setSegundos] = useState<number>(0);
  const [estado, setEstado] = useState<Estado>("detenido");

  // Efecto 1: el intervalo vive mientras `estado` sea "corriendo".
  useEffect(() => {
    if (estado !== "corriendo") return;
    const id = window.setInterval(() => {
      setSegundos((s) => s + 1); // forma funcional: no depende del valor viejo
    }, 1000);
    // Cleanup: sin esto, StrictMode dejaría dos intervalos corriendo.
    return () => window.clearInterval(id);
  }, [estado]);

  // Efecto 2: sincroniza el título de la pestaña con el estado.
  useEffect(() => {
    const anterior = document.title;
    document.title = `⏱ ${formato(segundos)}`;
    return () => {
      document.title = anterior;
    };
  }, [segundos]);

  function reiniciar() {
    setEstado("detenido");
    setSegundos(0);
  }

  return (
    <div className="card">
      <h2 style={{ fontVariantNumeric: "tabular-nums" }}>{formato(segundos)}</h2>
      <p className="muted">Estado: {estado}</p>
      <div className="row">
        {estado === "corriendo" ? (
          <button onClick={() => setEstado("pausado")}>Pausar</button>
        ) : (
          <button onClick={() => setEstado("corriendo")}>
            {estado === "pausado" ? "Reanudar" : "Iniciar"}
          </button>
        )}
        <button className="secondary" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
