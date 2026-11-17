import { readExample } from "@/lib/content";
import { CodeBlock } from "./CodeBlock";

/** Muestra un archivo real de examples/src con resaltado y botón de copiar. */
export function Snippet({ file, title, lang }: { file: string; title?: string; lang?: string }) {
  return <CodeBlock code={readExample(file)} lang={lang ?? (file.endsWith(".css") ? "css" : "tsx")} title={title ?? file} />;
}
