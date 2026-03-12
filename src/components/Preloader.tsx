"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const bootLines = [
  { text: "$ initializing tejas.system", delay: 0 },
  { text: "> loading cloud infrastructure...", delay: 400 },
  { text: "> mounting kubernetes clusters...", delay: 800 },
  { text: "> deploying portfolio v3.0", delay: 1200 },
  { text: "> status: operational ✓", delay: 1600 },
];

export function Preloader({ onComplete }: { onComplete: () => void }) {
  const [visibleLines, setVisibleLines] = useState(0);
  const [done, setDone] = useState(false);

  useEffect(() => {
    bootLines.forEach((_, i) => {
      setTimeout(() => setVisibleLines(i + 1), bootLines[i].delay);
    });

    setTimeout(() => setDone(true), 2200);
    setTimeout(onComplete, 2800);
  }, [onComplete]);

  return (
    <AnimatePresence>
      {!done && (
        <motion.div
          exit={{ opacity: 0, scale: 0.98 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
          className="fixed inset-0 z-[9999] bg-[#0A0A0A] flex items-center justify-center"
        >
          <div className="w-full max-w-lg px-8">
            {/* Terminal window */}
            <div className="rounded-xl border border-white/10 bg-[#111] overflow-hidden shadow-2xl shadow-accent/5">
              {/* Title bar */}
              <div className="flex items-center gap-2 px-4 py-3 border-b border-white/5">
                <div className="w-3 h-3 rounded-full bg-red-500/80" />
                <div className="w-3 h-3 rounded-full bg-yellow-500/80" />
                <div className="w-3 h-3 rounded-full bg-green-500/80" />
                <span className="ml-3 text-xs text-muted/50 font-mono">
                  tejas — portfolio — 80×24
                </span>
              </div>

              {/* Terminal body */}
              <div className="p-5 font-mono text-sm space-y-2 min-h-[180px]">
                {bootLines.slice(0, visibleLines).map((line, i) => (
                  <motion.div
                    key={i}
                    initial={{ opacity: 0, x: -8 }}
                    animate={{ opacity: 1, x: 0 }}
                    transition={{ duration: 0.3 }}
                    className={
                      i === bootLines.length - 1
                        ? "text-emerald-400"
                        : "text-muted/70"
                    }
                  >
                    {line.text}
                  </motion.div>
                ))}

                {/* Blinking cursor */}
                {visibleLines < bootLines.length && (
                  <span className="inline-block w-2 h-4 bg-accent animate-pulse" />
                )}
              </div>
            </div>

            {/* Progress bar */}
            <div className="mt-6 h-[2px] bg-white/5 rounded-full overflow-hidden">
              <motion.div
                initial={{ width: "0%" }}
                animate={{ width: "100%" }}
                transition={{ duration: 2.2, ease: "linear" }}
                className="h-full bg-gradient-to-r from-accent to-emerald-400"
              />
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
