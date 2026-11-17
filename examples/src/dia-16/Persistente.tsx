import { useCallback, useEffect, useState, type Dispatch, type SetStateAction } from "react";

// Hook genérico: T lo decide quien lo usa, y el valor devuelto conserva ese tipo.
function useLocalStorage<T>(clave: string, inicial: T): [T, Dispatch<SetStateAction<T>>] {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado !== null ? (JSON.parse(guardado) as T) : inicial;
    } catch {
      return inicial; // JSON roto o localStorage bloqueado
    }
  });

  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // Sin almacenamiento: la app sigue funcionando sin persistir
    }
  }, [clave, valor]);

  return [valor, setValor];
}

// Hook pequeño: devuelve una tupla, igual que useState.
function useToggle(inicial = false): [boolean, () => void] {
  const [activo, setActivo] = useState<boolean>(inicial);
  const alternar = useCallback(() => setActivo((a) => !a), []);
  return [activo, alternar];
}

type Preferencias = {
  nombre: string;
  visitas: number;
};

export default function App() {
  const [prefs, setPrefs] = useLocalStorage<Preferencias>("dia16-prefs", {
    nombre: "",
    visitas: 0,
  });
  const [detalle, alternarDetalle] = useToggle(false);

  return (
    <div className="card">
      <label htmlFor="nombre">Tu nombre (se guarda en este navegador)</label>
      <input
        id="nombre"
        value={prefs.nombre}
        onChange={(e) => setPrefs({ ...prefs, nombre: e.target.value })}
      />
      <p>Hola, {prefs.nombre || "persona misteriosa"}.</p>
      <div className="row">
        <button onClick={() => setPrefs((p) => ({ ...p, visitas: p.visitas + 1 }))}>
          Visitas: {prefs.visitas}
        </button>
        <button className="secondary" onClick={alternarDetalle}>
          {detalle ? "Ocultar" : "Ver"} JSON guardado
        </button>
      </div>
      {detalle && <pre className="muted">{JSON.stringify(prefs, null, 2)}</pre>}
    </div>
  );
}
