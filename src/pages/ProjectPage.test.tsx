import { render, screen } from "@testing-library/react";
import { MemoryRouter, Route, Routes } from "react-router-dom";
import { ProjectPage } from "@/pages/ProjectPage";
import { NotFoundPage } from "@/pages/NotFoundPage";

function renderAt(path: string) {
  return render(
    <MemoryRouter initialEntries={[path]}>
      <Routes>
        <Route path="/projetos/:slug" element={<ProjectPage />} />
        <Route path="*" element={<NotFoundPage />} />
      </Routes>
    </MemoryRouter>,
  );
}

describe("ProjectPage", () => {
  it("slug inexistente mostra página não encontrada com link para a home", () => {
    renderAt("/projetos/xyz");
    expect(screen.getByText(/não encontrad/i)).toBeInTheDocument();
    expect(screen.getByRole("link", { name: /início/i })).toHaveAttribute("href", "/");
  });

  it("projeto sem result mostra 'O que o sistema faz' e não 'Resultado'", () => {
    renderAt("/projetos/casa-da-marmita");
    expect(screen.getByRole("heading", { name: /o que o sistema faz/i })).toBeInTheDocument();
    expect(screen.queryByRole("heading", { name: /^resultado$/i })).toBeNull();
  });

  it("mostra desafio, solução e detalhes técnicos", () => {
    renderAt("/projetos/casa-da-marmita");
    expect(screen.getByRole("heading", { name: /o desafio/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /o que eu fiz/i })).toBeInTheDocument();
    expect(screen.getByRole("heading", { name: /detalhes técnicos/i })).toBeInTheDocument();
  });

  it("o botão de WhatsApp cita o projeto", () => {
    renderAt("/projetos/casa-da-marmita");
    expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("href")).toContain(
      encodeURIComponent("Casa da Marmita"),
    );
  });

  it("não mostra link de código nem de demo quando não existem", () => {
    renderAt("/projetos/casa-da-marmita");
    expect(screen.queryByRole("link", { name: /código|demo/i })).toBeNull();
  });

  it("mostra o link de demo quando existe e abre em nova aba", () => {
    renderAt("/projetos/lamecomex");
    const demo = screen.getByRole("link", { name: /demo|visitar site/i });
    expect(demo).toHaveAttribute("target", "_blank");
    expect(demo).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("projeto sem capa não quebra", () => {
    renderAt("/projetos/label-catalog");
    expect(screen.getByRole("heading", { level: 1, name: /Label-Catalog/ })).toBeInTheDocument();
  });
});
