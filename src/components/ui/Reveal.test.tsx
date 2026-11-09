import { render, screen } from "@testing-library/react";
import { Reveal } from "@/components/ui/Reveal";
import { mockMatchMedia, stubIntersectionObserver } from "@/test/helpers";

afterEach(() => {
  vi.unstubAllGlobals();
});

describe("Reveal", () => {
  it("mostra o conteúdo na hora quando não há IntersectionObserver", () => {
    mockMatchMedia("(prefers-reduced-motion: reduce)", false);
    render(<Reveal><p>oi</p></Reveal>);
    expect(screen.getByText("oi").parentElement).toHaveClass("is-visible");
  });

  it("mostra o conteúdo na hora com prefers-reduced-motion", () => {
    mockMatchMedia("(prefers-reduced-motion: reduce)", true);
    stubIntersectionObserver();
    render(<Reveal><p>oi</p></Reveal>);
    expect(screen.getByText("oi").parentElement).toHaveClass("is-visible");
  });

  it("espera entrar na tela quando há observer e movimento permitido", () => {
    mockMatchMedia("(prefers-reduced-motion: reduce)", false);
    stubIntersectionObserver();
    render(<Reveal><p>oi</p></Reveal>);
    expect(screen.getByText("oi").parentElement).not.toHaveClass("is-visible");
  });
});
