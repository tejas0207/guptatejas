"use client";

import { motion, AnimatePresence } from "framer-motion";
import { useEffect, useState } from "react";

const roles = [
  "Senior Platform Engineer",
  "Cloud Architect",
  "DevOps Award Winner",
  "Community Leader",
  "Explorer",
];

export function Hero() {
  const [roleIndex, setRoleIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setRoleIndex((prev) => (prev + 1) % roles.length);
    }, 2500);
    return () => clearInterval(interval);
  }, []);

  const nameLetters = "TEJAS GUPTA".split("");

  return (
    <section className="relative min-h-screen flex flex-col items-center justify-center overflow-hidden px-6 dot-grid">
      {/* Background gradient orbs */}
      <div className="absolute inset-0 overflow-hidden">
        <div className="absolute top-1/4 -left-32 w-96 h-96 bg-accent/5 rounded-full blur-[128px]" />
        <div className="absolute bottom-1/4 -right-32 w-96 h-96 bg-purple-500/5 rounded-full blur-[128px]" />
      </div>

      {/* Floating particles */}
      {[
        { x: "12%", y: "18%", size: "w-1 h-1", color: "bg-accent/40", dur: 6, delay: 0 },
        { x: "85%", y: "25%", size: "w-1.5 h-1.5", color: "bg-purple-400/30", dur: 8, delay: 1 },
        { x: "70%", y: "75%", size: "w-1 h-1", color: "bg-emerald-400/30", dur: 7, delay: 2 },
        { x: "25%", y: "80%", size: "w-1.5 h-1.5", color: "bg-accent/30", dur: 5, delay: 0.5 },
        { x: "50%", y: "15%", size: "w-1 h-1", color: "bg-white/20", dur: 9, delay: 3 },
      ].map((p, i) => (
        <motion.div
          key={i}
          className={`absolute rounded-full ${p.size} ${p.color}`}
          style={{ left: p.x, top: p.y }}
          animate={{
            y: [0, -30, 0],
            opacity: [0.3, 0.8, 0.3],
          }}
          transition={{
            duration: p.dur,
            repeat: Infinity,
            ease: "easeInOut",
            delay: p.delay,
          }}
        />
      ))}

      {/* Floating badges */}
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ delay: 2, duration: 0.8 }}
        className="flex flex-wrap items-center justify-center gap-3 mb-8 md:mb-12"
      >
        {["AWS Community Builder", "International Speaker", "Building at Scale"].map(
          (badge, i) => (
            <motion.span
              key={badge}
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ delay: 2.2 + i * 0.15 }}
              className="px-4 py-1.5 rounded-full border border-white/10 bg-white/[0.03] text-xs md:text-sm text-muted font-mono tracking-wide"
            >
              {badge}
            </motion.span>
          )
        )}
      </motion.div>

      {/* Name */}
      <div className="relative z-10 text-center w-full max-w-6xl">
        <h1
          className="font-bold tracking-tight leading-[0.9] font-[family-name:var(--font-space-grotesk)] text-glow"
          style={{ fontSize: "clamp(2.5rem, 8vw, 7rem)" }}
        >
          {nameLetters.map((letter, i) => (
            <motion.span
              key={i}
              initial={{ y: 100, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{
                duration: 0.6,
                delay: 0.3 + i * 0.04,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="inline-block"
            >
              {letter === " " ? "\u00A0" : letter}
            </motion.span>
          ))}
        </h1>

        {/* Role cycling */}
        <div className="mt-6 md:mt-8 h-8 md:h-10 flex items-center justify-center overflow-hidden">
          <AnimatePresence mode="wait">
            <motion.span
              key={roleIndex}
              initial={{ y: 30, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              exit={{ y: -30, opacity: 0 }}
              transition={{ duration: 0.4, ease: [0.22, 1, 0.36, 1] }}
              className="text-lg md:text-2xl text-muted font-light font-[family-name:var(--font-inter)] tracking-wide"
            >
              {roles[roleIndex]}
            </motion.span>
          </AnimatePresence>
        </div>
      </div>

      {/* Scroll indicator */}
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        transition={{ delay: 3 }}
        className="absolute bottom-12 flex flex-col items-center gap-3"
      >
        <span className="text-xs text-muted/50 tracking-[0.3em] uppercase font-mono">
          Scroll
        </span>
        <motion.div
          animate={{ y: [0, 8, 0] }}
          transition={{ duration: 1.5, repeat: Infinity, ease: "easeInOut" }}
          className="w-[1px] h-8 bg-gradient-to-b from-white/40 to-transparent"
        />
      </motion.div>
    </section>
  );
}
