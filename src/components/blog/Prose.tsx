import { ReactNode } from "react";

export function Prose({ children }: { children: ReactNode }) {
  return (
    <article className="max-w-3xl mx-auto px-6 pb-24">
      <div className="prose-custom">{children}</div>
    </article>
  );
}

export function H2({ children }: { children: ReactNode }) {
  const id = typeof children === "string"
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : undefined;
  return (
    <h2 id={id} className="text-2xl md:text-3xl font-bold mt-16 mb-6 font-[family-name:var(--font-space-grotesk)] tracking-tight scroll-mt-24">
      {children}
    </h2>
  );
}

export function H3({ children }: { children: ReactNode }) {
  const id = typeof children === "string"
    ? children.toLowerCase().replace(/[^a-z0-9]+/g, "-").replace(/(^-|-$)/g, "")
    : undefined;
  return (
    <h3 id={id} className="text-xl md:text-2xl font-semibold mt-12 mb-4 font-[family-name:var(--font-space-grotesk)] tracking-tight scroll-mt-24">
      {children}
    </h3>
  );
}

export function P({ children }: { children: ReactNode }) {
  return (
    <p className="text-base text-foreground/85 leading-[1.8] mb-6 font-[family-name:var(--font-inter)]">
      {children}
    </p>
  );
}

export function UL({ children }: { children: ReactNode }) {
  return (
    <ul className="mb-6 space-y-2 pl-5 list-disc text-foreground/85 font-[family-name:var(--font-inter)] text-base leading-[1.8]">
      {children}
    </ul>
  );
}

export function OL({ children }: { children: ReactNode }) {
  return (
    <ol className="mb-6 space-y-2 pl-5 list-decimal text-foreground/85 font-[family-name:var(--font-inter)] text-base leading-[1.8]">
      {children}
    </ol>
  );
}

export function LI({ children }: { children: ReactNode }) {
  return <li>{children}</li>;
}

export function Strong({ children }: { children: ReactNode }) {
  return <strong className="text-foreground font-semibold">{children}</strong>;
}

export function InlineCode({ children }: { children: ReactNode }) {
  return (
    <code className="px-1.5 py-0.5 rounded bg-white/5 border border-white/5 text-accent text-sm font-mono">
      {children}
    </code>
  );
}

export function Divider() {
  return <hr className="my-12 border-0 h-px bg-white/5" />;
}

export function BlockQuote({ children }: { children: ReactNode }) {
  return (
    <blockquote className="my-8 pl-5 border-l-2 border-accent/40 text-foreground/70 italic font-[family-name:var(--font-inter)]">
      {children}
    </blockquote>
  );
}
