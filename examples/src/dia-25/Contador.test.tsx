import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { describe, expect, it } from "vitest";
import { Contador } from "./Contador";

describe("Contador", () => {
  it("muestra el valor inicial", () => {
    render(<Contador inicial={3} />);
    expect(screen.getByText("Cuenta: 3")).toBeInTheDocument();
  });

  it("suma y resta al hacer clic", async () => {
    const user = userEvent.setup();
    render(<Contador />);

    await user.click(screen.getByRole("button", { name: "Sumar" }));
    await user.click(screen.getByRole("button", { name: "Sumar" }));
    expect(screen.getByText("Cuenta: 2")).toBeInTheDocument();

    await user.click(screen.getByRole("button", { name: "Restar" }));
    expect(screen.getByText("Cuenta: 1")).toBeInTheDocument();
  });

  it("reinicia al valor inicial", async () => {
    const user = userEvent.setup();
    render(<Contador inicial={5} />);

    await user.click(screen.getByRole("button", { name: "Sumar" }));
    await user.click(screen.getByRole("button", { name: "Reiniciar" }));
    expect(screen.getByText("Cuenta: 5")).toBeInTheDocument();
  });

  it("deshabilita Sumar al llegar al máximo", async () => {
    const user = userEvent.setup();
    render(<Contador inicial={1} max={2} />);

    await user.click(screen.getByRole("button", { name: "Sumar" }));

    expect(screen.getByRole("button", { name: "Sumar" })).toBeDisabled();
    expect(screen.getByText(/has llegado al máximo/i)).toBeInTheDocument();
  });
});
