import { render, screen, within } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import { MemoryRouter } from "react-router-dom";
import { SiteNavbar } from "@/components/layout/SiteNavbar";

describe("SiteNavbar", () => {
  beforeEach(() => {
    Element.prototype.scrollIntoView = vi.fn();
  });

  it("fecha o menu mobile ao clicar em um item", async () => {
    const user = userEvent.setup();
    render(<MemoryRouter><SiteNavbar /></MemoryRouter>);
    expect(screen.queryByTestId("mobile-menu")).toBeNull();
    await user.click(screen.getByRole("button", { name: /abrir menu/i }));
    const menu = screen.getByTestId("mobile-menu");
    await user.click(within(menu).getByRole("button", { name: "Sobre" }));
    expect(screen.queryByTestId("mobile-menu")).toBeNull();
  });

  it("tem o botão Conversar apontando para o WhatsApp", () => {
    render(<MemoryRouter><SiteNavbar /></MemoryRouter>);
    expect(screen.getByRole("link", { name: /conversar/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });
});
