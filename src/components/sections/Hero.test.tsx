import { render, screen } from "@testing-library/react";
import { MemoryRouter } from "react-router-dom";
import { Hero } from "@/components/sections/Hero";

describe("Hero", () => {
  it("tem h1 com a proposta e um link de WhatsApp", () => {
    render(<MemoryRouter><Hero /></MemoryRouter>);
    expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/sob medida/i);
    expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute(
      "href",
      expect.stringContaining("wa.me"),
    );
  });
});
