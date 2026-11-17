import { readExample } from "@/lib/content";
import PlaygroundClient from "./PlaygroundClient";

/** Editor en vivo alimentado por un archivo real de examples/src. */
export function Playground({
  file,
  title,
  height,
  dependencies,
}: {
  file: string;
  title?: string;
  height?: number;
  dependencies?: Record<string, string>;
}) {
  return (
    <PlaygroundClient
      code={readExample(file)}
      css={readExample("base.css")}
      title={title}
      height={height}
      dependencies={dependencies}
    />
  );
}
