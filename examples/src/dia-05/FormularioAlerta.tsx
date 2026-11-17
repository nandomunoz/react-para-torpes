import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

export default function App() {
  const [texto, setTexto] = useState<string>("");

  // El evento de un input es ChangeEvent<HTMLInputElement>
  function manejarCambio(e: ChangeEvent<HTMLInputElement>) {
    setTexto(e.target.value);
  }

  // El evento de un formulario es FormEvent<HTMLFormElement>
  function manejarEnvio(e: FormEvent<HTMLFormElement>) {
    e.preventDefault(); // evita que la página se recargue
    alert(`Escribiste: ${texto}`);
    setTexto("");
  }

  return (
    <form className="card" onSubmit={manejarEnvio}>
      <label htmlFor="mensaje">Tu mensaje</label>
      <div className="row">
        <input id="mensaje" value={texto} onChange={manejarCambio} placeholder="Escribe algo" />
        <button type="submit">Enviar</button>
      </div>
    </form>
  );
}
