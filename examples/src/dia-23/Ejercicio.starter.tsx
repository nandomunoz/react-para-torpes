import { configureStore, createSlice, type PayloadAction } from "@reduxjs/toolkit";
import { Provider, useDispatch, useSelector } from "react-redux";
import { useState } from "react";

type Tarea = { id: number; texto: string; hecha: boolean };
type TareasState = { lista: Tarea[] };

const tareasSlice = createSlice({
  name: "tareas",
  initialState: { lista: [] } as TareasState,
  reducers: {
    agregar(state, action: PayloadAction<string>) {
      state.lista.push({ id: Date.now(), texto: action.payload, hecha: false });
    },
    // TODO: reducer alternar(state, action: PayloadAction<number>) que invierta "hecha"
    // TODO: reducer borrarHechas(state) que elimine las tareas completadas
  },
});

const { agregar } = tareasSlice.actions;

const store = configureStore({ reducer: { tareas: tareasSlice.reducer } });
type RootState = ReturnType<typeof store.getState>;
type AppDispatch = typeof store.dispatch;

// TODO: crea useAppDispatch y useAppSelector con .withTypes
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
          <li key={t.id}>
            {/* TODO: haz clic para alternar y tacha el texto si está hecha */}
            {t.texto}
          </li>
        ))}
      </ul>
      {/* TODO: botón "Borrar hechas" */}
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
