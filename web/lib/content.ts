import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";

const ROOT = path.join(process.cwd(), "..");
const CONTENT_DIR = path.join(ROOT, "content");
const EXAMPLES_DIR = path.join(ROOT, "examples", "src");

export type Level = "básico" | "intermedio" | "avanzado";

export type Lesson = {
  /** p. ej. "dia-04" o "dia-13-14" */
  slug: string;
  week: number;
  /** Texto para mostrar: "4" o "13-14" */
  day: string;
  order: number;
  title: string;
  objective: string;
  minutes: number;
  level: Level;
  reading: { title: string; url: string }[];
  body: string;
};

function readLesson(file: string): Lesson {
  const raw = fs.readFileSync(file, "utf8");
  const { data, content } = matter(raw);
  return {
    slug: path.basename(file, ".mdx"),
    week: Number(data.week),
    day: String(data.day),
    order: Number(data.order),
    title: String(data.title),
    objective: String(data.objective),
    minutes: Number(data.minutes ?? 30),
    level: (data.level ?? "básico") as Level,
    reading: (data.reading ?? []) as Lesson["reading"],
    body: content,
  };
}

let cache: Lesson[] | null = null;

export function getLessons(): Lesson[] {
  if (cache) return cache;
  const lessons: Lesson[] = [];
  if (fs.existsSync(CONTENT_DIR)) {
    for (const dir of fs.readdirSync(CONTENT_DIR)) {
      const full = path.join(CONTENT_DIR, dir);
      if (!fs.statSync(full).isDirectory()) continue;
      for (const f of fs.readdirSync(full)) {
        if (f.endsWith(".mdx")) lessons.push(readLesson(path.join(full, f)));
      }
    }
  }
  cache = lessons.sort((a, b) => a.order - b.order);
  return cache;
}

export const getLesson = (slug: string) => getLessons().find((l) => l.slug === slug);
export const getWeekLessons = (week: number) => getLessons().filter((l) => l.week === week);

export function getNeighbours(slug: string) {
  const all = getLessons();
  const i = all.findIndex((l) => l.slug === slug);
  return { prev: all[i - 1] ?? null, next: all[i + 1] ?? null };
}

/** Lee un ejemplo real de examples/src (ruta relativa, p. ej. "dia-04/Contador.tsx"). */
export function readExample(file: string): string {
  const full = path.resolve(EXAMPLES_DIR, file);
  if (!full.startsWith(EXAMPLES_DIR + path.sep)) throw new Error(`Ruta inválida: ${file}`);
  if (!fs.existsSync(full)) throw new Error(`Ejemplo no encontrado: examples/src/${file}`);
  return fs.readFileSync(full, "utf8");
}

export function countExamples(): number {
  let n = 0;
  const walk = (d: string) => {
    for (const e of fs.readdirSync(d, { withFileTypes: true })) {
      if (e.isDirectory()) walk(path.join(d, e.name));
      else if (/\.tsx?$/.test(e.name) && !e.name.includes(".solution.")) n++;
    }
  };
  if (fs.existsSync(EXAMPLES_DIR)) walk(EXAMPLES_DIR);
  return n;
}
