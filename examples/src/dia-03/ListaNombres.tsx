type Persona = {
  id: number;
  nombre: string;
  rol: string;
};

type ListaPersonasProps = {
  titulo: string;
  personas: Persona[];
};

// Las props tipadas avisan si pasas datos con la forma equivocada
function ListaPersonas({ titulo, personas }: ListaPersonasProps) {
  return (
    <div className="card">
      <h2>{titulo}</h2>
      <ul>
        {personas.map((p) => (
          <li key={p.id}>
            {p.nombre} <span className="muted">({p.rol})</span>
          </li>
        ))}
      </ul>
    </div>
  );
}

export default function App() {
  const equipo: Persona[] = [
    { id: 1, nombre: "Ana", rol: "Diseño" },
    { id: 2, nombre: "Luis", rol: "Frontend" },
    { id: 3, nombre: "Marta", rol: "Backend" },
  ];

  return <ListaPersonas titulo="Nuestro equipo" personas={equipo} />;
}
