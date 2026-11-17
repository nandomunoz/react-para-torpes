import type { ComponentProps, ReactElement, ReactNode } from "react";
import Link from "next/link";
import { CodeBlock } from "./CodeBlock";
import { Playground } from "./Playground";
import { Snippet } from "./Snippet";
import { Step, Tip, Warning } from "./Callouts";
import { Exercise } from "./Exercise";
import { Solution } from "./Solution";

function Pre({ children }: { children?: ReactNode }) {
  const child = children as ReactElement<{ className?: string; children?: string }> | undefined;
  const lang = child?.props?.className?.replace("language-", "") || "tsx";
  const code = typeof child?.props?.children === "string" ? child.props.children : "";
  return <CodeBlock code={code} lang={lang} />;
}

export const mdxComponents = {
  h2: (p: ComponentProps<"h2">) => (
    <h2 className="mt-12 mb-4 border-t border-line pt-8 font-display text-2xl text-paper" {...p} />
  ),
  h3: (p: ComponentProps<"h3">) => <h3 className="mt-8 mb-3 text-lg font-semibold text-paper" {...p} />,
  p: (p: ComponentProps<"p">) => <p className="my-4 leading-relaxed text-paper/85" {...p} />,
  ul: (p: ComponentProps<"ul">) => <ul className="my-4 list-disc space-y-1 pl-6 text-paper/85" {...p} />,
  ol: (p: ComponentProps<"ol">) => <ol className="my-4 list-decimal space-y-1 pl-6 text-paper/85" {...p} />,
  strong: (p: ComponentProps<"strong">) => <strong className="font-semibold text-paper" {...p} />,
  blockquote: (p: ComponentProps<"blockquote">) => (
    <blockquote className="my-6 border-l-4 border-sun pl-4 text-paper/80 italic" {...p} />
  ),
  a: ({ href = "#", ...p }: ComponentProps<"a">) =>
    href.startsWith("/") ? (
      <Link href={href} className="text-lime underline underline-offset-4" {...p} />
    ) : (
      <a href={href} className="text-lime underline underline-offset-4" target="_blank" rel="noopener noreferrer" {...p} />
    ),
  code: (p: ComponentProps<"code">) => (
    <code className="rounded bg-panel px-1.5 py-0.5 font-mono text-[0.9em] text-sun" {...p} />
  ),
  pre: Pre,
  Step,
  Tip,
  Warning,
  Snippet,
  Playground,
  Exercise,
  Solution,
};
