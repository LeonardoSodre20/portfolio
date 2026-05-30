import { Toaster } from "sonner";
import { Navbar } from "@/components/layout/Navbar";
import { Footer } from "@/components/layout/Footer";
import { ScanlineOverlay, CRTGrid, AmbientBlobs } from "@/components/layout/Overlays";
import { HeroSection } from "@/components/sections/HeroSection";
import { AboutSection } from "@/components/sections/AboutSection";
import { SkillsSection } from "@/components/sections/SkillsSection";
import { ProjectsSection } from "@/components/sections/ProjectsSection";
import { ContactSection } from "@/components/sections/ContactSection";

export default function App() {
  const scrollTo = (id: string) => {
    document.getElementById(id)?.scrollIntoView({ behavior: "smooth" });
  };

  return (
    <>
      {/* Visual overlays */}
      <ScanlineOverlay />
      <CRTGrid />
      <AmbientBlobs />

      <div className="flicker" style={{ position: "relative", zIndex: 1 }}>
        <Navbar onNavigate={scrollTo} />
        <HeroSection onNavigate={scrollTo} />
        <AboutSection />
        <SkillsSection />
        <ProjectsSection />
        <ContactSection />
        <Footer />
        <Toaster theme="dark" richColors position="top-center" />
      </div>
    </>
  );
}
