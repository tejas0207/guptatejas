"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useState, useEffect, useCallback, useRef } from "react";

const steps = [
  {
    num: 1,
    title: "User Request",
    desc: "User sends HTTPS request to your domain (e.g., app.example.com)",
    color: "#F5F5F5",
  },
  {
    num: 2,
    title: "Route 53",
    desc: "DNS resolves to nearest CloudFront edge location",
    color: "#F59E0B",
  },
  {
    num: 3,
    title: "CloudFront Edge",
    desc: "Request hits CloudFront POP. WAF rules, geo-restrictions, and caching evaluated",
    color: "#8B5CF6",
  },
  {
    num: 4,
    title: "VPC Origin (ENI)",
    desc: "CloudFront routes to service-managed ENI in your private subnet via AWS private backbone",
    color: "#22C55E",
  },
  {
    num: 5,
    title: "Private ALB",
    desc: "ENI forwards to internal ALB. No public IP, no internet exposure",
    color: "#22C55E",
  },
  {
    num: 6,
    title: "Target Group",
    desc: "ALB routes to ECS tasks/EC2 instances in private subnet. Response flows back the same private path",
    color: "#3B82F6",
  },
];

export function RequestFlow() {
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
      // If at the end, restart from beginning
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
            Request Flow — End to End
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
                    backgroundColor: isActive
                      ? `${step.color}08`
                      : "transparent",
                  }}
                  animate={{
                    opacity: isFuture ? 0.4 : 1,
                  }}
                  transition={{ duration: 0.3 }}
                >
                  {/* Number circle */}
                  <motion.div
                    className="w-9 h-9 rounded-full flex items-center justify-center text-sm font-bold font-mono flex-shrink-0 relative"
                    style={{
                      border: `2px solid ${isActive || isPast ? step.color : "rgba(255,255,255,0.15)"}`,
                      color: isActive || isPast ? step.color : "rgba(255,255,255,0.3)",
                      backgroundColor: isActive
                        ? `${step.color}15`
                        : "transparent",
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
                  <div className="flex items-center ml-[29px] pl-3">
                    <div className="relative w-px h-8">
                      {/* Base line */}
                      <div className="absolute inset-0 bg-white/10" />
                      {/* Animated pulse when active */}
                      {i === activeStep && (
                        <motion.div
                          className="absolute left-0 w-px"
                          style={{ backgroundColor: step.color }}
                          initial={{ top: 0, height: 0 }}
                          animate={{
                            top: [0, 0, 32],
                            height: [0, 32, 0],
                          }}
                          transition={{
                            duration: 1.5,
                            repeat: Infinity,
                            ease: "easeInOut",
                          }}
                        />
                      )}
                      {/* Filled line for past steps */}
                      {isPast && (
                        <div
                          className="absolute inset-0"
                          style={{ backgroundColor: step.color, opacity: 0.4 }}
                        />
                      )}
                    </div>
                  </div>
                )}
              </div>
            );
          })}
        </div>

        {/* Controls */}
        <div className="flex items-center justify-center gap-3 mt-8 pt-5 border-t border-white/5">
          <button
            type="button"
            onClick={handleBack}
            disabled={activeStep === 0}
            className="px-3 py-1.5 text-xs font-mono rounded-md border border-white/10 text-muted hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Back
          </button>

          <button
            type="button"
            onClick={handlePlayPause}
            className="px-3 py-1.5 text-xs font-mono rounded-md border border-accent/30 text-accent hover:border-accent/60 transition-colors flex items-center gap-1.5"
          >
            {isPlaying ? (
              <>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <rect x="1" y="1" width="3" height="8" rx="0.5" />
                  <rect x="6" y="1" width="3" height="8" rx="0.5" />
                </svg>
                Pause
              </>
            ) : (
              <>
                <svg
                  width="10"
                  height="10"
                  viewBox="0 0 10 10"
                  fill="currentColor"
                >
                  <polygon points="2,1 9,5 2,9" />
                </svg>
                Play
              </>
            )}
          </button>

          <button
            type="button"
            onClick={handleNext}
            disabled={activeStep === steps.length - 1}
            className="px-3 py-1.5 text-xs font-mono rounded-md border border-white/10 text-muted hover:text-white hover:border-white/25 disabled:opacity-30 disabled:cursor-not-allowed transition-colors"
          >
            Next
          </button>
        </div>
      </div>
      <p className="text-xs text-muted text-center mt-3 font-[family-name:var(--font-inter)]">
        Fig 4: Complete request flow from user to application — traffic never
        touches the public internet after CloudFront
      </p>
    </div>
  );
}
