/** Mascota original: el torpe, con gafas torcidas y una tirita. */
export function Mascot({ className = "h-12 w-12", title }: { className?: string; title?: string }) {
  return (
    <svg
      viewBox="0 0 120 120"
      className={className}
      role={title ? "img" : undefined}
      aria-label={title}
      aria-hidden={title ? undefined : true}
    >
      {/* pelo */}
      <path d="M44 22c-6-10 4-16 10-10 2-8 14-8 14 0 6-6 16 2 8 10" fill="none" stroke="#0b0b0b" strokeWidth="5" strokeLinecap="round" />
      {/* cabeza */}
      <rect x="14" y="20" width="92" height="88" rx="30" fill="#c6f51c" stroke="#0b0b0b" strokeWidth="5" />
      {/* tirita */}
      <g transform="rotate(-14 84 34)">
        <rect x="64" y="26" width="38" height="14" rx="4" fill="#f4f4ef" stroke="#0b0b0b" strokeWidth="3" />
        <path d="M78 29v8M84 29v8M90 29v8" stroke="#0b0b0b" strokeWidth="2" />
      </g>
      {/* gafas */}
      <circle cx="43" cy="62" r="17" fill="#f4f4ef" stroke="#0b0b0b" strokeWidth="5" />
      <circle cx="79" cy="66" r="17" fill="#f4f4ef" stroke="#0b0b0b" strokeWidth="5" />
      <path d="M60 63l2 2" stroke="#0b0b0b" strokeWidth="5" strokeLinecap="round" />
      {/* pupilas bizcas */}
      <circle cx="48" cy="64" r="5" fill="#0b0b0b" />
      <circle cx="74" cy="68" r="5" fill="#0b0b0b" />
      {/* boca */}
      <path d="M44 93c6-6 10 4 16-1s10 3 16-2" fill="none" stroke="#0b0b0b" strokeWidth="4" strokeLinecap="round" />
    </svg>
  );
}
