// Ejercicio: lista de tareas de solo lectura.

type Tarea = {
  id: number;
  texto: string;
  hecha: boolean;
};

type ListaTareasProps = {
  // TODO: añade la prop `tareas` con el tipo correcto
};

function ListaTareas(props: ListaTareasProps) {
  // TODO: pinta un ul con un li por tarea (no olvides key)
  // TODO: si la tarea está hecha, añade "✅" delante del texto
  return null;
}

export default function App() {
  const tareas: Tarea[] = [
    { id: 1, texto: "Instalar Vite", hecha: true },
    { id: 2, texto: "Escribir mi primer componente", hecha: true },
    { id: 3, texto: "Entender las props", hecha: false },
  ];

  // TODO: renderiza ListaTareas pasándole las tareas
  return <div className="card">{tareas.length} tareas</div>;
}
