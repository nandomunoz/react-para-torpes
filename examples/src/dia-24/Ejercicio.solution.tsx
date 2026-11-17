import { useEffect, useState } from "react";

type Estado<T> =
  | { status: "loading" }
  | { status: "error"; mensaje: string }
  | { status: "success"; data: T };

type Post = { id: number; title: string };

export default function App() {
  const [estado, setEstado] = useState<Estado<Post[]>>({ status: "loading" });
  // Cambiar este contador relanza el efecto: así funciona "Reintentar"
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    const controller = new AbortController();
    setEstado({ status: "loading" });

    fetch("https://jsonplaceholder.typicode.com/posts?_limit=5", { signal: controller.signal })
      .then((res) => {
        if (!res.ok) throw new Error(`HTTP ${res.status}`);
        return res.json() as Promise<Post[]>;
      })
      .then((data) => setEstado({ status: "success", data }))
      .catch((err: unknown) => {
        if (err instanceof DOMException && err.name === "AbortError") return;
        setEstado({ status: "error", mensaje: err instanceof Error ? err.message : "Error desconocido" });
      });

    return () => controller.abort();
  }, [intento]);

  if (estado.status === "loading") return <p className="muted">Cargando...</p>;

  if (estado.status === "error") {
    return (
      <div className="card">
        <p className="error">{estado.mensaje}</p>
        <button onClick={() => setIntento((n) => n + 1)}>Reintentar</button>
      </div>
    );
  }

  return (
    <ul className="card">
      {estado.data.map((p) => (
        <li key={p.id}>{p.title}</li>
      ))}
    </ul>
  );
}
