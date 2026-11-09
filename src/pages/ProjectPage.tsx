import { useParams } from "react-router-dom";
import { ArrowLeft, ExternalLink, Github } from "lucide-react";
import { getProjectBySlug } from "@/constants/projects";
import { NotFoundPage } from "@/pages/NotFoundPage";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { TechChips } from "@/components/ui/TechChips";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Reveal } from "@/components/ui/Reveal";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const goTo = useSectionNavigation();
  const project = getProjectBySlug(slug);

  if (!project) return <NotFoundPage />;

  return (
    <main className="case">
      <div className="case__inner">
        <button type="button" className="case__back" onClick={() => goTo("projetos")}>
          <ArrowLeft size={16} aria-hidden="true" /> Voltar aos projetos
        </button>

        <header className="case__header">
          <span className="case__kind">
            {project.kind}
            {project.client ? ` · ${project.client}` : ""}
          </span>
          <h1 className="case__title">{project.title}</h1>
          <p className="case__summary">{project.summary}</p>
        </header>

        {project.cover && (
          <Reveal>
            <BrowserFrame src={project.cover} alt={`Tela do projeto ${project.title}`} />
          </Reveal>
        )}

        <div className="case__grid">
          <section className="case__block">
            <h2 className="case__heading">O desafio</h2>
            <p>{project.challenge}</p>
          </section>

          <section className="case__block">
            <h2 className="case__heading">O que eu fiz</h2>
            <ul className="case__list">
              {project.solution.map((s) => (
                <li key={s}>{s}</li>
              ))}
            </ul>
          </section>

          <section className="case__block">
            {project.result ? (
              <>
                <h2 className="case__heading">Resultado</h2>
                <p>{project.result}</p>
              </>
            ) : (
              <>
                <h2 className="case__heading">O que o sistema faz</h2>
                <p>{project.summary}</p>
              </>
            )}
          </section>
        </div>

        {project.gallery.length > 0 && (
          <div className="case__gallery">
            {project.gallery.map((src) => (
              <BrowserFrame key={src} src={src} alt={`Tela do projeto ${project.title}`} />
            ))}
          </div>
        )}

        <section className="case__block case__tech">
          <h2 className="case__heading">Detalhes técnicos</h2>
          {project.highlights && (
            <ul className="case__list">
              {project.highlights.map((h) => (
                <li key={h}>{h}</li>
              ))}
            </ul>
          )}
          <TechChips items={project.stack} />
          {(project.demoUrl || project.githubUrl) && (
            <div className="case__links">
              {project.demoUrl && (
                <a href={project.demoUrl} target="_blank" rel="noopener noreferrer">
                  <ExternalLink size={15} aria-hidden="true" /> Demo
                </a>
              )}
              {project.githubUrl && (
                <a href={project.githubUrl} target="_blank" rel="noopener noreferrer">
                  <Github size={15} aria-hidden="true" /> Código
                </a>
              )}
            </div>
          )}
        </section>

        <section className="final-cta case__cta">
          <h2 className="final-cta__title">Quer algo assim para o seu negócio?</h2>
          <p className="final-cta__text">Me chama no WhatsApp e a gente conversa sobre o que faz sentido para você.</p>
          <WhatsAppButton
            size="lg"
            message={`Oi Leonardo, vi o caso ${project.title} no seu portfólio e quero algo parecido`}
          />
        </section>
      </div>
    </main>
  );
}
