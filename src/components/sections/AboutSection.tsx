import { SectionLabel } from "@/components/ui/SectionLabel";
import { CyberPanel } from "@/components/ui/CyberPanel";
import { TermLine } from "@/components/ui/TermLine";
import { TIMELINE } from "@/constants/timeline";

export function AboutSection() {
  return (
    <section id="sobre" className="about">
      <SectionLabel>SOBRE_MIM</SectionLabel>

      <div className="about__grid">
        {/* Terminal window */}
        <CyberPanel title="~ bash — zsh">
          <div className="about__terminal-body">
            <TermLine cmd="whoami" out="Leonardo Sodré" color="#00FFFF" />
            <TermLine cmd="cat bio.txt" out="Sempre fui fascinado por tecnologia e pelo universo dos jogos. Desde criança, passar horas jogando e entender como aquilo funcionava moldou minha curiosidade — e, de certa forma, minha personalidade. Sou também um grande fã de animes e filmes da Marvel. One Piece, Naruto, Dragon Ball e Nanatsu no Taizai são alguns dos meus preferidos." color="#B8A8D8" />
            <TermLine cmd="cat local.txt" out="📍 Brasil" color="#BF00FF" />
            <TermLine cmd="cat exp.txt" out="4+ anos de experiência" color="#FFE600" />
            <TermLine cmd="cat status.txt" out="✅ Disponível para freela & CLT" color="#FF00FF" />
            <TermLine cmd="cat historia.txt" out="Em 2020, ingressei no curso de Jogos Digitais pela Universidade de Sorocaba (Uniso) — uma experiência que me transformou tanto profissional quanto pessoalmente. Concluí a graduação em 2022 e mergulhei de cabeça no desenvolvimento de software, área pela qual me apaixonei de imediato. Desde então, venho atuando como desenvolvedor fullstack, construindo minha carreira com dedicação e propósito." color="#B8A8D8" />
            <div className="about__terminal-cursor">
              <span style={{ color: "var(--color-purple)", fontFamily: "var(--font-mono)" }}>$</span>
              <span className="blink" style={{ color: "var(--color-purple)", fontFamily: "var(--font-mono)" }}>█</span>
            </div>
          </div>
        </CyberPanel>

        {/* Timeline */}
        <div className="timeline">
          {TIMELINE.map((item) => (
            <div key={item.period} className="timeline__item">
              <div
                className="timeline__dot"
                style={{
                  borderColor: item.color,
                  boxShadow: `0 0 8px ${item.color}`,
                }}
              />
              <p className="timeline__date">{item.period}</p>
              <p className="timeline__company" style={{ color: item.color }}>
                {item.company}
              </p>
              <p className="timeline__role">{item.role}</p>
              <ul className="timeline__bullets">
                {item.bullets.map((b, i) => (
                  <li key={i} className="timeline__bullet">{b}</li>
                ))}
              </ul>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
