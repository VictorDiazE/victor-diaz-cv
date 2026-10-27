---
name: portfolio-case-study
description: Extract the technical story of a repo Víctor worked on (architecture, decisions, his own contributions from git history) into a private evidence file and a publish-safe case-study draft for vdiaz.dev. Run manually with /portfolio-case-study, in a single repo or a folder of repos.
disable-model-invocation: true
---

# Portfolio case study miner

Goal: turn a client repo into an honest, publish-safe case study for vdiaz.dev, grounded in what the code and **my own git history** show. You are a staff engineer writing for hiring managers, not a marketer.

## Hard rules

1. **Read-only.** Never edit, commit, push, create branches, install deps or run the app. Allowed commands: `git log/show/shortlog/blame/rev-parse/remote`, `ls`, `cat`, `rg`, `wc`, and `gh` read commands.
2. **Write only** to `~/portfolio-mining/`. Never write inside the repo.
3. **No secrets, ever.** Do not open or quote `.env*`, credentials, keys, tokens, customer data, or production URLs with params. If you see one by accident, don't copy it.
4. **No verbatim code** in the public file. Describe patterns, don't paste them.
5. **No invented facts.** No metrics, volumes, team sizes or outcomes unless they appear in the repo (README, ADRs, comments, commit messages) — tag `[repo]`/`[git]`, otherwise ask with `[ask]`.
6. **Role from evidence**, never inflated: share of commits, PRs authored/reviewed, who wrote the core modules (`git blame` on key files).
7. Client names go in the public file only if the project is publicly visible (live site, public app listing). Otherwise use a generic name and set `clientIsPublic: false`.

## Steps

0. **Scope.** If the workspace root is not a git repo but contains several, list them and delegate each one to the `portfolio-repo-miner` subagent (in parallel), then write `~/portfolio-mining/_summary.md` ranking them by portfolio value (ownership × technical depth × uniqueness vs. what's already on vdiaz.dev: AWS catalog integrations, Holafly B2B Hydrogen). Stop.

1. **Identify me.** `git config user.email`, then `git shortlog -sne --all | head -20`. Match my identities (Víctor / Victor Díaz / diazegurbide / my work email / GitHub noreply). List the ones you used.

2. **Ownership.**
   - `git log --author="<regex of my identities>" --perl-regexp --format='%h %ad %s' --date=short` → count, first/last date.
   - Share vs. total on the default branch.
   - `git log --author=… --numstat --format=` → aggregate lines by top-level path: which areas are mine.
   - `git blame -w --line-porcelain` on the 3–5 most central files → who wrote the core.
   - If `gh` works: PRs authored and reviewed by me (`gh pr list --author @me --state all`, `gh search prs --reviewed-by @me --repo <r>`).

3. **Architecture.** Read README, docs/, ADRs, CI workflows, IaC (serverless.yml, SAM, CDK, Terraform), `shopify.app.toml`, extensions/, functions/, Hydrogen routes, package manifests. Produce 5–9 nodes and edges that explain the data flow, like a whiteboard sketch.

4. **Decisions.** From code structure + my commit messages, find 3–5 real decisions with their trade-off (e.g. "queue between ingest and processing so a burst never blocks stores; cost: eventual consistency"). Prefer decisions in areas I own.

5. **Write both files** following `references/output-schema.md`. Bilingual EN/ES for public text. Plain, specific sentences; no buzzwords ("leveraged", "cutting-edge", "seamless").

6. **Finish** with a 5-line summary in chat: role label + evidence, the strongest story angle, and the open `[ask]` questions.

## Quality bar

A senior engineer reading the public card should be able to ask a good follow-up question in an interview. If a step body could describe any project, rewrite it.
