import { WhatsAppButton } from "@/components/ui/WhatsAppButton";
import { Button } from "@/components/ui/Button";
import { BrowserFrame } from "@/components/ui/BrowserFrame";
import { Reveal } from "@/components/ui/Reveal";
import { useSectionNavigation } from "@/hooks/useSectionNavigation";

export function Hero() {
  const goTo = useSectionNavigation();

  return (
    <section id="inicio" className="hero">
      <div className="hero__glow" aria-hidden="true" />
      <div className="hero__inner">
        <Reveal>
          <div className="hero__text">
            <span className="hero__badge">
              <span className="hero__badge-dot" aria-hidden="true" />
              Disponível para novos projetos
            </span>
            <h1 className="hero__title">
              Sites e sistemas <span className="hero__title-accent">sob medida</span> para pequenos negócios
            </h1>
            <p className="hero__subtitle">
              Eu crio pedidos online, painéis de controle e sites para restaurantes, lojas e prestadores de
              serviço. Você fala comigo direto, sem enrolação.
            </p>
            <div className="hero__ctas">
              <WhatsAppButton size="lg" />
              <Button variant="ghost" onClick={() => goTo("projetos")}>Ver projetos</Button>
            </div>
          </div>
        </Reveal>
        <Reveal delay={120}>
          <div className="hero__visual">
            <BrowserFrame src="/images/casa-da-marmita.png" alt="Painel de pedidos em tempo real da Casa da Marmita" />
          </div>
        </Reveal>
      </div>
    </section>
  );
}
