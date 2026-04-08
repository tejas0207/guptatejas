"use client";

import Image from "next/image";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

interface BlogImageProps {
  src: string;
  alt: string;
  caption?: string;
  width?: number;
  height?: number;
  priority?: boolean;
}

export function BlogImage({
  src,
  alt,
  caption,
  width = 1200,
  height = 675,
  priority = false,
}: BlogImageProps) {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <motion.figure
      ref={ref}
      initial={{ opacity: 0, y: 16 }}
      animate={isInView ? { opacity: 1, y: 0 } : { opacity: 0, y: 16 }}
      transition={{ duration: 0.5, ease: "easeOut" }}
      className="my-8"
    >
      <div className="rounded-xl overflow-hidden border border-white/[0.06] bg-[#0D0D0D]">
        <Image
          src={src}
          alt={alt}
          width={width}
          height={height}
          priority={priority}
          className="w-full h-auto object-contain"
          style={{ display: "block" }}
        />
      </div>
      {caption && (
        <figcaption className="mt-2.5 text-center text-xs text-white/40 font-[family-name:var(--font-inter)] italic leading-relaxed">
          {caption}
        </figcaption>
      )}
    </motion.figure>
  );
}
