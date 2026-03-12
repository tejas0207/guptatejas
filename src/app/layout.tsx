import type { Metadata } from "next";
import { Space_Grotesk, Inter } from "next/font/google";
import "./globals.css";
import { SmoothScroll } from "@/components/SmoothScroll";
import { CustomCursor } from "@/components/CustomCursor";
import { Navbar } from "@/components/Navbar";

const spaceGrotesk = Space_Grotesk({
  variable: "--font-space-grotesk",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
});

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"],
  weight: ["300", "400", "500", "600"],
});

export const metadata: Metadata = {
  title: "Tejas Gupta — Senior Platform Engineer, Cloud Architect & Speaker",
  description:
    "Tejas Gupta is a Senior Platform Engineer at PhysicsWallah, AWS Community Builder, and international speaker. Specializing in cloud infrastructure, Kubernetes, and platform engineering at scale.",
  metadataBase: new URL("https://guptatejas.com"),
  alternates: {
    canonical: "/",
  },
  keywords: [
    "Tejas Gupta",
    "Senior Platform Engineer",
    "Cloud Architect",
    "AWS Community Builder",
    "DevOps Engineer",
    "Kubernetes",
    "PhysicsWallah",
    "Platform Engineering",
    "Cloud Infrastructure",
    "International Speaker",
  ],
  authors: [{ name: "Tejas Gupta", url: "https://guptatejas.com" }],
  creator: "Tejas Gupta",
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://guptatejas.com",
    siteName: "Tejas Gupta",
    title: "Tejas Gupta — Senior Platform Engineer, Cloud Architect & Speaker",
    description:
      "Senior Platform Engineer at PhysicsWallah. AWS Community Builder. International speaker. Building cloud infrastructure at scale.",
    images: [
      {
        url: "/photos/1000007447.jpg",
        width: 1200,
        height: 630,
        alt: "Tejas Gupta",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    site: "@guptatejas_7",
    creator: "@guptatejas_7",
    title: "Tejas Gupta — Senior Platform Engineer & Cloud Architect",
    description:
      "Senior Platform Engineer at PhysicsWallah. AWS Community Builder. International speaker.",
    images: ["/photos/1000007447.jpg"],
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <head>
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{
            __html: JSON.stringify({
              "@context": "https://schema.org",
              "@type": "Person",
              name: "Tejas Gupta",
              url: "https://guptatejas.com",
              jobTitle: "Senior Platform Engineer",
              worksFor: {
                "@type": "Organization",
                name: "PhysicsWallah",
              },
              sameAs: [
                "https://www.linkedin.com/in/tejasgupta7/",
                "https://github.com/tejas0207",
                "https://medium.com/@2017tejasgupta",
                "https://x.com/guptatejas_7",
              ],
              alumniOf: {
                "@type": "CollegeOrUniversity",
                name: "University of Mumbai",
              },
              knowsAbout: [
                "AWS",
                "Kubernetes",
                "Cloud Architecture",
                "Platform Engineering",
                "DevOps",
                "Terraform",
              ],
            }),
          }}
        />
      </head>
      <body
        className={`${spaceGrotesk.variable} ${inter.variable} antialiased`}
      >
        <CustomCursor />
        <Navbar />
        <SmoothScroll>{children}</SmoothScroll>
        <div className="grain" />
      </body>
    </html>
  );
}
