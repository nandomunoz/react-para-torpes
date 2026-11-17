type Tarea = {
  id: number;
  texto: string;
  hecha: boolean;
};

type ListaTareasProps = {
  tareas: Tarea[];
};

function ListaTareas({ tareas }: ListaTareasProps) {
  return (
    <ul>
      {tareas.map((t) => (
        <li key={t.id}>
          {t.hecha ? "✅ " : ""}
          {t.texto}
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const tareas: Tarea[] = [
    { id: 1, texto: "Instalar Vite", hecha: true },
    { id: 2, texto: "Escribir mi primer componente", hecha: true },
    { id: 3, texto: "Entender las props", hecha: false },
  ];

  return (
    <div className="card">
      <ListaTareas tareas={tareas} />
    </div>
  );
}
