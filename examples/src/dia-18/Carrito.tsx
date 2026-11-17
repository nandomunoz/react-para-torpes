import { createContext, useContext, useMemo, useReducer, type Dispatch, type ReactNode } from "react";

type Producto = { id: number; nombre: string; precio: number };
type Linea = Producto & { cantidad: number };

// Unión discriminada: el campo `tipo` dice qué otros campos existen.
type Accion =
  | { tipo: "agregar"; producto: Producto }
  | { tipo: "quitar"; id: number }
  | { tipo: "cambiarCantidad"; id: number; cantidad: number }
  | { tipo: "vaciar" };

// Si añades una acción nueva y olvidas manejarla, esta función no compila.
function assertNever(valor: never): never {
  throw new Error(`Acción no manejada: ${JSON.stringify(valor)}`);
}

function carritoReducer(estado: Linea[], accion: Accion): Linea[] {
  switch (accion.tipo) {
    case "agregar": {
      const existe = estado.some((l) => l.id === accion.producto.id);
      if (existe) {
        return estado.map((l) => (l.id === accion.producto.id ? { ...l, cantidad: l.cantidad + 1 } : l));
      }
      return [...estado, { ...accion.producto, cantidad: 1 }];
    }
    case "quitar":
      return estado.filter((l) => l.id !== accion.id);
    case "cambiarCantidad":
      // Aquí TypeScript sabe que existe `accion.cantidad`
      return estado
        .map((l) => (l.id === accion.id ? { ...l, cantidad: accion.cantidad } : l))
        .filter((l) => l.cantidad > 0);
    case "vaciar":
      return [];
    default:
      return assertNever(accion);
  }
}

type CarritoContextValue = {
  lineas: Linea[];
  total: number;
  dispatch: Dispatch<Accion>;
};

const CarritoContext = createContext<CarritoContextValue | null>(null);

function CarritoProvider({ children }: { children: ReactNode }) {
  const [lineas, dispatch] = useReducer(carritoReducer, []);
  const valor = useMemo<CarritoContextValue>(
    () => ({
      lineas,
      dispatch,
      total: lineas.reduce((suma, l) => suma + l.precio * l.cantidad, 0),
    }),
    [lineas],
  );
  return <CarritoContext.Provider value={valor}>{children}</CarritoContext.Provider>;
}

function useCarrito(): CarritoContextValue {
  const ctx = useContext(CarritoContext);
  if (ctx === null) throw new Error("useCarrito debe usarse dentro de <CarritoProvider>");
  return ctx;
}

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Taza de café", precio: 8 },
  { id: 2, nombre: "Teclado mecánico", precio: 60 },
  { id: 3, nombre: "Pato de goma", precio: 5 },
];

function Tienda() {
  const { dispatch } = useCarrito();
  return (
    <div className="card">
      <h3>Tienda</h3>
      {PRODUCTOS.map((p) => (
        <div key={p.id} className="row" style={{ marginBottom: 6 }}>
          <span>
            {p.nombre} ({p.precio} €)
          </span>
          <button onClick={() => dispatch({ tipo: "agregar", producto: p })}>Añadir</button>
        </div>
      ))}
    </div>
  );
}

function Resumen() {
  const { lineas, total, dispatch } = useCarrito();
  return (
    <div className="card" style={{ marginTop: 12 }}>
      <h3>Carrito</h3>
      {lineas.length === 0 && <p className="muted">Vacío. Tu cartera respira tranquila.</p>}
      {lineas.map((l) => (
        <div key={l.id} className="row" style={{ marginBottom: 6 }}>
          <span>
            {l.nombre} x {l.cantidad}
          </span>
          <button
            className="secondary"
            onClick={() => dispatch({ tipo: "cambiarCantidad", id: l.id, cantidad: l.cantidad - 1 })}
          >
            -1
          </button>
          <button className="secondary" onClick={() => dispatch({ tipo: "quitar", id: l.id })}>
            Quitar
          </button>
        </div>
      ))}
      <p>Total: {total} €</p>
      <button className="secondary" disabled={lineas.length === 0} onClick={() => dispatch({ tipo: "vaciar" })}>
        Vaciar
      </button>
    </div>
  );
}

export default function App() {
  return (
    <CarritoProvider>
      <Tienda />
      <Resumen />
    </CarritoProvider>
  );
}
