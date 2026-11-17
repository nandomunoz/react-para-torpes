"use client";

import { useEffect, useRef, useState } from "react";

function Counter({ target, label }: { target: number; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [value, setValue] = useState(target);

  useEffect(() => {
    const el = ref.current;
    if (!el || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
    let raf = 0;
    const io = new IntersectionObserver(([entry]) => {
      if (!entry.isIntersecting) return;
      io.disconnect();
      const t0 = performance.now();
      const tick = (t: number) => {
        const p = Math.min((t - t0) / 900, 1);
        setValue(Math.round(target * p));
        if (p < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    });
    io.observe(el);
    return () => {
      io.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [target]);

  return (
    <div ref={ref} className="text-center">
      <p className="font-display text-4xl text-lime" aria-label={`${target} ${label}`}>
        {value}
      </p>
      <p className="mt-1 text-sm text-muted">{label}</p>
    </div>
  );
}

export function Counters({ items }: { items: { target: number; label: string }[] }) {
  return (
    <div className="grid grid-cols-2 gap-6 sm:grid-cols-4">
      {items.map((i) => (
        <Counter key={i.label} {...i} />
      ))}
    </div>
  );
}
