import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ABOUT_BIO, ABOUT_FACTS, ABOUT_STACK } from "@/constants/about";
import avatarImg from "@/assets/avatar.jpg";

export function About() {
  return (
    <Section id="sobre" eyebrow="Sobre mim" title="Quem vai cuidar do seu projeto">
      <Reveal>
        <div className="about">
          <img className="about__photo" src={avatarImg} alt="Leonardo Sodré" />
          <div className="about__text">
            {ABOUT_BIO.map((p) => (
              <p key={p}>{p}</p>
            ))}
            <ul className="about__facts">
              {ABOUT_FACTS.map((f) => (
                <li key={f}>{f}</li>
              ))}
            </ul>
            <div className="chips" aria-label="Tecnologias">
              {ABOUT_STACK.map((t) => (
                <span key={t} className="chip">{t}</span>
              ))}
            </div>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
