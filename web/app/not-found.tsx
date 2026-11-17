import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import { btnPrimary, container } from "@/lib/site";

export default function NotFound() {
  return (
    <main className={`${container} flex flex-col items-center py-24 text-center`}>
      <Mascot className="h-24 w-24" title="La mascota, confundida" />
      <h1 className="mt-6 font-display text-4xl">404: te perdiste (como todos al principio)</h1>
      <p className="mt-3 text-muted">Esta página no existe.</p>
      <Link href="/" className={`${btnPrimary} mt-8`}>Volver al inicio</Link>
    </main>
  );
}
