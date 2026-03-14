"use client";

import { useState } from "react";

interface CodeBlockProps {
  code: string;
  language: string;
  filename?: string;
  highlightLines?: number[];
}

export function CodeBlock({ code, language, filename, highlightLines = [] }: CodeBlockProps) {
  const [copied, setCopied] = useState(false);

  const handleCopy = () => {
    navigator.clipboard.writeText(code);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const lines = code.split("\n");

  return (
    <div className="my-8 rounded-xl border border-white/5 bg-[#0D0D0D] overflow-hidden">
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-2.5 border-b border-white/5 bg-[#111]">
        <div className="flex items-center gap-3">
          <div className="flex gap-1.5">
            <span className="w-3 h-3 rounded-full bg-[#FF5F56]" />
            <span className="w-3 h-3 rounded-full bg-[#FFBD2E]" />
            <span className="w-3 h-3 rounded-full bg-[#27C93F]" />
          </div>
          {filename && (
            <span className="text-xs text-muted font-mono">{filename}</span>
          )}
        </div>
        <div className="flex items-center gap-2">
          <span className="text-xs text-muted/60 font-mono uppercase">{language}</span>
          <button
            onClick={handleCopy}
            className="text-xs text-muted hover:text-foreground transition-colors px-2 py-1 rounded hover:bg-white/5"
          >
            {copied ? "Copied!" : "Copy"}
          </button>
        </div>
      </div>

      {/* Code */}
      <div className="overflow-x-auto">
        <pre className="p-4 text-sm leading-relaxed">
          <code>
            {lines.map((line, i) => (
              <div
                key={i}
                className={`flex ${
                  highlightLines.includes(i + 1)
                    ? "bg-accent/10 -mx-4 px-4 border-l-2 border-accent"
                    : ""
                }`}
              >
                <span className="select-none text-muted/30 text-right w-8 mr-4 flex-shrink-0 font-mono">
                  {i + 1}
                </span>
                <span className="font-mono text-foreground/90 whitespace-pre">
                  {line}
                </span>
              </div>
            ))}
          </code>
        </pre>
      </div>
    </div>
  );
}
