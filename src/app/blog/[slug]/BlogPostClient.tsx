"use client";

import { BlogHeader } from "@/components/blog/BlogHeader";
import { ShareButtons } from "@/components/blog/ShareButtons";
import { SupportSection } from "@/components/blog/SupportSection";
import { TableOfContents } from "@/components/blog/TableOfContents";
import { getContentBySlug } from "@/content/blog/content-registry";
import { useEffect, useState } from "react";

interface BlogPostClientProps {
  title: string;
  description: string;
  date: string;
  tags: string[];
  readingTime: string;
  author: { name: string; role: string; avatar: string };
  slug: string;
}

interface TOCItem {
  id: string;
  title: string;
  level: number;
}

export function BlogPostClient({
  title,
  description,
  date,
  tags,
  readingTime,
  author,
  slug,
}: BlogPostClientProps) {
  const [tocItems, setTocItems] = useState<TOCItem[]>([]);

  const Content = getContentBySlug(slug);

  useEffect(() => {
    // Build TOC from rendered headings after content mounts
    const timer = setTimeout(() => {
      const headings = document.querySelectorAll("h2[id], h3[id]");
      const items: TOCItem[] = Array.from(headings).map((h) => ({
        id: h.id,
        title: h.textContent || "",
        level: h.tagName === "H2" ? 2 : 3,
      }));
      setTocItems(items);
    }, 100);
    return () => clearTimeout(timer);
  }, []);

  // JSON-LD structured data for the blog post
  const jsonLd = {
    "@context": "https://schema.org",
    "@type": "BlogPosting",
    headline: title,
    description: description,
    datePublished: date,
    author: {
      "@type": "Person",
      name: author.name,
      url: "https://guptatejas.com",
    },
    publisher: {
      "@type": "Person",
      name: author.name,
      url: "https://guptatejas.com",
    },
    mainEntityOfPage: {
      "@type": "WebPage",
      "@id": `https://guptatejas.com/blog/${slug}`,
    },
    keywords: tags.join(", "),
  };

  return (
    <>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <BlogHeader
        title={title}
        description={description}
        date={date}
        readingTime={readingTime}
        tags={tags}
        author={author}
      />
      {tocItems.length > 0 && <TableOfContents items={tocItems} />}
      {Content ? <Content /> : <div className="text-center py-20 text-muted">Content not found</div>}
      <div className="max-w-3xl mx-auto px-6 pb-24">
        <SupportSection />
        <ShareButtons
          title={title}
          url={`https://guptatejas.com/blog/${slug}`}
        />
      </div>
    </>
  );
}
