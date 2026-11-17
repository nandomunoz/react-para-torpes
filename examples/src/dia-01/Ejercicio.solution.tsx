export default function App() {
  const nombre: string = "Ana";
  const lenguaje: string = "TypeScript";

  return (
    <div className="card">
      <h1>Hola, {nombre}</h1>
      <p>Aprendiendo React con {lenguaje}</p>
    </div>
  );
}
