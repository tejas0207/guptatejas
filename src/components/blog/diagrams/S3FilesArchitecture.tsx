"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function S3FilesArchitecture() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <div ref={ref} className="my-10">
      <div className="rounded-xl border border-white/5 bg-[#0D0D0D] p-5 md:p-8 overflow-x-auto">
        <p className="text-xs text-accent/80 uppercase tracking-widest font-mono mb-6 text-center">
          S3 Files Architecture — How It Works
        </p>

        {/* Main diagram */}
        <div className="flex flex-col items-center gap-0 min-w-[340px]">

          {/* Top row: compute clients */}
          <div className="flex items-center justify-center gap-4 md:gap-8 w-full">
            {[
              { label: "EC2 Instance", color: "#F59E0B", icon: "⬡" },
              { label: "ECS Container", color: "#8B5CF6", icon: "⬡" },
              { label: "Lambda", color: "#F97316", icon: "λ" },
            ].map((node, i) => (
              <motion.div
                key={node.label}
                initial={{ opacity: 0, y: -20 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{ delay: i * 0.1, duration: 0.4 }}
                className="flex flex-col items-center gap-1.5"
              >
                <div
                  className="w-12 h-12 md:w-14 md:h-14 rounded-xl flex items-center justify-center text-xl font-bold border"
                  style={{
                    borderColor: `${node.color}30`,
                    backgroundColor: `${node.color}10`,
                    color: node.color,
                  }}
                >
                  {node.icon}
                </div>
                <span className="text-[10px] md:text-xs text-white/50 font-mono text-center">{node.label}</span>
              </motion.div>
            ))}
          </div>

          {/* Arrow down with NFS label */}
          <motion.div
            initial={{ opacity: 0, scaleY: 0 }}
            animate={isInView ? { opacity: 1, scaleY: 1 } : {}}
            transition={{ delay: 0.4, duration: 0.4 }}
            className="flex flex-col items-center gap-1 my-2"
            style={{ transformOrigin: "top" }}
          >
            <div className="w-[1px] h-5 bg-gradient-to-b from-white/20 to-white/5" />
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/40 bg-white/[0.03]">
              NFS v4.1
            </span>
            <div className="w-[1px] h-5 bg-gradient-to-b from-white/5 to-emerald-500/30" />
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M5 8L0 0h10L5 8z" fill="rgba(52,211,153,0.5)" />
            </svg>
          </motion.div>

          {/* S3 Files File System box */}
          <motion.div
            initial={{ opacity: 0, scale: 0.9 }}
            animate={isInView ? { opacity: 1, scale: 1 } : {}}
            transition={{ delay: 0.55, duration: 0.45 }}
            className="relative"
          >
            <motion.div
              animate={
                isInView
                  ? {
                      boxShadow: [
                        "0 0 0px rgba(52,211,153,0)",
                        "0 0 24px rgba(52,211,153,0.18)",
                        "0 0 0px rgba(52,211,153,0)",
                      ],
                    }
                  : {}
              }
              transition={{ delay: 1, duration: 3, repeat: Infinity, ease: "easeInOut" }}
              className="px-6 py-4 rounded-xl border border-emerald-500/30 bg-emerald-500/[0.07] min-w-[200px] text-center"
            >
              <div className="text-emerald-400 font-semibold text-sm font-[family-name:var(--font-space-grotesk)] mb-0.5">
                S3 Files File System
              </div>
              <div className="text-[10px] text-white/40 font-mono">EFS-powered · POSIX-compliant</div>
            </motion.div>

            {/* EFS badge */}
            <div className="absolute -top-2.5 -right-2.5 bg-[#0D0D0D] border border-white/10 rounded-full px-2 py-0.5 text-[9px] font-mono text-white/40">
              Powered by EFS
            </div>
          </motion.div>

          {/* Bidirectional arrow */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={isInView ? { opacity: 1 } : {}}
            transition={{ delay: 0.75, duration: 0.4 }}
            className="flex flex-col items-center gap-1 my-2"
          >
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M5 0L10 8H0L5 0z" fill="rgba(96,165,250,0.5)" />
            </svg>
            <div className="w-[1px] h-4 bg-gradient-to-b from-blue-400/30 to-blue-400/10" />
            <span className="text-[9px] font-mono px-2 py-0.5 rounded-full border border-white/10 text-white/40 bg-white/[0.03]">
              sync
            </span>
            <div className="w-[1px] h-4 bg-gradient-to-b from-blue-400/10 to-blue-400/30" />
            <svg width="10" height="8" viewBox="0 0 10 8" fill="none">
              <path d="M5 8L0 0h10L5 8z" fill="rgba(96,165,250,0.5)" />
            </svg>
          </motion.div>

          {/* S3 Bucket */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={isInView ? { opacity: 1, y: 0 } : {}}
            transition={{ delay: 0.85, duration: 0.4 }}
            className="px-6 py-4 rounded-xl border border-blue-500/30 bg-blue-500/[0.06] min-w-[200px] text-center"
          >
            <div className="text-blue-400 font-semibold text-sm font-[family-name:var(--font-space-grotesk)] mb-0.5">
              S3 Bucket
            </div>
            <div className="text-[10px] text-white/40 font-mono">Object storage · Durable</div>
          </motion.div>

        </div>

        {/* Legend */}
        <div className="flex items-center justify-center gap-5 mt-7 flex-wrap">
          {[
            { color: "#34D399", label: "File System Layer" },
            { color: "#60A5FA", label: "Object Storage Layer" },
            { color: "#F59E0B", label: "Compute Clients" },
          ].map(({ color, label }) => (
            <div key={label} className="flex items-center gap-1.5">
              <div
                className="w-2 h-2 rounded-full"
                style={{ backgroundColor: color }}
              />
              <span className="text-[10px] text-white/40 font-mono">{label}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
