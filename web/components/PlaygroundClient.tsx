"use client";

import { SandpackProvider, SandpackLayout, SandpackCodeEditor, SandpackPreview } from "@codesandbox/sandpack-react";

type Props = {
  code: string;
  css: string;
  title?: string;
  height?: number;
  dependencies?: Record<string, string>;
};

export default function PlaygroundClient({ code, css, title, height = 320, dependencies }: Props) {
  return (
    <div className="my-6 overflow-hidden rounded-lg border border-line">
      <div className="flex items-center justify-between border-b border-line bg-panel px-3 py-2">
        <span className="font-mono text-xs text-lime">▶ {title ?? "Pruébalo en vivo"}</span>
        <span className="text-xs text-muted">Edita el código y mira el resultado</span>
      </div>
      <SandpackProvider
        template="react-ts"
        theme="dark"
        files={{
          "/App.tsx": code,
          "/styles.css": { code: css, hidden: true },
        }}
        customSetup={dependencies ? { dependencies } : undefined}
        options={{ recompileMode: "delayed", recompileDelay: 400 }}
      >
        <SandpackLayout style={{ border: 0, borderRadius: 0 }}>
          <SandpackCodeEditor style={{ height, minWidth: 260 }} showLineNumbers showTabs={false} />
          <SandpackPreview style={{ height, minWidth: 260 }} showOpenInCodeSandbox={false} />
        </SandpackLayout>
      </SandpackProvider>
    </div>
  );
}
