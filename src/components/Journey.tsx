"use client";

import Image from "next/image";
import { FadeInUp } from "./AnimatedText";
import { AnimatedCounter } from "./AnimatedCounter";
import { motion, useInView, useScroll, useTransform } from "framer-motion";
import { useRef } from "react";

const milestones = [
  {
    year: "2022",
    title: "AWS Community Builder — Third time's the charm",
    description:
      "Rejected twice, accepted on the third attempt. Selected for the Networking & Content Delivery track. Persistence > talent.",
    color: "#fb923c",
  },
  {
    year: "2023",
    title: "Joined PhysicsWallah as DevOps Engineer",
    description:
      "Walked into a unicorn startup and took ownership of infrastructure that serves millions. The beginning of the scale chapter.",
    color: "#22d3ee",
  },
  {
    year: "2024",
    title: "Core Organizer — AWS Community Day Mumbai",
    description:
      "Helped bring together hundreds of cloud professionals at The Lalit Hotel. From attendee to organizer in two years.",
    color: "#fb7185",
  },
  {
    year: "2024",
    title: "Invited as Hackathon Judge — VesHack 2024",
    description:
      "From participating in hackathons to judging them. Evaluated solar energy investment platforms at GGSIPU, Delhi.",
    color: "#c084fc",
  },
  {
    year: "2024",
    title: "Won 'Best DevOps Implementation' — India DevOps Show",
    description:
      "36-hour hackathon turned into a national award. Built a platform engineering tool (CIA) that won internally, then externally in Bangalore.",
    color: "#fbbf24",
  },
  {
    year: "2025",
    title: "Promoted to Senior Platform Engineer",
    description:
      "From DevOps Engineer to owning the entire platform infrastructure at PhysicsWallah — the system that 100K+ students depend on daily.",
    color: "#34d399",
  },
  {
    year: "2025",
    title: "Spoke alongside Jeff Barr at AWS Armenia",
    description:
      "Self-funded trip to deliver a talk on AWS WAF & Security at the American University of Armenia. Shared the stage with AWS's VP & Chief Evangelist.",
    color: "#60a5fa",
  },
];

const bigNumbers = [
  { target: "100K+", label: "concurrent students, zero downtime" },
  { target: "2B+", label: "threats blocked every month" },
  { target: "12K+", label: "LinkedIn followers built organically" },
  { target: "40+", label: "technical articles published" },
];

/* ─── Individual milestone along the journey path ─── */
function JourneyMilestone({
  milestone,
  index,
}: {
  milestone: (typeof milestones)[0];
  index: number;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const inView = useInView(ref, { once: true, margin: "-12%" });
  const isLeft = index % 2 === 0;

  const dotStyle = {
    backgroundColor: milestone.color,
    boxShadow: `0 0 16px 3px ${milestone.color}50`,
  };

  const pillStyle = {
    color: milestone.color,
    backgroundColor: `${milestone.color}12`,
    borderColor: `${milestone.color}25`,
  };

  return (
    <div ref={ref} className="relative">
      {/* ── Desktop: alternating left / right ── */}
      <div className="hidden md:grid md:grid-cols-[1fr_56px_1fr]">
        {/* Left column */}
        <div className="flex justify-end">
          {isLeft && (
            <motion.div
              initial={{ opacity: 0, x: -40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pr-10 text-right max-w-md"
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider font-mono border"
                style={pillStyle}
              >
                {milestone.year}
              </span>
              <h3 className="mt-3 text-lg lg:text-xl font-bold font-[family-name:var(--font-space-grotesk)] leading-snug">
                {milestone.title}
              </h3>
              <p className="mt-2 text-muted text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                {milestone.description}
              </p>
            </motion.div>
          )}
        </div>

        {/* Center — node on the path */}
        <div className="flex justify-center relative">
          {/* Horizontal connector line toward the card */}
          <motion.div
            initial={{ scaleX: 0 }}
            animate={inView ? { scaleX: 1 } : {}}
            transition={{ duration: 0.4, delay: 0.1 }}
            className="absolute top-2.5 h-[1px] w-7"
            style={{
              ...(isLeft
                ? { right: "calc(50% + 10px)", transformOrigin: "right" }
                : { left: "calc(50% + 10px)", transformOrigin: "left" }),
              background: `linear-gradient(${
                isLeft ? "to left" : "to right"
              }, ${milestone.color}30, transparent)`,
            }}
          />

          {/* Glowing dot */}
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{
              type: "spring",
              stiffness: 400,
              damping: 15,
              delay: 0.05,
            }}
            className="relative z-10 w-5 h-5 rounded-full border-[3px] border-background"
            style={dotStyle}
          >
            {/* Pulse ring */}
            <motion.div
              animate={
                inView
                  ? { scale: [1, 2.8, 1], opacity: [0.5, 0, 0.5] }
                  : {}
              }
              transition={{
                duration: 2.5,
                repeat: Infinity,
                ease: "easeInOut",
              }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: milestone.color }}
            />
          </motion.div>
        </div>

        {/* Right column */}
        <div>
          {!isLeft && (
            <motion.div
              initial={{ opacity: 0, x: 40 }}
              animate={inView ? { opacity: 1, x: 0 } : {}}
              transition={{
                duration: 0.7,
                delay: 0.2,
                ease: [0.22, 1, 0.36, 1],
              }}
              className="pl-10 max-w-md"
            >
              <span
                className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider font-mono border"
                style={pillStyle}
              >
                {milestone.year}
              </span>
              <h3 className="mt-3 text-lg lg:text-xl font-bold font-[family-name:var(--font-space-grotesk)] leading-snug">
                {milestone.title}
              </h3>
              <p className="mt-2 text-muted text-sm leading-relaxed font-[family-name:var(--font-inter)]">
                {milestone.description}
              </p>
            </motion.div>
          )}
        </div>
      </div>

      {/* ── Mobile: path on left, card on right ── */}
      <div className="md:hidden relative pl-12">
        {/* Dot */}
        <div className="absolute left-[13px] top-[5px]">
          <motion.div
            initial={{ scale: 0 }}
            animate={inView ? { scale: 1 } : {}}
            transition={{ type: "spring", stiffness: 400, damping: 15 }}
            className="relative z-10 w-3.5 h-3.5 rounded-full border-2 border-background"
            style={{
              backgroundColor: milestone.color,
              boxShadow: `0 0 10px 2px ${milestone.color}45`,
            }}
          >
            <motion.div
              animate={
                inView
                  ? { scale: [1, 2.2, 1], opacity: [0.4, 0, 0.4] }
                  : {}
              }
              transition={{ duration: 2, repeat: Infinity }}
              className="absolute inset-0 rounded-full"
              style={{ backgroundColor: milestone.color }}
            />
          </motion.div>
        </div>

        {/* Card */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={inView ? { opacity: 1, y: 0 } : {}}
          transition={{
            duration: 0.6,
            delay: 0.15,
            ease: [0.22, 1, 0.36, 1],
          }}
        >
          <span
            className="inline-block px-3 py-1 rounded-full text-[11px] font-semibold tracking-wider font-mono border"
            style={pillStyle}
          >
            {milestone.year}
          </span>
          <h3 className="mt-3 text-base font-bold font-[family-name:var(--font-space-grotesk)] leading-snug">
            {milestone.title}
          </h3>
          <p className="mt-2 text-muted text-sm leading-relaxed font-[family-name:var(--font-inter)]">
            {milestone.description}
          </p>
        </motion.div>
      </div>
    </div>
  );
}

/* ═══════════════════════════════════════════════════ */
/*                   MAIN COMPONENT                   */
/* ═══════════════════════════════════════════════════ */
export function Journey() {
  const pathRef = useRef<HTMLDivElement>(null);
  const numbersRef = useRef<HTMLDivElement>(null);
  const numbersInView = useInView(numbersRef, { once: true, margin: "-10%" });

  const { scrollYProgress } = useScroll({
    target: pathRef,
    offset: ["start 80%", "end 20%"],
  });

  const pathHeight = useTransform(scrollYProgress, [0, 1], ["0%", "100%"]);

  return (
    <section
      id="journey"
      className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-6 dot-grid"
    >
      <div className="max-w-7xl mx-auto">
        {/* ── Section header ── */}
        <FadeInUp>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
            03 / Journey
          </span>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            Tier-3 college to unicorn.
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="mt-6 text-muted text-lg max-w-3xl leading-relaxed font-[family-name:var(--font-inter)]">
            No connections. No fancy degree. Just a laptop, an AWS free tier
            account, and an unreasonable amount of stubbornness.
          </p>
        </FadeInUp>

        {/* ── Big numbers ── */}
        <div
          ref={numbersRef}
          className="mt-16 grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-6"
        >
          {bigNumbers.map((item, i) => (
            <motion.div
              key={item.label}
              initial={{ opacity: 0, y: 20 }}
              animate={numbersInView ? { opacity: 1, y: 0 } : {}}
              transition={{ delay: 0.2 + i * 0.1, duration: 0.5 }}
              className="p-5 md:p-6 rounded-xl border border-white/5 bg-surface glow-accent-hover transition-shadow duration-500"
            >
              <div className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] text-accent">
                <AnimatedCounter target={item.target} />
              </div>
              <div className="text-xs text-muted mt-2 leading-relaxed font-[family-name:var(--font-inter)]">
                {item.label}
              </div>
            </motion.div>
          ))}
        </div>

        {/* ══════════ JOURNEY PATH ══════════ */}
        <div ref={pathRef} className="mt-24 relative">
          {/* ── Desktop path track (centered) ── */}
          <div className="hidden md:block absolute left-1/2 -translate-x-1/2 top-0 bottom-0 w-[2px]">
            {/* Dashed track background */}
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 8px, transparent 8px, transparent 20px)",
              }}
            />
            {/* Gradient fill — draws itself on scroll */}
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: pathHeight,
                background:
                  "linear-gradient(to bottom, #fb923c90, #22d3ee70, #fb718560, #c084fc60, #fbbf2460, #34d39950, #60a5fa70)",
              }}
            />
            {/* Traveling glow dot at the leading edge */}
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-2 h-2 rounded-full bg-white/70"
              style={{
                top: pathHeight,
                boxShadow: "0 0 12px 4px rgba(255,255,255,0.25)",
              }}
            />
            {/* Start marker */}
            <div className="absolute -top-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border-2 border-background"
                style={{
                  backgroundColor: "#fb923c",
                  boxShadow: "0 0 10px rgba(251,146,60,0.4)",
                }}
              />
              <span className="text-[10px] text-muted/50 font-mono tracking-widest uppercase whitespace-nowrap">
                Start
              </span>
            </div>
            {/* End marker */}
            <div className="absolute -bottom-5 left-1/2 -translate-x-1/2 flex flex-col items-center gap-1.5">
              <div
                className="w-3 h-3 rounded-full border-2 border-background"
                style={{
                  backgroundColor: "#60a5fa",
                  boxShadow: "0 0 10px rgba(96,165,250,0.4)",
                }}
              />
              <span className="text-[10px] text-muted/50 font-mono tracking-widest uppercase whitespace-nowrap">
                Now
              </span>
            </div>
          </div>

          {/* ── Mobile path track (left side) ── */}
          <div className="md:hidden absolute left-[19px] top-0 bottom-0 w-[2px]">
            <div
              className="absolute inset-0 rounded-full"
              style={{
                backgroundImage:
                  "repeating-linear-gradient(to bottom, rgba(255,255,255,0.06) 0px, rgba(255,255,255,0.06) 6px, transparent 6px, transparent 14px)",
              }}
            />
            <motion.div
              className="absolute top-0 left-0 right-0 rounded-full"
              style={{
                height: pathHeight,
                background:
                  "linear-gradient(to bottom, #fb923c80, #22d3ee60, #c084fc50, #34d39940, #60a5fa60)",
              }}
            />
            <motion.div
              className="absolute left-1/2 -translate-x-1/2 -translate-y-1/2 w-1.5 h-1.5 rounded-full bg-white/60"
              style={{
                top: pathHeight,
                boxShadow: "0 0 8px 3px rgba(255,255,255,0.2)",
              }}
            />
            {/* Start dot */}
            <div
              className="absolute -top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-background"
              style={{
                backgroundColor: "#fb923c",
                boxShadow: "0 0 6px rgba(251,146,60,0.4)",
              }}
            />
            {/* End dot */}
            <div
              className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full border border-background"
              style={{
                backgroundColor: "#60a5fa",
                boxShadow: "0 0 6px rgba(96,165,250,0.4)",
              }}
            />
          </div>

          {/* ── Milestone nodes ── */}
          <div className="space-y-14 md:space-y-20 pt-8 pb-8">
            {milestones.map((milestone, i) => (
              <JourneyMilestone
                key={milestone.title}
                milestone={milestone}
                index={i}
              />
            ))}
          </div>
        </div>

        {/* ── Speaking photos ── */}
        <div className="mt-32">
          <FadeInUp>
            <h3 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] mb-4">
              On stage, around the world.
            </h3>
            <p className="text-muted text-base max-w-2xl leading-relaxed font-[family-name:var(--font-inter)] mb-10">
              I believe the best engineers are also the best communicators. From
              Armenia to Mumbai, I share what I learn.
            </p>
          </FadeInUp>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            {[
              {
                src: "/photos/1000161602.jpg",
                label: "AWS Community Day, Armenia",
              },
              {
                src: "/photos/1000150029.jpg",
                label: "AWS Community Conference",
              },
              {
                src: "/photos/1000006570.png",
                label: "AWS Talk, Nepal",
              },
            ].map((photo, i) => (
              <FadeInUp key={photo.src} delay={0.1 + i * 0.1}>
                <div className="group relative overflow-hidden rounded-xl aspect-[4/3]">
                  <Image
                    src={photo.src}
                    alt={photo.label}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-700"
                    sizes="(max-width: 768px) 100vw, 33vw"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent" />
                  <div className="absolute bottom-4 left-4 right-4">
                    <span className="text-sm font-medium font-[family-name:var(--font-space-grotesk)] text-white">
                      {photo.label}
                    </span>
                  </div>
                </div>
              </FadeInUp>
            ))}
          </div>
        </div>

        {/* ── Education ── */}
        <FadeInUp>
          <div className="mt-24 grid grid-cols-1 md:grid-cols-[280px_1fr] gap-8 p-6 md:p-10 rounded-2xl border border-white/5 bg-surface overflow-hidden">
            <div className="relative aspect-[4/5] rounded-xl overflow-hidden">
              <Image
                src="/photos/graduation.jpg"
                alt="Tejas Gupta — Graduation Day"
                fill
                className="object-cover object-top"
                sizes="(max-width: 768px) 100vw, 280px"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 via-transparent to-transparent" />
            </div>
            <div className="flex flex-col justify-center py-2 md:py-4">
              <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
                Where it started
              </span>
              <h3 className="mt-4 text-3xl md:text-4xl font-bold font-[family-name:var(--font-space-grotesk)] leading-tight">
                B.E. Computer Science
              </h3>
              <p className="text-muted text-base md:text-lg font-[family-name:var(--font-inter)] mt-3">
                University of Mumbai · 2019–2023
              </p>
              <p className="text-muted/60 text-sm md:text-base font-[family-name:var(--font-inter)] mt-4 leading-relaxed max-w-md">
                Tier-3 college, first-generation engineer. Everything after this
                was built from scratch.
              </p>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
