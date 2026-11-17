import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState } from "react";

type Tarea = { id: number; texto: string; hecha: boolean };
type TareasState = { lista: Tarea[]; siguienteId: number };

const initialState: TareasState = { lista: [], siguienteId: 1 };

const tareasSlice = createSlice({
  name: "tareas",
  initialState,
  reducers: {
    agregar(state, action: PayloadAction<string>) {
      state.lista.push({ id: state.siguienteId, texto: action.payload, hecha: false });
      state.siguienteId += 1;
    },
    alternar(state, action: PayloadAction<number>) {
      const tarea = state.lista.find((t) => t.id === action.payload);
      if (tarea) tarea.hecha = !tarea.hecha;
    },
    borrarHechas(state) {
      state.lista = state.lista.filter((t) => !t.hecha);
    },
  },
});

const { agregar, alternar, borrarHechas } = tareasSlice.actions;

const store = configureStore({ reducer: { tareas: tareasSlice.reducer } });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

const useAppDispatch = useDispatch.withTypes<AppDispatch>();
const useAppSelector = useSelector.withTypes<RootState>();

function Tareas() {
  const lista = useAppSelector((s) => s.tareas.lista);
  const dispatch = useAppDispatch();
  const [texto, setTexto] = useState("");

  return (
    <div className="card">
      <div className="row">
        <input value={texto} onChange={(e) => setTexto(e.target.value)} />
        <button
          onClick={() => {
            if (!texto.trim()) return;
            dispatch(agregar(texto.trim()));
            setTexto("");
          }}
        >
          Añadir
        </button>
      </div>
      <ul>
        {lista.map((t) => (
          <li
            key={t.id}
            onClick={() => dispatch(alternar(t.id))}
            style={{ cursor: "pointer", textDecoration: t.hecha ? "line-through" : "none" }}
          >
            {t.texto}
          </li>
        ))}
      </ul>
      <button className="secondary" onClick={() => dispatch(borrarHechas())}>
        Borrar hechas
      </button>
    </div>
  );
}

export default function App() {
  return (
    <Provider store={store}>
      <Tareas />
    </Provider>
  );
}
