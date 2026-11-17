import { render } from "@testing-library/react";
import { describe, expect, it } from "vitest";
import { Testimonials } from "@/components/Testimonials";

describe("Testimonials", () => {
  it("no renderiza nada mientras no haya testimonios reales", () => {
    const { container } = render(<Testimonials items={[]} />);
    expect(container).toBeEmptyDOMElement();
  });

  it("muestra nombre y cita cuando existen", () => {
    const { getByText } = render(<Testimonials items={[{ name: "Ana", quote: "Muy claro" }]} />);
    expect(getByText("Ana")).toBeInTheDocument();
    expect(getByText(/Muy claro/)).toBeInTheDocument();
  });
});
