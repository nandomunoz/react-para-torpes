import { readExample } from "@/lib/content";
import { CodeBlock } from "./CodeBlock";

export function Solution({ file }: { file: string }) {
  return (
    <details className="group my-6 rounded-lg border border-line bg-panel">
      <summary className="cursor-pointer list-none px-5 py-3 font-semibold text-lime marker:hidden focus-visible:outline-2 focus-visible:outline-lime">
        <span className="group-open:hidden">▸ Ver solución</span>
        <span className="hidden group-open:inline">▾ Ocultar solución</span>
      </summary>
      <div className="px-5 pb-2">
        <CodeBlock code={readExample(file)} lang="tsx" title={file} />
      </div>
    </details>
  );
}
