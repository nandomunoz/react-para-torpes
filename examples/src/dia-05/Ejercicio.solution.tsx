import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function App() {
  const [nombre, setNombre] = useState<string>("");
  const [error, setError] = useState<string>("");

  function manejarCambio(e: ChangeEvent<HTMLInputElement>) {
    setNombre(e.target.value);
  }

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    if (nombre.trim() === "") {
      setError("Escribe tu nombre primero");
      return;
    }
    setError("");
    alert(`Hola, ${nombre}`);
  }

  return (
    <form className="card" onSubmit={manejarEnvio}>
      <label htmlFor="nombre">Tu nombre</label>
      <div className="row">
        <input id="nombre" value={nombre} onChange={manejarCambio} />
        <button type="submit">Saludar</button>
      </div>
      {error && <p className="error">{error}</p>}
    </form>
  );
}
