import { useState } from "react";
import { Terminal, Zap, Github, Linkedin, Mail } from "lucide-react";
import { SectionLabel } from "@/components/ui/SectionLabel";
import { CyberPanel } from "@/components/ui/CyberPanel";
import { CyberInput } from "@/components/ui/CyberInput";
import { CyberBtn } from "@/components/ui/CyberBtn";

const SOCIALS = [
  { icon: Github, label: "GITHUB", color: "#BF00FF", href: "https://github.com/LeonardoSodre20" },
  { icon: Linkedin, label: "LINKEDIN", color: "#00FFFF", href: "https://www.linkedin.com/in/leonardo-sodr%C3%A9-454a671a3/" },
  { icon: Mail, label: "EMAIL", color: "#FF00FF", href: "mailto:leonardosodre2221@gmail.com" },
];

export function ContactSection() {
  const [form, setForm] = useState({ nome: "", email: "", msg: "" });
  const [sent, setSent] = useState(false);

  const send = (e: React.FormEvent) => {
    e.preventDefault();
    setSent(true);
    setForm({ nome: "", email: "", msg: "" });
    setTimeout(() => setSent(false), 3500);
  };

  return (
    <section id="contato" className="contact">
      <SectionLabel>CONTATO</SectionLabel>

      <CyberPanel title="send_message.sh" icon={<Terminal size={13} style={{ color: "var(--color-purple)" }} />}>
        <form onSubmit={send} className="contact__form">
          {sent && (
            <div className="contact__success">
              ✅ Mensagem enviada com sucesso! Retornarei em breve.
            </div>
          )}

          <CyberInput
            label="NOME"
            value={form.nome}
            onChange={(v) => setForm((s) => ({ ...s, nome: v }))}
            placeholder="Seu nome completo"
          />
          <CyberInput
            label="E-MAIL"
            type="email"
            value={form.email}
            onChange={(v) => setForm((s) => ({ ...s, email: v }))}
            placeholder="seu@email.com"
          />

          <div>
            <label className="cyber-input__label">// MENSAGEM</label>
            <textarea
              value={form.msg}
              onChange={(e) => setForm((s) => ({ ...s, msg: e.target.value }))}
              placeholder="Conta o que você precisa..."
              required
              rows={5}
              className="cyber-textarea"
            />
          </div>

          <CyberBtn primary type="submit" fullWidth>
            ENVIAR MENSAGEM <Zap size={14} />
          </CyberBtn>
        </form>
      </CyberPanel>

      {/* Social row */}
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
