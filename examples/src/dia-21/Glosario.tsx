import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useReducer,
  useState,
  type ChangeEvent,
  type Dispatch,
  type ReactNode,
} from "react";

/* ---------- Datos ---------- */

type Categoria = "Hooks" | "Estado" | "Componentes" | "Rendimiento";
type CategoriaFiltro = Categoria | "Todas";

type Termino = { id: number; nombre: string; categoria: Categoria; descripcion: string };

const CATEGORIAS: readonly Categoria[] = ["Hooks", "Estado", "Componentes", "Rendimiento"];

const TERMINOS: readonly Termino[] = [
  { id: 1, nombre: "useState", categoria: "Hooks", descripcion: "Guarda un valor que, al cambiar, vuelve a renderizar." },
  { id: 2, nombre: "useEffect", categoria: "Hooks", descripcion: "Sincroniza el componente con algo externo." },
  { id: 3, nombre: "useContext", categoria: "Hooks", descripcion: "Lee un valor compartido sin pasar props." },
  { id: 4, nombre: "useReducer", categoria: "Hooks", descripcion: "Estado complejo con acciones explícitas." },
  { id: 5, nombre: "useRef", categoria: "Hooks", descripcion: "Caja mutable que no provoca renders." },
  { id: 6, nombre: "useMemo", categoria: "Rendimiento", descripcion: "Recuerda un cálculo entre renders." },
  { id: 7, nombre: "useCallback", categoria: "Rendimiento", descripcion: "Recuerda una función entre renders." },
  { id: 8, nombre: "memo", categoria: "Rendimiento", descripcion: "Salta el render si las props no cambiaron." },
  { id: 9, nombre: "Props", categoria: "Componentes", descripcion: "Datos que un padre pasa a su hijo." },
  { id: 10, nombre: "Children", categoria: "Componentes", descripcion: "Contenido anidado dentro de un componente." },
  { id: 11, nombre: "Key", categoria: "Componentes", descripcion: "Identidad estable de cada elemento de una lista." },
  { id: 12, nombre: "Fragmento", categoria: "Componentes", descripcion: "Agrupa elementos sin añadir nodos al DOM." },
  { id: 13, nombre: "Estado derivado", categoria: "Estado", descripcion: "Se calcula en el render, no se guarda." },
  { id: 14, nombre: "Elevar estado", categoria: "Estado", descripcion: "Subir el estado al ancestro común." },
  { id: 15, nombre: "Inmutabilidad", categoria: "Estado", descripcion: "Se crea un valor nuevo en vez de mutar el viejo." },
  { id: 16, nombre: "Provider", categoria: "Estado", descripcion: "Componente que ofrece el valor de un contexto." },
  { id: 17, nombre: "Acción", categoria: "Estado", descripcion: "Objeto que describe qué pasó, para el reducer." },
  { id: 18, nombre: "Cleanup", categoria: "Hooks", descripcion: "Función que deshace lo que hizo un efecto." },
  { id: 19, nombre: "StrictMode", categoria: "Componentes", descripcion: "Modo de desarrollo que duplica renders y efectos." },
  { id: 20, nombre: "Hook personalizado", categoria: "Hooks", descripcion: "Función useX que reutiliza lógica con hooks." },
  { id: 21, nombre: "Dependencias", categoria: "Hooks", descripcion: "Lista que decide cuándo se reejecuta un efecto." },
  { id: 22, nombre: "Render", categoria: "Rendimiento", descripcion: "Llamar al componente para obtener su UI." },
  { id: 23, nombre: "Memoización", categoria: "Rendimiento", descripcion: "Reutilizar un resultado previo si la entrada es igual." },
  { id: 24, nombre: "Lazy", categoria: "Rendimiento", descripcion: "Carga un componente solo cuando hace falta." },
];

/* ---------- Hook: localStorage genérico ---------- */

function useLocalStorage<T>(clave: string, inicial: T) {
  const [valor, setValor] = useState<T>(() => {
    try {
      const guardado = window.localStorage.getItem(clave);
      return guardado !== null ? (JSON.parse(guardado) as T) : inicial;
    } catch {
      return inicial;
    }
  });
  useEffect(() => {
    try {
      window.localStorage.setItem(clave, JSON.stringify(valor));
    } catch {
      // sin almacenamiento: seguimos sin persistir
    }
  }, [clave, valor]);
  return [valor, setValor] as const;
}

/* ---------- Contexto 1: acento de color ---------- */

const PALETA = { lima: "#c6f51c", cielo: "#4cc9f0", coral: "#ff7a59", violeta: "#b388ff" } as const;
type NombreAcento = keyof typeof PALETA;

type AcentoValue = { nombre: NombreAcento; color: string; cambiar: (n: NombreAcento) => void };
const AcentoContext = createContext<AcentoValue | null>(null);

function AcentoProvider({ children }: { children: ReactNode }) {
  const [nombre, setNombre] = useLocalStorage<NombreAcento>("dia21-acento", "lima");
  // Si en localStorage hubiera un valor viejo e inválido, caemos a "lima".
  const valido: NombreAcento = nombre in PALETA ? nombre : "lima";
  const valor = useMemo<AcentoValue>(
    () => ({ nombre: valido, color: PALETA[valido], cambiar: setNombre }),
    [valido, setNombre],
  );
  return <AcentoContext.Provider value={valor}>{children}</AcentoContext.Provider>;
}

function useAcento(): AcentoValue {
  const ctx = useContext(AcentoContext);
  if (ctx === null) throw new Error("useAcento debe usarse dentro de <AcentoProvider>");
  return ctx;
}

/* ---------- Contexto 2: filtros + paginación (useReducer) ---------- */

type Filtros = { consulta: string; categoria: CategoriaFiltro; pagina: number; porPagina: number };

type Accion =
  | { tipo: "consulta"; valor: string }
  | { tipo: "categoria"; valor: CategoriaFiltro }
  | { tipo: "pagina"; valor: number }
  | { tipo: "porPagina"; valor: number }
  | { tipo: "limpiar" };

const FILTROS_INICIALES: Filtros = { consulta: "", categoria: "Todas", pagina: 1, porPagina: 6 };

function assertNever(valor: never): never {
  throw new Error(`Acción no manejada: ${JSON.stringify(valor)}`);
}

function filtrosReducer(estado: Filtros, accion: Accion): Filtros {
  switch (accion.tipo) {
    // Al cambiar el filtro volvemos a la página 1
    case "consulta":
      return { ...estado, consulta: accion.valor, pagina: 1 };
    case "categoria":
      return { ...estado, categoria: accion.valor, pagina: 1 };
    case "porPagina":
      return { ...estado, porPagina: accion.valor, pagina: 1 };
    case "pagina":
      return { ...estado, pagina: accion.valor };
    case "limpiar":
      return { ...FILTROS_INICIALES, porPagina: estado.porPagina };
    default:
      return assertNever(accion);
  }
}

type CatalogoValue = {
  filtros: Filtros;
  dispatch: Dispatch<Accion>;
  total: number; // resultados tras filtrar
  totalPaginas: number;
  paginaActual: number;
  visibles: Termino[]; // solo los de la página actual
};
const CatalogoContext = createContext<CatalogoValue | null>(null);

function CatalogoProvider({ children }: { children: ReactNode }) {
  const [filtros, dispatch] = useReducer(filtrosReducer, FILTROS_INICIALES);

  // Estado derivado: se calcula, no se guarda.
  const filtrados = useMemo(() => {
    const q = filtros.consulta.trim().toLowerCase();
    return TERMINOS.filter(
      (t) =>
        (filtros.categoria === "Todas" || t.categoria === filtros.categoria) &&
        (q === "" || t.nombre.toLowerCase().includes(q) || t.descripcion.toLowerCase().includes(q)),
    );
  }, [filtros.consulta, filtros.categoria]);

  const valor = useMemo<CatalogoValue>(() => {
    const totalPaginas = Math.max(1, Math.ceil(filtrados.length / filtros.porPagina));
    const paginaActual = Math.min(filtros.pagina, totalPaginas);
    const inicio = (paginaActual - 1) * filtros.porPagina;
    return {
      filtros,
      dispatch,
      total: filtrados.length,
      totalPaginas,
      paginaActual,
      visibles: filtrados.slice(inicio, inicio + filtros.porPagina),
    };
  }, [filtros, filtrados]);

  return <CatalogoContext.Provider value={valor}>{children}</CatalogoContext.Provider>;
}

function useCatalogo(): CatalogoValue {
  const ctx = useContext(CatalogoContext);
  if (ctx === null) throw new Error("useCatalogo debe usarse dentro de <CatalogoProvider>");
  return ctx;
}

/* ---------- Componentes ---------- */

function SelectorAcento() {
  const { nombre, color, cambiar } = useAcento();
  return (
    <div className="row" aria-label="Color de acento">
      {(Object.keys(PALETA) as NombreAcento[]).map((n) => (
        <button
          key={n}
          className="secondary"
          onClick={() => cambiar(n)}
          style={{
            color: PALETA[n],
            borderColor: PALETA[n],
            background: n === nombre ? color + "33" : "transparent",
          }}
        >
          {n}
        </button>
      ))}
    </div>
  );
}

function Buscador() {
  const { filtros, dispatch } = useCatalogo();
  const { color } = useAcento();

  const alBuscar = useCallback(
    (e: ChangeEvent<HTMLInputElement>) => dispatch({ tipo: "consulta", valor: e.target.value }),
    [dispatch],
  );

  const alCategoria = (e: ChangeEvent<HTMLSelectElement>) => {
    // El valor viene del <option>, que solo ofrece categorías válidas
    dispatch({ tipo: "categoria", valor: e.target.value as CategoriaFiltro });
  };

  return (
    <div className="row" style={{ marginBottom: 12 }}>
      <input
        value={filtros.consulta}
        onChange={alBuscar}
        placeholder="Buscar término..."
        aria-label="Buscar"
        style={{ outlineColor: color }}
      />
      <select value={filtros.categoria} onChange={alCategoria} aria-label="Categoría">
        <option value="Todas">Todas</option>
        {CATEGORIAS.map((c) => (
          <option key={c} value={c}>
            {c}
          </option>
        ))}
      </select>
      <select
        value={filtros.porPagina}
        onChange={(e) => dispatch({ tipo: "porPagina", valor: Number(e.target.value) })}
        aria-label="Elementos por página"
      >
        {[4, 6, 8].map((n) => (
          <option key={n} value={n}>
            {n} por página
          </option>
        ))}
      </select>
      <button className="secondary" onClick={() => dispatch({ tipo: "limpiar" })}>
        Limpiar
      </button>
    </div>
  );
}

function Lista() {
  const { visibles, total } = useCatalogo();
  const { color } = useAcento();

  if (total === 0) return <p className="muted">Nada coincide. Prueba con otra palabra.</p>;

  return (
    <ul style={{ listStyle: "none", padding: 0, margin: 0 }}>
      {visibles.map((t) => (
        <li key={t.id} className="card" style={{ marginBottom: 8, borderLeft: `4px solid ${color}` }}>
          <strong style={{ color }}>{t.nombre}</strong> <span className="muted">· {t.categoria}</span>
          <div>{t.descripcion}</div>
        </li>
      ))}
    </ul>
  );
}

function Paginador() {
  const { paginaActual, totalPaginas, total, dispatch } = useCatalogo();
  return (
    <div className="row" style={{ marginTop: 12 }}>
      <button
        disabled={paginaActual <= 1}
        onClick={() => dispatch({ tipo: "pagina", valor: paginaActual - 1 })}
      >
        Anterior
      </button>
      <span className="muted">
        Página {paginaActual} de {totalPaginas} ({total} resultados)
      </span>
      <button
        disabled={paginaActual >= totalPaginas}
        onClick={() => dispatch({ tipo: "pagina", valor: paginaActual + 1 })}
      >
        Siguiente
      </button>
    </div>
  );
}

function Pantalla() {
  const { color } = useAcento();
  return (
    <div>
      <div className="row" style={{ justifyContent: "space-between", marginBottom: 12 }}>
        <h2 style={{ color }}>Glosario de React</h2>
        <SelectorAcento />
      </div>
      <Buscador />
      <Lista />
      <Paginador />
    </div>
  );
}

export default function App() {
  return (
    <AcentoProvider>
      <CatalogoProvider>
        <Pantalla />
      </CatalogoProvider>
    </AcentoProvider>
  );
}
