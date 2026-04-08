import type { BlogPost } from "./types";

const post: Omit<BlogPost, "content"> = {
  slug: "s3-files-filesystem",
  title: "AWS S3 Files: Mount Your S3 Bucket as a File System",
  description:
    "AWS S3 Files lets you mount an S3 bucket as a POSIX file system over NFS v4.1 — no SDK changes, no data copies, no sync jobs. Files written through the mount are real S3 objects. Here's how it works and how I set it up.",
  date: "2026-04-08",
  tags: ["AWS", "S3", "Storage", "Architecture"],
  readingTime: "10 min read",
  thumbnail: "/blog/s3-files-thumb.png",
  author: {
    name: "Tejas Gupta",
    role: "Senior Platform Engineer",
    avatar: "/photos/1000007447.jpg",
  },
  seo: {
    metaTitle:
      "AWS S3 Files: Mount S3 Bucket as POSIX File System with NFS v4.1 | Tejas Gupta",
    metaDescription:
      "Learn how AWS S3 Files lets you mount an S3 bucket as a file system using NFS v4.1. Full setup walkthrough with screenshots — IAM, security groups, mount targets, and EC2 mounting.",
    keywords: [
      "AWS S3 Files",
      "S3 file system",
      "mount S3 bucket as file system",
      "S3 NFS",
      "AWS S3 POSIX",
      "S3 Files EFS",
      "AWS re:Invent 2024 S3",
      "S3 file system mount",
      "ML training S3 file system",
      "AWS EFS S3 backend",
      "S3 Files setup guide",
      "NFS v4.1 S3",
      "S3 object storage POSIX",
      "agentic AI S3 file system",
      "AWS S3 Files pricing",
    ],
  },
};

export default post;
