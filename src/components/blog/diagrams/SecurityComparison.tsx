"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const threats = [
  { label: "Origin Exposure", beforeLevel: "HIGH" as const },
  { label: "CloudFront Bypass", beforeLevel: "HIGH" as const },
  { label: "Custom Header Dependency", beforeLevel: "HIGH" as const },
  { label: "Header Rotation Required", beforeLevel: "MEDIUM" as const },
  { label: "DDoS at Origin", beforeLevel: "HIGH" as const },
  { label: "Configuration Drift", beforeLevel: "MEDIUM" as const },
];

const levelColor = {
  HIGH: { bg: "bg-red-500/15", text: "text-red-400", border: "border-red-500/30", dot: "bg-red-500" },
  MEDIUM: { bg: "bg-orange-500/15", text: "text-orange-400", border: "border-orange-500/30", dot: "bg-orange-400" },
};

export function SecurityComparison() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="my-10">
      <div className="rounded-xl border border-white/5 bg-[#0D0D0D] p-4 md:p-8 overflow-hidden">
        {/* Header */}
        <motion.div
          initial={{ opacity: 0, y: -10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5 }}
          className="text-center mb-8"
        >
          <p className="text-xs text-foreground/50 uppercase tracking-widest mb-3 font-mono">
            Attack Surface Comparison
          </p>
          <div className="flex items-center justify-center gap-3 flex-wrap">
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 0.2 }}
              className="font-mono text-lg md:text-2xl font-bold text-red-400"
            >
              Threat Score: 6/6
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scaleX: 0 }}
              animate={isInView ? { opacity: 1, scaleX: 1 } : {}}
              transition={{ duration: 0.3, delay: 0.8 }}
              className="text-foreground/30 font-mono text-lg md:text-2xl"
            >
              →
            </motion.span>
            <motion.span
              initial={{ opacity: 0, scale: 0.8 }}
              animate={isInView ? { opacity: 1, scale: 1 } : {}}
              transition={{ duration: 0.4, delay: 1.1 }}
              className="font-mono text-lg md:text-2xl font-bold text-emerald-400"
            >
              0/6
            </motion.span>
          </div>
        </motion.div>

        {/* Column headers */}
        <motion.div
          initial={{ opacity: 0 }}
          animate={isInView ? { opacity: 1 } : {}}
          transition={{ duration: 0.4, delay: 0.3 }}
          className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_120px_120px] gap-2 md:gap-4 mb-3 px-2"
        >
          <span className="text-xs font-mono uppercase tracking-wider text-foreground/40">
            Threat Vector
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-red-400/70 text-center">
            Before
          </span>
          <span className="text-xs font-mono uppercase tracking-wider text-emerald-400/70 text-center">
            After
          </span>
        </motion.div>

        {/* Threat rows */}
        <div className="space-y-2">
          {threats.map((threat, i) => {
            const colors = levelColor[threat.beforeLevel];
            const rowDelay = 0.4 + i * 0.12;
            const afterDelay = rowDelay + 0.6;

            return (
              <motion.div
                key={threat.label}
                initial={{ opacity: 0, x: -20 }}
                animate={isInView ? { opacity: 1, x: 0 } : {}}
                transition={{ duration: 0.4, delay: rowDelay }}
                className="grid grid-cols-[1fr_auto_auto] md:grid-cols-[1fr_120px_120px] gap-2 md:gap-4 items-center rounded-lg bg-white/[0.02] border border-white/[0.04] px-3 py-3 md:px-4 md:py-3 hover:bg-white/[0.04] transition-colors"
              >
                {/* Threat label */}
                <div className="flex items-center gap-2.5 min-w-0">
                  <motion.div
                    initial={{ scale: 1 }}
                    animate={isInView ? { scale: [1, 1.3, 1] } : {}}
                    transition={{ duration: 0.4, delay: afterDelay - 0.1 }}
                    className={`w-2 h-2 rounded-full shrink-0 ${colors.dot}`}
                  />
                  <span className="text-sm text-foreground/80 font-[family-name:var(--font-inter)] truncate">
                    {threat.label}
                  </span>
                </div>

                {/* Before badge */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5 }}
                    animate={
                      isInView
                        ? {
                            opacity: [0, 1, 1, 0.4],
                            scale: [0.5, 1, 1, 0.95],
                          }
                        : {}
                    }
                    transition={{
                      duration: 1.2,
                      delay: rowDelay + 0.1,
                      times: [0, 0.2, 0.7, 1],
                    }}
                    className={`px-2.5 py-1 rounded-md text-xs font-mono font-semibold border ${colors.bg} ${colors.text} ${colors.border} relative`}
                  >
                    {threat.beforeLevel}
                    {/* Strikethrough line that appears on transition */}
                    <motion.div
                      initial={{ scaleX: 0 }}
                      animate={isInView ? { scaleX: 1 } : {}}
                      transition={{ duration: 0.3, delay: afterDelay }}
                      className="absolute inset-0 flex items-center justify-center origin-left"
                    >
                      <div className="w-full h-[1.5px] bg-red-400/60" />
                    </motion.div>
                  </motion.div>
                </div>

                {/* After badge */}
                <div className="flex justify-center">
                  <motion.div
                    initial={{ opacity: 0, scale: 0.5, filter: "blur(4px)" }}
                    animate={
                      isInView
                        ? { opacity: 1, scale: 1, filter: "blur(0px)" }
                        : {}
                    }
                    transition={{
                      duration: 0.5,
                      delay: afterDelay + 0.15,
                      type: "spring",
                      stiffness: 200,
                      damping: 15,
                    }}
                    className="px-2.5 py-1 rounded-md text-xs font-mono font-semibold border bg-emerald-500/15 text-emerald-400 border-emerald-500/30"
                  >
                    ELIMINATED
                  </motion.div>
                </div>
              </motion.div>
            );
          })}
        </div>

        {/* Bottom summary bar */}
        <motion.div
          initial={{ opacity: 0, y: 10 }}
          animate={isInView ? { opacity: 1, y: 0 } : {}}
          transition={{ duration: 0.5, delay: 2.0 }}
          className="mt-6 rounded-lg border border-emerald-500/20 bg-emerald-500/5 px-4 py-3 flex items-center justify-center gap-2"
        >
          <svg
            className="w-4 h-4 text-emerald-400 shrink-0"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
            strokeWidth={2.5}
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              d="M9 12.75L11.25 15 15 9.75m-3-7.036A11.959 11.959 0 013.598 6 11.99 11.99 0 003 9.749c0 5.592 3.824 10.29 9 11.623 5.176-1.332 9-6.03 9-11.622 0-1.31-.21-2.571-.598-3.751h-.152c-3.196 0-6.1-1.248-8.25-3.285z"
            />
          </svg>
          <span className="text-sm text-emerald-400/90 font-[family-name:var(--font-inter)]">
            All 6 threat vectors eliminated with VPC Origins
          </span>
        </motion.div>
      </div>
      <p className="text-xs text-muted text-center mt-3 font-[family-name:var(--font-inter)]">
        Fig 3: Every attack vector from the public ALB approach is completely eliminated with VPC Origins
      </p>
    </div>
  );
}
