import { useState } from "react";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import emailjs from "@emailjs/browser";
import { Terminal, Zap, Github, Linkedin, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CyberPanel } from "@/components/ui/CyberPanel";
import { CyberInput } from "@/components/ui/CyberInput";
import { CyberTextarea } from "@/components/ui/CyberTextarea";
import { CyberBtn } from "@/components/ui/CyberBtn";

const contactSchema = z.object({
  nome: z
    .string()
    .min(1, "Campo obrigatório")
    .max(150, "Nome deve ter no máximo 150 caracteres"),
  email: z
    .string()
    .min(1, "Campo obrigatório")
    .email("E-mail inválido"),
  msg: z
    .string()
    .min(1, "Campo obrigatório")
    .max(500, "Mensagem deve ter no máximo 500 caracteres"),
});

type ContactFormData = z.infer<typeof contactSchema>;

const SOCIALS = [
  { icon: Github, label: "GITHUB", color: "#BF00FF", href: "https://github.com/LeonardoSodre20" },
  { icon: Linkedin, label: "LINKEDIN", color: "#00FFFF", href: "https://www.linkedin.com/in/leonardo-sodr%C3%A9-454a671a3/" },
  { icon: Mail, label: "EMAIL", color: "#FF00FF", href: "mailto:leonardosodre2221@gmail.com" },
];

export function ContactSection() {
  const [sent, setSent] = useState(false);
  const [sendError, setSendError] = useState<string | null>(null);

  const {
    register,
    handleSubmit,
    reset,
    watch,
    formState: { errors, isSubmitting },
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  });

  const msgValue = watch("msg");

  const onSubmit = async (data: ContactFormData) => {
    setSendError(null);

    try {
      await emailjs.send(
        import.meta.env.VITE_EMAILJS_SERVICE_ID,
        import.meta.env.VITE_EMAILJS_TEMPLATE_ID,
        { nome: data.nome, email: data.email, msg: data.msg },
        { publicKey: import.meta.env.VITE_EMAILJS_PUBLIC_KEY },
      );

      setSent(true);
      reset();
      setTimeout(() => setSent(false), 3500);
    } catch {
      setSendError("Erro ao enviar mensagem. Tente novamente.");
    }
  };

  return (
    <section id="contato" className="contact">
      <SectionLabel>CONTATO</SectionLabel>

      <CyberPanel title="send_message.sh" icon={<Terminal size={13} style={{ color: "var(--color-purple)" }} />}>
        <form onSubmit={handleSubmit(onSubmit)} className="contact__form">
          {sent && (
            <div className="contact__success">
              ✅ Mensagem enviada com sucesso! Retornarei em breve.
            </div>
          )}
          {sendError && (
            <div className="contact__error">
              ⚠ {sendError}
            </div>
          )}

          <CyberInput
            label="NOME"
            placeholder="Seu nome completo"
            error={errors.nome?.message}
            disabled={isSubmitting}
            {...register("nome")}
          />
          <CyberInput
            label="E-MAIL"
            type="email"
            placeholder="seu@email.com"
            error={errors.email?.message}
            disabled={isSubmitting}
            {...register("email")}
          />

          <CyberTextarea
            label="MENSAGEM"
            placeholder="Conta o que você precisa..."
            rows={5}
            error={errors.msg?.message}
            disabled={isSubmitting}
            counterCurrent={msgValue?.length ?? 0}
            counterMax={500}
            {...register("msg")}
          />

          <CyberBtn primary type="submit" fullWidth disabled={isSubmitting}>
            {isSubmitting ? "ENVIANDO..." : "ENVIAR MENSAGEM"} <Zap size={14} />
          </CyberBtn>
        </form>
      </CyberPanel>

      <div className="contact__social">
        {SOCIALS.map((s) => {
          const Icon = s.icon;
          return (
            <a key={s.label} href={s.href} className="social-link" target="_blank" rel="noopener noreferrer">
              <div
                className="social-link__icon"
                style={{
                  "--accent": s.color,
                  border: `1px solid ${s.color}55`,
                  background: `${s.color}0D`,
                } as React.CSSProperties}
              >
                <Icon size={18} style={{ color: s.color }} />
              </div>
              <span className="social-link__label">{s.label}</span>
            </a>
          );
        })}
      </div>
    </section>
  );
}
