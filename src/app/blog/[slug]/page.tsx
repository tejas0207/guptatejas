import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getAllSlugs, getPostBySlug } from "@/content/blog";
import { BlogPostClient } from "./BlogPostClient";

export const dynamic = "force-static";

export function generateStaticParams() {
  return getAllSlugs().map((slug) => ({ slug }));
}

export async function generateMetadata({
  params,
}: {
  params: Promise<{ slug: string }>;
}): Promise<Metadata> {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) return {};

  return {
    title: post.seo.metaTitle,
    description: post.seo.metaDescription,
    keywords: post.seo.keywords,
    alternates: {
      canonical: `/blog/${post.slug}`,
    },
    openGraph: {
      type: "article",
      title: post.title,
      description: post.seo.metaDescription,
      url: `https://guptatejas.com/blog/${post.slug}`,
      publishedTime: post.date,
      modifiedTime: post.updatedAt || post.date,
      authors: [post.author.name],
      tags: post.tags,
      images: [
        {
          url: post.thumbnail,
          width: 1200,
          height: 630,
          alt: post.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: post.title,
      description: post.seo.metaDescription,
      images: [post.thumbnail],
    },
  };
}

export default async function BlogPostPage({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const post = getPostBySlug(slug);
  if (!post) notFound();

  return (
    <BlogPostClient
      title={post.title}
      description={post.description}
      date={post.date}
      tags={post.tags}
      readingTime={post.readingTime}
      author={post.author}
      slug={post.slug}
    />
  );
}
