# Redesign do portfólio para captação de clientes — Design

Data: 2026-11-09

## Intenção e porquê

O portfólio de Leonardo Sodré hoje parece um jogo retrô (neon, fontes pixel, terminal falso, "LVL 99", glitch). Um dono de pequeno negócio que chega ao site não entende o que Leonardo faz, não sabe como contratar, vê projetos sem explicação e não tem uma tela de detalhes. O objetivo é transformar o site numa ferramenta de captação: quem chega deve entender em segundos o que é oferecido, ver provas de trabalho parecidas com o seu negócio e chamar Leonardo no WhatsApp.

Referências pesquisadas (blogs de marketing, tratar como opinião): clareza acima de decoração, cases contados por problema → decisão → resultado, poucos projetos fortes com contato ao lado, bio humana e confiança.

## Público e oferta (decididos pelo Leonardo)

- Público: donos de pequenos negócios (restaurante, loja, serviço local), como a Casa da Marmita. Não recrutadores.
- Oferta, nas palavras dele: "criação de sites e sistemas sob medida para pequenos negócios".
- Contato principal: **WhatsApp**, porque é o que os clientes dele mais usam.

## Metas

- Em poucos segundos, o visitante entende o que Leonardo vende e para quem.
- O caminho para contratar (WhatsApp) está sempre à vista, no desktop e no celular.
- Cada projeto vira um caso com página própria: desafio, solução, resultado, telas, detalhes técnicos.
- Visual escuro, sóbrio e **bem atrativo** (ver direção visual).

## Não metas

- Atrair recrutadores ou vagas CLT (o site deixa de ter esse foco).
- Backend, CMS, blog ou painel de edição. Conteúdo continua em arquivos de dados no código.
- Inventar números, depoimentos ou resultados.

## Anti-metas (seria fracasso mesmo funcionando)

- O site continuar parecendo gamificado (neon, pixel, terminal, glitch, scanlines).
- Linguagem de dev jargão na frente do visitante. Stack técnica só como detalhe secundário.
- Qualquer dado sensível ou de cliente exposto (credenciais, `.env`, endereços, telefones, nomes reais de clientes finais). Só telas com dados fictícios ou de demonstração. Citar cliente pelo nome só com autorização (Casa da Marmita já autorizada pelo Leonardo; LameComex, DisparoPRO e Label-Catalog: confirmar).
- Resultados afirmados sem base real.

## Direção visual (escolha do Leonardo, refinada por mim)

Leonardo escolheu a opção B, "escuro e sóbrio", e pediu que seja bem atrativo. Não tinha referência própria e deixou a escolha comigo.

- **Minha decisão:** estilo escuro refinado, na linha de produtos como Linear e Vercel. Fundo quase preto, brilho suave azul-violeta atrás do título, tipografia grande, cards com borda fina e leve efeito de vidro, uma cor de destaque única (partida de `#7C9CFF`, ajustável).
- **Telas dos projetos como protagonistas**, dentro de molduras de navegador e de celular.
- Animações sutis ao rolar a página, respeitando `prefers-reduced-motion`.
- **Sai:** neon multicolorido, fontes pixel/Orbitron/VT323/Share Tech Mono, scanlines, CRT grid, flicker, glitch, terminal, "LVL 99", cantos decorativos.
- O botão de WhatsApp tem destaque visual claro (cor de ação distinta ou a cor de destaque, a critério do builder, desde que seja o elemento mais evidente).
- Fontes: escolha do builder (sans-serif moderna; uma fonte para títulos e uma para texto no máximo).

## Estrutura (aprovada pelo Leonardo no wireframe)

### Página inicial

1. **Navbar:** nome | Projetos | Como funciona | Sobre | botão "Conversar" (WhatsApp).
2. **Hero:** "Sites e sistemas sob medida para pequenos negócios" (texto final do builder, mesmo sentido), subtítulo simples, botão WhatsApp + "Ver projetos". Ao lado, tela de um projeto em moldura de navegador.
3. **O que eu faço:** 3 cartões em linguagem simples — site profissional, sistema de pedidos/vendas, painel de gestão — cada um com "para quem serve".
4. **Projetos:** 3 a 4 casos (Casa da Marmita, LameComex, DisparoPRO, Label-Catalog; a ordem e quais entram é decisão do builder, Casa da Marmita primeiro). Cada card: capa, problema em uma linha, resultado ou o que faz, "Ver caso →".
5. **Como funciona:** 4 passos — conversa no WhatsApp → proposta → desenvolvimento com entregas → suporte.
6. **Sobre mim:** foto (já existe `src/assets/avatar.jpg`), bio curta e humana, 4+ anos de experiência. Stack como detalhe pequeno aqui.
7. **Chamada final:** "Vamos conversar sobre o seu projeto?" com botão grande de WhatsApp; e-mail e LinkedIn como secundários.
8. **Botão flutuante de WhatsApp** visível no celular.

### Tela de detalhes do projeto (nova rota por projeto)

Voltar aos projetos → título, cliente e tipo → imagem grande → **O desafio** → **O que eu fiz** → **Resultado** → galeria de telas → **Detalhes técnicos** (stack e destaques, o conteúdo que hoje está no bloco "Destaques técnicos") → chamada "Quer algo assim para o seu negócio?" com WhatsApp.

## Mudanças em relação ao site atual

- Seção "Skills" deixa de existir como seção própria; a stack vai para "Sobre" e para os detalhes técnicos de cada caso.
- Terminal falso do "Sobre" sai; vira foto e bio humana.
- Linha do tempo de empregos sai da página (pode virar resumo curto no "Sobre", a critério do builder).
- O texto atual do "Sobre" fala de jogos e animes; será reescrito para o público novo (ver pendências).
- Formulário de contato atual (EmailJS) deixa de ser o caminho principal. Mantê-lo como opção secundária ou removê-lo é decisão do builder; se mantido, preserva o envio por EmailJS que já funciona.
- O site hoje é uma página única sem rotas. A tela de detalhes exige rotas (por exemplo, `/projetos/:slug`).

## Restrições técnicas

- Base atual: React 18, TypeScript estrito, Vite 6, Tailwind CSS v4, pnpm. Reaproveitar.
- Alias `@/`, exports nomeados, um componente por arquivo, props em `interface`.
- Links externos com `target="_blank"` e `rel="noopener noreferrer"`.
- `pnpm typecheck` e `pnpm build` devem passar. Commits semânticos. Só o Leonardo faz `git push`.
- O `AGENTS.md` descreve o sistema "cyber" (CyberBtn, CyberPanel, fontes pixel, `src/constants/colors`…). Deve ser atualizado ao fim para refletir o novo sistema de design e remover o que for deletado.
- Roteamento: escolha do builder (react-router ou solução leve equivalente). Atenção: se o site for hospedado como estático, rotas como `/projetos/slug` precisam de fallback para `index.html` (SPA). Confirmar onde o portfólio é hospedado antes de escolher; se não for possível, usar rotas por hash.
- Responsivo desde o celular (a maior parte do público acessa pelo celular). Acessibilidade básica: contraste, foco visível, `alt` nas imagens, `prefers-reduced-motion`.
- SEO básico: título, descrição, Open Graph com imagem, idioma `pt-BR`.

## Conteúdo: o que já existe e o que falta

Já existe: dados e capas dos 4 projetos em `src/constants/projects.ts` e `public/images/`; captura da Casa da Marmita; avatar; links de GitHub e LinkedIn; e-mail.

Falta e depende do Leonardo (o builder deve deixar espaços/placeholders claros e não inventar):

- **Número de WhatsApp** (e a mensagem pré-preenchida, rascunho: "Oi Leonardo, vi seu portfólio e quero conversar sobre um projeto").
- **Resultados reais** de cada caso. Sem número fornecido, a seção "Resultado" descreve só o que o sistema faz.
- **Bio humana** nova (rascunho do builder, aprovado depois pelo Leonardo).
- Para LameComex, DisparoPRO e Label-Catalog: confirmar se podem ser citados pelo nome e quais telas podem aparecer.
- Telas adicionais (galeria) com dados fictícios, quando existirem.

## O que ficou por conta do builder

Nome e domínio da cor de destaque exata, fontes, composição e animações, biblioteca de rotas, texto final de hero e cartões (mantendo o sentido acordado), ordem dos projetos, tratamento do formulário, SEO.
