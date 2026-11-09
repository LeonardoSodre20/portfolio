# Redesign do portfólio para captação de clientes — Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** Trocar o site gamificado por um portfólio escuro, sóbrio e atrativo que explica a oferta, leva ao WhatsApp e tem página de detalhes por projeto.

**Architecture:** Mesma base (React + Vite + Tailwind v4 com CSS BEM próprio). Novo sistema de design em arquivos novos (`tokens.css`, `base.css`, `site.css`) criado ao lado do antigo; o antigo só é apagado na tarefa final. Rotas por hash (`HashRouter`) para funcionar em qualquer hospedagem estática: `/` e `/projetos/:slug`. Conteúdo continua em arquivos de dados.

**Tech Stack:** React 19, TypeScript estrito, Vite 7, Tailwind v4, react-router-dom (HashRouter), lucide-react, react-icons (ícones de tecnologia), Vitest + Testing Library + jsdom (novos, só para lógica e comportamento).

**Spec:** `docs/superpowers/specs/2026-11-09-portfolio-redesign-design.md`

## Blockers (resolver antes da Task 1)

- **Número de WhatsApp do Leonardo** (só dígitos, com 55 + DDD). Sem ele a Task 1 não fecha: o teste de formato barra um valor de exemplo. Perguntar ao Leonardo; não inventar.
- **Autorização para citar pelo nome LameComex, DisparoPRO e Label-Catalog** (a Casa da Marmita já está autorizada). Sem resposta, o campo `client` fica vazio nesses projetos e o card usa só o tipo do trabalho.
- Estado atual: há mudanças não commitadas no working tree (card da Casa da Marmita, remoção do Gen-AI, `.gitignore`). A Task 0 as commita antes de tudo.

## Global Constraints

- Público: donos de pequenos negócios. Texto em português, linguagem simples, sem jargão na frente. Stack técnica só como detalhe secundário.
- Contato principal: WhatsApp. Mensagem pré-preenchida: `Oi Leonardo, vi seu portfólio e quero conversar sobre um projeto`.
- Visual: escuro e sóbrio, uma cor de destaque `#7C9CFF`, brilho suave azul-violeta atrás do título, tipografia grande, cards com borda fina. Botões de WhatsApp em verde `#25D366` (decisão do plano: é o único elemento fora da cor de destaque e deve ser o mais evidente da tela).
- Proibido no novo visual: neon multicolorido, fontes Press Start 2P / Orbitron / VT323 / Share Tech Mono, scanlines, CRT, flicker, glitch, terminal falso, "LVL 99", cantos decorativos.
- Nada de números, depoimentos ou resultados inventados. Nada sensível: sem credenciais, `.env`, endereços, telefones ou nomes de clientes finais nas telas ou textos.
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- `@/` aponta para `src/`; exports nomeados; um componente por arquivo; props em `interface NomeProps`; `strict`, `noUnusedLocals`, `noUnusedParameters`.
- Responsivo a partir de 375px; foco visível; `alt` em imagens; animações respeitam `prefers-reduced-motion`.
- Antes de cada commit: `pnpm typecheck`, `pnpm test`, `pnpm build`. Commits semânticos (conventional commits), com a linha de atribuição que a sessão exigir. Nunca `git push`.

## Review Focus

1. URL de projeto inexistente (`#/projetos/xyz`): página "Projeto não encontrado" com link para a home, nunca tela em branco. (Task 7)
2. Projeto sem `result`: a página não mostra número nem promessa; mostra "O que o sistema faz" no lugar. (Task 7)
3. Número de WhatsApp com símbolos/espaços e mensagem com acento, `&` e `?`: URL `wa.me` só com dígitos e texto codificado. (Task 1)
4. Conteúdo "revelado ao rolar" nunca fica invisível: sem `IntersectionObserver` ou com `prefers-reduced-motion`, aparece já. (Task 3)
5. Clicar em "Projetos"/"Sobre" estando na página de detalhes volta para a home e rola até a seção; o menu do celular fecha ao clicar. (Task 5)

---

### Task 0: Commitar o trabalho pendente

**Files:** working tree atual (sem edição nova).

- [ ] **Step 1: Conferir o que está pendente**

Run: `git status --short`
Expected: `.gitignore`, `ProjectsSection.tsx`, `projects.ts`, `components.css` modificados; `gen-ai-*.png` removidos; `casa-da-marmita.png` novo; `docs/superpowers/` novo.

- [ ] **Step 2: Rodar `pnpm typecheck` e `pnpm build`; ambos devem passar.**

- [ ] **Step 3: Commit em dois commits**

`git add` de `src/`, `public/`, `.gitignore` → `feat: add Casa da Marmita case and remove Gen-AI projects`. Depois `git add docs/` → `docs: add portfolio redesign spec and plan`. Não adicionar `.superpowers/` (ignorado).

---

### Task 1: Ferramenta de testes e link de WhatsApp

**Files:**
- Modify: `package.json` (script `test`, devDependencies), `vite.config.ts` (bloco `test`)
- Create: `src/test/setup.ts`, `src/constants/contact.ts`, `src/lib/whatsapp.ts`, `src/lib/whatsapp.test.ts`

**Interfaces:**
- Produces:
  - `constants/contact.ts`: `WHATSAPP_NUMBER: string`, `WHATSAPP_DEFAULT_MESSAGE: string`, `EMAIL: string`, `LINKEDIN_URL: string`, `GITHUB_URL: string` (valores atuais do site: e-mail `leonardosodre2221@gmail.com`, LinkedIn e GitHub como em `ContactSection.tsx`).
  - `lib/whatsapp.ts`: `buildWhatsAppUrl(message?: string, number?: string): string`. Defaults: `WHATSAPP_DEFAULT_MESSAGE` e `WHATSAPP_NUMBER`.

- [ ] **Step 1: Instalar `vitest`, `jsdom`, `@testing-library/react`, `@testing-library/jest-dom`, `@testing-library/user-event` como devDependencies; script `"test": "vitest run"`; em `vite.config.ts` importar `defineConfig` de `vitest/config` e configurar `test: { environment: "jsdom", setupFiles: ["./src/test/setup.ts"], globals: true }`. `setup.ts` importa `@testing-library/jest-dom/vitest`. Incluir `vitest/globals` e `@testing-library/jest-dom` em `types` do `tsconfig.app.json`.**

- [ ] **Step 2: Escrever os testes que falham** em `whatsapp.test.ts`:

```ts
it("usa só dígitos do número", () => {
  expect(buildWhatsAppUrl("oi", "+55 (15) 99999-0000")).toBe("https://wa.me/5515999990000?text=oi");
});
it("codifica acento, & e ?", () => {
  const url = buildWhatsAppUrl("Olá & você? sim", "5515999990000");
  expect(url).toBe("https://wa.me/5515999990000?text=" + encodeURIComponent("Olá & você? sim"));
});
it("usa a mensagem padrão quando não recebe mensagem", () => {
  expect(buildWhatsAppUrl(undefined, "5515999990000")).toContain(encodeURIComponent(WHATSAPP_DEFAULT_MESSAGE));
});
it("WHATSAPP_NUMBER é um celular brasileiro válido", () => {
  expect(WHATSAPP_NUMBER).toMatch(/^55\d{2}9\d{8}$/);
});
```

- [ ] **Step 3: `pnpm test` — FAIL (módulos não existem).**

- [ ] **Step 4: Implementar `constants/contact.ts` com o número real do Leonardo e `buildWhatsAppUrl` (remove não-dígitos, `encodeURIComponent` no texto).**

- [ ] **Step 5: `pnpm test` — PASS; `pnpm typecheck`; commit `feat: add WhatsApp link builder and test tooling`.**

---

### Task 2: Fundação visual (tokens, fontes, base)

**Files:**
- Create: `src/styles/tokens.css`, `src/styles/base.css`, `src/styles/site.css` (vazio por ora, só cabeçalho)
- Modify: `src/styles/fonts.css` (trocar o `@import` das fontes antigas por Inter 400/500/600 e Sora 600/700/800), `src/styles/index.css`

**Interfaces:**
- Produces (CSS custom properties em `:root`): `--bg #0B0C10`, `--surface #12141A`, `--surface-2 #171A22`, `--border rgba(255,255,255,.08)`, `--text #E8E9EE`, `--text-muted #9094A3`, `--accent #7C9CFF`, `--accent-2 #A58BFF`, `--whatsapp #25D366`, `--radius 12px`, `--font-body: 'Inter', system-ui, sans-serif`, `--font-display: 'Sora', 'Inter', sans-serif`, `--container 1120px`.
- `base.css`: reset, `body` com `--bg`/`--text`/`--font-body`, `:focus-visible` com contorno `--accent`, `@media (prefers-reduced-motion: reduce)` zerando animações e transições, `scroll-behavior: smooth` só fora de reduced-motion.

- [ ] **Step 1: Criar os arquivos e importá-los em `index.css` **depois** dos antigos** (`tokens`, `base`, `site`). Os tokens novos não colidem com `--color-*`.
- [ ] **Step 2: `pnpm build` passa; abrir `pnpm dev` e confirmar que o site antigo continua carregando (nada quebrou).**
- [ ] **Step 3: Commit `feat: add new design tokens and base styles`.**

---

### Task 3: Componentes de base (UI)

**Files:**
- Create: `src/components/ui/Button.tsx`, `WhatsAppButton.tsx`, `Section.tsx`, `Reveal.tsx`, `BrowserFrame.tsx`, `src/hooks/useReveal.ts`; testes `Reveal.test.tsx`, `WhatsAppButton.test.tsx`
- Modify: `src/styles/site.css` (classes `.btn`, `.btn--primary`, `.btn--ghost`, `.btn--whatsapp`, `.section`, `.section__title`, `.reveal`, `.reveal.is-visible`, `.browser-frame`)

**Interfaces:**
- `Button({ variant?: "primary" | "ghost"; href?: string; external?: boolean; onClick?: () => void; children })` — com `href` renderiza `<a>` (com `target/rel` se `external`), sem `href` renderiza `<button type="button">`.
- `WhatsAppButton({ message?: string; label?: string; size?: "md" | "lg" })` — `<a>` externo para `buildWhatsAppUrl(message)`, com ícone `MessageCircle` ou `FaWhatsapp`, texto padrão "Chamar no WhatsApp".
- `Section({ id?: string; title?: string; eyebrow?: string; children })` — `<section>` com contêiner `--container`.
- `Reveal({ children, delay?: number })` e `useReveal(): { ref, visible: boolean }`.
- `BrowserFrame({ src: string; alt: string })` — moldura com três pontos e a imagem.

- [ ] **Step 1: Testes que falham**

```ts
// Reveal.test.tsx
it("mostra o conteúdo na hora quando não há IntersectionObserver", () => {
  render(<Reveal><p>oi</p></Reveal>);
  expect(screen.getByText("oi").parentElement).toHaveClass("is-visible");
});
it("mostra o conteúdo na hora com prefers-reduced-motion", () => {
  mockMatchMedia("(prefers-reduced-motion: reduce)", true);
  stubIntersectionObserver();
  render(<Reveal><p>oi</p></Reveal>);
  expect(screen.getByText("oi").parentElement).toHaveClass("is-visible");
});
// WhatsAppButton.test.tsx
it("aponta para wa.me, abre em nova aba e é seguro", () => {
  render(<WhatsAppButton />);
  const a = screen.getByRole("link", { name: /whatsapp/i });
  expect(a).toHaveAttribute("href", expect.stringMatching(/^https:\/\/wa\.me\/55\d+\?text=/));
  expect(a).toHaveAttribute("target", "_blank");
  expect(a).toHaveAttribute("rel", "noopener noreferrer");
});
```

- [ ] **Step 2: `pnpm test` — FAIL.**
- [ ] **Step 3: Implementar. `useReveal` retorna `visible = true` de saída se `typeof IntersectionObserver === "undefined"` ou `matchMedia("(prefers-reduced-motion: reduce)").matches`; senão observa uma vez e desconecta ao aparecer. Visual: `.reveal` começa com `opacity 0` e `translateY(12px)`, `.is-visible` volta ao normal com transição de 500ms. `.btn--whatsapp` com fundo `--whatsapp`, texto escuro, sombra verde suave; é o botão mais evidente.**
- [ ] **Step 4: `pnpm test` PASS; commit `feat: add base UI components`.**

---

### Task 4: Modelo de dados dos projetos

**Files:**
- Modify: `src/constants/projects.ts` (reescrever); Create: `src/constants/projects.test.ts`, `src/constants/tech-icons.ts` (mover o mapa `TECH_ICONS` de `ProjectsSection.tsx`, mesmas entradas)
- Create (imagens, se existirem telas seguras): `public/images/projects/<slug>-*.png`

**Interfaces:**
- Produces:

```ts
export interface ProjectCase {
  slug: string;
  title: string;            // nome amigável, ex.: "Casa da Marmita"
  kind: string;             // ex.: "Delivery e gestão de pedidos"
  client?: string;          // só se autorizado
  category: "professional" | "personal";
  summary: string;          // 1 linha: problema ou o que resolve (card)
  challenge: string;
  solution: string[];
  result?: string;          // só se for verdade e fornecido; senão omitir
  cover: string;
  gallery: string[];        // pode ser []
  stack: string[];
  highlights?: string[];
  demoUrl?: string;
  githubUrl?: string;
}
export const PROJECTS: readonly ProjectCase[];
export function getProjectBySlug(slug: string): ProjectCase | undefined;
```

- Slugs: `casa-da-marmita`, `lamecomex`, `disparopro`, `label-catalog` (nessa ordem; Casa da Marmita primeiro).
- Conteúdo da Casa da Marmita (exato): `kind` "Delivery e gestão de pedidos"; `challenge`: "O restaurante tem cardápio que muda todo dia. O dono precisava operar o dia inteiro sem planilha e o cliente precisava pedir sem instalar nada, sem criar conta e sem ligar para a loja."; `solution`: PWA de pedidos sem cadastro (o cliente se identifica pelo telefone), painel com Kanban de pedidos em tempo real, cardápio do dia, app do motoboy e impressão térmica automática; `result` ausente; `highlights` = os 4 atuais de `projects.ts`.
- Demais projetos: derivar `summary`, `challenge` e `solution` **só** do texto já existente em `desc`/`stack` e dos fatos conhecidos; sem números novos (o "mais de 5 mil clientes" do DisparoPRO já está no texto atual e pode permanecer). `result` ausente quando não houver fato.
- `client`: preencher só conforme autorização (ver Blockers).

- [ ] **Step 1: Testes que falham**

```ts
it("slugs são únicos e em kebab-case", () => { /* Set size === length; /^[a-z0-9-]+$/ */ });
it("todo projeto tem capa, summary, challenge e ao menos uma etapa de solução", () => {});
it("getProjectBySlug encontra e devolve undefined para slug inexistente", () => {
  expect(getProjectBySlug("casa-da-marmita")?.title).toBe("Casa da Marmita");
  expect(getProjectBySlug("xyz")).toBeUndefined();
});
it("nenhum texto contém dado sensível", () => {
  // JSON.stringify(PROJECTS) não casa /@|\+?\d{2}\s?\(?\d{2}\)?\s?\d{4,5}-?\d{4}|firebase.*json|\.env/i
});
```

- [ ] **Step 2: `pnpm test` FAIL → reescrever `projects.ts` → PASS.**
- [ ] **Step 3: Verificar que cada `cover`/`gallery` aponta para arquivo existente em `public/` (teste com `fs.existsSync`). Se um projeto só tem a capa antiga em `public/images/`, manter o caminho atual.**
- [ ] **Step 4: Remover o mapa `TECH_ICONS` de `ProjectsSection.tsx` apontando para o novo arquivo, para não duplicar; `pnpm typecheck`. A `ProjectsSection` antiga será substituída na Task 6, então aqui basta ajustá-la para o novo modelo de dados ou excluí-la e tirá-la de `App.tsx` temporariamente. Preferir ajustar o mínimo para compilar.**
- [ ] **Step 5: Commit `feat: restructure projects data into case studies`.**

---

### Task 5: Rotas, navbar, rodapé e botão flutuante

**Files:**
- Modify: `package.json` (+`react-router-dom`), `src/main.tsx`, `src/App.tsx`
- Create: `src/pages/HomePage.tsx`, `src/pages/ProjectPage.tsx` (stub que a Task 7 completa), `src/pages/NotFoundPage.tsx`, `src/hooks/useSectionNavigation.ts`, `src/components/layout/SiteNavbar.tsx`, `SiteFooter.tsx`, `FloatingWhatsApp.tsx`, `ScrollToTop.tsx`; testes `useSectionNavigation.test.tsx`, `SiteNavbar.test.tsx`
- Modify: `src/constants/navigation.ts` → `NAV_ITEMS = [{ label: "Projetos", id: "projetos" }, { label: "Como funciona", id: "como-funciona" }, { label: "Sobre", id: "sobre" }] as const`

**Interfaces:**
- `useSectionNavigation(): (id: string) => void` — se já está em `/`, rola até `document.getElementById(id)`; se está em outra rota, navega para `/` com `state: { scrollTo: id }`. `HomePage` lê `location.state?.scrollTo` num `useEffect` e rola.
- Rotas: `/` → `HomePage`; `/projetos/:slug` → `ProjectPage`; `*` → `NotFoundPage`. `ScrollToTop` rola ao topo a cada mudança de pathname (exceto quando há `state.scrollTo`).
- `SiteNavbar`: nome "Leonardo Sodré" (link para `/`), itens de `NAV_ITEMS`, botão "Conversar" (`WhatsAppButton`, `size="md"`), menu hambúrguer abaixo de 768px que **fecha ao clicar em um item**.
- `FloatingWhatsApp`: botão redondo fixo no canto inferior direito, só abaixo de 768px (CSS), `aria-label="Chamar no WhatsApp"`.

- [ ] **Step 1: Testes que falham**

```ts
// useSectionNavigation.test.tsx (MemoryRouter + scrollIntoView mockado)
it("na home rola até a seção", () => { /* chama nav("sobre"); expect(scrollIntoView).toHaveBeenCalled() */ });
it("fora da home navega para / com state.scrollTo", () => { /* initialEntries ["/projetos/lamecomex"]; expect location.pathname "/" e state.scrollTo "sobre" */ });
// SiteNavbar.test.tsx
it("fecha o menu mobile ao clicar em um item", async () => {
  /* abre o menu; clica "Sobre"; expect o menu (role="dialog" ou data-testid="mobile-menu") ausente */
});
```

- [ ] **Step 2: FAIL → implementar → PASS.**
- [ ] **Step 3: `App.tsx` passa a ter só `<HashRouter>`, `ScrollToTop`, `SiteNavbar`, `<Routes>`, `SiteFooter`, `FloatingWhatsApp`. Remover do `App` os overlays antigos (`ScanlineOverlay`, `CRTGrid`, `AmbientBlobs`) e o `Toaster`. `HomePage` por enquanto renderiza apenas um `<main>` vazio com os ids das seções. Estilos novos em `site.css` (navbar fixa com fundo translúcido e blur, borda inferior `--border`).**
- [ ] **Step 4: `pnpm dev`: navegar para `#/projetos/xyz` mostra `NotFoundPage`. Commit `feat: add routing, navbar, footer and floating WhatsApp`.**

---

### Task 6: Seções da página inicial

**Files:**
- Create: `src/components/sections/{Hero,Services,ProjectsList,Process,About,FinalCta}.tsx`, `src/components/ui/ProjectCard.tsx`, `src/constants/services.ts`, `src/constants/process.ts`, `src/components/sections/ProjectsList.test.tsx`, `Hero.test.tsx`
- Modify: `src/pages/HomePage.tsx`, `src/styles/site.css`
- Delete: `src/components/sections/ProjectsSection.tsx`, `AboutSection.tsx`, `HeroSection.tsx`, `SkillsSection.tsx`, `ContactSection.tsx` (os antigos, junto com `skills.ts`, `timeline.ts` na Task 8)

**Interfaces:**
- `HomePage` monta, nesta ordem e com estes `id`: `Hero`(`inicio`), `Services`(`servicos`), `ProjectsList`(`projetos`), `Process`(`como-funciona`), `About`(`sobre`), `FinalCta`(`contato`).
- `services.ts`: `SERVICES: { title: string; forWhom: string; description: string; icon: LucideIcon }[]` com exatamente 3: "Site profissional", "Sistema de pedidos e vendas", "Painel de gestão". Textos em linguagem simples (ex.: "Para quem quer ser encontrado e passar confiança").
- `process.ts`: `PROCESS_STEPS: { title: string; description: string }[]` com 4: "Conversa no WhatsApp", "Proposta", "Desenvolvimento com entregas", "Suporte".
- `ProjectCard({ project: ProjectCase })` — capa, `kind`, `title`, `summary`, link "Ver caso →" para `/projetos/${project.slug}` (`Link` do router).
- `Hero`: h1 "Sites e sistemas sob medida para pequenos negócios", subtítulo de uma frase, `WhatsAppButton size="lg"` + botão ghost "Ver projetos" (usa `useSectionNavigation`), ao lado `BrowserFrame` com a capa da Casa da Marmita. Brilho radial `--accent` → `--accent-2` com baixa opacidade atrás do título.
- `About`: foto `src/assets/avatar.jpg`, bio curta e humana de 3 a 4 frases **escrita como rascunho em `src/constants/about.ts` e marcada para aprovação do Leonardo** (sem jogos/animes; "4+ anos de experiência", "Brasil", disponível para novos projetos), stack em chips pequenos ao final.
- `FinalCta`: "Vamos conversar sobre o seu projeto?" + `WhatsAppButton size="lg"`; links secundários para e-mail (`mailto:`), LinkedIn e GitHub (externos). Sem formulário.

- [ ] **Step 1: Testes que falham**

```ts
// ProjectsList.test.tsx
it("renderiza um card por projeto com link para a página de detalhes", () => {
  render(<MemoryRouter><ProjectsList /></MemoryRouter>);
  PROJECTS.forEach(p =>
    expect(screen.getByRole("link", { name: new RegExp(p.title) })).toHaveAttribute("href", `/projetos/${p.slug}`)); // MemoryRouter nos testes; o HashRouter prefixa "#" em produção
});
// Hero.test.tsx
it("tem h1 com a proposta e um link de WhatsApp", () => {
  render(<MemoryRouter><Hero /></MemoryRouter>);
  expect(screen.getByRole("heading", { level: 1 })).toHaveTextContent(/sob medida/i);
  expect(screen.getByRole("link", { name: /whatsapp/i })).toHaveAttribute("href", expect.stringContaining("wa.me"));
});
```

- [ ] **Step 2: FAIL → implementar → PASS. Cada seção usa `Section` e `Reveal`. Layout em grade responsiva: 3 colunas em ≥1024px, 2 em ≥640px, 1 abaixo.**
- [ ] **Step 3: `pnpm dev`: conferir a home em 1280px e 375px (sem rolagem horizontal, títulos quebram sem estourar). Commit `feat: add new home sections`.**

---

### Task 7: Página de detalhes do projeto

**Files:**
- Modify: `src/pages/ProjectPage.tsx`, `src/pages/NotFoundPage.tsx`, `src/styles/site.css`
- Create: `src/components/ui/TechChips.tsx`, `src/pages/ProjectPage.test.tsx`

**Interfaces:**
- `ProjectPage` lê `slug` de `useParams`, usa `getProjectBySlug`; se `undefined`, renderiza `NotFoundPage`.
- Ordem: link "← Voltar aos projetos" (via `useSectionNavigation("projetos")`), `kind`/`client`, `h1` com `title`, `BrowserFrame` com a capa, **O desafio**, **O que eu fiz** (lista), **Resultado** (só se `result`; senão **O que o sistema faz**, reaproveitando `summary`), galeria (só se `gallery.length`), **Detalhes técnicos** (`highlights` em lista e `TechChips` com `TECH_ICONS`), chamada "Quer algo assim para o seu negócio?" com `WhatsAppButton` cuja mensagem cita o projeto: `Oi Leonardo, vi o caso ${title} no seu portfólio e quero algo parecido`.
- `demoUrl`/`githubUrl` só aparecem se existirem, como links externos.
- `NotFoundPage`: título "Página não encontrada", link para `/`.

- [ ] **Step 1: Testes que falham**

```ts
it("slug inexistente mostra página não encontrada com link para a home", () => {
  renderAt("/projetos/xyz");
  expect(screen.getByText(/não encontrad/i)).toBeInTheDocument();
  expect(screen.getByRole("link", { name: /início|home|voltar/i })).toHaveAttribute("href", "/");
});
it("projeto sem result mostra 'O que o sistema faz' e não 'Resultado'", () => {
  renderAt("/projetos/casa-da-marmita");
  expect(screen.getByRole("heading", { name: /o que o sistema faz/i })).toBeInTheDocument();
  expect(screen.queryByRole("heading", { name: /^resultado$/i })).toBeNull();
});
it("o botão de WhatsApp cita o projeto", () => {
  renderAt("/projetos/casa-da-marmita");
  expect(screen.getByRole("link", { name: /whatsapp/i }).getAttribute("href")).toContain(encodeURIComponent("Casa da Marmita"));
});
it("não mostra link de código nem de demo quando não existem", () => {
  renderAt("/projetos/casa-da-marmita");
  expect(screen.queryByRole("link", { name: /código|demo/i })).toBeNull();
});
```

- [ ] **Step 2: FAIL → implementar → PASS.**
- [ ] **Step 3: `pnpm dev`: abrir os 4 projetos em 1280px e 375px; títulos longos como `label-catalog` não estouram a largura. Commit `feat: add project detail page`.**

---

### Task 8: SEO, limpeza do sistema antigo e documentação

**Files:**
- Modify: `index.html`, `package.json`, `AGENTS.md`, `src/styles/index.css`
- Delete: `src/components/layout/{Navbar,Footer,Overlays}.tsx`, `src/components/ui/{CyberBtn,CyberPanel,CyberInput,CyberTextarea,CornerUI,TermLine,SectionLabel,NavLink,IconLink,HoverLink}.tsx` (os que não estiverem mais em uso), `src/hooks/useTyping.ts`, `src/constants/{skills,timeline,fonts}.ts`, `src/styles/{theme,animations,components}.css`, `.env` e `.env.local` com chaves EmailJS **não** são apagados (arquivos locais ignorados); apenas deixam de ser usados.
- Remover dependências sem uso: `@emailjs/browser`, `react-hook-form`, `@hookform/resolvers`, `zod`, `sonner`.

- [ ] **Step 1: `index.html`: `<title>Leonardo Sodré — Sites e sistemas sob medida para pequenos negócios</title>`, meta description e Open Graph no mesmo sentido, `lang="pt-BR"` mantido, remover `preconnect` se as fontes forem importadas de outro jeito (manter se ainda importadas do Google Fonts). Conferir se `public/og-image.png` existe; se não existir, não referenciar uma imagem inexistente (remover `og:image` ou criar uma imagem simples a partir da capa).**
- [ ] **Step 2: Apagar o sistema antigo. Para cada arquivo, confirmar com `grep -rn "<NomeDoArquivo>" src` que não há mais importações antes de apagar. `index.css` passa a importar só `fonts`, `tailwind`, `tokens`, `base`, `site`.**
- [ ] **Step 3: Verificação de resíduos**

Run: `grep -rniE "cyber|neon|glitch|flicker|scanline|crt|press start|orbitron|vt323|share tech|LVL 99|color-purple|color-magenta" src index.html`
Expected: nenhuma ocorrência.

- [ ] **Step 4: Atualizar `AGENTS.md`**: stack (React 19, Vite 7, Vitest, react-router-dom/HashRouter), nova estrutura de pastas (`pages/`, `lib/`, `components/sections|layout|ui`), novo sistema de tokens (`tokens.css`, nomes `--bg`, `--accent`…), fontes Inter/Sora, convenção de CSS em `site.css`, regra de contato (WhatsApp via `buildWhatsAppUrl`), como adicionar um projeto (entrada em `projects.ts` + capa em `public/images`), e remover as seções "Color System/Design Tokens/Fonts" antigas e "Forms".
- [ ] **Step 5: Verificação completa**

Run: `pnpm typecheck && pnpm test && pnpm build`
Expected: tudo passa.

- [ ] **Step 6: Verificação visual final com `pnpm dev`** (home e 4 páginas de projeto, 1280px e 375px): botão de WhatsApp é o elemento mais evidente, nenhuma rolagem horizontal, foco visível ao usar Tab, animações desligadas com "reduzir movimento" ativado no sistema, links de WhatsApp abrem a conversa com o texto pré-preenchido.
- [ ] **Step 7: Commit `refactor: remove legacy cyber design system and update docs`.** Não fazer push.

---

## Self-review

- **Cobertura da spec:** hero/oferta (T6), WhatsApp principal e flutuante (T1, T3, T5), tela de detalhes (T4, T7), projetos como casos (T4, T6), direção visual e movimento (T2, T3, T6), "Sobre" humano (T6), remoção de Skills/terminal/timeline/formulário (T6, T8), SEO (T8), `AGENTS.md` (T8), rotas e hospedagem desconhecida (T5, HashRouter), dados sensíveis (Global Constraints, teste na T4), acessibilidade e responsivo (T2, T8 passo 6). Pendências do Leonardo estão em Blockers.
- **Decisões minhas do plano (não da spec):** HashRouter; verde `#25D366` só nos botões de WhatsApp; fontes Inter e Sora; formulário EmailJS removido junto com as dependências; mapa `TECH_ICONS` movido para `tech-icons.ts`.
- **Consistência de nomes:** `buildWhatsAppUrl`, `WhatsAppButton`, `ProjectCase`, `getProjectBySlug`, `useSectionNavigation`, `NAV_ITEMS`, ids de seção (`inicio`, `servicos`, `projetos`, `como-funciona`, `sobre`, `contato`) iguais em T5, T6 e T7.
- **Proporção:** plano maior que a spec por conter testes e interfaces, sem corpos de implementação.
