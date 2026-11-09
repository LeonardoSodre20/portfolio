import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import { Hero } from "@/components/sections/Hero";
import { Services } from "@/components/sections/Services";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { Process } from "@/components/sections/Process";
import { About } from "@/components/sections/About";
import { FinalCta } from "@/components/sections/FinalCta";

export function HomePage() {
  const { state } = useLocation();
  const scrollTo = (state as { scrollTo?: string } | null)?.scrollTo;

  useEffect(() => {
    if (!scrollTo) return;
    const frame = requestAnimationFrame(() => {
      document.getElementById(scrollTo)?.scrollIntoView({ behavior: "smooth" });
    });
    return () => cancelAnimationFrame(frame);
  }, [scrollTo]);

  return (
    <main>
      <Hero />
      <Services />
      <ProjectsList />
      <Process />
      <About />
      <FinalCta />
    </main>
  );
}
