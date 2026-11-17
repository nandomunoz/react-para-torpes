import { memo, useCallback, useEffect, useRef, useState } from "react";

// Cuenta cuántas veces se confirma (commit) un render del componente.
// Un efecto sin dependencias corre después de cada render.
// Nota: en desarrollo con StrictMode el primer valor puede ser 2. Es normal.
function useContadorRenders() {
  const spanRef = useRef<HTMLSpanElement>(null);
  const cuenta = useRef(0);
  useEffect(() => {
    cuenta.current += 1;
    if (spanRef.current) spanRef.current.textContent = String(cuenta.current);
  });
  return spanRef;
}

type HijoProps = {
  titulo: string;
  onGuardar: () => void;
};

function Cuerpo({ titulo, onGuardar }: HijoProps) {
  const contador = useContadorRenders();
  return (
    <div className="row" style={{ marginBottom: 6 }}>
      <button className="secondary" onClick={onGuardar}>
        {titulo}
      </button>
      <span className="muted">
        renders: <span ref={contador}>0</span>
      </span>
    </div>
  );
}

// 1) Hijo normal: se vuelve a renderizar siempre que lo hace el padre.
function HijoNormal(props: HijoProps) {
  return <Cuerpo {...props} />;
}

// 2) Hijo con memo: solo se renderiza si cambian sus props (comparación superficial).
const HijoMemo = memo(function HijoMemo(props: HijoProps) {
  return <Cuerpo {...props} />;
});

export default function App() {
  const [texto, setTexto] = useState("");
  const [guardados, setGuardados] = useState(0);

  // Función nueva en cada render del padre: rompe el memo.
  const guardarInestable = () => setGuardados((g) => g + 1);

  // Misma función entre renders: el memo puede hacer su trabajo.
  const guardarEstable = useCallback(() => setGuardados((g) => g + 1), []);

  return (
    <div className="card">
      <label htmlFor="texto">Escribe para forzar renders del padre</label>
      <input id="texto" value={texto} onChange={(e) => setTexto(e.target.value)} />
      <p>Guardados: {guardados}</p>

      <HijoNormal titulo="Sin memo" onGuardar={guardarEstable} />
      <HijoMemo titulo="memo + función inestable" onGuardar={guardarInestable} />
      <HijoMemo titulo="memo + useCallback" onGuardar={guardarEstable} />
    </div>
  );
}
