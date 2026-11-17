import { useState } from "react";
import type { ReactNode } from "react";

type Producto = {
  id: number;
  categoria: string;
  nombre: string;
  precio: number;
  stock: boolean;
};

const productos: Producto[] = [
  { id: 1, categoria: "Frutas", nombre: "Manzana", precio: 1, stock: true },
  { id: 2, categoria: "Frutas", nombre: "Fruta del dragón", precio: 3, stock: true },
  { id: 3, categoria: "Frutas", nombre: "Maracuyá", precio: 2, stock: false },
  { id: 4, categoria: "Verduras", nombre: "Espinaca", precio: 2, stock: true },
  { id: 5, categoria: "Verduras", nombre: "Calabaza", precio: 4, stock: false },
  { id: 6, categoria: "Verduras", nombre: "Guisantes", precio: 1, stock: true },
];

// Paso 2 de "Pensando en React": jerarquía de componentes.
function FilaCategoria({ categoria }: { categoria: string }) {
  return (
    <tr>
      <th colSpan={2} style={{ textAlign: "left", paddingTop: 8 }}>
        {categoria}
      </th>
    </tr>
  );
}

function FilaProducto({ producto }: { producto: Producto }) {
  return (
    <tr style={{ color: producto.stock ? undefined : "#ff4d4d" }}>
      <td>{producto.nombre}</td>
      <td>{producto.precio} €</td>
    </tr>
  );
}

type TablaProps = {
  productos: Producto[];
  texto: string;
  soloStock: boolean;
};

function TablaProductos({ productos, texto, soloStock }: TablaProps) {
  const filas: ReactNode[] = [];
  let ultimaCategoria = "";

  productos.forEach((p) => {
    if (!p.nombre.toLowerCase().includes(texto.toLowerCase())) return;
    if (soloStock && !p.stock) return;
    if (p.categoria !== ultimaCategoria) {
      filas.push(<FilaCategoria key={p.categoria} categoria={p.categoria} />);
      ultimaCategoria = p.categoria;
    }
    filas.push(<FilaProducto key={p.id} producto={p} />);
  });

  if (filas.length === 0) return <p className="muted">Sin resultados.</p>;

  return (
    <table style={{ width: "100%" }}>
      <thead>
        <tr>
          <th style={{ textAlign: "left" }}>Nombre</th>
          <th style={{ textAlign: "left" }}>Precio</th>
        </tr>
      </thead>
      <tbody>{filas}</tbody>
    </table>
  );
}

type BarraProps = {
  texto: string;
  soloStock: boolean;
  onTexto: (t: string) => void;
  onSoloStock: (v: boolean) => void;
};

function BarraBusqueda({ texto, soloStock, onTexto, onSoloStock }: BarraProps) {
  return (
    <form onSubmit={(e) => e.preventDefault()}>
      <input
        value={texto}
        placeholder="Buscar..."
        onChange={(e) => onTexto(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={soloStock}
          onChange={(e) => onSoloStock(e.target.checked)}
        />{" "}
        Solo con stock
      </label>
    </form>
  );
}

export default function App() {
  // Paso 4: el estado mínimo (filtros) vive en el ancestro común.
  const [texto, setTexto] = useState("");
  const [soloStock, setSoloStock] = useState(false);

  return (
    <div className="card">
      <h2>Tienda</h2>
      <BarraBusqueda
        texto={texto}
        soloStock={soloStock}
        onTexto={setTexto}
        onSoloStock={setSoloStock}
      />
      <TablaProductos productos={productos} texto={texto} soloStock={soloStock} />
    </div>
  );
}
