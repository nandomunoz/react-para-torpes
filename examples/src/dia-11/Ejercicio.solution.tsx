import type { ReactNode } from "react";

type ModalProps = {
  titulo: ReactNode;
  pie?: ReactNode;
  children: ReactNode;
};

function Modal({ titulo, pie, children }: ModalProps) {
  return (
    <div className="card">
      <h3>{titulo}</h3>
      <div>{children}</div>
      {pie && (
        <div className="row" style={{ marginTop: 12, justifyContent: "flex-end" }}>
          {pie}
        </div>
      )}
    </div>
  );
}

type ModalConfirmarProps = {
  children: ReactNode;
};

// Especializa Modal por composición: rellena los slots y reenvía children.
function ModalConfirmar({ children }: ModalConfirmarProps) {
  return (
    <Modal
      titulo="¿Seguro?"
      pie={
        <>
          <button className="secondary">Cancelar</button>
          <button>Aceptar</button>
        </>
      }
    >
      {children}
    </Modal>
  );
}

export default function App() {
  return (
    <div>
      <Modal titulo="Hola">
        <p>Un modal sin pie.</p>
      </Modal>
      <div style={{ height: 12 }} />
      <ModalConfirmar>
        <p>Vas a borrar todo. Es irreversible, como un tatuaje.</p>
      </ModalConfirmar>
    </div>
  );
}
