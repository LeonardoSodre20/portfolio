import { buildWhatsAppUrl } from "@/lib/whatsapp";
import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "@/constants/contact";

describe("buildWhatsAppUrl", () => {
  it("usa só dígitos do número", () => {
    expect(buildWhatsAppUrl("oi", "+55 (15) 99999-0000")).toBe("https://wa.me/5515999990000?text=oi");
  });

  it("codifica acento, & e ?", () => {
    const url = buildWhatsAppUrl("Olá & você? sim", "5515999990000");
    expect(url).toBe("https://wa.me/5515999990000?text=" + encodeURIComponent("Olá & você? sim"));
  });

  it("usa a mensagem padrão quando não recebe mensagem", () => {
    expect(buildWhatsAppUrl(undefined, "5515999990000")).toContain(
      encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE),
    );
  });

  it("WHATSAPP_NUMBER é um celular brasileiro válido", () => {
    expect(WHATSAPP_NUMBER).toMatch(/^55\d{2}9\d{8}$/);
  });
});
