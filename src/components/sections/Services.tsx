import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { SERVICES } from "@/constants/services";

export function Services() {
  return (
    <Section id="servicos" eyebrow="O que eu faço" title="Soluções simples para o dia a dia do seu negócio">
      <div className="grid grid--3">
        {SERVICES.map((s, i) => {
          const Icon = s.icon;
          return (
            <Reveal key={s.title} delay={i * 80}>
              <article className="card service">
                <span className="service__icon"><Icon size={22} aria-hidden="true" /></span>
                <h3 className="service__title">{s.title}</h3>
                <p className="service__for">{s.forWhom}</p>
                <p className="service__desc">{s.description}</p>
              </article>
            </Reveal>
          );
        })}
      </div>
    </Section>
  );
}
