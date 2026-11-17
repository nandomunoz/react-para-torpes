import type { ReactNode } from "react";

// TODO: define las props de Modal con children y dos slots:
// `titulo` (ReactNode) y `pie` (ReactNode opcional)
type ModalProps = {
  children: ReactNode;
};

function Modal({ children }: ModalProps) {
  // TODO: renderiza el título arriba, los children en medio y el pie (si existe) abajo
  return <div className="card">{children}</div>;
}

// TODO: crea ModalConfirmar, que use Modal por composición
// y ponga en el pie dos botones: "Cancelar" (className="secondary") y "Aceptar"

export default function App() {
  return (
    <Modal>
      <p>Prueba tu Modal aquí.</p>
    </Modal>
  );
}
