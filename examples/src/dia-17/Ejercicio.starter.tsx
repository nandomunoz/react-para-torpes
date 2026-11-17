import { createContext, useContext, useState, type ReactNode } from "react";

// Objetivo: contexto de sesión con un usuario (o null si nadie entró).
type SesionContextValue = {
  usuario: string | null;
  entrar: (nombre: string) => void;
  salir: () => void;
};

const SesionContext = createContext<SesionContextValue | null>(null);

function SesionProvider({ children }: { children: ReactNode }) {
  // TODO 1: estado `usuario` (string | null) iniciado en null.
  // TODO 2: construye el valor con usuario, entrar (guarda el nombre) y salir (vuelve a null).
  const [, setUsuario] = useState<string | null>(null);
  const valor: SesionContextValue = { usuario: null, entrar: () => {}, salir: () => {} };
  return <SesionContext.Provider value={valor}>{children}</SesionContext.Provider>;
}

function useSesion(): SesionContextValue {
  // TODO 3: lee el contexto y lanza un Error si no hay Provider.
  const ctx = useContext(SesionContext);
  return ctx as SesionContextValue;
}

function Cabecera() {
  const { usuario, salir } = useSesion();
  // TODO 4: si hay usuario muestra "Hola, X" y un botón "Salir"; si no, "Sin sesión".
  return (
    <div className="row">
      <span>{usuario ?? "Sin sesión"}</span>
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
