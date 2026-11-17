import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState } from "react";

// 1. Slice: estado inicial + reducers (Immer permite "mutar" con seguridad)
type Item = { id: number; nombre: string; cantidad: number };
type CarritoState = { items: Item[]; siguienteId: number };

const initialState: CarritoState = { items: [], siguienteId: 1 };

const carritoSlice = createSlice({
  name: "carrito",
  initialState,
  reducers: {
    agregar(state, action: PayloadAction<string>) {
      state.items.push({ id: state.siguienteId, nombre: action.payload, cantidad: 1 });
      state.siguienteId += 1;
    },
    cambiarCantidad(state, action: PayloadAction<{ id: number; delta: number }>) {
      const item = state.items.find((i) => i.id === action.payload.id);
      if (item) item.cantidad = Math.max(1, item.cantidad + action.payload.delta);
    },
    quitar(state, action: PayloadAction<number>) {
      state.items = state.items.filter((i) => i.id !== action.payload);
    },
  },
});

const { agregar, cambiarCantidad, quitar } = carritoSlice.actions;

// 2. Store y tipos derivados del propio store
const store = configureStore({ reducer: { carrito: carritoSlice.reducer } });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// 3. Hooks tipados: se usan en toda la app en vez de los genéricos
const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

function Formulario() {
  const dispatch = useAppDispatch();
  const [nombre, setNombre] = useState("");

  return (
    <form
      className="row"
      onSubmit={(e) => {
        e.preventDefault();
        if (!nombre.trim()) return;
        dispatch(agregar(nombre.trim()));
        setNombre("");
      }}
    >
      <input value={nombre} onChange={(e) => setNombre(e.target.value)} placeholder="Producto" />
      <button type="submit">Añadir</button>
    </form>
  );
}

function Lista() {
  const items = useAppSelector((s) => s.carrito.items);
  const dispatch = useAppDispatch();

  if (items.length === 0) return <p className="muted">El carrito está vacío.</p>;

  return (
    <ul>
      {items.map((i) => (
        <li key={i.id} className="row" style={{ marginBottom: 6 }}>
          <span>
            {i.nombre} x{i.cantidad}
          </span>
          <button className="secondary" onClick={() => dispatch(cambiarCantidad({ id: i.id, delta: 1 }))}>
            +
          </button>
          <button className="secondary" onClick={() => dispatch(cambiarCantidad({ id: i.id, delta: -1 }))}>
            -
          </button>
          <button className="secondary" onClick={() => dispatch(quitar(i.id))}>
            Quitar
          </button>
        </li>
      ))}
    </ul>
  );
}

function Total() {
  // El selector devuelve un valor primitivo: solo re-renderiza si cambia
  const total = useAppSelector((s) => s.carrito.items.reduce((acc, i) => acc + i.cantidad, 0));
  return <p>Unidades en total: {total}</p>;
}

export default function App() {
  return (
    <Provider store={store}>
      <div className="card">
        <h2>Carrito</h2>
        <Formulario />
        <Lista />
        <Total />
      </div>
    </Provider>
  );
}
