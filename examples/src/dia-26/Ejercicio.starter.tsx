import { useEffect, useRef, useState } from "react";
// TODO: importa memo y useCallback

function useContadorRenders() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const veces = useRef(0);
  useEffect(() => {
    veces.current += 1;
    if (spanRef.current) spanRef.current.textContent = String(veces.current);
  });
  useEffect(
    () => () => {
      veces.current = 0;
    },
    [],
  );
  return spanRef;
}

type Contacto = { id: number; nombre: string; favorito: boolean };

type FilaProps = { contacto: Contacto; onAlternar: (id: number) => void };

// TODO: envuelve Fila en memo para que no se renderice si sus props no cambian
function Fila({ contacto, onAlternar }: FilaProps) {
  const ref = useContadorRenders();
  return (
    <li>
      <button className="secondary" onClick={() => onAlternar(contacto.id)}>
        {contacto.favorito ? "★" : "☆"}
      </button>{" "}
      {contacto.nombre} <span className="muted">renders: <span ref={ref}>0</span></span>
    </li>
  );
}

export default function App() {
  const [contactos, setContactos] = useState<Contacto[]>([
    { id: 1, nombre: "Ana", favorito: false },
    { id: 2, nombre: "Leo", favorito: false },
    { id: 3, nombre: "Eva", favorito: false },
  ]);
  const [ruido, setRuido] = useState(0);

  // TODO: estabiliza esta función con useCallback (pista: usa la forma funcional de setContactos)
  const alternar = (id: number) => {
    setContactos(contactos.map((c) => (c.id === id ? { ...c, favorito: !c.favorito } : c)));
  };

  return (
    <div className="card">
      <button onClick={() => setRuido((n) => n + 1)}>Re-renderizar padre ({ruido})</button>
      <ul>
        {contactos.map((c) => (
          <Fila key={c.id} contacto={c} onAlternar={alternar} />
        ))}
      </ul>
    </div>
  );
}
