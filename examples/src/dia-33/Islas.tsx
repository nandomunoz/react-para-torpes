import { useState } from "react";

// Demostración conceptual: en Next.js, la página es HTML "ya cocinado" (Server Component)
// y solo las partes interactivas se hidratan (Client Components, las "islas").

type Producto = { id: number; nombre: string; precio: number };

const PRODUCTOS: Producto[] = [
  { id: 1, nombre: "Taza que dice 'no molestar'", precio: 9 },
  { id: 2, nombre: "Pegatinas de React", precio: 4 },
  { id: 3, nombre: "Calcetines con tipos", precio: 12 },
];

// "Servidor": solo recibe datos y devuelve marcado. Sin useState ni onClick.
function ListaProductos({ productos }: { productos: Producto[] }) {
  return (
    <ul>
      {productos.map((p) => (
        <li key={p.id}>
          {p.nombre} <span className="muted">({p.precio} €)</span>
        </li>
      ))}
    </ul>
  );
}

// "Cliente": la isla interactiva. Aquí sí hay estado y eventos.
function BotonMeGusta() {
  const [likes, setLikes] = useState(0);
  return (
    <button type="button" onClick={() => setLikes((n) => n + 1)}>
      ❤️ Me gusta ({likes})
    </button>
  );
}

export default function App() {
  return (
    <div className="card">
      <h2>Tienda (parte servidor)</h2>
      <ListaProductos productos={PRODUCTOS} />
      <p className="muted">Arriba no hay estado. Abajo, una isla interactiva:</p>
      <div className="row">
        <BotonMeGusta />
      </div>
    </div>
  );
}
