import { Link, MemoryRouter, NavLink, Outlet, Route, Routes, useParams } from "react-router";

type Producto = { id: string; nombre: string; precio: number };

const PRODUCTOS: Producto[] = [
  { id: "1", nombre: "Taza anti-bugs", precio: 12 },
  { id: "2", nombre: "Teclado silencioso", precio: 45 },
  { id: "3", nombre: "Pato de goma", precio: 5 },
];

// Layout: la barra se queda y <Outlet /> pinta la ruta hija activa
function Layout() {
  const estilo = ({ isActive }: { isActive: boolean }) => ({
    fontWeight: isActive ? 700 : 400,
  });
  return (
    <div className="card">
      <nav className="row" style={{ marginBottom: 12 }}>
        <NavLink to="/" end style={estilo}>
          Inicio
        </NavLink>
        <NavLink to="/productos" style={estilo}>
          Productos
        </NavLink>
      </nav>
      <Outlet />
    </div>
  );
}

function Inicio() {
  return (
    <>
      <h2>Inicio</h2>
      <p className="muted">Navega sin recargar la página.</p>
    </>
  );
}

function Productos() {
  return (
    <>
      <h2>Productos</h2>
      <ul>
        {PRODUCTOS.map((p) => (
          <li key={p.id}>
            <Link to={`/productos/${p.id}`}>{p.nombre}</Link>
          </li>
        ))}
      </ul>
    </>
  );
}

function ProductoDetalle() {
  // El genérico dice qué parámetros existen en la ruta
  const { id } = useParams<{ id: string }>();
  const producto = PRODUCTOS.find((p) => p.id === id);

  if (!producto) return <p className="error">No existe el producto {id}</p>;

  return (
    <>
      <h2>{producto.nombre}</h2>
      <p>Precio: {producto.precio} €</p>
      <Link to="/productos">← Volver</Link>
    </>
  );
}

function NoEncontrada() {
  return <p className="error">404: aquí no hay nada, torpe.</p>;
}

export default function App() {
  // MemoryRouter guarda la URL en memoria: ideal para Sandpack
  return (
    <MemoryRouter initialEntries={["/"]}>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route index element={<Inicio />} />
          <Route path="productos" element={<Productos />} />
          <Route path="productos/:id" element={<ProductoDetalle />} />
          <Route path="*" element={<NoEncontrada />} />
        </Route>
      </Routes>
    </MemoryRouter>
  );
}
