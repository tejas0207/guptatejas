"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const steps = [
  {
    num: 1,
    title: "POSIX File Operation",
    desc: 'Your application calls a standard file system operation — open(), read(), write(), ls — exactly like it would on any local disk.',
    color: "#F5F5F5",
  },
  {
    num: 2,
    title: "NFS v4.1 Protocol",
    desc: "The OS translates the call into NFS v4.1 packets. S3 Files exposes a fully NFS-compliant endpoint — no agent, no sidecar, no SDK changes required.",
    color: "#F59E0B",
  },
  {
    num: 3,
    title: "S3 Files File System",
    desc: "The EFS-powered file system layer receives the NFS request. It handles POSIX semantics, locking, permissions, and metadata — translating file operations to object storage actions.",
    color: "#34D399",
  },
  {
    num: 4,
    title: "S3 Object Storage",
    desc: "Data lands in your S3 bucket as standard S3 objects. Files appear exactly as you'd see them in the S3 console — same keys, same durability guarantees (11 nines), same storage classes.",
    color: "#60A5FA",
  },
  {
    num: 5,
    title: "Return Path",
    desc: "Read responses flow back through the same path with ~1ms latency for metadata operations. The application sees a normal file system response — unaware it's talking to object storage.",
    color: "#A78BFA",
  },
];

export function S3FilesFlow() {
  const [activeStep, setActiveStep] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const advance = useCallback(() => {
    setActiveStep((prev) => {
      if (prev >= steps.length - 1) {
        setIsPlaying(false);
        return prev;
      }
      return prev + 1;
    });
  }, []);

  useEffect(() => {
    if (isPlaying) {
      intervalRef.current = setInterval(advance, 3000);
    }
    return () => {
      if (intervalRef.current) clearInterval(intervalRef.current);
    };
  }, [isPlaying, advance]);

  const handlePlayPause = () => {
    if (isPlaying) {
      setIsPlaying(false);
    } else {
      if (activeStep >= steps.length - 1) {
        setActiveStep(0);
      }
      setIsPlaying(true);
    }
  };

  const handleBack = () => {
    setIsPlaying(false);
    setActiveStep((prev) => Math.max(0, prev - 1));
  };

  const handleNext = () => {
    setIsPlaying(false);
    setActiveStep((prev) => Math.min(steps.length - 1, prev + 1));
  };

  const handleStepClick = (index: number) => {
    setIsPlaying(false);
    setActiveStep(index);
  };

  return (
    <div className="my-10">
      <div className="rounded-xl border border-white/5 bg-[#0D0D0D] p-5 md:p-8">
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <p className="text-xs text-accent/80 uppercase tracking-widest font-mono">
            Data Flow — App to S3 and Back
          </p>
          <span className="text-xs text-muted font-mono">
            Step {activeStep + 1} of {steps.length}
          </span>
        </div>

        {/* Steps */}
        <div className="max-w-2xl mx-auto">
          {steps.map((step, i) => {
            const isActive = i === activeStep;
            const isPast = i < activeStep;
            const isFuture = i > activeStep;

            return (
              <div key={step.num}>
                {/* Step node */}
                <motion.button
                  type="button"
                  onClick={() => handleStepClick(i)}
                  className="w-full flex items-start gap-4 text-left group cursor-pointer rounded-lg px-3 py-2 -mx-3 transition-colors"
                  style={{
                    backgroundColor: isActive ? `${step.color}08` : "transparent",
                  }}
                  animate={{ opacity: isFuture ? 0.4 : 1 }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Number circle */}
                  <motion.div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-mono flex-shrink-0 relative"
                    style={{
                      border: `2px solid ${isActive || isPast ? step.color : "rgba(255,255,255,0.15)"}`,
                      color: isActive || isPast ? step.color : "rgba(255,255,255,0.3)",
                      backgroundColor: isActive ? `${step.color}15` : "transparent",
                    }}
                    animate={
                      isActive
                        ? {
                            boxShadow: [
                              `0 0 0px ${step.color}00`,
                              `0 0 12px ${step.color}40`,
                              `0 0 0px ${step.color}00`,
                            ],
                          }
                        : { boxShadow: `0 0 0px ${step.color}00` }
                    }
                    transition={
                      isActive
                        ? { duration: 2, repeat: Infinity, ease: "easeInOut" }
                        : { duration: 0.3 }
                    }
                  >
                    {isPast ? (
                      <svg
                        width="14"
                        height="14"
                        viewBox="0 0 14 14"
                        fill="none"
                        stroke="currentColor"
                        strokeWidth="2.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      >
                        <polyline points="2,7 5.5,10.5 12,4" />
                      </svg>
                    ) : (
                      step.num
                    )}
                  </motion.div>

                  {/* Content */}
                  <div className="pt-1 min-w-0">
                    <h4
                      className="text-sm font-semibold font-[family-name:var(--font-space-grotesk)] transition-colors"
                      style={{
                        color:
                          isActive || isPast
                            ? step.color
                            : "rgba(255,255,255,0.3)",
                      }}
                    >
                      {step.title}
                    </h4>
                    <AnimatePresence mode="wait">
                      {isActive && (
                        <motion.p
                          key={`desc-${step.num}`}
                          initial={{ opacity: 0, height: 0 }}
                          animate={{ opacity: 1, height: "auto" }}
                          exit={{ opacity: 0, height: 0 }}
                          transition={{ duration: 0.25 }}
                          className="text-xs text-muted mt-1 leading-relaxed font-[family-name:var(--font-inter)]"
                        >
                          {step.desc}
                        </motion.p>
                      )}
                    </AnimatePresence>
                  </div>
                </motion.button>

                {/* Connector line */}
                {i < steps.length - 1 && (
                  <div className="ml-[28px] w-[1px] h-5 my-0.5 relative overflow-hidden bg-white/5">
                    <motion.div
                      className="absolute inset-x-0 top-0"
                      style={{ backgroundColor: step.color }}
                      initial={{ height: "0%" }}
                      animate={{ height: isPast ? "100%" : "0%" }}
                      transition={{ duration: 0.4, ease: "easeInOut" }}
                    />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-8">
          <button
            onClick={handleBack}
            disabled={activeStep === 0}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="9,2 4,7 9,12" />
            </svg>
          </button>

          <button
            onClick={handlePlayPause}
            className="px-5 h-8 rounded-lg border border-accent/30 bg-accent/10 text-accent text-xs font-mono tracking-wider hover:bg-accent/20 transition-all"
          >
            {isPlaying ? "PAUSE" : activeStep >= steps.length - 1 ? "RESTART" : "PLAY"}
          </button>

          <button
            onClick={handleNext}
            disabled={activeStep >= steps.length - 1}
            className="w-8 h-8 rounded-lg border border-white/10 flex items-center justify-center text-white/40 hover:text-white/70 hover:border-white/20 disabled:opacity-30 disabled:cursor-not-allowed transition-all"
          >
            <svg width="14" height="14" viewBox="0 0 14 14" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round">
              <polyline points="5,2 10,7 5,12" />
            </svg>
          </button>
        </div>
      </div>
    </div>
  );
}
