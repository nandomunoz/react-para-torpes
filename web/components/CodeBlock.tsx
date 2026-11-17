import { codeToHtml } from "shiki";
import { CopyButton } from "./CopyButton";

type Props = { code: string; lang?: string; title?: string };

export async function CodeBlock({ code, lang = "tsx", title }: Props) {
  const clean = code.replace(/\n$/, "");
  let html: string;
  try {
    html = await codeToHtml(clean, { lang, theme: "github-dark-default" });
  } catch {
    html = await codeToHtml(clean, { lang: "text", theme: "github-dark-default" });
  }

  return (
    <figure className="my-6 overflow-hidden rounded-lg border border-line bg-[#0d1117]">
      <figcaption className="flex items-center justify-between border-b border-line px-3 py-2">
        <span className="font-mono text-xs text-muted">{title ?? lang}</span>
        <CopyButton text={clean} />
      </figcaption>
      <div
        className="overflow-x-auto p-4 text-sm leading-relaxed [&_pre]:bg-transparent! [&_code]:font-mono"
        // shiki genera HTML escapado a partir de texto plano
        dangerouslySetInnerHTML={{ __html: html }}
        tabIndex={0}
      />
    </figure>
  );
}
