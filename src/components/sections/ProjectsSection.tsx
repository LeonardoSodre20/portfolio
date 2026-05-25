import { Github, ExternalLink, Star } from "lucide-react";
import type { IconType } from "react-icons";
import {
  SiReact, SiTypescript, SiVite, SiChakraui,
  SiReactrouter, SiReactquery, SiAxios, SiZod,
  SiNestjs, SiMongodb, SiTypeorm, SiJsonwebtokens,
  SiDocker, SiVitest, SiSwc, SiTailwindcss, SiSwiper, SiI18Next,
  SiTurborepo, SiShadcnui, SiGithubactions,
} from "react-icons/si";
import { PROJECTS } from "@/constants/projects";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { HoverLink } from "@/components/ui/HoverLink";

const TECH_ICONS: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Vite: SiVite,
  "Chakra UI": SiChakraui,
  "TanStack Router": SiReactrouter,
  "React Query": SiReactquery,
  Axios: SiAxios,
  Zod: SiZod,
  NestJS: SiNestjs,
  MongoDB: SiMongodb,
  TypeORM: SiTypeorm,
  JWT: SiJsonwebtokens,
  Docker: SiDocker,
  Vitest: SiVitest,
  SWC: SiSwc,
  "Tailwind CSS": SiTailwindcss,
  Swiper: SiSwiper,
  i18next: SiI18Next,
  Turborepo: SiTurborepo,
  ShadcnUI: SiShadcnui,
  "GitHub Actions": SiGithubactions,
};

const SUBSECTIONS = [
  { key: "personal", label: "// PESSOAIS" },
  { key: "professional", label: "// PROFISSIONAIS" },
] as const;

export function ProjectsSection() {
  return (
    <section id="projetos" className="projects">
      <SectionLabel>PROJETOS</SectionLabel>

      {SUBSECTIONS.map((sub) => {
        const projects = PROJECTS.filter((p) => p.category === sub.key);
        if (projects.length === 0) return null;

        return (
          <div key={sub.key} className="projects__sub">
            <span className="projects__sub-label">{sub.label}</span>
            <div className="projects__sub-grid">
              {projects.map((p) => {
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
                    {p.cover && (
                      <div className="project-card__cover">
                        <img src={p.cover} alt={p.title} />
                      </div>
                    )}

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
                        {p.company && (
                          <span
                            className="project-card__company"
                            style={{
                              color: p.color,
                              border: `1px solid ${p.color}44`,
                            }}
                          >
                            {p.company}
                          </span>
                        )}
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
                        {p.stack.map((tech) => {
                          const TechIcon = TECH_ICONS[tech];
                          return (
                            <span
                              key={tech}
                              className="project-card__tech"
                              style={{
                                color: p.color,
                                background: `${p.color}12`,
                                border: `1px solid ${p.color}30`,
                              }}
                            >
                              {TechIcon && <TechIcon size={13} style={{ marginRight: 4, verticalAlign: "middle" }} />}
                              {tech}
                            </span>
                          );
                        })}
                      </div>

                      <div className="project-card__links">
                        {p.githubUrl && (
                          <HoverLink color={p.color} href={p.githubUrl} external>
                            <Github size={12} /> Código
                          </HoverLink>
                        )}
                        <HoverLink color={p.color} href={"demoUrl" in p ? p.demoUrl : "#"} external>
                          <ExternalLink size={12} /> Demo
                        </HoverLink>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        );
      })}
    </section>
  );
}