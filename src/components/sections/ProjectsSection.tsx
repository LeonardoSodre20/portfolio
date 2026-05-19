import { Github, ExternalLink, Star } from "lucide-react";
import { PROJECTS } from "@/constants/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverLink } from "@/components/ui/HoverLink";

export function ProjectsSection() {
  return (
    <section id="projetos" className="projects">
      <SectionLabel>PROJETOS</SectionLabel>

      <div className="projects__grid">
        {PROJECTS.map((p) => {
          const PIcon = p.icon;
          return (
            <div
              key={p.id}
              className="project-card"
              style={{
                border: `1px solid ${p.color}44`,
                "--accent": p.color,
              } as React.CSSProperties}
              onMouseEnter={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${p.color}30`;
              }}
              onMouseLeave={(e) => {
                (e.currentTarget as HTMLElement).style.boxShadow = "none";
              }}
            >
              {/* Header strip */}
              <div
                className="project-card__header"
                style={{
                  background: `linear-gradient(90deg, ${p.color}1A, transparent)`,
                  borderBottom: `1px solid ${p.color}30`,
                }}
              >
                <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                  <PIcon size={14} style={{ color: p.color }} />
                  <span
                    className="project-card__tag"
                    style={{
                      color: p.color,
                      border: `1px solid ${p.color}44`,
                    }}
                  >
                    {p.tag}
                  </span>
                </div>
                <div className="project-card__stars">
                  <Star size={11} />
                  <span>{p.stars}</span>
                </div>
              </div>

              <div className="project-card__body">
                <span className="project-card__id">// {p.id}</span>
                <h3
                  className="project-card__title"
                  style={{ textShadow: `0 0 8px ${p.color}` }}
                >
                  {p.title}
                </h3>
                <p className="project-card__desc">{p.desc}</p>

                <div className="project-card__stack">
                  {p.stack.map((tech) => (
                    <span
                      key={tech}
                      className="project-card__tech"
                      style={{
                        color: p.color,
                        background: `${p.color}12`,
                        border: `1px solid ${p.color}30`,
                      }}
                    >
                      {tech}
                    </span>
                  ))}
                </div>

                <div className="project-card__links">
                  <HoverLink color={p.color}>
                    <Github size={12} /> Código
                  </HoverLink>
                  <HoverLink color={p.color}>
                    <ExternalLink size={12} /> Demo
                  </HoverLink>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}
