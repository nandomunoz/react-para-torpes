import { useState } from "react";

type EditorProps = {
  texto: string;
  onCambio: (texto: string) => void;
};

function Editor({ texto, onCambio }: EditorProps) {
  return (
    <textarea
      rows={3}
      value={texto}
      onChange={(e) => onCambio(e.target.value)}
      placeholder="Escribe algo..."
    />
  );
}

type TextoProps = {
  texto: string;
};

function Contador({ texto }: TextoProps) {
  const palabras = texto.trim() === "" ? 0 : texto.trim().split(/\s+/).length;
  return (
    <p className="muted">
      {texto.length} caracteres, {palabras} palabras
    </p>
  );
}

function VistaPrevia({ texto }: TextoProps) {
  if (texto === "") return <p className="muted">Nada que mostrar todavía.</p>;
  return <p>{texto.toUpperCase()}</p>;
}

export default function App() {
  // Estado elevado: el padre es la única fuente de verdad.
  const [texto, setTexto] = useState("");

  return (
    <div className="card">
      <h2>Editor con hermanos</h2>
      <Editor texto={texto} onCambio={setTexto} />
      <Contador texto={texto} />
      <VistaPrevia texto={texto} />
    </div>
  );
}
