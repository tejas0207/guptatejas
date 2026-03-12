"use client";

import { useEffect, useRef, useState } from "react";
import { useInView } from "framer-motion";

export function AnimatedCounter({
  target,
  duration = 2000,
}: {
  target: string;
  duration?: number;
}) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "0px" });
  const [display, setDisplay] = useState(target);
  const hasAnimated = useRef(false);

  useEffect(() => {
    if (!isInView || hasAnimated.current) return;
    hasAnimated.current = true;

    // Extract the numeric part and suffix
    const match = target.match(/^([\d.]+)(.*)$/);
    if (!match) {
      setDisplay(target);
      return;
    }

    const endValue = parseFloat(match[1]);
    const suffix = match[2]; // e.g., "K+", "B+", "+"
    const startTime = performance.now();
    const hasDecimal = match[1].includes(".");

    function animate(currentTime: number) {
      const elapsed = currentTime - startTime;
      const progress = Math.min(elapsed / duration, 1);
      const eased = 1 - Math.pow(1 - progress, 3);
      const current = eased * endValue;

      if (hasDecimal) {
        setDisplay(current.toFixed(1) + suffix);
      } else {
        setDisplay(Math.floor(current) + suffix);
      }

      if (progress < 1) {
        requestAnimationFrame(animate);
      } else {
        setDisplay(target);
      }
    }

    requestAnimationFrame(animate);
  }, [isInView, target, duration]);

  return <span ref={ref}>{display}</span>;
}
