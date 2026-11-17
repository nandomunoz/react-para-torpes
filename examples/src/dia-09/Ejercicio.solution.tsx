import { useState } from "react";
import type { ChangeEvent, FormEvent } from "react";

type Contacto = {
  nombre: string;
  email: string;
  mensaje: string;
};

type Errores = Partial<Record<keyof Contacto, string>>;

const vacio: Contacto = { nombre: "", email: "", mensaje: "" };

function validar(c: Contacto): Errores {
  const errores: Errores = {};
  if (c.nombre.trim().length < 2) errores.nombre = "Escribe al menos 2 caracteres";
  if (!/^\S+@\S+\.\S+$/.test(c.email)) errores.email = "Email no válido";
  if (c.mensaje.trim().length < 10) errores.mensaje = "Cuéntanos un poco más (10+ caracteres)";
  return errores;
}

export default function App() {
  const [datos, setDatos] = useState<Contacto>(vacio);
  const [errores, setErrores] = useState<Errores>({});
  const [ok, setOk] = useState(false);

  function cambiar(e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) {
    setDatos({ ...datos, [e.target.name]: e.target.value });
  }

  function enviar(e: FormEvent<HTMLFormElement>) {
    e.preventDefault();
    const nuevos = validar(datos);
    setErrores(nuevos);
    const sinErrores = Object.keys(nuevos).length === 0;
    setOk(sinErrores);
    if (sinErrores) setDatos(vacio);
  }

  return (
    <form className="card" onSubmit={enviar} noValidate>
      <h2>Contacto</h2>
      <label htmlFor="nombre">Nombre</label>
      <input id="nombre" name="nombre" value={datos.nombre} onChange={cambiar} />
      {errores.nombre && <p className="error">{errores.nombre}</p>}

      <label htmlFor="email">Email</label>
      <input id="email" name="email" value={datos.email} onChange={cambiar} />
      {errores.email && <p className="error">{errores.email}</p>}

      <label htmlFor="mensaje">Mensaje</label>
      <textarea id="mensaje" name="mensaje" rows={3} value={datos.mensaje} onChange={cambiar} />
      {errores.mensaje && <p className="error">{errores.mensaje}</p>}

      <p>
        <button type="submit">Enviar</button>
      </p>
      {ok && <p className="muted">Mensaje enviado. ¡Gracias!</p>}
    </form>
  );
}
