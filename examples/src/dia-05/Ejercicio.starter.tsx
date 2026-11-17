import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

// Ejercicio: formulario de saludo que no permite enviar vacío.

export default function App() {
  const [nombre, setNombre] = useState<string>("");
  const [error, setError] = useState<string>("");
  void setNombre; // TODO: borra esta línea cuando uses setNombre
  void setError; // TODO: borra esta línea cuando uses setError

  function manejarCambio(e: ChangeEvent<HTMLInputElement>) {
    // TODO: guarda e.target.value en el estado
    void e;
  }

  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    // TODO: evita la recarga con preventDefault
    // TODO: si el nombre (sin espacios) está vacío, guarda un mensaje en error y sal
    // TODO: si no, limpia el error y muestra alert(`Hola, ${nombre}`)
    void e;
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
