import { useEffect, useState } from "react";

// Unión discriminada: cada estado lleva solo los datos que le tocan
type Estado<T> =
  | { status: "loading" }
  | { status: "error"; mensaje: string }
  | { status: "success"; data: T };

// Hook genérico: T es el tipo de datos que devuelve la URL
function useFetch<T>(url: string): Estado<T> {
  const [estado, setEstado] = useState<Estado<T>>({ status: "loading" });

  useEffect(() => {
    const controller = new AbortController();
    setEstado({ status: "loading" });

    fetch(url, { signal: controller.signal })
      .then((res) => {
        // fetch NO lanza error con 404 o 500: hay que comprobarlo
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<T>;
      })
      .then((data) => setEstado({ status: "success", data }))
      .catch((err: unknown) => {
        // Cancelar es normal (cleanup / StrictMode): no es un error
        if (err instanceof DOMException && err.name === "AbortError") return;
        setEstado({ status: "error", mensaje: err instanceof Error ? err.message : "Error desconocido" });
      });

    // Cleanup: cancela la petición si cambia la URL o se desmonta
    return () => controller.abort();
  }, [url]);

  return estado;
}

type Usuario = { id: number; name: string; email: string; phone: string };

const API = "https://jsonplaceholder.typicode.com";

function FichaUsuario({ id }: { id: number }) {
  const estado = useFetch<Usuario>(`${API}/users/${id}`);

  // TypeScript afina el tipo dentro de cada rama
  switch (estado.status) {
    case "loading":
      return <p className="muted">Cargando...</p>;
    case "error":
      return <p className="error">Algo falló: {estado.mensaje}</p>;
    case "success":
      return (
        <div>
          <h3>{estado.data.name}</h3>
          <p className="muted">{estado.data.email}</p>
          <p>{estado.data.phone}</p>
        </div>
      );
  }
}

export default function App() {
  const [id, setId] = useState(1);

  return (
    <div className="card">
      <div className="row" style={{ marginBottom: 12 }}>
        <button className="secondary" disabled={id <= 1} onClick={() => setId(id - 1)}>
          Anterior
        </button>
        <span>Usuario {id}</span>
        <button className="secondary" disabled={id >= 10} onClick={() => setId(id + 1)}>
          Siguiente
        </button>
        {/* El usuario 999 no existe: devuelve 404 y verás el estado de error */}
        <button className="secondary" onClick={() => setId(999)}>
          Provocar error
        </button>
      </div>
      <FichaUsuario id={id} />
    </div>
  );
}
