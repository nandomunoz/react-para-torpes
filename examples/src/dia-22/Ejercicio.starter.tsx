import { Link, MemoryRouter, Route, Routes, useParams } from "react-router";

type Usuario = { id: string; nombre: string; rol: string };

const USUARIOS: Usuario[] = [
  { id: "ana", nombre: "Ana", rol: "Frontend" },
  { id: "leo", nombre: "Leo", rol: "Backend" },
];

function Lista() {
  // TODO: muestra un Link por usuario hacia /usuarios/:id
  return <p className="muted">Sin enlaces todavía.</p>;
}

function Detalle() {
  // TODO: lee el parámetro "id" con useParams tipado y busca el usuario
  // TODO: si no existe, muestra un mensaje de error
  return <p className="muted">Sin detalle todavía.</p>;
}

export default function App() {
  return (
    <MemoryRouter>
      <nav className="row">
        <Link to="/">Inicio</Link>
      </nav>
      <Routes>
        <Route path="/" element={<Lista />} />
        {/* TODO: añade la ruta /usuarios/:id y una ruta comodín 404 */}
      </Routes>
    </MemoryRouter>
  );
}
