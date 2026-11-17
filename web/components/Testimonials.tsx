import { eyebrow } from "@/lib/site";

export type Testimonial = { name: string; role?: string; quote: string; photo?: string };

/** Solo testimonios reales. Mientras la lista esté vacía, la sección no se renderiza. */
export const TESTIMONIALS: Testimonial[] = [];

export function Testimonials({ items = TESTIMONIALS }: { items?: Testimonial[] }) {
  if (items.length === 0) return null;
  return (
    <section className="border-t border-line py-20" aria-labelledby="testimonios">
      <div className="mx-auto w-full max-w-6xl px-4 sm:px-6">
        <p className={eyebrow}>Lo que dicen</p>
        <h2 id="testimonios" className="mt-2 font-display text-3xl">Quienes ya lo hicieron</h2>
        <div className="mt-10 grid gap-6 md:grid-cols-3">
          {items.map((t) => (
            <figure key={t.name} className="rounded-lg border border-line bg-panel p-6">
              <blockquote className="text-paper/85">“{t.quote}”</blockquote>
              <figcaption className="mt-4 flex items-center gap-3 text-sm">
                {t.photo && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={t.photo} alt="" className="h-10 w-10 rounded-full object-cover" />
                )}
                <span>
                  <strong className="block text-paper">{t.name}</strong>
                  {t.role && <span className="text-muted">{t.role}</span>}
                </span>
              </figcaption>
            </figure>
          ))}
        </div>
      </div>
    </section>
  );
}
