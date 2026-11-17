import type { ReactNode } from "react";

export function Step({ n, title, children }: { n: number; title?: string; children: ReactNode }) {
  return (
    <div className="reveal my-5 flex gap-4">
      <span
        aria-hidden
        className="mt-0.5 flex h-7 w-7 shrink-0 items-center justify-center rounded-sm bg-lime font-mono text-sm font-bold text-ink"
      >
        {n}
      </span>
      <div className="min-w-0 flex-1">
        {title && <p className="font-semibold text-paper">{title}</p>}
        <div className="text-paper/80 [&>*:first-child]:mt-0">{children}</div>
      </div>
    </div>
  );
}

export function Warning({ title = "Error típico", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="reveal my-6 flex gap-4 rounded-lg border border-danger/50 bg-danger/10 p-4" role="note">
      <svg aria-hidden viewBox="0 0 24 24" className="mt-0.5 h-6 w-6 shrink-0 text-danger" fill="none" stroke="currentColor" strokeWidth="2">
        <circle cx="12" cy="12" r="9" />
        <path d="M5.6 5.6l12.8 12.8" />
      </svg>
      <div className="min-w-0">
        <p className="font-semibold text-danger">{title}</p>
        <div className="text-paper/85 [&>*:last-child]:mb-0">{children}</div>
      </div>
    </aside>
  );
}

export function Tip({ title = "Tip", children }: { title?: string; children: ReactNode }) {
  return (
    <aside className="reveal my-6 rounded-lg border border-lime/60 bg-lime/10 p-4" role="note">
      <p className="font-semibold text-lime">💡 {title}</p>
      <div className="text-paper/85 [&>*:last-child]:mb-0">{children}</div>
    </aside>
  );
}
