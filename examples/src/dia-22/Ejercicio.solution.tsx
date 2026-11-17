import { Link, MemoryRouter, Route, Routes, useParams } from "react-router";

type Usuario = { id: string; nombre: string; rol: string };

const USUARIOS: Usuario[] = [
  { id: "ana", nombre: "Ana", rol: "Frontend" },
  { id: "leo", nombre: "Leo", rol: "Backend" },
];

function Lista() {
  return (
    <ul>
      {USUARIOS.map((u) => (
        <li key={u.id}>
          <Link to={`/usuarios/${u.id}`}>{u.nombre}</Link>
        </li>
      ))}
    </ul>
  );
}

function Detalle() {
  const { id } = useParams<{ id: string }>();
  const usuario = USUARIOS.find((u) => u.id === id);

  if (!usuario) return <p className="error">Usuario no encontrado: {id}</p>;

  return (
    <div className="card">
      <h2>{usuario.nombre}</h2>
      <p className="muted">{usuario.rol}</p>
      <Link to="/">← Volver a la lista</Link>
    </div>
  );
}

export default function App() {
  return (
    <MemoryRouter>
      <nav className="row">
        <Link to="/">Inicio</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Lista />} />
        <Route path="/usuarios/:id" element={<Detalle />} />
        <Route path="*" element={<p className="error">404</p>} />
      </Routes>
    </MemoryRouter>
  );
}
