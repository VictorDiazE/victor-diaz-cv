# Output schema

Write TWO files per repo, both under `~/portfolio-mining/` (never inside the repo).

## 1. `<repo>.private.md` — evidence (never published)

```md
# <repo> — evidence
- Remote: <org/repo>  · Default branch: <branch>
- My identities used: <emails/names matched>
- My commits: <n> of <total> (<share>%) · first <date> · last <date>
- Top contributors (name: commits): ...
- Areas I touched most (path: commits/lines): top 10 from git log --numstat
- Key commits (hash · date · subject) that show design decisions: 5–15
- PRs I authored / reviewed (if gh available): counts + 3–5 notable titles
- Config evidence: CI files, IaC, infra (paths only)
- Secrets check: confirmed no secrets copied into these notes (yes/no)
```

## 2. `<repo>.public.md` — draft card for vdiaz.dev

Everything here must be safe to publish. Mark every claim with its evidence tag:
`[repo]` seen in code/config · `[git]` seen in my commits · `[ask]` needs Víctor to confirm.

```yaml
slug: kebab-case-name
publicName: "Name I can show publicly"   # client brand only if the project is public (live site/app store), else generic e.g. "Logistics platform"
clientIsPublic: true|false
kind: integration | app | storefront | hydrogen | internal-tool | other
years: "2023 – 2024"
myRole:                      # derived from evidence, never inflated
  label: "Architecture and delivery owner" | "Core contributor" | "Contributor"
  evidence: "62% of commits; authored 41 PRs, reviewed 57"   # [git]
title: { en: "", es: "" }
oneLiner: { en: "", es: "" }  # ≤ 160 chars: what it is + why it mattered
problem: { en: "", es: "" }   # the constraint that made it non-trivial
architecture:
  nodes: [{ id: "feeds", label: "feeds", sub: "catalog data" }]   # 5–9 nodes, for the scroll diagram
  edges: [["feeds", "ingest"]]
steps:                         # 3–5 narrative steps; each highlights node ids
  - highlight: ["ingest", "sqs"]
    title: { en: "", es: "" }
    body: { en: "", es: "" }   # ≤ 60 words, concrete decision + trade-off
myContributions:               # what *I* did, from git evidence
  - "Designed the SQS retry/DLQ strategy [git]"
stack: ["Python", "AWS Lambda", "SQS"]   # only what appears in the repo
outcomes:                      # only verifiable; otherwise leave [] and add an [ask] question
  - "…"
aiUsage: "[ask] where AI tooling helped"     # never invent
openQuestions:                 # what Víctor must confirm before publishing
  - ""
confidentiality: "anything that should stay vague (client names, volumes, internals)"
```
