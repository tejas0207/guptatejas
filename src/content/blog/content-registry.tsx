"use client";

import { ReactNode } from "react";
import { CloudFrontVPCOriginsContent } from "@/components/blog/content/CloudFrontVPCOriginsContent";
import { S3FilesContent } from "@/components/blog/content/S3FilesContent";

// Map of slug -> content component
// Add new blog content components here when creating new posts
const contentMap: Record<string, () => ReactNode> = {
  "cloudfront-vpc-origins-private-alb": CloudFrontVPCOriginsContent,
  "s3-files-filesystem": S3FilesContent,
};

export function getContentBySlug(slug: string): (() => ReactNode) | undefined {
  return contentMap[slug];
}
