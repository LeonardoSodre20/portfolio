export interface ProjectCase {
  slug: string;
  title: string;
  kind: string;
  client?: string;
  category: "professional" | "personal";
  summary: string;
  challenge: string;
  solution: string[];
  result?: string;
  cover?: string;
  gallery: string[];
  stack: string[];
  highlights?: string[];
  demoUrl?: string;
  githubUrl?: string;
}

export const PROJECTS: readonly ProjectCase[] = [
  {
    slug: "casa-da-marmita",
    title: "Casa da Marmita",
    kind: "Delivery e gestão de pedidos",
    client: "Casa da Marmita",
    category: "professional",
    summary: "Pedidos online sem cadastro e painel em tempo real para um restaurante de marmitas com cardápio diário.",
    challenge:
      "O restaurante tem cardápio que muda todo dia. O dono precisava operar o dia inteiro sem planilha e o cliente precisava pedir sem instalar nada, sem criar conta e sem ligar para a loja.",
    solution: [
      "App de pedidos no celular (PWA) sem cadastro: o cliente se identifica pelo telefone",
      "Painel com Kanban de pedidos em tempo real para o dono",
      "Cardápio do dia montado pelo próprio dono",
      "App para o motoboy e impressão automática do pedido na cozinha",
    ],
    cover: "/images/casa-da-marmita.png",
    gallery: [],
    stack: ["React", "TypeScript", "NestJS", "Firebase", "Zustand", "PWA", "Vitest", "Playwright"],
    highlights: [
      "Tempo real com Firestore onSnapshot, desenhado para o orçamento de leituras do free tier",
      "Monorepo pnpm: API NestJS, 2 apps React, agente de impressão e tipos compartilhados",
      "Acesso por perfil (dono, motoboy, cliente) com custom claims e regras do Firestore",
      "Testes unitários e de integração com Vitest e E2E com Playwright no CI",
    ],
  },
  {
    slug: "lamecomex",
    title: "LameComex",
    kind: "Site institucional bilíngue",
    client: "LameComex",
    category: "professional",
    summary: "Site institucional em português e inglês para uma empresa de logística internacional.",
    challenge:
      "Uma empresa de logística internacional precisava de um site que apresentasse seus serviços e categorias de produtos, em português e inglês, com contato direto pelo WhatsApp.",
    solution: [
      "Site bilíngue (português e inglês)",
      "Layout responsivo para celular e computador",
      "Carrossel de serviços e categorias de produtos",
      "Botão de contato direto com o WhatsApp",
    ],
    cover: "/images/lamecomex-landing.png",
    gallery: [],
    stack: ["React", "TypeScript", "Vite", "Tailwind CSS", "TanStack Router", "i18next", "Swiper"],
    demoUrl: "https://www.lamecomex.com/",
  },
  {
    slug: "disparopro",
    title: "DisparoPRO",
    kind: "Plataforma de comunicação em massa",
    client: "DisparoPRO",
    category: "professional",
    summary: "Plataforma para disparo de WhatsApp, SMS, RCS e voz em massa, usada por mais de 5 mil clientes.",
    challenge:
      "Empresas precisam falar com muitos clientes ao mesmo tempo, por vários canais, em uma só plataforma.",
    solution: [
      "Disparo de WhatsApp, SMS, RCS e voz em massa no mesmo lugar",
      "Código organizado em monorepo (Turborepo) com entrega automatizada (GitHub Actions)",
      "Biblioteca de componentes própria, com ShadcnUI",
      "Ambiente padronizado com Docker",
    ],
    cover: "/images/disparopro.png",
    gallery: [],
    stack: ["TypeScript", "React Query", "Tailwind CSS", "ShadcnUI", "Turborepo", "Docker", "GitHub Actions"],
    demoUrl: "https://disparopro.com.br/",
  },
  {
    slug: "label-catalog",
    title: "Label-Catalog",
    kind: "Sistema corporativo de catálogo de etiquetas",
    category: "personal",
    summary: "Sistema web para centralizar o catálogo de etiquetas e os dados operacionais de uma montadora.",
    challenge:
      "Reunir em um só lugar o catálogo de etiquetas e os dados operacionais de uma montadora, com acesso controlado por usuário.",
    solution: [
      "Catálogo de etiquetas com cadastro, edição e exclusão",
      "Login, recuperação de senha e gestão de usuários",
      "Painel com análise de custos e relatórios",
      "Frontend (React) e backend (Spring Boot com PostgreSQL) versionados separadamente",
    ],
    gallery: [],
    stack: ["React", "TypeScript", "Vite", "Spring Boot", "PostgreSQL", "Tailwind CSS", "Docker", "GitHub Actions"],
    githubUrl: "https://github.com/LeonardoSodre20/label-catalog-web",
    demoUrl: "https://labelcatalog.netlify.app/",
  },
];

export function getProjectBySlug(slug: string): ProjectCase | undefined {
  return PROJECTS.find((p) => p.slug === slug);
}
