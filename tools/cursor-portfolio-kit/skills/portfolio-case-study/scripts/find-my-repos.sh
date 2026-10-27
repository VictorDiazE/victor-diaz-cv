#!/usr/bin/env bash
# Lists every repo in a GitHub org where you have pushed code, ranked by how much you own it.
# Needs: gh (logged in with access to the org). Works with macOS's bash 3.2.
#
#   ./find-my-repos.sh <org> [out.md]
#
# Signals per repo (default branch + PRs):
#   commits   your commits on the default branch
#   share     your % of all commits on the default branch (ownership proxy)
#   prs       PRs you authored · reviews = PRs you reviewed (leadership proxy)
#   first/last  date range of your commits
# Read-only: it never writes to GitHub.
set -euo pipefail

ORG="${1:?usage: $0 <org> [out.md]}"
OUT="${2:-$HOME/portfolio-mining/_repos-$ORG.md}"
mkdir -p "$(dirname "$OUT")"
ME="$(gh api user --jq .login)"

echo "→ $ME in $ORG: listing repos…" >&2
# portable (macOS ships bash 3.2: no mapfile). Repo names never contain spaces.
REPOS="$(gh repo list "$ORG" --limit 1000 --no-archived --json name,pushedAt --jq 'sort_by(.pushedAt)|reverse|.[].name')
$(gh repo list "$ORG" --limit 1000 --archived --json name --jq '.[].name')"

rows=()
for R in $REPOS; do
  mine=$(gh api "repos/$ORG/$R/commits?author=$ME&per_page=100" --paginate --jq '.[].commit.author.date' 2>/dev/null || true)
  [ -z "$mine" ] && continue
  n=$(printf '%s\n' "$mine" | wc -l | tr -d ' ')
  first=$(printf '%s\n' "$mine" | sort | head -1 | cut -c1-10)
  last=$(printf '%s\n' "$mine" | sort | tail -1 | cut -c1-10)
  # contributor stats can answer 202 while GitHub computes them: retry a few times
  total=""
  for _ in 1 2 3 4; do
    total=$(gh api "repos/$ORG/$R/stats/contributors" --jq '[.[].total]|add' 2>/dev/null || true)
    [[ "$total" =~ ^[0-9]+$ ]] && break
    sleep 2
  done
  share="?"
  [[ "$total" =~ ^[0-9]+$ ]] && [ "$total" -gt 0 ] && share=$(( n * 100 / total ))
  prs=$(gh search prs --repo "$ORG/$R" --author "$ME" --limit 1000 --json number --jq length 2>/dev/null || echo "?")
  revs=$(gh search prs --repo "$ORG/$R" --reviewed-by "$ME" --limit 1000 --json number --jq length 2>/dev/null || echo "?")
  lang=$(gh api "repos/$ORG/$R" --jq '.language // "-"' 2>/dev/null || echo "-")
  rows+=("$n|$R|$share|$prs|$revs|$first|$last|$lang")
  echo "  $R: $n commits ($share%)" >&2
done

{
  echo "# Repos in $ORG with commits by $ME"
  echo
  echo "Generated $(date +%F). Sorted by your commits. share = your % of default-branch commits."
  echo "Likely 'led' = share ≥ 40% or reviews ≫ prs. Verify, don't assume."
  echo
  echo "| repo | commits | share | PRs | reviews | first | last | language |"
  echo "|---|---:|---:|---:|---:|---|---|---|"
  [ "${#rows[@]}" -gt 0 ] && printf '%s\n' "${rows[@]}" | sort -t'|' -k1,1nr | while IFS='|' read -r n R share prs revs first last lang; do
    echo "| $R | $n | $share% | $prs | $revs | $first | $last | $lang |"
  done
} > "$OUT"

echo "✓ $OUT" >&2
