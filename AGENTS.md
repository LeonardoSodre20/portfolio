# Portfolio — Leonardo Sodré

Site de captação de clientes: sites e sistemas sob medida para pequenos negócios. Contato principal pelo WhatsApp.

## Stack

- React 19 + TypeScript
- Vite 7 (bundler)
- Tailwind CSS v4 (via `@tailwindcss/vite`, só o reset; os estilos são CSS BEM próprio)
- react-router-dom com `HashRouter` (rotas `/` e `/projetos/:slug`, funciona em qualquer hospedagem estática)
- Vitest + Testing Library + jsdom
- pnpm (gerenciador de pacotes)
- `lucide-react` (ícones de interface) e `react-icons` (ícones de tecnologia e WhatsApp)

## Commands

```bash
pnpm dev        # dev server
pnpm build      # production build
pnpm preview    # preview production build
pnpm typecheck  # tsc --noEmit
pnpm test       # vitest run
```

## Project Structure

```
src/
├── components/
│   ├── layout/      # SiteNavbar, SiteFooter, FloatingWhatsApp, ScrollToTop
│   ├── sections/    # Hero, Services, ProjectsList, Process, About, FinalCta
│   └── ui/          # Button, WhatsAppButton, Section, Reveal, BrowserFrame, ProjectCard, TechChips
├── pages/           # HomePage, ProjectPage, NotFoundPage
├── constants/       # Dados: projects, services, process, about, contact, navigation, tech-icons
├── hooks/           # useReveal, useSectionNavigation
├── lib/             # whatsapp.ts (buildWhatsAppUrl)
├── styles/          # fonts, tailwind, tokens, base, site (BEM)
├── test/            # setup e helpers de teste
└── assets/          # Imagens importadas (avatar)
public/images/       # Capas dos projetos
```

## Conventions

### Components
- Named exports (`export function ComponentName`)
- Props tipadas via `interface ComponentNameProps`
- Um componente por arquivo; teste ao lado (`Nome.test.tsx`)

### Styling
- Tokens em `src/styles/tokens.css`: `--bg`, `--surface`, `--surface-2`, `--border`, `--text`, `--text-muted`, `--accent` (#7C9CFF), `--accent-2`, `--whatsapp` (#25D366), `--radius`, `--container`, `--font-body` (Inter), `--font-display` (Sora)
- Classes BEM em `src/styles/site.css` (ex.: `.site-nav__link`, `.btn--whatsapp`, `.case__block`)
- Reset e acessibilidade (foco visível, `prefers-reduced-motion`) em `src/styles/base.css`
- Visual escuro e sóbrio. Não usar neon, fontes pixel, terminal falso nem efeitos de jogo
- O botão de WhatsApp é o elemento de maior destaque em cada tela

### Imports
- Alias `@/` aponta para `src/`

### Contact / WhatsApp
- Número, mensagem padrão, e-mail, LinkedIn e GitHub vivem em `src/constants/contact.ts`
- Sempre gerar links de WhatsApp com `buildWhatsAppUrl(message?)` (ou o componente `WhatsAppButton`); nunca montar a URL à mão
- Não há formulário de contato nem backend

### Navigation
- Seções da home: `inicio`, `servicos`, `projetos`, `como-funciona`, `sobre`, `contato`
- Para rolar até uma seção use `useSectionNavigation()`: na home rola; em outra página volta para `/` e rola
- Links externos: `target="_blank"` e `rel="noopener noreferrer"`

### Projetos (estudos de caso)
- Cada projeto é uma entrada de `PROJECTS` em `src/constants/projects.ts` (interface `ProjectCase`)
- Capas em `public/images/` (referenciar como `/images/arquivo.png`); `cover` é opcional
- `result` só é preenchido com resultado real e informado pelo dono do projeto. Sem ele a página mostra "O que o sistema faz". Nunca inventar números ou depoimentos
- Só usar telas com dados fictícios ou de demonstração. Nunca expor credenciais, `.env`, endereços, telefones ou dados de clientes finais
- Citar o nome de um cliente (`client`) só com autorização
- Ícones de tecnologia: mapa em `src/constants/tech-icons.ts`; tecnologia sem ícone aparece só como texto

### Git
- Somente o usuário faz push (`git push`). Nunca fazer push sem pedido explícito.
- Commits semânticos (conventional commits).
- Rodar `pnpm typecheck`, `pnpm test` e `pnpm build` antes de commitar.

### TypeScript
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`
- JSX: `react-jsx`
- Module: `ESNext`, resolução `bundler`
