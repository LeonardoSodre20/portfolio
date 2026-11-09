import { useEffect } from "react";
import { useLocation } from "react-router-dom";

const SECTION_IDS = ["inicio", "servicos", "projetos", "como-funciona", "sobre", "contato"] as const;

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
      {SECTION_IDS.map((id) => (
        <section key={id} id={id} className="section" aria-label={id} />
      ))}
    </main>
  );
}
