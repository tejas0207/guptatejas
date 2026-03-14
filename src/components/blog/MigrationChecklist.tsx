"use client";

import { useState, useEffect, useCallback } from "react";
import { motion, AnimatePresence } from "framer-motion";

const STORAGE_KEY = "vpc-origins-migration-progress";

interface Step {
  title: string;
  estimate: string;
}

const STEPS: Step[] = [
  { title: "Create a new internal ALB in private subnet", estimate: "~15 min" },
  { title: "Create a VPC Origin pointing to the ALB", estimate: "~20 min" },
  { title: "Create a staging distribution using Continuous Deployment", estimate: "~10 min" },
  { title: "Update staging distribution to use VPC Origin", estimate: "~5 min" },
  { title: "Test thoroughly — route traffic percentage to staging", estimate: "~30 min" },
  { title: "Promote staging to production", estimate: "~5 min" },
  { title: "Decommission the public ALB", estimate: "~15 min" },
];

function loadProgress(): boolean[] {
  if (typeof window === "undefined") return new Array(STEPS.length).fill(false);
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) {
      const parsed = JSON.parse(stored);
      if (Array.isArray(parsed) && parsed.length === STEPS.length) {
        return parsed;
      }
    }
  } catch {}
  return new Array(STEPS.length).fill(false);
}

export function MigrationChecklist() {
  const [checked, setChecked] = useState<boolean[]>(() => new Array(STEPS.length).fill(false));
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setChecked(loadProgress());
    setMounted(true);
  }, []);

  useEffect(() => {
    if (mounted) {
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(checked));
      } catch {}
    }
  }, [checked, mounted]);

  const toggle = useCallback((index: number) => {
    setChecked((prev) => {
      const next = [...prev];
      next[index] = !next[index];
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setChecked(new Array(STEPS.length).fill(false));
  }, []);

  const completedCount = checked.filter(Boolean).length;
  const progress = completedCount / STEPS.length;

  return (
    <div className="my-8 rounded-xl border border-border bg-surface p-5 sm:p-6">
      {/* Header */}
      <div className="flex items-center justify-between mb-4">
        <p className="text-sm font-semibold text-foreground/90 font-[family-name:var(--font-space-grotesk)]">
          {completedCount}/{STEPS.length} steps complete
        </p>
        <button
          onClick={reset}
          className="text-xs text-muted hover:text-foreground/70 transition-colors px-2 py-1 rounded border border-border hover:border-foreground/20 font-[family-name:var(--font-inter)]"
        >
          Reset
        </button>
      </div>

      {/* Progress bar */}
      <div className="h-1.5 rounded-full bg-border overflow-hidden mb-6">
        <motion.div
          className="h-full rounded-full bg-accent"
          initial={false}
          animate={{ width: `${progress * 100}%` }}
          transition={{ duration: 0.4, ease: "easeOut" }}
        />
      </div>

      {/* Steps */}
      <div className="space-y-2">
        {STEPS.map((step, i) => {
          const isChecked = checked[i];
          return (
            <motion.button
              key={i}
              type="button"
              onClick={() => toggle(i)}
              className={`w-full flex items-start gap-3 sm:gap-4 text-left rounded-lg px-3 sm:px-4 py-3 transition-colors ${
                isChecked
                  ? "bg-accent/8 border border-accent/20"
                  : "bg-surface-light border border-border hover:border-foreground/15"
              }`}
              layout
              transition={{ duration: 0.2 }}
            >
              {/* Checkbox */}
              <span className="flex-shrink-0 mt-0.5">
                <motion.div
                  className={`w-5 h-5 rounded border-2 flex items-center justify-center transition-colors ${
                    isChecked
                      ? "bg-accent border-accent"
                      : "border-muted/50"
                  }`}
                  whileTap={{ scale: 0.9 }}
                >
                  <AnimatePresence>
                    {isChecked && (
                      <motion.svg
                        width="12"
                        height="12"
                        viewBox="0 0 12 12"
                        fill="none"
                        initial={{ scale: 0, opacity: 0 }}
                        animate={{ scale: 1, opacity: 1 }}
                        exit={{ scale: 0, opacity: 0 }}
                        transition={{ duration: 0.15 }}
                      >
                        <path
                          d="M2.5 6L5 8.5L9.5 3.5"
                          stroke="white"
                          strokeWidth="2"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                        />
                      </motion.svg>
                    )}
                  </AnimatePresence>
                </motion.div>
              </span>

              {/* Content */}
              <div className="flex-1 min-w-0">
                <span
                  className={`text-sm leading-relaxed font-[family-name:var(--font-inter)] transition-colors ${
                    isChecked ? "text-foreground/50 line-through" : "text-foreground/90"
                  }`}
                >
                  {step.title}
                </span>
              </div>

              {/* Estimate badge */}
              <span
                className={`flex-shrink-0 text-xs px-2 py-0.5 rounded-full font-[family-name:var(--font-inter)] transition-colors ${
                  isChecked
                    ? "bg-accent/10 text-accent/60"
                    : "bg-border text-muted"
                }`}
              >
                {step.estimate}
              </span>
            </motion.button>
          );
        })}
      </div>

      {/* Completion message */}
      <AnimatePresence>
        {completedCount === STEPS.length && (
          <motion.p
            initial={{ opacity: 0, y: -8 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -8 }}
            transition={{ duration: 0.3 }}
            className="mt-4 text-sm text-accent font-medium text-center font-[family-name:var(--font-space-grotesk)]"
          >
            Migration complete!
          </motion.p>
        )}
      </AnimatePresence>
    </div>
  );
}
