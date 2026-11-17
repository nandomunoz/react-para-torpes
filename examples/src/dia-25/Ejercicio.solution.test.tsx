import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Saludo } from "./Ejercicio.starter";

describe("Saludo", () => {
  it("pide el nombre cuando el campo está vacío", () => {
    render(<Saludo />);
    expect(screen.getByText("Escribe tu nombre")).toBeInTheDocument();
  });

  it("saluda con el nombre escrito", async () => {
    const user = userEvent.setup();
    render(<Saludo />);

    await user.type(screen.getByLabelText("Nombre"), "Ana");

    expect(screen.getByText("Hola, Ana")).toBeInTheDocument();
  });

  it("vuelve al mensaje inicial al borrar el texto", async () => {
    const user = userEvent.setup();
    render(<Saludo />);
    const campo = screen.getByLabelText("Nombre");

    await user.type(campo, "Ana");
    await user.clear(campo);

    expect(screen.getByText("Escribe tu nombre")).toBeInTheDocument();
  });
});
