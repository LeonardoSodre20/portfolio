import { Github, Linkedin, Mail } from "lucide-react";
import { Section } from "@/components/ui/Section";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";
import { EMAIL, GITHUB_URL, LINKEDIN_URL } from "@/constants/contact";

export function FinalCta() {
  return (
    <Section id="contato">
      <Reveal>
        <div className="final-cta">
          <h2 className="final-cta__title">Vamos conversar sobre o seu projeto?</h2>
          <p className="final-cta__text">Me chama no WhatsApp e me conta o que o seu negócio precisa.</p>
          <WhatsAppButton size="lg" />
          <div className="final-cta__links">
            <a href={`mailto:${EMAIL}`}><Mail size={16} aria-hidden="true" /> E-mail</a>
            <a href={LINKEDIN_URL} target="_blank" rel="noopener noreferrer"><Linkedin size={16} aria-hidden="true" /> LinkedIn</a>
            <a href={GITHUB_URL} target="_blank" rel="noopener noreferrer"><Github size={16} aria-hidden="true" /> GitHub</a>
          </div>
        </div>
      </Reveal>
    </Section>
  );
}
