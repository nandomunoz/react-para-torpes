import { useEffect, useState } from "react";

type Estado<T> =
  | { status: "loading" }
  | { status: "error"; mensaje: string }
  | { status: "success"; data: T };

type Post = { id: number; title: string };

export default function App() {
  const [estado, setEstado] = useState<Estado<Post[]>>({ status: "loading" });

  useEffect(() => {
    // TODO: crea un AbortController y pásalo a fetch con { signal }
    // TODO: pide https://jsonplaceholder.typicode.com/posts?_limit=5
    // TODO: si !res.ok lanza un Error; actualiza el estado en success y error
    // TODO: devuelve un cleanup que llame a controller.abort()
    setEstado({ status: "success", data: [] });
  }, []);

  // TODO: muestra loading, error (con un botón "Reintentar") o la lista de títulos
  return <pre className="card">{JSON.stringify(estado)}</pre>;
}
