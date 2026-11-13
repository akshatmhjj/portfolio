# Akshat Mahajan – Portfolio

Personal portfolio at [akshatmahajan.in](https://www.akshatmahajan.in).

The site is one request travelling through a system: client, API, data, AI and response. The home page is a live request you can send, with a cache that warms up, followed by sections for each layer of work.

## Pages

- `/`: the home page. A live request widget, the work by layer (client, API, data, AI), a "200 OK" contact block, and the full experience, skills, education and certifications.
- `/work`: all projects as cards with animated illustrations that play on hover.
- `/work/<slug>`: a case study for each project, written in MDX, with a sticky outline.
- Any other URL: a styled 404 page.

## Stack

Next.js (App Router), React, TypeScript and MDX for project write-ups. Styling is plain CSS in `src/components/request/request.css`. Once UI is still installed, but it is used only for its type definitions in `src/types/config.types.ts`.

## Running locally

```bash
npm install
npm run dev
```

Then open http://localhost:3000.

To check the production build:

```bash
npm run build
npm run start
```

## Where things live

| What | Where |
| --- | --- |
| Home page | `src/app/page.tsx` and `src/components/request/RequestSite.tsx` |
| Work pages | `src/app/work/page.tsx` and `src/app/work/[slug]/page.tsx` |
| Header and menu (desktop, tablet, mobile) | `src/components/request/SiteHeader.tsx` |
| Hero request widget | `src/components/request/Widget.tsx` |
| Interactive demos (Shortify, Grounded, Predictye, payments) | `src/components/request/Demos.tsx` |
| Project illustrations (hover animations) | `src/components/request/ProjectArt.tsx` |
| Case-study drawer and command palette (⌘K) | `src/components/request/Overlays.tsx` |
| Link-preview images | `src/components/request/og.ts` and `src/app/api/og/generate/route.tsx` |
| Styles and both themes | `src/components/request/request.css` |

## Editing content

- **Personal details, experience, skills, education and certifications:** `src/resources/content.tsx`. The home page reads them from here.
- **Site address, SEO and theme defaults:** `src/resources/once-ui.config.ts`. The domain is `baseURL`.
- **Projects:** add an `.mdx` file to `src/app/work/projects/`. Its frontmatter (`title`, `summary`, `image`, `link`, `stack`, `metrics`, `order`) feeds the cards, the case study and the link preview.
- **Per-project extras:** each project's role, badge, layer and "how it works" flow live in `PROJECT_META` in `src/components/request/data.ts`, keyed by the file name. A new project shows on the site before you add an entry, but it won't have a role, badge, flow or demo until you do.
- **Hover animations:** `SCENES` in `src/components/request/ProjectArt.tsx`, keyed the same way. A project without a scene shows its cover image instead.

## Themes

Light and dark follow the system setting by default. The toggle in the header (and ⌘K) switches the theme and remembers the choice. Both themes are defined as colour tokens at the top of `request.css`.

## Accessibility and speed

Checked with axe-core (no violations on any page, both themes, down to 320px) and Lighthouse (desktop 100 on all pages; accessibility, best practices and SEO 100 on mobile and desktop). Keep both in mind when changing colours, motion or page weight.

## License

Based on the Once UI "Magic Portfolio" template, licensed under CC BY-NC 4.0. See [LICENSE](LICENSE).
