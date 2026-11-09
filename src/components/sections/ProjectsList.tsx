import { Section } from "@/components/ui/Section";
import { Reveal } from "@/components/ui/Reveal";
import { ProjectCard } from "@/components/ui/ProjectCard";
import { PROJECTS } from "@/constants/projects";

export function ProjectsList() {
  return (
    <Section id="projetos" eyebrow="Projetos" title="Trabalhos que resolveram problemas reais de negócios">
      <div className="grid grid--2">
        {PROJECTS.map((p, i) => (
          <Reveal key={p.slug} delay={(i % 2) * 80}>
            <ProjectCard project={p} />
          </Reveal>
        ))}
      </div>
    </Section>
  );
}
