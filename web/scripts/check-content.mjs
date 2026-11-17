// Valida frontmatter, sintaxis MDX y que los ejemplos referenciados existan.
// Uso: pnpm --filter web check:content [semanaN]
import fs from "node:fs";
import path from "node:path";
import matter from "gray-matter";
import { serialize } from "next-mdx-remote/serialize";

const root = path.join(process.cwd(), "..");
const contentDir = path.join(root, "content");
const examplesDir = path.join(root, "examples", "src");
const only = process.argv[2];
const required = ["title", "week", "day", "order", "objective", "minutes", "level", "reading"];
const levels = ["básico", "intermedio", "avanzado"];
const allowedHosts = ["react.dev", "www.typescriptlang.org", "vite.dev", "nextjs.org", "reactrouter.com", "redux-toolkit.js.org", "testing-library.com", "vitest.dev", "developer.mozilla.org", "react-redux.js.org"];
let errors = 0;
const fail = (f, m) => { errors++; console.error(`✗ ${f}: ${m}`); };

for (const dir of fs.readdirSync(contentDir).sort()) {
  if (only && dir !== only) continue;
  const full = path.join(contentDir, dir);
  if (!fs.statSync(full).isDirectory()) continue;
  for (const f of fs.readdirSync(full).sort()) {
    if (!f.endsWith(".mdx")) continue;
    const rel = `${dir}/${f}`;
    const { data, content } = matter(fs.readFileSync(path.join(full, f), "utf8"));
    for (const k of required) if (data[k] === undefined) fail(rel, `falta frontmatter "${k}"`);
    if (data.level && !levels.includes(data.level)) fail(rel, `level inválido: ${data.level}`);
    for (const r of data.reading ?? []) {
      try { if (!allowedHosts.includes(new URL(r.url).host)) fail(rel, `dominio no permitido: ${r.url}`); }
      catch { fail(rel, `URL inválida: ${r.url}`); }
    }
    for (const m of content.matchAll(/file="([^"]+)"/g)) {
      if (!fs.existsSync(path.join(examplesDir, m[1]))) fail(rel, `ejemplo inexistente: examples/src/${m[1]}`);
    }
    if (!/<Exercise\b/.test(content)) fail(rel, "falta <Exercise>");
    // La semana 5 (Next.js) no se puede ejecutar en Sandpack: ahí el Playground es opcional.
    if (dir !== "semana5" && !/<Playground\b/.test(content)) fail(rel, "falta <Playground>");
    if (!/<Warning\b/.test(content)) fail(rel, "falta <Warning>");
    try { await serialize(content, { blockJS: false }); } catch (e) { fail(rel, `MDX inválido: ${String(e.message).split("\n")[0]}`); }
    if (!errors) console.log(`✓ ${rel}`);
  }
}
if (errors) { console.error(`\n${errors} error(es)`); process.exit(1); }
