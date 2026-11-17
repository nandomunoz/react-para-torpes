import { useState } from "react";
import type { ChangeEvent } from "react";

type Escala = "c" | "f";

// Funciones puras de conversión.
const aFahrenheit = (c: number) => (c * 9) / 5 + 32;
const aCelsius = (f: number) => ((f - 32) * 5) / 9;

function convertir(texto: string, desde: (n: number) => number): string {
  const n = parseFloat(texto);
  if (Number.isNaN(n)) return "";
  return String(Math.round(desde(n) * 100) / 100);
}

type EntradaProps = {
  escala: Escala;
  valor: string;
  onCambio: (valor: string) => void;
};

// Hijo "tonto": no guarda estado, solo muestra y avisa al padre.
function Entrada({ escala, valor, onCambio }: EntradaProps) {
  const nombre = escala === "c" ? "Celsius" : "Fahrenheit";
  return (
    <div>
      <label>{nombre}</label>
      <input
        value={valor}
        onChange={(e: ChangeEvent<HTMLInputElement>) => onCambio(e.target.value)}
      />
    </div>
  );
}

export default function App() {
  // El estado vive en el padre: la última escala editada y su texto.
  const [escala, setEscala] = useState<Escala>("c");
  const [texto, setTexto] = useState("");

  // El valor del otro campo se deriva, no se guarda.
  const celsius = escala === "c" ? texto : convertir(texto, aCelsius);
  const fahrenheit = escala === "f" ? texto : convertir(texto, aFahrenheit);

  return (
    <div className="card">
      <h2>Conversor de temperatura</h2>
      <div className="row">
        <Entrada
          escala="c"
          valor={celsius}
          onCambio={(v) => {
            setEscala("c");
            setTexto(v);
          }}
        />
        <Entrada
          escala="f"
          valor={fahrenheit}
          onCambio={(v) => {
            setEscala("f");
            setTexto(v);
          }}
        />
      </div>
      <p className="muted">
        {celsius === "" ? "Escribe un número en cualquiera de los dos." : `${celsius} °C = ${fahrenheit} °F`}
      </p>
    </div>
  );
}
