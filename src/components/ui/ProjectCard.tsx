import { Link } from "react-router-dom";
import { ArrowRight } from "lucide-react";
import type { ProjectCase } from "@/constants/projects";

interface ProjectCardProps {
  project: ProjectCase;
}

export function ProjectCard({ project }: ProjectCardProps) {
  return (
    <Link to={`/projetos/${project.slug}`} className="card project-card">
      <div className="project-card__cover">
        {project.cover ? (
          <img src={project.cover} alt="" loading="lazy" />
        ) : (
          <span className="project-card__placeholder" aria-hidden="true">{project.title}</span>
        )}
      </div>
      <div className="project-card__body">
        <span className="project-card__kind">{project.kind}</span>
        <h3 className="project-card__title">{project.title}</h3>
        <p className="project-card__summary">{project.summary}</p>
        <span className="project-card__more">Ver caso <ArrowRight size={14} aria-hidden="true" /></span>
      </div>
    </Link>
  );
}
