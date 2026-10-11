#!/usr/bin/env bash
# Publish this site. agentcollab.dev is served by GitHub Pages from main, so
# publishing is pushing main; this script runs the contrast gate on the last
# commit first and refuses to push if it fails.
#
# THE CONTRAST GATE. The site is light by default with a Dark switch; its
# palette is theme.css. tools/contrast-gate.mjs opens every page in light and
# dark at 1440 and 390 px wide, with every menu section, the phone menu and
# the analytics consent bar open, and measures every piece of text against
# what is behind it. One element below 4.5:1 and nothing is pushed; the
# failures are listed by page, element and ratio.
set -euo pipefail
cd "$(dirname "$0")"
[ "$(git branch --show-current)" = main ] || { echo "deploy from main" >&2; exit 1; }
STAGE=$(mktemp -d)
trap 'rm -rf "$STAGE"' EXIT
git archive HEAD | tar -x -C "$STAGE"
WSTAGE=$(cygpath -w "$STAGE" 2>/dev/null || echo "$STAGE")
[ -d tools/node_modules/playwright ] || (cd tools && npm ci --no-audit --no-fund)
if ! node tools/contrast-gate.mjs --root "$WSTAGE"; then
  echo "deploy refused: text below 4.5:1 contrast (listed above). Fix it, then deploy again." >&2
  exit 1
fi
git push origin main
echo "pushed $(git rev-parse --short HEAD); GitHub Pages publishes https://agentcollab.dev/ in a minute or two"
