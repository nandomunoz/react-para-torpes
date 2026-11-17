type TarjetaPerfilProps = {
  nombre: string;
  profesion: string;
};

function TarjetaPerfil({ nombre, profesion }: TarjetaPerfilProps) {
  return (
    <div className="card">
      <h2>{nombre}</h2>
      <p className="muted">{profesion}</p>
    </div>
  );
}

export default function App() {
  return (
    <div className="row">
      <TarjetaPerfil nombre="Ana" profesion="Diseñadora" />
      <TarjetaPerfil nombre="Luis" profesion="Programador" />
    </div>
  );
}
