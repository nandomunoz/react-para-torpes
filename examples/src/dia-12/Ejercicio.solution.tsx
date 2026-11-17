import { useState } from "react";

type Contacto = {
  id: number;
  nombre: string;
  ciudad: string;
  favorito: boolean;
};

const contactos: Contacto[] = [
  { id: 1, nombre: "Ana", ciudad: "Lima", favorito: true },
  { id: 2, nombre: "Bruno", ciudad: "Bogotá", favorito: false },
  { id: 3, nombre: "Carla", ciudad: "Lima", favorito: false },
  { id: 4, nombre: "Diego", ciudad: "Quito", favorito: true },
];

type FiltroProps = {
  texto: string;
  soloFavoritos: boolean;
  onTexto: (t: string) => void;
  onSoloFavoritos: (v: boolean) => void;
};

function FiltroContactos({ texto, soloFavoritos, onTexto, onSoloFavoritos }: FiltroProps) {
  return (
    <div>
      <input
        value={texto}
        placeholder="Buscar por nombre..."
        onChange={(e) => onTexto(e.target.value)}
      />
      <label>
        <input
          type="checkbox"
          checked={soloFavoritos}
          onChange={(e) => onSoloFavoritos(e.target.checked)}
        />{" "}
        Solo favoritos
      </label>
    </div>
  );
}

function ListaContactos({ contactos }: { contactos: Contacto[] }) {
  if (contactos.length === 0) return <p className="muted">Nadie por aquí.</p>;
  return (
    <ul>
      {contactos.map((c) => (
        <li key={c.id}>
          {c.favorito ? "★ " : ""}
          {c.nombre} <span className="muted">({c.ciudad})</span>
        </li>
      ))}
    </ul>
  );
}

export default function App() {
  const [texto, setTexto] = useState("");
  const [soloFavoritos, setSoloFavoritos] = useState(false);

  // Derivado: no se guarda en estado.
  const visibles = contactos.filter(
    (c) =>
      c.nombre.toLowerCase().includes(texto.toLowerCase()) &&
      (!soloFavoritos || c.favorito)
  );

  return (
    <div className="card">
      <h2>Agenda</h2>
      <FiltroContactos
        texto={texto}
        soloFavoritos={soloFavoritos}
        onTexto={setTexto}
        onSoloFavoritos={setSoloFavoritos}
      />
      <ListaContactos contactos={visibles} />
    </div>
  );
}
