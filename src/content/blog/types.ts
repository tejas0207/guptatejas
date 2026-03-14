import { ReactNode } from "react";

// Metadata for blog posts — server-safe, no client component imports
export interface BlogPostMeta {
  slug: string;
  title: string;
  description: string;
  date: string; // ISO date string
  updatedAt?: string;
  tags: string[];
  readingTime: string;
  thumbnail: string; // path to thumbnail in public/blog/
  author: {
    name: string;
    role: string;
    avatar: string;
  };
  seo: {
    metaTitle: string;
    metaDescription: string;
    keywords: string[];
    canonicalUrl?: string;
  };
}

// Full blog post with content (used only on client side)
export interface BlogPost extends BlogPostMeta {
  content: () => ReactNode;
}
