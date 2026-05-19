# Portfolio — Leonardo Sodré

## Stack

- React 18 + TypeScript
- Vite 6 (bundler)
- Tailwind CSS v4 (via `@tailwindcss/vite`)
- pnpm (package manager)
- `lucide-react` (icons)

## Commands

```bash
pnpm dev        # dev server
pnpm build      # production build
pnpm preview    # preview production build
pnpm typecheck  # tsc --noEmit
```

## Project Structure

```
src/
├── components/
│   ├── layout/      # Navbar, Footer, Overlays
│   ├── sections/    # Hero, About, Skills, Projects, Contact
│   └── ui/          # Reusable: CyberBtn, CyberPanel, NavLink, etc.
├── constants/       # Data per domain (navigation, projects, skills)
├── hooks/           # Custom hooks (useTyping)
├── styles/          # CSS (theme, animations, components, tailwind, fonts)
└── assets/          # Static images
```

## Conventions

### Component Pattern
- Named exports (`export function ComponentName`)
- Props typed via `interface ComponentNameProps`
- One component per file

### Styling
- **CSS custom properties** for colors/fonts — defined in `src/styles/theme.css` as `--color-*` and `--font-*`
- **BEM-like classes** in `src/styles/components.css` (e.g., `.navbar__logo`, `.cyber-btn--primary`)
- **Inline styles** use CSS variables: `style={{ color: "var(--color-purple)" }}`
- **Alpha variants** in data-driven inline styles use hex values from constant data arrays (data constants carry raw hex, not CSS vars)
- **Animations** in `src/styles/animations.css` — use utility classes (`.glitch-text`, `.flicker`, `.neon-pulse`, `.blink`, `.float-anim`)

### Imports
- Path alias `@/` maps to `src/`
- Example: `import { Navbar } from "@/components/layout/Navbar"`

### Color System (Single Source of Truth)
- All colors defined as CSS custom properties in `src/styles/theme.css`
- Components reference colors via `var(--color-*)` in inline styles
- Data files (`projects.ts`, `skills.ts`) use inline hex strings for colors
- No TypeScript color constants — `src/constants/colors.ts` was removed

### Design Tokens (from theme.css)
```
--color-bg: #05000D       (background)
--color-card: #0C0018     (card surface)
--color-purple: #BF00FF   (primary accent)
--color-magenta: #FF00FF  (secondary accent)
--color-cyan: #00FFFF     (tertiary accent)
--color-pink: #FF2D78     (highlight)
--color-yellow: #FFE600   (warning/highlight)
--color-white: #EDE8FF    (text primary)
--color-text: #B8A8D8     (text secondary)
--color-muted: #4A3A6A    (text muted)
--color-border: rgba(191,0,255,0.3)
```

### Fonts
```
--font-pixel: 'Press Start 2P', monospace  (headings, small labels)
--font-orbi: 'Orbitron', monospace          (large headings)
--font-mono: 'Share Tech Mono', monospace   (body, terminal output)
--font-retro: 'VT323', monospace            (typing animation)
```

### Navigation
- Single-page scroll via `document.getElementById(id)?.scrollIntoView({ behavior: "smooth" })`
- Section IDs match NAV_LINKS constants (lowercased, `í` → `i`)
- `Navbar` receives `onNavigate` callback from `App`

### Forms
- Contact form uses `CyberInput` + `CyberBtn` components
- No backend integration currently — form sets local `sent` state only

### External Links
- All external `<a>` tags must include `target="_blank"` and `rel="noopener noreferrer"`
- `IconLink` component already handles this

### Git
- Only the user may push to remote (`git push`). Never push unless explicitly asked.
- Semantic commit messages following conventional commits format.
- Run `pnpm typecheck` and `pnpm build` before committing.

### TypeScript
- `strict: true`, `noUnusedLocals`, `noUnusedParameters`
- JSX: `react-jsx` transform
- Module: `ESNext`, bundler resolution
- Run `pnpm typecheck` before committing
