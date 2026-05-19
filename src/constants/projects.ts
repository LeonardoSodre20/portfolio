import { Database, Cpu, Globe } from "lucide-react";

export const PROJECTS = [
  {
    id: "01",
    title: "LAPIDUS.ERP",
    tag: "FULL STACK",
    desc: "Sistema ERP para gestão de joias preciosas com CRUD completo, dashboard de métricas e controle de fornecedores em tempo real.",
    stack: ["React", "Node.js", "PostgreSQL"],
    stars: 42,
    color: "#BF00FF",
    icon: Database,
  },
  {
    id: "02",
    title: "NEURAL.CHAT",
    tag: "AI / LLM",
    desc: "Plataforma de chat com IA integrada, múltiplos modelos de linguagem e histórico persistente em banco vetorial com embeddings.",
    stack: ["Python", "FastAPI", "Pinecone"],
    stars: 87,
    color: "#FF00FF",
    icon: Cpu,
  },
  {
    id: "03",
    title: "VOID.MARKET",
    tag: "E-COMMERCE",
    desc: "Marketplace descentralizado com autenticação Web3, pagamentos via PIX e painel admin totalmente customizável por drag-and-drop.",
    stack: ["Next.js", "Stripe", "Prisma"],
    stars: 31,
    color: "#00FFFF",
    icon: Globe,
  },
] as const;
