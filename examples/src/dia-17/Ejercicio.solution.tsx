import { createContext, useContext, useState, type ReactNode } from "react";

type SesionContextValue = {
  usuario: string | null;
  entrar: (nombre: string) => void;
  salir: () => void;
};

const SesionContext = createContext<SesionContextValue | null>(null);

function SesionProvider({ children }: { children: ReactNode }) {
  const [usuario, setUsuario] = useState<string | null>(null);
  const valor: SesionContextValue = {
    usuario,
    entrar: (nombre) => setUsuario(nombre),
    salir: () => setUsuario(null),
  };
  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

function useSesion(): SesionContextValue {
  const ctx = useContext(SesionContext);
  if (ctx === null) {
    throw new Error("useSesion debe usarse dentro de <SesionProvider>");
  }
  return ctx;
}

function Cabecera() {
  const { usuario, salir } = useSesion();
  if (usuario === null) return <span className="muted">Sin sesión</span>;
  return (
    <div className="row">
      <span>Hola, {usuario}</span>
      <button className="secondary" onClick={salir}>
        Salir
      </button>
    </div>
  );
}

function Login() {
  const { entrar } = useSesion();
  return (
    <div className="row" style={{ marginTop: 12 }}>
      <button onClick={() => entrar("Ada")}>Entrar como Ada</button>
      <button onClick={() => entrar("Linus")}>Entrar como Linus</button>
    </div>
  );
}

export default function App() {
  return (
    <SesionProvider>
      <div className="card">
        <Cabecera />
        <Login />
      </div>
    </SesionProvider>
  );
}
