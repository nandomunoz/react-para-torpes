import { useState } from "react";

type Usuario = {
  nombre: string;
  email: string;
};

type PerfilProps = {
  usuario: Usuario;
  onSalir: () => void;
};

type LoginProps = {
  onEntrar: () => void;
};

function Login({ onEntrar }: LoginProps) {
  return (
    <div className="card">
      <h2>Inicia sesión</h2>
      <p className="muted">Aún no has entrado.</p>
      <button onClick={onEntrar}>Entrar</button>
    </div>
  );
}

function Perfil({ usuario, onSalir }: PerfilProps) {
  return (
    <div className="card">
      <h2>Hola, {usuario.nombre}</h2>
      <p className="muted">{usuario.email}</p>
      <button className="secondary" onClick={onSalir}>
        Salir
      </button>
    </div>
  );
}

export default function App() {
  // null significa "nadie ha iniciado sesión"
  const [usuario, setUsuario] = useState<Usuario | null>(null);

  if (usuario === null) {
    return <Login onEntrar={() => setUsuario({ nombre: "Ana", email: "ana@ejemplo.com" })} />;
  }

  return <Perfil usuario={usuario} onSalir={() => setUsuario(null)} />;
}
