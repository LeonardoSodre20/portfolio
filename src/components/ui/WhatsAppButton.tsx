import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppUrl } from "@/lib/whatsapp";

interface WhatsAppButtonProps {
  message?: string;
  label?: string;
  size?: "md" | "lg";
}

export function WhatsAppButton({ message, label = "Chamar no WhatsApp", size = "md" }: WhatsAppButtonProps) {
  return (
    <a
      className={`btn btn--whatsapp btn--${size}`}
      href={buildWhatsAppUrl(message)}
      target="_blank"
      rel="noopener noreferrer"
    >
      <FaWhatsapp size={size === "lg" ? 20 : 17} aria-hidden="true" />
      {label}
    </a>
  );
}
