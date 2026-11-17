type BienvenidaProps = {
  nombre: string;
  emoji?: string; // opcional: si no llega, usamos un valor por defecto
};

// Un componente es una función que devuelve JSX
function Bienvenida({ nombre, emoji = "👋" }: BienvenidaProps) {
  return (
    <h1>
      ¡Hola, {nombre}! {emoji}
    </h1>
  );
}

export default function App() {
  const hora: number = new Date().getHours();
  const saludo: string = hora < 12 ? "Buenos días" : "Buenas tardes";

  return (
    <div className="card">
      <Bienvenida nombre="torpe" />
      <Bienvenida nombre="futuro experto" emoji="🚀" />
      <p className="muted">{saludo}, esto es JSX: HTML dentro de TypeScript.</p>
    </div>
  );
}
