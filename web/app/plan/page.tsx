import type { Metadata } from "next";
import Link from "next/link";
import { getLessons } from "@/lib/content";
import { WEEKS } from "@/lib/weeks";
import { container, eyebrow } from "@/lib/site";
import { ContinueButton, DoneMark, ProgressBar } from "@/components/ProgressWidgets";

export const metadata: Metadata = { title: "Plan completo" };

export default function PlanPage() {
  const lessons = getLessons();
  const items = lessons.map(({ slug, day, title }) => ({ slug, day, title }));
  return (
    <main className={`${container} py-12`}>
      <p className={eyebrow}>Plan completo</p>
      <h1 className="mt-2 font-display text-4xl">30 días + bonus de Next.js</h1>
      <div className="mt-8 grid gap-4 sm:grid-cols-[1fr_auto] sm:items-center">
        <ProgressBar slugs={lessons.map((l) => l.slug)} />
        <ContinueButton lessons={items} />
      </div>
      <div className="mt-12 space-y-14">
        {WEEKS.map((w) => (
          <section key={w.n} aria-labelledby={`s${w.n}`}>
            <div className="flex items-baseline gap-4">
              <span className={`${w.spine} rounded px-3 py-1 font-display`}>Semana {w.n}</span>
              <h2 id={`s${w.n}`} className="font-display text-2xl">
                <Link href={`/semana/${w.n}/`} className="hover:text-lime">{w.title}</Link>
              </h2>
            </div>
            <p className="mt-2 text-muted">{w.tagline}</p>
            <ul className="mt-4 divide-y divide-line rounded-lg border border-line">
              {lessons.filter((l) => l.week === w.n).map((l) => (
                <li key={l.slug}>
                  <Link href={`/dia/${l.slug}/`} className="flex items-start gap-4 px-4 py-3 hover:bg-panel">
                    <DoneMark slug={l.slug} />
                    <span className="w-16 shrink-0 font-mono text-sm text-sun">Día {l.day}</span>
                    <span className="min-w-0 flex-1">
                      <span className="block text-paper">{l.title}</span>
                      <span className="block text-sm text-muted">{l.objective}</span>
                    </span>
                    <span className="shrink-0 font-mono text-xs text-muted">{l.minutes} min</span>
                  </Link>
                </li>
              ))}
            </ul>
          </section>
        ))}
      </div>
    </main>
  );
}
