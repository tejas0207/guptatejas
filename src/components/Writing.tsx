"use client";

import { FadeInUp } from "./AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import Link from "next/link";

const articles = [
  {
    title: "Redis Pub/Sub vs Kafka Streams for Real-Time Systems",
    description:
      "Choosing between Redis and Kafka for real-time data processing at scale.",
    tag: "Architecture",
    date: "May 2025",
    url: "https://medium.com/@2017tejasgupta/battle-of-the-streams-redis-pub-sub-vs-kafka-streams-for-real-time-systems-bdb7f1d18ee9",
  },
  {
    title: "Audit Your Bastion Hosts by Recording the Terminal",
    description:
      "Security best practices for monitoring SSH sessions with Terraform.",
    tag: "Security",
    date: "Jun 2024",
    url: "https://medium.com/@2017tejasgupta/secure-your-bastion-hosts-by-recording-the-terminal-7e28c0ae6aee",
  },
  {
    title: "S3 Express One: 10x Faster Than S3 Standard",
    description:
      "Single-digit millisecond latency and 50% cost reduction — the new storage frontier.",
    tag: "AWS",
    date: "Jan 2024",
    url: "https://medium.com/@2017tejasgupta/how-amazon-s3-express-one-is-10x-faster-than-amazon-s3-standard-455fdda90ff7",
  },
  {
    title: "Your First S3 Bucket with OpenTofu",
    description:
      "Getting started with the open-source Terraform alternative.",
    tag: "IaC",
    date: "Jan 2024",
    url: "https://medium.com/@2017tejasgupta/created-your-first-s3-bucket-with-opentofu-7c806bbed218",
  },
  {
    title: "Cloud-Nuke: Delete Infrastructure with One Command",
    description:
      "The nuclear option for cleaning up cloud resources safely.",
    tag: "DevOps",
    date: "Jan 2024",
    url: "https://medium.com/@2017tejasgupta/delete-your-cloud-infrastructure-with-a-single-command-cloud-nuke-743dda1bd839",
  },
  {
    title: "Apache Kafka: Key Concepts and Components",
    description:
      "Understanding the streaming platform that powers real-time data at scale.",
    tag: "Architecture",
    date: "Jun 2023",
    url: "https://medium.com/@2017tejasgupta/apache-kafka-understanding-key-concepts-and-components-cb34ccc31137",
  },
  {
    title: "EC2 Instance Connect with Private IPv4",
    description:
      "Secure connections to private instances without bastion hosts.",
    tag: "AWS",
    date: "Jun 2023",
    url: "https://medium.com/@2017tejasgupta/connect-to-your-instances-with-a-private-ipv4-address-using-ec2-instance-connect-endpoint-c92ad3efc545",
  },
  {
    title: "Introduction to AWS Cloud Security",
    description:
      "The security pillar of the Well-Architected Framework, explained.",
    tag: "Security",
    date: "Apr 2023",
    url: "https://medium.com/@2017tejasgupta/introduction-to-aws-cloud-security-3d1bbab0362f",
  },
  {
    title: "Automate Email with AWS SES and Lambda",
    description:
      "Event-driven email automation using serverless architecture.",
    tag: "Serverless",
    date: "Oct 2022",
    url: "https://medium.com/@2017tejasgupta/automate-email-using-aws-ses-and-aws-lambda-daea2b208cdd",
  },
  {
    title: "How to Become an AWS Community Builder",
    description:
      "The inside story — rejected twice, accepted on the third attempt.",
    tag: "Community",
    date: "Nov 2022",
    url: "https://medium.com/@2017tejasgupta/how-can-you-become-an-aws-community-builder-52f4950cea30",
  },
];

export function Writing() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-10%" });

  return (
    <section id="writing" className="relative py-32 md:py-48 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
            04 / Writing
          </span>
        </FadeInUp>

        <div className="flex flex-col md:flex-row md:items-end md:justify-between gap-4 mt-6">
          <FadeInUp delay={0.1}>
            <h2 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
              40+ articles and counting.
            </h2>
          </FadeInUp>
          <FadeInUp delay={0.2}>
            <div className="flex items-center gap-6">
              <Link
                href="/blog"
                className="text-sm text-accent hover:text-accent/80 transition-colors font-[family-name:var(--font-inter)] flex items-center gap-2"
              >
                Read Blog
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="inline"
                >
                  <path
                    d="M1 7H13M13 7L7 1M13 7L7 13"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </Link>
              <a
                href="https://medium.com/@2017tejasgupta"
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-muted hover:text-foreground transition-colors font-[family-name:var(--font-inter)] flex items-center gap-2"
              >
                Medium
                <svg
                  width="14"
                  height="14"
                  viewBox="0 0 14 14"
                  fill="none"
                  className="inline"
                >
                  <path
                    d="M1 13L13 1M13 1H5M13 1V9"
                    stroke="currentColor"
                    strokeWidth="1.5"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                  />
                </svg>
              </a>
            </div>
          </FadeInUp>
        </div>

        {/* Horizontal scroll articles */}
        <div className="mt-12 -mx-6 px-6">
          <div className="flex gap-6 overflow-x-auto no-scrollbar pb-4 snap-x snap-mandatory">
            {articles.map((article, i) => (
              <motion.a
                key={article.title}
                href={article.url}
                target="_blank"
                rel="noopener noreferrer"
                initial={{ opacity: 0, y: 30 }}
                animate={isInView ? { opacity: 1, y: 0 } : {}}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.08,
                  ease: [0.22, 1, 0.36, 1],
                }}
                className="group flex-shrink-0 w-[320px] md:w-[380px] snap-start"
              >
                <div className="h-full p-6 md:p-8 rounded-2xl border border-white/5 bg-surface hover:border-accent/20 transition-all duration-500 hover:bg-surface-light flex flex-col">
                  <div className="flex items-center gap-3 mb-4">
                    <span className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-[family-name:var(--font-inter)]">
                      {article.tag}
                    </span>
                    <span className="text-xs text-muted font-[family-name:var(--font-inter)]">
                      {article.date}
                    </span>
                  </div>

                  <h3 className="text-lg font-semibold leading-snug font-[family-name:var(--font-space-grotesk)] group-hover:text-accent transition-colors duration-300 mb-3">
                    {article.title}
                  </h3>

                  <p className="text-sm text-muted leading-relaxed font-[family-name:var(--font-inter)] flex-grow">
                    {article.description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm text-muted group-hover:text-accent transition-colors font-[family-name:var(--font-inter)]">
                    Read article
                    <svg
                      width="14"
                      height="14"
                      viewBox="0 0 14 14"
                      fill="none"
                      className="group-hover:translate-x-1 transition-transform"
                    >
                      <path
                        d="M1 7H13M13 7L7 1M13 7L7 13"
                        stroke="currentColor"
                        strokeWidth="1.5"
                        strokeLinecap="round"
                        strokeLinejoin="round"
                      />
                    </svg>
                  </div>
                </div>
              </motion.a>
            ))}
          </div>
        </div>

        {/* GitHub highlight */}
        <FadeInUp delay={0.5}>
          <div className="mt-16 p-8 rounded-2xl border border-white/5 bg-surface">
            <div className="flex flex-col md:flex-row md:items-center md:justify-between gap-6">
              <div>
                <h3 className="text-xl font-semibold font-[family-name:var(--font-space-grotesk)]">
                  Open Source & Projects
                </h3>
                <p className="text-muted mt-2 font-[family-name:var(--font-inter)]">
                  84+ repositories spanning cloud automation, DevOps tools,
                  infrastructure as code, and web applications.
                </p>
              </div>
              <a
                href="https://github.com/tejas0207"
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center gap-3 px-6 py-3 rounded-full border border-white/10 hover:border-accent/30 bg-white/5 hover:bg-accent/10 transition-all duration-300 text-sm font-medium whitespace-nowrap font-[family-name:var(--font-inter)]"
              >
                <svg
                  width="20"
                  height="20"
                  viewBox="0 0 24 24"
                  fill="currentColor"
                >
                  <path d="M12 0c-6.626 0-12 5.373-12 12 0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23.957-.266 1.983-.399 3.003-.404 1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576 4.765-1.589 8.199-6.086 8.199-11.386 0-6.627-5.373-12-12-12z" />
                </svg>
                View GitHub
              </a>
            </div>
          </div>
        </FadeInUp>
      </div>
    </section>
  );
}
