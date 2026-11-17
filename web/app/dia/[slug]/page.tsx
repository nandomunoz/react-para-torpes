import type { Metadata } from "next";
import Link from "next/link";
import { notFound } from "next/navigation";
import { compileMDX } from "next-mdx-remote/rsc";
import { getLesson, getLessons, getNeighbours } from "@/lib/content";
import { weekByN } from "@/lib/weeks";
import { mdxComponents } from "@/components/mdx";
import { MarkDone } from "@/components/ProgressWidgets";
import { container, eyebrow } from "@/lib/site";

export const dynamicParams = false;

export function generateStaticParams() {
  return getLessons().map((l) => ({ slug: l.slug }));
}

export async function generateMetadata({ params }: { params: Promise<{ slug: string }> }): Promise<Metadata> {
  const { slug } = await params;
  const lesson = getLesson(slug);
  return lesson ? { title: `Día ${lesson.day}: ${lesson.title}`, description: lesson.objective } : {};
}

export default async function LessonPage({ params }: { params: Promise<{ slug: string }> }) {
  const { slug } = await params;
  const lesson = getLesson(slug);
  if (!lesson) notFound();
  const week = weekByN(lesson.week);
  const { prev, next } = getNeighbours(slug);
  const { content } = await compileMDX({ source: lesson.body, components: mdxComponents });

  return (
    <main className={`${container} max-w-3xl py-12`}>
      <nav aria-label="Migas de pan" className="text-sm text-muted">
        <Link href="/plan/" className="hover:text-lime">Plan</Link> /{" "}
        <Link href={`/semana/${lesson.week}/`} className="hover:text-lime">Semana {lesson.week}</Link>
      </nav>
      <header className="mt-4">
        <p className={eyebrow}>Día {lesson.day} · {week?.title}</p>
        <h1 className="mt-2 font-display text-4xl leading-tight">{lesson.title}</h1>
        <p className="mt-3 text-lg text-paper/80">{lesson.objective}</p>
        <ul className="mt-4 flex flex-wrap gap-2 font-mono text-xs">
          <li className="rounded border border-line px-2 py-1 text-muted">⏱ {lesson.minutes} min</li>
          <li className="rounded border border-line px-2 py-1 text-muted">nivel {lesson.level}</li>
        </ul>
      </header>

      <article className="mt-6">{content}</article>

      {lesson.reading.length > 0 && (
        <section className="mt-12 border-t border-line pt-8" aria-labelledby="lecturas">
          <h2 id="lecturas" className="font-display text-xl">📖 Para leer</h2>
          <ul className="mt-3 space-y-2">
            {lesson.reading.map((r) => (
              <li key={r.url}>
                <a href={r.url} target="_blank" rel="noopener noreferrer" className="text-lime underline underline-offset-4">
                  {r.title} ↗
                </a>
              </li>
            ))}
          </ul>
        </section>
      )}

      <div className="mt-10 flex justify-center"><MarkDone slug={lesson.slug} /></div>

      <nav aria-label="Navegación entre lecciones" className="mt-10 grid gap-4 sm:grid-cols-2">
        {prev ? (
          <Link href={`/dia/${prev.slug}/`} className="rounded-lg border border-line p-4 hover:border-lime">
            <span className="text-xs text-muted">← Anterior</span>
            <span className="block font-semibold">Día {prev.day}: {prev.title}</span>
          </Link>
        ) : <span />}
        {next ? (
          <Link href={`/dia/${next.slug}/`} className="rounded-lg border border-line p-4 text-right hover:border-lime">
            <span className="text-xs text-muted">Siguiente →</span>
            <span className="block font-semibold">Día {next.day}: {next.title}</span>
          </Link>
        ) : <span />}
      </nav>
    </main>
  );
}
