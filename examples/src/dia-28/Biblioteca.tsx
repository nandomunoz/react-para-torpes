import { createContext, useCallback, useContext, useEffect, useMemo, useReducer, useState } from "react";
import type { FormEvent, ReactNode } from "react";
import { Link, MemoryRouter, Route, Routes, useNavigate, useParams } from "react-router";

/* ---------- 1. Tipos ---------- */
type LibroForm = { titulo: string; autor: string };
type Libro = LibroForm & { id: number; leido: boolean };

/* ---------- 2. API simulada (en memoria, funciona offline) ---------- */
let baseDeDatos: Libro[] = [
  { id: 1, titulo: "Eloquent JavaScript", autor: "Marijn Haverbeke", leido: true },
  { id: 2, titulo: "Aprendiendo React", autor: "Alex Banks", leido: false },
];
let siguienteId = 3;
let simularFallos = false;

const esperar = (ms: number) => new Promise<void>((resolve) => setTimeout(resolve, ms));

// Todas las funciones tardan un poco y pueden fallar, como una API real
async function simular<T>(accion: () => T): Promise<T> {
  await esperar(500);
  if (simularFallos) throw new Error("Fallo de red simulado");
  return accion();
}

const api = {
  listar: () => simular(() => baseDeDatos.map((l) => ({ ...l }))),
  crear: (datos: LibroForm) =>
    simular(() => {
      const libro: Libro = { ...datos, id: siguienteId++, leido: false };
      baseDeDatos = [...baseDeDatos, libro];
      return { ...libro };
    }),
  actualizar: (id: number, cambios: Partial<Libro>) =>
    simular(() => {
      const actual = baseDeDatos.find((l) => l.id === id);
      if (!actual) throw new Error("El libro no existe");
      const nuevo = { ...actual, ...cambios, id };
      baseDeDatos = baseDeDatos.map((l) => (l.id === id ? nuevo : l));
      return { ...nuevo };
    }),
  borrar: (id: number) =>
    simular(() => {
      baseDeDatos = baseDeDatos.filter((l) => l.id !== id);
    }),
};

const mensajeDe = (err: unknown) => (err instanceof Error ? err.message : "Error desconocido");

/* ---------- 3. Estado global con useReducer + contexto ---------- */
type Estado =
  | { status: "loading" }
  | { status: "error"; mensaje: string }
  | { status: "ready"; libros: Libro[] };

type Accion =
  | { type: "cargando" }
  | { type: "fallo"; mensaje: string }
  | { type: "cargado"; libros: Libro[] }
  | { type: "agregado"; libro: Libro }
  | { type: "actualizado"; libro: Libro }
  | { type: "borrado"; id: number };

function reducer(estado: Estado, accion: Accion): Estado {
  switch (accion.type) {
    case "cargando":
      return { status: "loading" };
    case "fallo":
      return { status: "error", mensaje: accion.mensaje };
    case "cargado":
      return { status: "ready", libros: accion.libros };
  }
  // Las demás acciones solo tienen sentido con datos cargados
  if (estado.status !== "ready") return estado;
  switch (accion.type) {
    case "agregado":
      return { status: "ready", libros: [...estado.libros, accion.libro] };
    case "actualizado":
      return { status: "ready", libros: estado.libros.map((l) => (l.id === accion.libro.id ? accion.libro : l)) };
    case "borrado":
      return { status: "ready", libros: estado.libros.filter((l) => l.id !== accion.id) };
  }
}

type Contexto = {
  estado: Estado;
  recargar: () => void;
  crear: (datos: LibroForm) => Promise<void>;
  editar: (id: number, datos: LibroForm) => Promise<void>;
  alternarLeido: (libro: Libro) => Promise<void>;
  borrar: (id: number) => Promise<void>;
};

const BibliotecaContext = createContext<Contexto | null>(null);

function useBiblioteca(): Contexto {
  const ctx = useContext(BibliotecaContext);
  if (!ctx) throw new Error("useBiblioteca debe usarse dentro de <BibliotecaProvider>");
  return ctx;
}

function BibliotecaProvider({ children }: { children: ReactNode }) {
  const [estado, dispatch] = useReducer(reducer, { status: "loading" });
  const [intento, setIntento] = useState(0);

  useEffect(() => {
    let cancelado = false;
    dispatch({ type: "cargando" });
    api
      .listar()
      .then((libros) => !cancelado && dispatch({ type: "cargado", libros }))
      .catch((err: unknown) => !cancelado && dispatch({ type: "fallo", mensaje: mensajeDe(err) }));
    return () => {
      cancelado = true;
    };
  }, [intento]);

  const recargar = useCallback(() => setIntento((n) => n + 1), []);

  const valor = useMemo<Contexto>(
    () => ({
      estado,
      recargar,
      // Si la API falla, la promesa se rechaza y quien llama decide qué mostrar
      crear: async (datos) => dispatch({ type: "agregado", libro: await api.crear(datos) }),
      editar: async (id, datos) => dispatch({ type: "actualizado", libro: await api.actualizar(id, datos) }),
      alternarLeido: async (libro) =>
        dispatch({ type: "actualizado", libro: await api.actualizar(libro.id, { leido: !libro.leido }) }),
      borrar: async (id) => {
        await api.borrar(id);
        dispatch({ type: "borrado", id });
      },
    }),
    [estado, recargar],
  );

  return <BibliotecaContext.Provider value={valor}>{children}</BibliotecaContext.Provider>;
}

/* ---------- 4. Formulario con validación ---------- */
type Errores = Partial<Record<keyof LibroForm, string>>;

function validar({ titulo, autor }: LibroForm): Errores {
  const errores: Errores = {};
  if (titulo.trim().length < 3) errores.titulo = "El título necesita al menos 3 caracteres";
  if (!autor.trim()) errores.autor = "El autor es obligatorio";
  return errores;
}

type FormularioProps = {
  inicial: LibroForm;
  etiqueta: string;
  onGuardar: (datos: LibroForm) => Promise<void>;
};

function Formulario({ inicial, etiqueta, onGuardar }: FormularioProps) {
  const [datos, setDatos] = useState<LibroForm>(inicial);
  const [errores, setErrores] = useState<Errores>({});
  const [guardando, setGuardando] = useState(false);
  const [errorEnvio, setErrorEnvio] = useState<string | null>(null);
  const navigate = useNavigate();

  async function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const encontrados = validar(datos);
    setErrores(encontrados);
    if (Object.keys(encontrados).length > 0) return;

    setGuardando(true);
    setErrorEnvio(null);
    try {
      await onGuardar({ titulo: datos.titulo.trim(), autor: datos.autor.trim() });
      navigate("/");
    } catch (err) {
      setErrorEnvio(mensajeDe(err));
      setGuardando(false);
    }
  }

  return (
    <form className="card" onSubmit={enviar} noValidate>
      <label htmlFor="titulo">Título</label>
      <input id="titulo" value={datos.titulo} onChange={(e) => setDatos({ ...datos, titulo: e.target.value })} />
      {errores.titulo && <p className="error">{errores.titulo}</p>}

      <label htmlFor="autor">Autor</label>
      <input id="autor" value={datos.autor} onChange={(e) => setDatos({ ...datos, autor: e.target.value })} />
      {errores.autor && <p className="error">{errores.autor}</p>}

      {errorEnvio && <p className="error">No se pudo guardar: {errorEnvio}</p>}

      <div className="row" style={{ marginTop: 12 }}>
        <button type="submit" disabled={guardando}>
          {guardando ? "Guardando..." : etiqueta}
        </button>
        <Link to="/">Cancelar</Link>
      </div>
    </form>
  );
}

/* ---------- 5. Páginas ---------- */
function Estados({ children }: { children: (libros: Libro[]) => ReactNode }) {
  const { estado, recargar } = useBiblioteca();

  if (estado.status === "loading") return <p className="muted">Cargando biblioteca...</p>;
  if (estado.status === "error") {
    return (
      <div className="card">
        <p className="error">No se pudo cargar: {estado.mensaje}</p>
        <button onClick={recargar}>Reintentar</button>
      </div>
    );
  }
  return <>{children(estado.libros)}</>;
}

function ListaLibros() {
  const { alternarLeido, borrar } = useBiblioteca();
  const [ocupado, setOcupado] = useState<number | null>(null);
  const [errorAccion, setErrorAccion] = useState<string | null>(null);

  async function ejecutar(id: number, accion: () => Promise<void>) {
    setOcupado(id);
    setErrorAccion(null);
    try {
      await accion();
    } catch (err) {
      setErrorAccion(mensajeDe(err));
    } finally {
      setOcupado(null);
    }
  }

  return (
    <Estados>
      {(libros) => (
        <>
          {errorAccion && <p className="error">{errorAccion}</p>}
          {libros.length === 0 && <p className="muted">No hay libros. Añade el primero.</p>}
          <ul style={{ listStyle: "none", padding: 0 }}>
            {libros.map((libro) => (
              <li key={libro.id} className="card row" style={{ marginBottom: 8 }}>
                <span style={{ flex: 1, textDecoration: libro.leido ? "line-through" : "none" }}>
                  {libro.titulo} <span className="muted">de {libro.autor}</span>
                </span>
                <button
                  className="secondary"
                  disabled={ocupado === libro.id}
                  onClick={() => ejecutar(libro.id, () => alternarLeido(libro))}
                >
                  {libro.leido ? "Marcar pendiente" : "Marcar leído"}
                </button>
                <Link to={`/editar/${libro.id}`}>Editar</Link>
                <button
                  className="secondary"
                  disabled={ocupado === libro.id}
                  onClick={() => ejecutar(libro.id, () => borrar(libro.id))}
                >
                  Borrar
                </button>
              </li>
            ))}
          </ul>
        </>
      )}
    </Estados>
  );
}

function PaginaNuevo() {
  const { crear } = useBiblioteca();
  return <Formulario inicial={{ titulo: "", autor: "" }} etiqueta="Crear libro" onGuardar={crear} />;
}

function PaginaEditar() {
  const { id } = useParams<{ id: string }>();
  const { editar } = useBiblioteca();

  return (
    <Estados>
      {(libros) => {
        const libro = libros.find((l) => l.id === Number(id));
        if (!libro) return <p className="error">Ese libro no existe.</p>;
        return (
          <Formulario
            inicial={{ titulo: libro.titulo, autor: libro.autor }}
            etiqueta="Guardar cambios"
            onGuardar={(datos) => editar(libro.id, datos)}
          />
        );
      }}
    </Estados>
  );
}

/* ---------- 6. Aplicación ---------- */
export default function App() {
  const [fallos, setFallos] = useState(false);

  return (
    <MemoryRouter>
      <BibliotecaProvider>
        <header className="row" style={{ marginBottom: 12 }}>
          <h2 style={{ margin: 0, flex: 1 }}>Mi biblioteca</h2>
          <Link to="/">Lista</Link>
          <Link to="/nuevo">Nuevo</Link>
          <label className="row" style={{ margin: 0 }}>
            <input
              type="checkbox"
              checked={fallos}
              onChange={(e) => {
                simularFallos = e.target.checked;
                setFallos(e.target.checked);
              }}
            />
            Simular fallos
          </label>
        </header>
        <Routes>
          <Route path="/" element={<ListaLibros />} />
          <Route path="/nuevo" element={<PaginaNuevo />} />
          <Route path="/editar/:id" element={<PaginaEditar />} />
          <Route path="*" element={<p className="error">404</p>} />
        </Routes>
      </BibliotecaProvider>
    </MemoryRouter>
  );
}
