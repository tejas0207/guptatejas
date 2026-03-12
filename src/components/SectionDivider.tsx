"use client";

import { motion, useInView } from "framer-motion";
import { useRef } from "react";

export function SectionDivider() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });

  return (
    <div ref={ref} className="relative py-4 px-6">
      <div className="max-w-7xl mx-auto">
        <motion.div
          initial={{ scaleX: 0, opacity: 0 }}
          animate={isInView ? { scaleX: 1, opacity: 1 } : {}}
          transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
          className="glow-line w-full origin-left"
        />
      </div>
    </div>
  );
}
