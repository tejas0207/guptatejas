"use client";

import { FadeInUp } from "./AnimatedText";
import { GridBackground } from "./GridBackground";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const domains = [
  {
    title: "Cloud & Scale",
    description:
      "Multi-account AWS, Kubernetes at 100+ microservice scale, serverless, and everything in between.",
    skills: ["AWS", "GCP", "Kubernetes (EKS)", "Helm", "Serverless", "Linux"],
    gradient: "from-blue-500/20 to-cyan-500/5",
    border: "border-blue-500/20",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M17.5 19H9a7 7 0 1 1 6.71-9h1.79a4.5 4.5 0 1 1 0 9Z" />
      </svg>
    ),
  },
  {
    title: "Platform Engineering",
    description:
      "CI/CD, GitOps, Infrastructure as Code — automating everything from build to deploy.",
    skills: [
      "Terraform",
      "ArgoCD",
      "Jenkins",
      "Ansible",
      "CloudFormation",
      "Docker",
    ],
    gradient: "from-purple-500/20 to-violet-500/5",
    border: "border-purple-500/20",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="m18 16 4-4-4-4" />
        <path d="m6 8-4 4 4 4" />
        <path d="m14.5 4-5 16" />
      </svg>
    ),
  },
  {
    title: "Security & Observability",
    description:
      "WAF rules that block 2B+ threats/month, real-time dashboards, and incident response.",
    skills: [
      "AWS WAF",
      "Prometheus",
      "Grafana",
      "OpenSearch",
      "IAM",
      "Incident/RCA",
    ],
    gradient: "from-emerald-500/20 to-green-500/5",
    border: "border-emerald-500/20",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10" />
      </svg>
    ),
  },
  {
    title: "AI & Automation",
    description:
      "Building intelligent systems — from AI-powered workflows to cloud-native automation at scale.",
    skills: [
      "Python",
      "Go",
      "AI/ML Pipelines",
      "AWS AI Services",
      "LLM Integration",
      "Bash",
    ],
    gradient: "from-amber-500/20 to-orange-500/5",
    border: "border-amber-500/20",
    icon: (
      <svg
        width="28"
        height="28"
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
      >
        <path d="M12 8V4H8" />
        <rect width="16" height="12" x="4" y="8" rx="2" />
        <path d="M2 14h2" />
        <path d="M20 14h2" />
        <path d="M15 13v2" />
        <path d="M9 13v2" />
      </svg>
    ),
  },
];

const certifiedBy = [
  {
    org: "Amazon Web Services",
    short: "AWS",
    count: 3,
    color: "text-amber-400",
    border: "border-amber-500/20",
    bg: "bg-amber-500/5",
  },
  {
    org: "Red Hat",
    short: "Red Hat",
    count: 1,
    color: "text-red-400",
    border: "border-red-500/20",
    bg: "bg-red-500/5",
  },
  {
    org: "Microsoft",
    short: "Microsoft",
    count: 1,
    color: "text-blue-400",
    border: "border-blue-500/20",
    bg: "bg-blue-500/5",
  },
];

export function Expertise() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section
      id="expertise"
      className="relative pt-32 md:pt-48 pb-20 md:pb-32 px-6"
      ref={ref}
    >
      <GridBackground />
      <div className="max-w-7xl mx-auto relative z-10">
        <FadeInUp>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
            02 / Expertise
          </span>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            What I work with.
          </h2>
        </FadeInUp>

        {/* Skill domains */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-2 gap-6">
          {domains.map((domain, i) => (
            <motion.div
              key={domain.title}
              initial={{ opacity: 0, y: 30 }}
              animate={isInView ? { opacity: 1, y: 0 } : {}}
              transition={{
                duration: 0.6,
                delay: 0.2 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`group relative p-8 rounded-2xl border ${domain.border} bg-gradient-to-br ${domain.gradient} backdrop-blur-sm hover:scale-[1.02] transition-transform duration-500`}
            >
              {/* Live status dot */}
              <div className="absolute top-4 right-4 flex items-center gap-2">
                <span className="relative flex h-2 w-2">
                  <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75" />
                  <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-400" />
                </span>
                <span className="text-[10px] text-emerald-400/70 font-mono uppercase">Active</span>
              </div>
              <div className="text-accent mb-4">{domain.icon}</div>
              <h3 className="text-xl font-semibold font-[family-name:var(--font-space-grotesk)] mb-2">
                {domain.title}
              </h3>
              <p className="text-sm text-muted leading-relaxed font-[family-name:var(--font-inter)] mb-5">
                {domain.description}
              </p>
              <div className="flex flex-wrap gap-2">
                {domain.skills.map((skill) => (
                  <span
                    key={skill}
                    className="px-3 py-1.5 rounded-full bg-white/5 border border-white/10 text-sm text-muted font-[family-name:var(--font-inter)]"
                  >
                    {skill}
                  </span>
                ))}
              </div>
            </motion.div>
          ))}
        </div>

        {/* Certified by — big players only */}
        <FadeInUp delay={0.5}>
          <div className="mt-20">
            <h3 className="text-sm tracking-[0.2em] uppercase text-muted mb-8 font-[family-name:var(--font-inter)]">
              Certified by
            </h3>
            <div className="grid grid-cols-3 gap-3 md:gap-4">
              {certifiedBy.map((cert, i) => (
                <motion.div
                  key={cert.short}
                  initial={{ opacity: 0, y: 20 }}
                  animate={isInView ? { opacity: 1, y: 0 } : {}}
                  transition={{ delay: 0.6 + i * 0.1 }}
                  className={`relative p-5 md:p-8 rounded-2xl border ${cert.border} ${cert.bg} flex items-center justify-center`}
                >
                  <div
                    className={`text-base sm:text-xl md:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] ${cert.color}`}
                  >
                    {cert.short}
                  </div>
                </motion.div>
              ))}
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
