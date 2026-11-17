import type { ReactNode } from "react";

/** Se vuelve a montar en cada navegación: entrada suave de página. */
export default function Template({ children }: { children: ReactNode }) {
  return <div className="animate-swap">{children}</div>;
}
