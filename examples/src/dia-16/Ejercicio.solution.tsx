import { useCallback, useState } from "react";

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

function useContador(inicial: number, opciones: Opciones = {}): ContadorHook {
  const { min = -Infinity, max = Infinity, paso = 1 } = opciones;
  const [valor, setValor] = useState<number>(inicial);

  const incrementar = useCallback(() => setValor((v) => Math.min(max, v + paso)), [max, paso]);
  const decrementar = useCallback(() => setValor((v) => Math.max(min, v - paso)), [min, paso]);
  const reiniciar = useCallback(() => setValor(inicial), [inicial]);

  return { valor, incrementar, decrementar, reiniciar };
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
