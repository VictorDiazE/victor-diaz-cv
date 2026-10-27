# Cursor portfolio kit

Mines the repos I've worked on for honest, publish-safe case studies for vdiaz.dev.

## Install (once)

```bash
bash tools/cursor-portfolio-kit/install.sh
```

It installs a skill and a subagent at user level (`~/.cursor`), never inside client repos.

## Use

1. **Find the repos** where I pushed code, ranked by ownership:
   ```bash
   ~/.cursor/skills/portfolio-case-study/scripts/find-my-repos.sh <rocket-github-org>
   ```
   Output: `~/portfolio-mining/_repos-<org>.md` (commits, % share, PRs, reviews, dates).
   The script is read-only. It needs `gh auth login` with access to the org.
2. **Clone the top 5–8 repos** into one folder, e.g. `~/rocket-mining/`. Use `gh repo clone <org>/<repo> -- --filter=blob:none`.
3. **Open that folder in Cursor** (Agent mode) and run `/portfolio-case-study`. One read-only subagent analyses each repo in parallel. To analyse a single repo, open it and run the same command.
4. **Review** `~/portfolio-mining/*.public.md`, answer the `[ask]` questions, and pass the public files to Claude to add to the site.

## Guardrails

- Read-only on repos. The kit writes only to `~/portfolio-mining/`.
- The `*.private.md` evidence files stay on your machine. Don't publish or share them.
- Client names appear only for projects that are publicly visible.
- **Check what Rocket and the client contracts (NDA) allow before publishing.** When in doubt, describe the architecture with a generic client name.
