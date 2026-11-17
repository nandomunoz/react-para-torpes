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

// TODO 1: crea el componente FiltroContactos (input de texto + checkbox "Solo favoritos")
// que reciba los valores y callbacks por props.

// TODO 2: crea ListaContactos, que reciba los contactos ya filtrados y los pinte con key.

export default function App() {
  // TODO 3: declara el estado mínimo (texto y soloFavoritos) y calcula la lista filtrada
  return (
    <div className="card">
      <h2>Agenda</h2>
      <p className="muted">Monta aquí tus componentes.</p>
    </div>
  );
}
