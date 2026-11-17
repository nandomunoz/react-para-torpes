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

type ContadorProps = {
  texto: string;
};

function Contador({ texto }: ContadorProps) {
  // TODO: muestra cuántos caracteres y cuántas palabras tiene `texto`
  return <p className="muted">Contador pendiente</p>;
}

function VistaPrevia({ texto }: ContadorProps) {
  // TODO: muestra el texto en mayúsculas (o un aviso si está vacío)
  return <p>Vista previa pendiente</p>;
}

export default function App() {
  // TODO: el texto debe vivir aquí, en el padre, y pasarse a los tres hijos
  return (
    <div className="card">
      <h2>Editor con hermanos</h2>
      <Editor texto="" onCambio={() => {}} />
      <Contador texto="" />
      <VistaPrevia texto="" />
    </div>
  );
}
