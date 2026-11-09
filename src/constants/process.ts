export interface ProcessStep {
  title: string;
  description: string;
}

export const PROCESS_STEPS: ProcessStep[] = [
  { title: "Conversa no WhatsApp", description: "Você me conta o que precisa e como o seu negócio funciona hoje." },
  { title: "Proposta", description: "Eu explico o que vou fazer, em quanto tempo e quanto custa, em linguagem simples." },
  { title: "Desenvolvimento com entregas", description: "Você acompanha o projeto por etapas e vê o resultado antes de ir ao ar." },
  { title: "Suporte", description: "Depois da entrega eu continuo por perto para ajustes e dúvidas." },
];
