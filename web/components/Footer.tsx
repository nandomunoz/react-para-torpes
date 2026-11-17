import Link from "next/link";
import { SITE, container } from "@/lib/site";

export function Footer() {
  return (
    <footer className="mt-24 border-t border-line">
      <div className={`${container} grid gap-6 py-10 text-sm text-muted sm:grid-cols-3`}>
        <div>
          <p className="font-display text-paper">{SITE.name}</p>
          <p className="mt-2">Hecho con Next.js, Tailwind CSS y mucha paciencia.</p>
        </div>
        <ul className="space-y-2">
          <li><Link href="/plan/" className="hover:text-lime">Plan completo</Link></li>
          <li><a href={SITE.repo} className="hover:text-lime" target="_blank" rel="noopener noreferrer">Código en GitHub</a></li>
          <li><a href={`${SITE.repo}/blob/main/LICENSE`} className="hover:text-lime" target="_blank" rel="noopener noreferrer">Licencia MIT</a></li>
        </ul>
        <p>
          Sin cookies ni analítica. Tu progreso se guarda solo en tu navegador (localStorage) y nunca sale de
          tu equipo.
        </p>
      </div>
    </footer>
  );
}
