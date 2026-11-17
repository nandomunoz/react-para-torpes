import { useMemo, useRef, useState, type FormEvent } from "react";

type Gasto = { id: number; concepto: string; monto: number };

export default function App() {
  const [gastos, setGastos] = useState<Gasto[]>([]);
  const [concepto, setConcepto] = useState("");
  const [monto, setMonto] = useState("");
  const conceptoRef = useRef<HTMLInputElement>(null);

  const total = useMemo(() => gastos.reduce((suma, g) => suma + g.monto, 0), [gastos]);

  function agregar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const numero = Number(monto);
    if (concepto.trim() === "" || Number.isNaN(numero)) return;
    setGastos((g) => [...g, { id: Date.now(), concepto: concepto.trim(), monto: numero }]);
    setConcepto("");
    setMonto("");
    conceptoRef.current?.focus();
  }

  return (
    <div className="card">
      <form className="row" onSubmit={agregar}>
        <input
          ref={conceptoRef}
          value={concepto}
          onChange={(e) => setConcepto(e.target.value)}
          placeholder="Concepto"
        />
        <input
          value={monto}
          onChange={(e) => setMonto(e.target.value)}
          placeholder="Monto"
          inputMode="decimal"
          style={{ width: 90 }}
        />
        <button type="submit">Añadir</button>
      </form>
      <ul>
        {gastos.map((g) => (
          <li key={g.id}>
            {g.concepto}: {g.monto} €
          </li>
        ))}
      </ul>
      <p>Total: {total} €</p>
    </div>
  );
}
