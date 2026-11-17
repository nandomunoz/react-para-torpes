import { useMemo, useRef, useState } from "react";

// Cuenta primos hasta `limite`: a propósito, un cálculo algo pesado.
function contarPrimos(limite: number): number {
  let total = 0;
  for (let n = 2; n <= limite; n++) {
    let esPrimo = true;
    for (let d = 2; d * d <= n; d++) {
      if (n % d === 0) {
        esPrimo = false;
        break;
      }
    }
    if (esPrimo) total++;
  }
  return total;
}

export default function App() {
  // useRef con un elemento del DOM: empieza en null hasta que React lo monta.
  const inputRef = useRef<HTMLInputElement>(null);
  // useRef como "caja" mutable: cambiarla NO provoca render.
  const pulsaciones = useRef<number>(0);

  const [texto, setTexto] = useState("");
  const [mostradas, setMostradas] = useState(0);
  const [limite, setLimite] = useState(200000);
  const [clics, setClics] = useState(0);

  // useMemo: solo se recalcula si cambia `limite`, no si cambia `clics` o `texto`.
  const resultado = useMemo(
    () => ({ primos: contarPrimos(limite), hora: new Date().toLocaleTimeString("es") }),
    [limite],
  );

  return (
    <div>
      <div className="card">
        <h3>useRef</h3>
        <input
          ref={inputRef}
          value={texto}
          placeholder="Escribe algo"
          onChange={(e) => {
            pulsaciones.current += 1; // sin render extra
            setTexto(e.target.value);
          }}
        />
        <div className="row" style={{ marginTop: 8 }}>
          <button onClick={() => inputRef.current?.focus()}>Enfocar el input</button>
          <button className="secondary" onClick={() => setMostradas(pulsaciones.current)}>
            Leer pulsaciones
          </button>
        </div>
        <p className="muted">Pulsaciones leídas: {mostradas}</p>
      </div>

      <div className="card" style={{ marginTop: 12 }}>
        <h3>useMemo</h3>
        <p>
          Primos hasta {limite.toLocaleString("es")}: <strong>{resultado.primos}</strong>
        </p>
        <p className="muted">Calculado a las {resultado.hora}</p>
        <div className="row">
          <button onClick={() => setLimite((l) => l + 100000)}>Subir límite</button>
          <button className="secondary" onClick={() => setClics((c) => c + 1)}>
            Re-render ajeno ({clics})
          </button>
        </div>
      </div>
    </div>
  );
}
