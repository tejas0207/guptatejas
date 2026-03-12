"use client";

import Image from "next/image";
import { AnimatedText, FadeInUp } from "./AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

// No stats grid here — metrics live in the Journey section to avoid repetition

export function About() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-20%" });

  return (
    <section id="about" className="relative py-32 md:py-48 px-6">
      <div className="max-w-7xl mx-auto">
        {/* Section label */}
        <FadeInUp>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
            01 / About
          </span>
        </FadeInUp>

        <div className="mt-12 md:mt-16 grid grid-cols-1 lg:grid-cols-2 gap-16 md:gap-24 items-center">
          {/* Photo */}
          <FadeInUp delay={0.2}>
            <div ref={ref} className="relative">
              <motion.div
                initial={{ scale: 1.2 }}
                animate={isInView ? { scale: 1 } : { scale: 1.2 }}
                transition={{ duration: 1.2, ease: [0.22, 1, 0.36, 1] }}
                className="overflow-hidden rounded-2xl aspect-[3/4] relative"
              >
                <Image
                  src="/photos/1000007447.jpg"
                  alt="Tejas Gupta"
                  fill
                  className="object-cover"
                  sizes="(max-width: 768px) 100vw, 50vw"
                  priority
                />
                <div className="absolute inset-0 bg-gradient-to-t from-background/60 via-transparent to-transparent" />
              </motion.div>
              {/* Decorative border */}
              <div className="absolute -inset-3 rounded-2xl border border-white/5 -z-10" />
            </div>
          </FadeInUp>

          {/* Text */}
          <div>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]">
              <AnimatedText text="Not just an engineer." />
              <br />
              <AnimatedText
                text="A builder of worlds."
                delay={0.3}
                className="text-gradient"
              />
            </h2>

            <FadeInUp delay={0.4}>
              <div className="mt-8 space-y-5 text-muted text-base md:text-lg leading-relaxed font-[family-name:var(--font-inter)]">
                <p>
                  I&apos;m fascinated by what happens behind the curtain — the
                  invisible systems that make things just work. Right now I&apos;m
                  building that at PhysicsWallah, where hundreds of thousands of
                  students tune in live every day, and it&apos;s my job to make
                  sure nothing breaks.
                </p>
                <p>
                  Cloud infrastructure, Kubernetes at scale, security systems
                  that think for themselves — that&apos;s my playground. I love
                  the puzzle of making complex systems feel effortless.
                </p>
                <p>
                  Outside of work, I&apos;m usually on a stage somewhere
                  talking about cloud, leading the AWS community in Mumbai, or
                  wandering through a new city with a camera. Ha Long Bay was
                  the last place that made me forget about uptime.
                </p>
              </div>
            </FadeInUp>

            {/* CTA */}
            <FadeInUp delay={0.6}>
              <div className="mt-10 flex flex-wrap gap-4">
                <a
                  href="#journey"
                  className="px-6 py-3 rounded-full bg-accent hover:bg-accent/90 text-white text-sm font-semibold transition-all duration-300 hover:scale-105 font-[family-name:var(--font-space-grotesk)] glow-accent glow-accent-hover"
                >
                  See my story
                </a>
                <a
                  href="https://medium.com/@2017tejasgupta"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-6 py-3 rounded-full border border-white/10 text-sm font-semibold hover:border-accent/30 hover:bg-accent/5 transition-all duration-300 font-[family-name:var(--font-space-grotesk)]"
                >
                  Read my writing
                </a>
              </div>
            </FadeInUp>
          </div>
        </div>
      </div>
    </section>
  );
}
