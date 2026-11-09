import fs from "node:fs";
import path from "node:path";
import { PROJECTS, getProjectBySlug } from "@/constants/projects";

describe("PROJECTS", () => {
  it("slugs são únicos e em kebab-case", () => {
    const slugs = PROJECTS.map((p) => p.slug);
    expect(new Set(slugs).size).toBe(slugs.length);
    slugs.forEach((s) => expect(s).toMatch(/^[a-z0-9]+(-[a-z0-9]+)*$/));
  });

  it("todo projeto tem summary, challenge e ao menos uma etapa de solução", () => {
    PROJECTS.forEach((p) => {
      expect(p.summary.length).toBeGreaterThan(0);
      expect(p.challenge.length).toBeGreaterThan(0);
      expect(p.solution.length).toBeGreaterThan(0);
    });
  });

  it("toda imagem referenciada existe em public/", () => {
    PROJECTS.forEach((p) => {
      [p.cover, ...p.gallery].filter(Boolean).forEach((img) => {
        expect(fs.existsSync(path.join(process.cwd(), "public", img as string)), `${p.slug}: ${img}`).toBe(true);
      });
    });
  });

  it("a Casa da Marmita vem primeiro", () => {
    expect(PROJECTS[0].slug).toBe("casa-da-marmita");
  });

  it("getProjectBySlug encontra e devolve undefined para slug inexistente", () => {
    expect(getProjectBySlug("casa-da-marmita")?.title).toBe("Casa da Marmita");
    expect(getProjectBySlug("xyz")).toBeUndefined();
  });

  it("nenhum texto contém dado sensível", () => {
    const text = JSON.stringify(PROJECTS);
    expect(text).not.toMatch(/@|\b\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}\b|\.env|adminsdk/i);
  });
});
