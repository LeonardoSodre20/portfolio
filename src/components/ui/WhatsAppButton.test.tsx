import { render, screen } from "@testing-library/react";
import { WhatsAppButton } from "@/components/ui/WhatsAppButton";

describe("WhatsAppButton", () => {
  it("aponta para wa.me, abre em nova aba e é seguro", () => {
    render(<WhatsAppButton />);
    const a = screen.getByRole("link", { name: /whatsapp/i });
    expect(a).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\/55\d+\?text=/));
    expect(a).toHaveAttribute("target", "_blank");
    expect(a).toHaveAttribute("rel", "noopener noreferrer");
  });

  it("usa a mensagem recebida", () => {
    render(<WhatsAppButton message="caso X" />);
    expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("href")).toContain(
      encodeURIComponent("caso X"),
    );
  });
});
