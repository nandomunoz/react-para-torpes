import { createContext, useContext, useMemo, useState, type ReactNode } from "react";

// La paleta es la fuente de verdad: los nombres válidos salen de sus claves.
const PALETA = {
  lima: "#c6f51c",
  cielo: "#4cc9f0",
  coral: "#ff7a59",
  violeta: "#b388ff",
} as const;

type NombreAcento = keyof typeof PALETA;

type AcentoContextValue = {
  nombre: NombreAcento;
  color: string;
  cambiar: (nombre: NombreAcento) => void;
};

// null = "no hay Provider arriba". El hook de abajo se encarga de avisar.
const AcentoContext = createContext<AcentoContextValue | null>(null);

function AcentoProvider({ children }: { children: ReactNode }) {
  const [nombre, setNombre] = useState<NombreAcento>("lima");

  const valor = useMemo<AcentoContextValue>(
    () => ({ nombre, color: PALETA[nombre], cambiar: setNombre }),
    [nombre],
  );

  return <AcentoContext.Provider value={valor}>{children}</AcentoContext.Provider>;
}

// Hook propio: quien lo usa recibe el tipo sin `null`, o un error claro.
function useAcento(): AcentoContextValue {
  const ctx = useContext(AcentoContext);
  if (ctx === null) {
    throw new Error("useAcento debe usarse dentro de <AcentoProvider>");
  }
  return ctx;
}

function Selector() {
  const { nombre, cambiar } = useAcento();
  const nombres = Object.keys(PALETA) as NombreAcento[];
  return (
    <div className="row">
      {nombres.map((n) => (
        <button key={n} className={n === nombre ? "" : "secondary"} onClick={() => cambiar(n)}>
          {n}
        </button>
      ))}
    </div>
  );
}

// Este componente está "lejos" del Provider y no recibe props.
function Tarjeta() {
  const { nombre, color } = useAcento();
  return (
    <div className="card" style={{ borderColor: color, marginTop: 12 }}>
      <h3 style={{ color }}>Acento actual: {nombre}</h3>
      <p className="muted">Código de color: {color}</p>
    </div>
  );
}

export default function App() {
  return (
    <AcentoProvider>
      <Selector />
      <Tarjeta />
    </AcentoProvider>
  );
}
