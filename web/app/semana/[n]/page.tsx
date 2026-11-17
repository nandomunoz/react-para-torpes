import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { getWeekLessons } from "@/lib/content";
import { WEEKS, weekByN } from "@/lib/weeks";
import { container, eyebrow } from "@/lib/site";
import { DoneMark } from "@/components/ProgressWidgets";

export const dynamicParams = false;

export function generateStaticParams() {
  return WEEKS.map((w) => ({ n: String(w.n) }));
}

export async function generateMetadata({ params }: { params: Promise<{ n: string }> }): Promise<Metadata> {
  const { n } = await params;
  const w = weekByN(Number(n));
  return { title: w ? `Semana ${w.n}: ${w.title}` : "Semana" };
}

export default async function WeekPage({ params }: { params: Promise<{ n: string }> }) {
  const { n } = await params;
  const week = weekByN(Number(n));
  if (!week) notFound();
  const lessons = getWeekLessons(week.n);
  return (
    <main className={`${container} max-w-3xl py-12`}>
      <p className={eyebrow}>Semana {week.n}</p>
      <h1 className="mt-2 font-display text-4xl">{week.title}</h1>
      <p className="mt-2 text-lg text-muted">{week.tagline}</p>
      <ul className="mt-8 divide-y divide-line rounded-lg border border-line">
        {lessons.map((l) => (
          <li key={l.slug}>
            <Link href={`/dia/${l.slug}/`} className="flex items-start gap-4 px-4 py-4 hover:bg-panel">
              <DoneMark slug={l.slug} />
              <span className="w-16 shrink-0 font-mono text-sm text-sun">Día {l.day}</span>
              <span className="min-w-0 flex-1">
                <span className="block font-semibold">{l.title}</span>
                <span className="block text-sm text-muted">{l.objective}</span>
              </span>
              <span className="shrink-0 font-mono text-xs text-muted">{l.minutes} min</span>
            </Link>
          </li>
        ))}
      </ul>
      <div className="mt-8 flex justify-between text-sm">
        {week.n > 1 ? <Link href={`/semana/${week.n - 1}/`} className="text-lime">← Semana {week.n - 1}</Link> : <span />}
        {week.n < WEEKS.length ? <Link href={`/semana/${week.n + 1}/`} className="text-lime">Semana {week.n + 1} →</Link> : <span />}
      </div>
    </main>
  );
}
