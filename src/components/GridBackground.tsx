"use client";

import { motion } from "framer-motion";

export function GridBackground() {
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {/* Animated grid lines */}
      <svg
        className="absolute inset-0 w-full h-full opacity-[0.03]"
        xmlns="http://www.w3.org/2000/svg"
      >
        <defs>
          <pattern id="grid" width="60" height="60" patternUnits="userSpaceOnUse">
            <path
              d="M 60 0 L 0 0 0 60"
              fill="none"
              stroke="white"
              strokeWidth="0.5"
            />
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#grid)" />
      </svg>

      {/* Scanning line */}
      <motion.div
        className="absolute left-0 right-0 h-[1px] bg-gradient-to-r from-transparent via-accent/20 to-transparent"
        animate={{
          top: ["0%", "100%", "0%"],
        }}
        transition={{
          duration: 12,
          repeat: Infinity,
          ease: "linear",
        }}
      />

      {/* Floating orbs */}
      <motion.div
        className="absolute w-2 h-2 rounded-full bg-accent/30"
        style={{ top: "20%", left: "10%" }}
        animate={{
          y: [0, -20, 0],
          opacity: [0.3, 0.6, 0.3],
        }}
        transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
      />
      <motion.div
        className="absolute w-1.5 h-1.5 rounded-full bg-emerald-400/30"
        style={{ top: "60%", right: "15%" }}
        animate={{
          y: [0, 15, 0],
          opacity: [0.2, 0.5, 0.2],
        }}
        transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
      />
      <motion.div
        className="absolute w-1 h-1 rounded-full bg-purple-400/30"
        style={{ top: "40%", left: "80%" }}
        animate={{
          y: [0, -12, 0],
          opacity: [0.2, 0.4, 0.2],
        }}
        transition={{ duration: 6, repeat: Infinity, ease: "easeInOut", delay: 2 }}
      />
    </div>
  );
}
