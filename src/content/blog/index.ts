import type { BlogPostMeta } from "./types";
import cloudfrontVpcOrigins from "./cloudfront-vpc-origins-private-alb";

// Add new blog posts here — they will automatically appear on the blog listing page
// and generate static pages at build time
const posts: BlogPostMeta[] = [
  cloudfrontVpcOrigins,
];

// Sort by date, newest first
export const allPosts = posts.sort(
  (a, b) => new Date(b.date).getTime() - new Date(a.date).getTime()
);

export function getPostBySlug(slug: string): BlogPostMeta | undefined {
  return allPosts.find((post) => post.slug === slug);
}

export function getAllSlugs(): string[] {
  return allPosts.map((post) => post.slug);
}
