import { useState } from "react";

type Opciones = {
  min?: number;
  max?: number;
  paso?: number;
};

type ContadorHook = {
  valor: number;
  incrementar: () => void;
  decrementar: () => void;
  reiniciar: () => void;
};

// TODO 1: usa useState<number> con `inicial` como valor de partida.
// TODO 2: `incrementar` suma `paso` (por defecto 1) sin pasar de `max`.
// TODO 3: `decrementar` resta `paso` sin bajar de `min`.
// TODO 4: `reiniciar` vuelve a `inicial`.
function useContador(inicial: number, opciones: Opciones = {}): ContadorHook {
  const [valor] = useState<number>(inicial);
  return {
    valor,
    incrementar: () => {},
    decrementar: () => {},
    reiniciar: () => {},
  };
}

export default function App() {
  const { valor, incrementar, decrementar, reiniciar } = useContador(5, { min: 0, max: 10, paso: 2 });

  return (
    <div className="card">
      <h2>{valor}</h2>
      <p className="muted">Entre 0 y 10, de 2 en 2</p>
      <div className="row">
        <button onClick={decrementar}>-2</button>
        <button onClick={incrementar}>+2</button>
        <button className="secondary" onClick={reiniciar}>
          Reiniciar
        </button>
      </div>
    </div>
  );
}
