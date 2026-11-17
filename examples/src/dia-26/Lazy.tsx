import { lazy, Suspense, useState } from "react";

function PanelPesado() {
  return (
    <div className="card">
      <h3>Panel pesado</h3>
      <p className="muted">Imagina aquí un editor, un gráfico o un mapa.</p>
    </div>
  );
}

// En un proyecto real sería: lazy(() => import("./PanelPesado"))
// Aquí simulamos la descarga con un retraso para que veas el fallback.
const PanelDiferido = lazy(
  () =>
    new Promise<{ default: typeof PanelPesado }>((resolve) => {
      setTimeout(() => resolve({ default: PanelPesado }), 1200);
    }),
);

export default function App() {
  const [visible, setVisible] = useState(false);

  return (
    <div className="card">
      <button onClick={() => setVisible((v) => !v)}>{visible ? "Ocultar" : "Mostrar"} panel</button>
      {visible && (
        // Suspense muestra el fallback mientras el componente se descarga
        <Suspense fallback={<p className="muted">Cargando panel...</p>}>
          <PanelDiferido />
        </Suspense>
      )}
    </div>
  );
}
