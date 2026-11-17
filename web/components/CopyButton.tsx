"use client";

import { useState } from "react";

export function CopyButton({ text }: { text: string }) {
  const [copied, setCopied] = useState(false);

  async function copy() {
    try {
      await navigator.clipboard.writeText(text);
      setCopied(true);
      setTimeout(() => setCopied(false), 1800);
    } catch {
      /* portapapeles no disponible */
    }
  }

  return (
    <button
      type="button"
      onClick={copy}
      aria-label={copied ? "Código copiado" : "Copiar código"}
      className="rounded border border-line bg-ink/80 px-2 py-1 font-mono text-xs text-muted transition hover:border-lime hover:text-lime focus-visible:outline-2 focus-visible:outline-lime"
    >
      {copied ? "¡Copiado!" : "Copiar"}
    </button>
  );
}
