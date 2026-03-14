import type { BlogPost } from "./types";

const post: Omit<BlogPost, "content"> = {
  slug: "cloudfront-vpc-origins-private-alb",
  title: "Ditch the Public ALB: How CloudFront VPC Origins Changes AWS Security Forever",
  description:
    "For years we put public ALBs behind CloudFront and called it secure. It wasn't. AWS CloudFront VPC Origins lets you use fully private ALBs — eliminating the entire class of origin-bypass attacks.",
  date: "2025-03-14",
  updatedAt: "2026-03-15",
  tags: ["AWS", "CloudFront", "Security", "Architecture"],
  readingTime: "12 min read",
  thumbnail: "/blog/cloudfront-vpc-origins-thumb.png",
  author: {
    name: "Tejas Gupta",
    role: "Senior Platform Engineer",
    avatar: "/photos/1000007447.jpg",
  },
  seo: {
    metaTitle:
      "CloudFront VPC Origins: Replace Public ALB with Private ALB for 10x Security | Tejas Gupta",
    metaDescription:
      "Learn how AWS CloudFront VPC Origins eliminates the need for public ALBs. Step-by-step guide to implementing private ALBs with CloudFront for zero-exposure architecture.",
    keywords: [
      "CloudFront VPC Origins",
      "AWS CloudFront private ALB",
      "private ALB CloudFront",
      "AWS VPC Origins",
      "CloudFront origin security",
      "AWS re:Invent 2024",
      "eliminate public ALB",
      "CloudFront private origin",
      "AWS security architecture",
      "ALB bypass prevention",
      "CloudFront ALB security",
      "private Application Load Balancer",
      "AWS edge to origin security",
      "VPC origin CloudFront setup",
      "CloudFront internal ALB",
    ],
  },
};

export default post;
