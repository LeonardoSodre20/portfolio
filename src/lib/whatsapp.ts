import { WHATSAPP_DEFAULT_MESSAGE, WHATSAPP_NUMBER } from "@/constants/contact";

export function buildWhatsAppUrl(
  message: string = WHATSAPP_DEFAULT_MESSAGE,
  number: string = WHATSAPP_NUMBER,
): string {
  const digits = number.replace(/\D/g, "");
  return `https://wa.me/${digits}?text=${encodeURIComponent(message)}`;
}
