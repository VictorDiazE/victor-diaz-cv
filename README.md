# vdiaz.dev

Personal portfolio of **Víctor Díaz Egurbide** — Senior Full-Stack Engineer (Python & AWS, Shopify Plus, React/Next.js), Barcelona.

Live: https://vdiaz.dev

## Stack

- Next.js 16 (App Router) + React 19, TypeScript
- MDX content for projects (`src/app/work/projects/*.mdx`)
- Once UI design system
- Deployed on Vercel

## Editing content

| What | Where |
| --- | --- |
| Name, headline, experience, skills, studies, social links | `src/resources/content.tsx` |
| Domain, enabled routes, theme, SEO schema | `src/resources/once-ui.config.ts` |
| Projects / case studies | one `.mdx` file per project in `src/app/work/projects/` |
| Images | `public/images/` (WebP, 1600×900 for project covers) |

```bash
npm install
npm run dev   # http://localhost:3000
```

## Credits & license

Based on [Magic Portfolio](https://github.com/once-ui-system/magic-portfolio) by [Once UI](https://once-ui.com), licensed under [CC BY-NC 4.0](https://creativecommons.org/licenses/by-nc/4.0/). This site is a modified version (content, theme, icons and routes changed). The original license is kept in `LICENSE` and applies to the template code.

The previous version of this site (Vite + React Three Fiber) lives in the `main` branch history.
