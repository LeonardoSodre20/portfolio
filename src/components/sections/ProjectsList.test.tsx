import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { ProjectsList } from "@/components/sections/ProjectsList";
import { PROJECTS } from "@/constants/projects";

describe("ProjectsList", () => {
  it("renderiza um card por projeto com link para a página de detalhes", () => {
    render(<MemoryRouter><ProjectsList /></MemoryRouter>);
    PROJECTS.forEach((p) => {
      expect(screen.getByRole("link", { name: new RegExp(p.title) })).toHaveAttribute(
        "href",
        `/projetos/${p.slug}`,
      );
    });
  });

  it("não quebra para projeto sem capa", () => {
    render(<MemoryRouter><ProjectsList /></MemoryRouter>);
    expect(screen.getByRole("link", { name: /Label-Catalog/ })).toBeInTheDocument();
  });
});
