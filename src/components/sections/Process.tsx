import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { PROCESS_STEPS } from "@/constants/process";

export function Process() {
  return (
    <Section id="como-funciona" eyebrow="Como funciona" title="Do primeiro contato ao sistema funcionando">
      <ol className="steps">
        {PROCESS_STEPS.map((step, i) => (
          <Reveal key={step.title} delay={i * 80}>
            <li className="card step">
              <span className="step__number">{i + 1}</span>
              <h3 className="step__title">{step.title}</h3>
              <p className="step__desc">{step.description}</p>
            </li>
          </Reveal>
        ))}
      </ol>
    </Section>
  );
}
