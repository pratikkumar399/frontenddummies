# Frontend For Dummies

A Next.js 16 App Router project that curates frontend challenges, interactive code practice, and snippet-based quizzes for JavaScript and React.

## What’s Inside

- Home  
- Explore: search + category filters to browse every challenge.  
- Challenge detail: `/design/[slug]` with description, tags, demo/code links, and SEO metadata.  
- Practice IDE: `/practice/[slug]` Monaco editor with resizable panes, console capture, reset, and optional editorial tab.  
- Snippet quizzes: `/snippet-practice/[slug]` run-the-code output predictions with MCQ answers and explanations.  
- Demos: e.g. nested comments system demo at `/design/nested-comments-system/demo`.  
- Always-on dark theme, structured JSON-LD per page, and loading states.

## Tech Stack

- Next.js 16 (App Router) + React 19 + TypeScript  
- Tailwind CSS v4 (global tokens in `src/app/globals.css`, `tw-animate-css`, `tailwind-merge`)  
- Monaco editor, `react-markdown`, `react-syntax-highlighter`, `lucide-react`

## Key Routes

- `/` – landing with featured challenges  
- `/explore` – search + category filters  
- `/design/[slug]` – challenge detail page  
- `/practice/[slug]` – in-browser IDE for starter code + logs  
- `/snippet-practice/[slug]` – output-prediction quizzes  
- `/design/nested-comments-system/demo` – live demo example

## Project Structure (high level)

```
src/
  app/
    page.tsx                 // home
    explore/                 // browse challenges
    design/[slug]/           // challenge detail + demo
    practice/[slug]/         // IDE experience
    snippet-practice/[slug]/ // snippet quizzes
    playground/              // extra experiments
    globals.css              // Tailwind v4 + theme tokens
  components/
    ui/Button.tsx, Badge.tsx
    TemplateCard.tsx, AppShell.tsx, Navbar/Footer
    design-detail/           // detail page building blocks
    demos/NestedCommentsSystem // demo UI + data
  data/
    snippets/*.ts            // quiz snippets
    markdown/*.ts            // long-form descriptions/editorials
    starter-code/*.ts        // IDE starter templates
    editorial/*.ts           // solution writeups
  lib/
    constants.ts             // INITIAL_TEMPLATES seed data
    challenges.ts            // lookup helpers
  context/AppContext.tsx     // template store + theme
```

## Content Model

Challenges are seeded in `src/lib/constants.ts` as `Template` objects. A template can include:

- `starterCode` for the IDE route  
- `editorial` (markdown string) for the editorial tab  
- `snippets` array for output-prediction quizzes  
- metadata: `category`, `tags`, `techStack`, `goal`, `demoUrl`, `githubUrl`

Supporting content lives in `src/data/snippets`, `src/data/markdown`, `src/data/starter-code`, and `src/data/editorial`.

## Getting Started

```bash
git clone https://github.com/pratikkumar399/frontendfordummies.git
cd frontendfordummies
npm install
npm run dev
```

Visit `http://localhost:3000`.

To build and serve production:

```bash
npm run build
npm start
```

## Adding a Challenge

1) Add a new entry to `src/lib/constants.ts` (unique `id` and `slug`).  
2) If needed, place supporting content in:
- snippets: `src/data/snippets/*.ts`
- markdown/editorial: `src/data/markdown` or `src/data/editorial`
- starter code: `src/data/starter-code`
3) Include `demoUrl` or add a demo route under `src/app/design/[slug]/demo` if you provide one.

## Notes

- Dark mode is forced via `AppContext`; no theme toggle is required.  
- SEO: structured data scripts exist on home, explore, detail, practice, and quiz pages.  
- Styling: Tailwind v4 utilities live in `globals.css` with custom CSS variables for colors/radii.


Made with ❤️ by [@pratikrai](https://github.com/pratikkumar399)

