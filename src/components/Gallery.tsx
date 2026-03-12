"use client";

import Image from "next/image";
import { FadeInUp } from "./AnimatedText";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";

const photos = [
  {
    src: "/photos/1000219189.jpg",
    alt: "Ha Long Bay, Vietnam",
    caption: "Ha Long Bay",
    span: "md:col-span-2 md:row-span-2",
    aspect: "aspect-[4/3]",
  },
  {
    src: "/photos/1000219141.jpg",
    alt: "Phong Hai Harmony Cruise, Vietnam",
    caption: "Cruise Life",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/photos/1000212797.jpg",
    alt: "Sunset cruise",
    caption: "Golden Hour",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/photos/1000218915.jpg",
    alt: "Vietnamese Venice",
    caption: "Vietnamese Colors",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/photos/1000210770.jpg",
    alt: "Flower festival, Vietnam",
    caption: "New Year Festival",
    span: "md:col-span-1",
    aspect: "aspect-[3/4]",
  },
  {
    src: "/photos/1000212132.jpg",
    alt: "City square, Vietnam",
    caption: "Urban Explorations",
    span: "md:col-span-2",
    aspect: "aspect-[16/9]",
  },
];

export function Gallery() {
  const ref = useRef(null);
  const isInView = useInView(ref, { once: true, margin: "-5%" });

  return (
    <section id="gallery" className="relative py-32 md:py-48 px-6" ref={ref}>
      <div className="max-w-7xl mx-auto">
        <FadeInUp>
          <span className="text-xs tracking-[0.3em] uppercase text-accent font-mono">
            05 / Beyond the Code
          </span>
        </FadeInUp>

        <FadeInUp delay={0.1}>
          <h2 className="mt-6 text-4xl md:text-5xl lg:text-6xl font-bold tracking-tight font-[family-name:var(--font-space-grotesk)]">
            The world fuels the work.
          </h2>
        </FadeInUp>

        <FadeInUp delay={0.2}>
          <p className="mt-6 text-muted text-lg max-w-2xl font-[family-name:var(--font-inter)]">
            The best architectures are inspired by the world outside the
            terminal. From the limestone karsts of Ha Long Bay to the vibrant
            streets of Vietnamese cities — every journey shapes how I think,
            build, and create.
          </p>
        </FadeInUp>

        {/* Masonry grid */}
        <div className="mt-16 grid grid-cols-1 md:grid-cols-4 gap-4 md:gap-5">
          {photos.map((photo, i) => (
            <motion.div
              key={photo.src}
              initial={{ opacity: 0, y: 40, scale: 0.95 }}
              animate={
                isInView
                  ? { opacity: 1, y: 0, scale: 1 }
                  : {}
              }
              transition={{
                duration: 0.8,
                delay: 0.3 + i * 0.1,
                ease: [0.22, 1, 0.36, 1],
              }}
              className={`${photo.span} group relative overflow-hidden rounded-xl`}
            >
              <div className={`${photo.aspect} relative`}>
                <Image
                  src={photo.src}
                  alt={photo.alt}
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-700 ease-out"
                  sizes="(max-width: 768px) 100vw, 33vw"
                />
                {/* Overlay */}
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/0 to-black/0 opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
                {/* Caption */}
                <div className="absolute bottom-0 left-0 right-0 p-5 translate-y-full group-hover:translate-y-0 transition-transform duration-500 ease-out">
                  <span className="text-sm font-medium font-[family-name:var(--font-space-grotesk)] text-white">
                    {photo.caption}
                  </span>
                </div>
              </div>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  );
}
