import { act, renderHook } from "@testing-library/react";
import { MemoryRouter, useLocation } from "react-router-dom";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

function setup(initial: string) {
  const wrapper = ({ children }: { children: React.ReactNode }) => (
    <MemoryRouter initialEntries={[initial]}>{children}</MemoryRouter>
  );
  return renderHook(
    () => ({ nav: useSectionNavigation(), location: useLocation() }),
    { wrapper },
  );
}

describe("useSectionNavigation", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("na home rola até a seção", () => {
    const target = document.createElement("div");
    target.id = "sobre";
    document.body.appendChild(target);
    const { result } = setup("/");
    result.current.nav("sobre");
    expect(Element.prototype.scrollIntoView).toHaveBeenCalled();
    target.remove();
  });

  it("fora da home navega para / com state.scrollTo", () => {
    const { result } = setup("/projetos/lamecomex");
    act(() => result.current.nav("sobre"));
    expect(result.current.location.pathname).toBe("/");
    expect(result.current.location.state).toEqual({ scrollTo: "sobre" });
  });
});
