import { useState } from "react";
import type { ReactNode } from "react";

// 1) children: el componente no sabe qué le pondrás dentro.
type TarjetaProps = {
  titulo: string;
  children: ReactNode;
};

function Tarjeta({ titulo, children }: TarjetaProps) {
  return (
    <section className="card" style={{ marginBottom: 12 }}>
      <h3>{titulo}</h3>
      {children}
    </section>
  );
}

// 2) Slots: props que reciben JSX con nombre propio.
type PanelProps = {
  cabecera: ReactNode;
  acciones?: ReactNode;
  children: ReactNode;
};

function Panel({ cabecera, acciones, children }: PanelProps) {
  return (
    <div className="card" style={{ marginBottom: 12 }}>
      <div className="row" style={{ justifyContent: "space-between" }}>
        <strong>{cabecera}</strong>
        <div className="row">{acciones}</div>
      </div>
      <div style={{ marginTop: 8 }}>{children}</div>
    </div>
  );
}

// 3) Especialización por composición (no por herencia).
type AvisoProps = {
  color: string;
  children: ReactNode;
};

function Aviso({ color, children }: AvisoProps) {
  return <p style={{ color, margin: 0 }}>{children}</p>;
}

function AvisoError({ children }: { children: ReactNode }) {
  return <Aviso color="#ff4d4d">Error: {children}</Aviso>;
}

// 4) Componente genérico: sirve para cualquier tipo de dato T.
type ListaProps<T> = {
  items: T[];
  clave: (item: T) => string | number;
  render: (item: T) => ReactNode;
};

function Lista<T>({ items, clave, render }: ListaProps<T>) {
  return (
    <ul>
      {items.map((item) => (
        <li key={clave(item)}>{render(item)}</li>
      ))}
    </ul>
  );
}

type Fruta = { id: number; nombre: string };
type Usuaria = { email: string; edad: number };

export default function App() {
  const [abierto, setAbierto] = useState(true);
  const frutas: Fruta[] = [
    { id: 1, nombre: "Mango" },
    { id: 2, nombre: "Kiwi" },
  ];
  const usuarias: Usuaria[] = [
    { email: "ana@correo.com", edad: 31 },
    { email: "bea@correo.com", edad: 27 },
  ];

  return (
    <div>
      <Tarjeta titulo="Con children">
        <p>Cualquier cosa cabe aquí dentro.</p>
        <AvisoError>esto es un aviso especializado</AvisoError>
      </Tarjeta>

      <Panel
        cabecera="Con slots"
        acciones={
          <button className="secondary" onClick={() => setAbierto(!abierto)}>
            {abierto ? "Ocultar" : "Mostrar"}
          </button>
        }
      >
        {abierto ? <p>Contenido del panel.</p> : <p className="muted">Oculto.</p>}
      </Panel>

      <Tarjeta titulo="Lista genérica">
        <Lista items={frutas} clave={(f) => f.id} render={(f) => f.nombre} />
        <Lista
          items={usuarias}
          clave={(u) => u.email}
          render={(u) => `${u.email} (${u.edad} años)`}
        />
      </Tarjeta>
    </div>
  );
}
