import type { IconType } from "react-icons";
import {
  SiReact, SiTypescript, SiVite,
  SiReactrouter, SiReactquery, SiNestjs,
  SiDocker, SiVitest, SiTailwindcss, SiSwiper, SiI18Next,
  SiTurborepo, SiShadcnui, SiGithubactions,
  SiSpringboot, SiPostgresql, SiFirebase, SiPwa,
} from "react-icons/si";

export const TECH_ICONS: Record<string, IconType> = {
  React: SiReact,
  TypeScript: SiTypescript,
  Vite: SiVite,
  "TanStack Router": SiReactrouter,
  "React Query": SiReactquery,
  NestJS: SiNestjs,
  Firebase: SiFirebase,
  PWA: SiPwa,
  Docker: SiDocker,
  Vitest: SiVitest,
  "Tailwind CSS": SiTailwindcss,
  Swiper: SiSwiper,
  i18next: SiI18Next,
  Turborepo: SiTurborepo,
  ShadcnUI: SiShadcnui,
  "GitHub Actions": SiGithubactions,
  "Spring Boot": SiSpringboot,
  PostgreSQL: SiPostgresql,
};
