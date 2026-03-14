"use client";

import { ReactNode } from "react";
import { CloudFrontVPCOriginsContent } from "@/components/blog/content/CloudFrontVPCOriginsContent";

// Map of slug -> content component
// Add new blog content components here when creating new posts
const contentMap: Record<string, () => ReactNode> = {
  "cloudfront-vpc-origins-private-alb": CloudFrontVPCOriginsContent,
};

export function getContentBySlug(slug: string): (() => ReactNode) | undefined {
  return contentMap[slug];
}
