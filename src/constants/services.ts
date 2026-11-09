import { Globe, LayoutDashboard, ShoppingBag } from "lucide-react";
import type { LucideIcon } from "lucide-react";

export interface Service {
  title: string;
  forWhom: string;
  description: string;
  icon: LucideIcon;
}

export const SERVICES: Service[] = [
  {
    title: "Site profissional",
    forWhom: "Para quem quer ser encontrado e passar confiança",
    description:
      "Seu negócio na internet, com visual cuidado, funcionando bem no celular e com botão direto para o WhatsApp.",
    icon: Globe,
  },
  {
    title: "Sistema de pedidos e vendas",
    forWhom: "Para restaurantes, lojas e serviços que recebem pedidos todo dia",
    description:
      "Seus clientes pedem pelo celular e você acompanha tudo em um painel, sem anotar em papel ou planilha.",
    icon: ShoppingBag,
  },
  {
    title: "Painel de gestão",
    forWhom: "Para quem precisa organizar o dia a dia do negócio",
    description:
      "Cadastros, relatórios e controle em um só lugar, feito do jeito que você trabalha.",
    icon: LayoutDashboard,
  },
];
