"use client";

import { ReactNode } from "react";

interface CalloutProps {
  type?: "info" | "warning" | "tip" | "danger";
  title?: string;
  children: ReactNode;
}

const icons = {
  info: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M10 9V14M10 6.5V7" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  warning: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 2L19 18H1L10 2Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
      <path d="M10 8V12M10 15V15.5" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
  tip: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <path d="M10 1L12.5 7H19L13.5 11L15.5 18L10 14L4.5 18L6.5 11L1 7H7.5L10 1Z" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" />
    </svg>
  ),
  danger: (
    <svg width="20" height="20" viewBox="0 0 20 20" fill="none">
      <circle cx="10" cy="10" r="9" stroke="currentColor" strokeWidth="1.5" />
      <path d="M7 7L13 13M13 7L7 13" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" />
    </svg>
  ),
};

const styles = {
  info: "border-accent/30 bg-accent/5 text-accent",
  warning: "border-amber-500/30 bg-amber-500/5 text-amber-400",
  tip: "border-emerald-500/30 bg-emerald-500/5 text-emerald-400",
  danger: "border-red-500/30 bg-red-500/5 text-red-400",
};

export function Callout({ type = "info", title, children }: CalloutProps) {
  return (
    <div className={`my-8 rounded-xl border-l-4 p-5 ${styles[type]}`}>
      <div className="flex items-start gap-3">
        <span className="flex-shrink-0 mt-0.5">{icons[type]}</span>
        <div>
          {title && (
            <p className="font-semibold text-sm mb-1 font-[family-name:var(--font-space-grotesk)]">
              {title}
            </p>
          )}
          <div className="text-sm text-foreground/80 leading-relaxed font-[family-name:var(--font-inter)]">
            {children}
          </div>
        </div>
      </div>
    </div>
  );
}
