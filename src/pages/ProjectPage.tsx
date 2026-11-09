import { useParams } from "react-router-dom";
import { getProjectBySlug } from "@/constants/projects";
import { NotFoundPage } from "@/pages/NotFoundPage";

export function ProjectPage() {
  const { slug = "" } = useParams();
  const project = getProjectBySlug(slug);
  if (!project) return <NotFoundPage />;
  return (
    <main className="section">
      <div className="section__inner">
        <h1 className="section__title">{project.title}</h1>
      </div>
    </main>
  );
}
