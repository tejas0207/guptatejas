"use client";

import { motion } from "framer-motion";
import Link from "next/link";
import { BlogThumbnail } from "@/components/blog/BlogThumbnail";

interface PostData {
  slug: string;
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  thumbnail: string;
}

export function BlogListClient({ posts }: { posts: PostData[] }) {
  return (
    <main className="min-h-screen pt-32 md:pt-40 pb-24 px-6">
      <div className="max-w-5xl mx-auto">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: [0.22, 1, 0.36, 1] }}
        >
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
            Blog
          </span>
          <h1 className="text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight mt-4 font-[family-name:var(--font-space-grotesk)]">
            Technical Deep-Dives
          </h1>
          <p className="text-lg text-muted mt-4 max-w-2xl font-[family-name:var(--font-inter)] leading-relaxed">
            Architecture decisions, cloud infrastructure patterns, and lessons learned
            from building platforms at scale.
          </p>
        </motion.div>

        {/* Featured post (first post gets hero treatment) */}
        {posts.length > 0 && (
          <motion.div
            className="mt-16"
            initial={{ opacity: 0, y: 30 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6, delay: 0.2, ease: [0.22, 1, 0.36, 1] }}
          >
            <Link href={`/blog/${posts[0].slug}`} className="group block">
              <article className="rounded-2xl border border-white/5 bg-surface hover:border-accent/20 transition-all duration-500 hover:bg-surface-light overflow-hidden">
                {/* Thumbnail — visual only, no title overlay */}
                <BlogThumbnail title={posts[0].title} tags={posts[0].tags} variant="hero" hideTitle />

                {/* Content */}
                <div className="p-6 md:p-8">
                  <div className="flex flex-wrap items-center gap-3 mb-4">
                    {(posts[0].tags || []).map((tag) => (
                      <span
                        key={tag}
                        className="px-2.5 py-1 rounded-full bg-accent/10 text-accent text-xs font-[family-name:var(--font-inter)]"
                      >
                        {tag}
                      </span>
                    ))}
                    <span className="text-xs text-muted font-[family-name:var(--font-inter)]">
                      {new Date(posts[0].date).toLocaleDateString("en-US", {
                        year: "numeric",
                        month: "long",
                        day: "numeric",
                      })}
                    </span>
                    <span className="text-xs text-muted font-[family-name:var(--font-inter)]">
                      · {posts[0].readingTime}
                    </span>
                  </div>

                  <h2 className="text-2xl md:text-3xl font-bold font-[family-name:var(--font-space-grotesk)] group-hover:text-accent transition-colors duration-300 leading-tight">
                    {posts[0].title}
                  </h2>

                  <p className="text-sm md:text-base text-muted mt-3 leading-relaxed font-[family-name:var(--font-inter)] line-clamp-3">
                    {posts[0].description}
                  </p>

                  <div className="mt-6 flex items-center gap-2 text-sm text-accent font-medium font-[family-name:var(--font-inter)]">
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
              </article>
            </Link>
          </motion.div>
        )}

        {/* Remaining posts in a grid (for when there are multiple blogs) */}
        {posts.length > 1 && (
          <div className="mt-12 grid grid-cols-1 md:grid-cols-2 gap-6">
            {posts.slice(1).map((post, i) => (
              <motion.div
                key={post.slug}
                initial={{ opacity: 0, y: 30 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{
                  duration: 0.6,
                  delay: 0.3 + i * 0.1,
                  ease: [0.22, 1, 0.36, 1],
                }}
              >
                <Link href={`/blog/${post.slug}`} className="group block h-full">
                  <article className="h-full rounded-2xl border border-white/5 bg-surface hover:border-accent/20 transition-all duration-500 hover:bg-surface-light overflow-hidden flex flex-col">
                    {/* Thumbnail — card size */}
                    <BlogThumbnail title={post.title} tags={post.tags} variant="card" hideTitle />

                    {/* Content */}
                    <div className="p-5 md:p-6 flex flex-col flex-1">
                      <div className="flex flex-wrap items-center gap-2 mb-3">
                        {(post.tags || []).slice(0, 2).map((tag) => (
                          <span
                            key={tag}
                            className="px-2 py-0.5 rounded-full bg-accent/10 text-accent text-[11px] font-[family-name:var(--font-inter)]"
                          >
                            {tag}
                          </span>
                        ))}
                        <span className="text-[11px] text-muted font-[family-name:var(--font-inter)]">
                          · {post.readingTime}
                        </span>
                      </div>

                      <h2 className="text-lg font-bold font-[family-name:var(--font-space-grotesk)] group-hover:text-accent transition-colors duration-300 leading-tight">
                        {post.title}
                      </h2>

                      <p className="text-sm text-muted mt-2 leading-relaxed font-[family-name:var(--font-inter)] line-clamp-2 flex-1">
                        {post.description}
                      </p>

                      <div className="mt-4 flex items-center gap-2 text-sm text-muted group-hover:text-accent transition-colors font-[family-name:var(--font-inter)]">
                        Read article
                        <svg
                          width="12"
                          height="12"
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
                  </article>
                </Link>
              </motion.div>
            ))}
          </div>
        )}

        {/* Empty state */}
        {posts.length === 0 && (
          <div className="mt-16 text-center">
            <p className="text-muted font-[family-name:var(--font-inter)]">
              No posts yet. Check back soon!
            </p>
          </div>
        )}
      </div>
    </main>
  );
}
