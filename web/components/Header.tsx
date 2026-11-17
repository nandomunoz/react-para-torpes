import Link from "next/link";
import { Mascot } from "./Mascot";
import { SITE, btnPrimary, container } from "@/lib/site";

export function Header() {
  return (
    <header className="sticky top-0 z-40 border-b border-line bg-ink/90 backdrop-blur">
      <div className={`${container} flex h-16 items-center justify-between gap-4`}>
        <Link href="/" className="flex items-center gap-3 font-display text-lg tracking-tight text-paper">
          <Mascot className="h-9 w-9" />
          <span>{SITE.name}</span>
        </Link>
        <nav aria-label="Principal" className="flex items-center gap-1 sm:gap-3">
          <Link href="/plan/" className="hidden px-3 py-2 text-sm text-paper/80 transition-colors hover:text-lime sm:block">
            Plan
          </Link>
          <Link href="/#faq" className="hidden px-3 py-2 text-sm text-paper/80 transition-colors hover:text-lime sm:block">
            FAQ
          </Link>
          <a href={SITE.repo} className="hidden px-3 py-2 text-sm text-paper/80 transition-colors hover:text-lime sm:block" target="_blank" rel="noopener noreferrer">
            GitHub
          </a>
          <Link href="/dia/dia-01/" className={`${btnPrimary} px-4 py-2 text-sm`}>
            Día 1
          </Link>
        </nav>
      </div>
    </header>
  );
}
