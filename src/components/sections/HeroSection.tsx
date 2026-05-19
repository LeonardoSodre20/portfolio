import { ChevronRight, Mail, ArrowDown } from "lucide-react";
import { useTyping } from "@/hooks/useTyping";
import { CyberBtn } from "@/components/ui/CyberBtn";
import { CornerUI } from "@/components/ui/CornerUI";
import avatarImg from "@/assets/avatar.jpg";

interface HeroSectionProps {
  onNavigate: (id: string) => void;
}

export function HeroSection({ onNavigate }: HeroSectionProps) {
  const typed = useTyping(["FULL STACK DEVELOPER"]);

  return (
    <section id="inicio" className="hero">
      <CornerUI pos="top-8 left-8" />
      <CornerUI pos="top-8 right-8" mirror />
      <CornerUI pos="bottom-8 left-8" flip />
      <CornerUI pos="bottom-8 right-8" flip mirror />

      {/* Badge */}
      <div className="hero__badge">
        <span className="hero__badge-dot" />
        // DISPONÍVEL PARA PROJETOS
      </div>

      {/* Avatar ring */}
      <div className="float-anim relative mb-10">
        <div className="hero__avatar-ring neon-pulse">
          <div className="hero__avatar-inner">
            <img src={avatarImg} alt="Leonardo Sodré" />
          </div>
        </div>
        <div className="hero__level-badge">LVL 99</div>
      </div>

      <p className="hero__greeting">{">>> OLÁ, EU SOU"}</p>

      <h1 className="hero__name glitch-text">
        LEONARDO<span style={{ color: "var(--color-purple)" }}>.</span>SODRÉ
      </h1>

      <div className="hero__typing">
        {typed}
        <span className="blink" style={{ color: "var(--color-purple)" }}>█</span>
      </div>

      <p className="hero__desc">
        Construo interfaces e sistemas que{" "}
        <span style={{ color: "var(--color-purple)" }}>funcionam de verdade</span>. Apaixonado por código
        limpo, UX intencional e soluções que fazem sentido.
      </p>

      <div className="hero__ctas">
        <CyberBtn primary onClick={() => onNavigate("projetos")}>
          VER PROJETOS <ChevronRight size={14} />
        </CyberBtn>
        <CyberBtn onClick={() => onNavigate("contato")}>
          CONTATO <Mail size={13} />
        </CyberBtn>
      </div>

      <div className="hero__scroll-hint">
        <span>SCROLL</span>
        <ArrowDown size={13} />
      </div>
    </section>
  );
}
