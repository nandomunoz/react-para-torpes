import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Rol = "estudiante" | "profesional" | "otro";

type Datos = {
  nombre: string;
  email: string;
  edad: string; // los inputs siempre devuelven texto
  rol: Rol;
  genero: "ella" | "el" | "otro";
  bio: string;
  acepta: boolean;
};

// Un error opcional por cada campo del formulario.
type Errores = Partial<Record<keyof Datos, string>>;

const vacio: Datos = {
  nombre: "",
  email: "",
  edad: "",
  rol: "estudiante",
  genero: "otro",
  bio: "",
  acepta: false,
};

function validar(d: Datos): Errores {
  const errores: Errores = {};
  if (d.nombre.trim().length < 2) errores.nombre = "Mínimo 2 caracteres";
  if (!/^\S+@\S+\.\S+$/.test(d.email)) errores.email = "Email no válido";
  const edad = Number(d.edad);
  if (!Number.isInteger(edad) || edad < 16 || edad > 120) {
    errores.edad = "Edad entre 16 y 120";
  }
  if (d.bio.length > 100) errores.bio = "Máximo 100 caracteres";
  if (!d.acepta) errores.acepta = "Debes aceptar los términos";
  return errores;
}

export default function App() {
  const [datos, setDatos] = useState<Datos>(vacio);
  const [errores, setErrores] = useState<Errores>({});
  const [enviado, setEnviado] = useState<Datos | null>(null);

  // Un único manejador para todos los campos, usando el atributo name.
  function cambiar(
    e: ChangeEvent<HTMLInputElement | HTMLSelectElement | HTMLTextAreaElement>
  ) {
    const { name, value, type } = e.target;
    const valor =
      type === "checkbox" && e.target instanceof HTMLInputElement
        ? e.target.checked
        : value;
    setDatos({ ...datos, [name]: valor });
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nuevos = validar(datos);
    setErrores(nuevos);
    if (Object.keys(nuevos).length === 0) {
      setEnviado(datos);
      setDatos(vacio);
    }
  }

  return (
    <form className="card" onSubmit={enviar} noValidate>
      <h2>Registro</h2>

      <label htmlFor="nombre">Nombre</label>
      <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      <label htmlFor="email">Email</label>
      <input id="email" name="email" type="email" value={datos.email} onChange={cambiar} />
      {errores.email && <p className="error">{errores.email}</p>}

      <label htmlFor="edad">Edad</label>
      <input id="edad" name="edad" type="number" value={datos.edad} onChange={cambiar} />
      {errores.edad && <p className="error">{errores.edad}</p>}

      <label htmlFor="rol">Rol</label>
      <select id="rol" name="rol" value={datos.rol} onChange={cambiar}>
        <option value="estudiante">Estudiante</option>
        <option value="profesional">Profesional</option>
        <option value="otro">Otro</option>
      </select>

      <label>Tratamiento</label>
      <div className="row">
        {(["ella", "el", "otro"] as const).map((g) => (
          <label key={g}>
            <input
              type="radio"
              name="genero"
              value={g}
              checked={datos.genero === g}
              onChange={cambiar}
            />{" "}
            {g}
          </label>
        ))}
      </div>

      <label htmlFor="bio">Sobre ti ({datos.bio.length}/100)</label>
      <textarea id="bio" name="bio" rows={3} value={datos.bio} onChange={cambiar} />
      {errores.bio && <p className="error">{errores.bio}</p>}

      <label>
        <input type="checkbox" name="acepta" checked={datos.acepta} onChange={cambiar} />{" "}
        Acepto los términos
      </label>
      {errores.acepta && <p className="error">{errores.acepta}</p>}

      <p>
        <button type="submit">Registrarme</button>
      </p>
      {enviado && (
        <p className="muted">
          ¡Bienvenido, {enviado.nombre}! Te registraste como {enviado.rol}.
        </p>
      )}
    </form>
  );
}
