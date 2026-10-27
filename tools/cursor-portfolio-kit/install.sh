#!/usr/bin/env bash
# Installs the kit at user level (~/.cursor), so nothing is added to client repos.
set -euo pipefail
here="$(cd "$(dirname "$0")" && pwd)"
mkdir -p ~/.cursor/skills ~/.cursor/agents ~/portfolio-mining
cp -R "$here/skills/portfolio-case-study" ~/.cursor/skills/
cp "$here/agents/portfolio-repo-miner.md" ~/.cursor/agents/
chmod +x ~/.cursor/skills/portfolio-case-study/scripts/find-my-repos.sh
echo "✓ Installed. Restart Cursor, open a repo and run /portfolio-case-study"
echo "  Discovery: ~/.cursor/skills/portfolio-case-study/scripts/find-my-repos.sh <github-org>"
