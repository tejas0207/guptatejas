"use client";

import { motion } from "framer-motion";
import Link from "next/link";

interface BlogHeaderProps {
  title: string;
  description: string;
  date: string;
  readingTime: string;
  tags: string[];
  author: {
    name: string;
    role: string;
    avatar: string;
  };
}

export function BlogHeader({ title, description, date, readingTime, tags, author }: BlogHeaderProps) {
  const formattedDate = new Date(date).toLocaleDateString("en-US", {
    year: "numeric",
    month: "long",
    day: "numeric",
  });

  return (
    <header className="relative pt-32 md:pt-40 pb-12 md:pb-16 px-6">
      <div className="max-w-3xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <Link
            href="/blog"
            className="inline-flex items-center gap-2 text-sm text-muted hover:text-accent transition-colors font-[family-name:var(--font-inter)] mb-8"
          >
            <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
              <path
                d="M10 12L6 8L10 4"
                stroke="currentColor"
                strokeWidth="1.5"
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            Back to Blog
          </Link>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.1, ease: [0.22, 1, 0.36, 1] }}
          className="flex flex-wrap gap-2 mb-6"
        >
          {tags.map((tag) => (
            <span
              key={tag}
              className="px-3 py-1 rounded-full bg-accent/10 text-accent text-xs font-[family-name:var(--font-inter)]"
            >
              {tag}
            </span>
          ))}
        </motion.div>

        <motion.h1
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.15, ease: [0.22, 1, 0.36, 1] }}
          className="text-3xl md:text-4xl lg:text-5xl font-bold tracking-tight leading-tight font-[family-name:var(--font-space-grotesk)]"
        >
          {title}
        </motion.h1>

        <motion.p
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          className="mt-4 text-lg text-muted leading-relaxed font-[family-name:var(--font-inter)]"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, delay: 0.25, ease: [0.22, 1, 0.36, 1] }}
          className="mt-8 flex items-center gap-4 pb-8 border-b border-white/5"
        >
          <img
            src={author.avatar}
            alt={author.name}
            className="w-11 h-11 rounded-full object-cover border border-white/10"
          />
          <div>
            <p className="text-sm font-medium font-[family-name:var(--font-space-grotesk)]">
              {author.name}
            </p>
            <p className="text-xs text-muted font-[family-name:var(--font-inter)]">
              {formattedDate} · {readingTime}
            </p>
          </div>
        </motion.div>
      </div>
    </header>
  );
}
