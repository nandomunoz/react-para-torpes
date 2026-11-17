import Link from "next/link";
import { Mascot } from "@/components/Mascot";
import PlaygroundClient from "@/components/PlaygroundClient";
import { Counters } from "@/components/Counters";
import { Benefits } from "@/components/Benefits";
import { WeekShelf, type ShelfWeek } from "@/components/WeekShelf";
import { LessonAnatomy } from "@/components/LessonAnatomy";
import { ViteVsNext } from "@/components/ViteVsNext";
import { Testimonials } from "@/components/Testimonials";
import { Faq } from "@/components/Faq";
import { ContinueButton } from "@/components/ProgressWidgets";
import { countExamples, getLessons, readExample } from "@/lib/content";
import { WEEKS } from "@/lib/weeks";
import { btnGhost, btnPrimary, container, eyebrow, SITE } from "@/lib/site";

const HERO_CODE = `import { useState } from "react";

export default function App() {
  const [veces, setVeces] = useState(0);

  return (
    <div className="card">
      <h2>Hice clic {veces} veces 🙈</h2>
      <button onClick={() => setVeces(veces + 1)}>
        Clic
      </button>
    </div>
  );
}
`;

const TECH = ["React 19", "TypeScript", "Vite", "Next.js"];

export default function Home() {
  const lessons = getLessons();
  const shelf: ShelfWeek[] = WEEKS.map((w) => ({
    ...w,
    lessons: lessons
      .filter((l) => l.week === w.n)
      .map(({ slug, day, title, minutes }) => ({ slug, day, title, minutes })),
  }));
  const items = lessons.map(({ slug, day, title }) => ({ slug, day, title }));
  const cssBase = readExample("base.css");

  return (
    <main>
      {/* HERO */}
      <section className="relative overflow-hidden" aria-labelledby="titulo">
        <div className={`${container} grid items-center gap-12 py-16 lg:grid-cols-2 lg:py-24`}>
          <div>
            <Mascot className="animate-fade-up h-20 w-20" title="La mascota torpe" />
            <p className={`${eyebrow} animate-fade-up mt-6 [animation-delay:80ms]`}>Curso gratis · en español</p>
            <h1 id="titulo" className="animate-fade-up mt-3 font-display text-5xl leading-[1.05] [animation-delay:140ms] sm:text-6xl">
              React para <span className="animate-wipe bg-no-repeat px-2 [background-image:linear-gradient(var(--color-sun),var(--color-sun))]">torpes</span>
            </h1>
            <p className="animate-fade-up mt-5 max-w-xl text-xl text-paper/80 [animation-delay:220ms]">
              De cero a tu primera app con React y TypeScript en 30 días. Un concepto por día, con editor en vivo.
            </p>
            <div className="animate-fade-up mt-8 flex flex-wrap gap-3 [animation-delay:300ms]">
              <ContinueButton lessons={items} className={`${btnPrimary} text-lg`} />
              <Link href="/plan/" className={btnGhost}>Ver el plan</Link>
            </div>
            <p className="mt-4 text-sm text-muted">Sin registro · sin tarjeta · código abierto (MIT)</p>
          </div>
          <div className="animate-fade-up [animation-delay:260ms]">
            <PlaygroundClient code={HERO_CODE} css={cssBase} title="Tu primer componente" height={300} />
          </div>
        </div>
      </section>

      {/* PRUEBA SOCIAL */}
      <section className="border-y border-line bg-panel/40 py-10" aria-label="El curso en cifras">
        <div className={`${container} space-y-8`}>
          <ul className="flex flex-wrap items-center justify-center gap-x-10 gap-y-3 font-display text-xl text-muted">
            {TECH.map((t) => (<li key={t}>{t}</li>))}
          </ul>
          <Counters
            items={[
              { target: 30, label: "días de curso" },
              { target: lessons.length, label: "lecciones" },
              { target: countExamples(), label: "ejemplos de código" },
              { target: WEEKS.length, label: "semanas (con bonus)" },
            ]}
          />
        </div>
      </section>

      <Benefits />

      {/* PLAN */}
      <section id="plan" className="border-t border-line" aria-labelledby="plan-titulo">
        <div className={`${container} py-20`}>
          <p className={eyebrow}>El plan</p>
          <h2 id="plan-titulo" className="mt-2 font-display text-4xl">Cinco libros, un estante</h2>
          <p className="mt-3 max-w-2xl text-paper/70">Elige una semana y entra directo a cualquier día.</p>
          <div className="reveal mt-10"><WeekShelf weeks={shelf} /></div>
        </div>
      </section>

      {/* ANATOMÍA */}
      <section className="border-t border-line" aria-labelledby="anatomia">
        <div className={`${container} py-20`}>
          <p className={eyebrow}>Cómo es cada día</p>
          <h2 id="anatomia" className="mt-2 font-display text-4xl">Anatomía de una lección</h2>
          <p className="mt-3 max-w-2xl text-paper/70">Siempre el mismo formato, para que solo te preocupes de aprender.</p>
          <div className="reveal mt-10"><LessonAnatomy /></div>
        </div>
      </section>

      {/* VITE VS NEXT */}
      <section className="border-t border-line" aria-labelledby="vite-next">
        <div className={`${container} py-20`}>
          <p className={eyebrow}>Herramientas</p>
          <h2 id="vite-next" className="mt-2 font-display text-4xl">Vite o Next.js: ¿cuál uso?</h2>
          <p className="mt-3 max-w-2xl text-paper/70">Empiezas con Vite (semanas 1-4) y das el salto a Next.js en el bonus.</p>
          <div className="reveal mt-10"><ViteVsNext /></div>
        </div>
      </section>

      <Testimonials />

      {/* FAQ */}
      <section id="faq" className="border-t border-line" aria-labelledby="faq-titulo">
        <div className={`${container} max-w-3xl py-20`}>
          <p className={eyebrow}>Dudas</p>
          <h2 id="faq-titulo" className="mt-2 mb-8 font-display text-4xl">Preguntas frecuentes</h2>
          <div className="reveal"><Faq /></div>
        </div>
      </section>

      {/* CTA FINAL */}
      <section className="border-t border-line bg-lime text-ink" aria-labelledby="cta-final">
        <div className={`${container} flex flex-col items-center py-20 text-center`}>
          <h2 id="cta-final" className="font-display text-4xl sm:text-5xl">Hoy es un buen día para empezar</h2>
          <p className="mt-3 max-w-xl text-lg text-ink/80">Treinta minutos y tu primer componente funcionando.</p>
          <ContinueButton
            lessons={items}
            className="mt-8 inline-flex items-center justify-center rounded-md bg-ink px-6 py-3 text-lg font-semibold text-lime transition hover:bg-panel focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-ink"
          />
        </div>
      </section>
      <span className="sr-only">{SITE.name}</span>
    </main>
  );
}
