"use client";

import { useState, useCallback } from "react";
import { Hero } from "@/components/Hero";
import { About } from "@/components/About";
import { Expertise } from "@/components/Expertise";
import { Journey } from "@/components/Journey";
import { Writing } from "@/components/Writing";
import { Contact } from "@/components/Contact";
import { Preloader } from "@/components/Preloader";
import { SectionDivider } from "@/components/SectionDivider";

export default function Home() {
  const [loaded, setLoaded] = useState(false);

  const handleComplete = useCallback(() => {
    setLoaded(true);
  }, []);

  return (
    <>
      <Preloader onComplete={handleComplete} />
      <main
        style={{
          opacity: loaded ? 1 : 0,
          transition: "opacity 0.8s ease",
        }}
      >
        <Hero />
        <SectionDivider />
        <About />
        <SectionDivider />
        <Expertise />
        <SectionDivider />
        <Journey />
        <SectionDivider />
        <Writing />
        <SectionDivider />
        <Contact />
      </main>
    </>
  );
}
