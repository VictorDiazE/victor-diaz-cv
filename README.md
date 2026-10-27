# vdiaz.dev — v3

Personal portfolio of Víctor Díaz Egurbide. Next.js 16 (App Router), no UI kit, dark theme, EN at `/`, ES at `/es`.

## What's in it
- **Interactive pipeline** (`src/components/Pipeline.tsx`): a labelled simulation of the ingest → SQS → workers → markets pattern. *Send a burst* / *Break a worker*.
- **Case studies with scroll narrative** (`src/app/[lang]/work/[slug]`, data in `src/lib/projects.ts`).
- **Ask my portfolio** (`src/app/api/ask/route.ts`): closed-context agent over `src/lib/knowledge.ts`, cites sources, rate-limited.
- **Recruiter TL;DR** dialog + one-page CV at `public/cv/`.
- Dynamic OG image, sitemap, robots, JSON-LD.

## Env vars (Vercel)
| Var | Required | Notes |
| --- | --- | --- |
| `ANTHROPIC_API_KEY` | for the agent | without it `/api/ask` returns 503 and the UI falls back to email |
| `ANTHROPIC_MODEL` | no | defaults to `claude-haiku-5-5` |

## Dev
```bash
npm install
npm run dev
```

Content rule: only facts that appear in the CV. No invented metrics.
