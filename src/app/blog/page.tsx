import type { Metadata } from "next";
import { allPosts } from "@/content/blog";
import { BlogListClient } from "./BlogListClient";

export const metadata: Metadata = {
  title: "Blog — Tejas Gupta | Cloud Architecture, DevOps & Platform Engineering",
  description:
    "Technical deep-dives on AWS, Kubernetes, platform engineering, cloud security, and infrastructure at scale. Written by Tejas Gupta, Senior Platform Engineer.",
  alternates: {
    canonical: "/blog",
  },
  openGraph: {
    title: "Blog — Tejas Gupta",
    description:
      "Technical deep-dives on AWS, Kubernetes, platform engineering, and cloud infrastructure.",
    url: "https://guptatejas.com/blog",
    type: "website",
  },
  twitter: {
    card: "summary_large_image",
    title: "Blog — Tejas Gupta",
    description:
      "Technical deep-dives on AWS, Kubernetes, platform engineering, and cloud infrastructure.",
  },
};

export default function BlogPage() {
  // Pass serializable post data to the client component
  const postsData = allPosts.map(({ slug, title, description, date, tags, readingTime, thumbnail }) => ({
    slug,
    title,
    description,
    date,
    tags,
    readingTime,
    thumbnail,
  }));

  return <BlogListClient posts={postsData} />;
}
