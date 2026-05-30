#!/usr/bin/env bash
set -euo pipefail

TOKEN="${VEIL_AUTH_PAGES_GITHUB_TOKEN:-${GITHUB_TOKEN:-}}"

if [[ -z "$TOKEN" ]]; then
  echo "Missing VEIL_AUTH_PAGES_GITHUB_TOKEN. Add a GitHub token with read access to useveil/veil_auth_pages in Vercel Environment Variables." >&2
  exit 1
fi

ASKPASS_SCRIPT="${TMPDIR:-/tmp}/veil-git-askpass-$$.sh"
cat > "$ASKPASS_SCRIPT" <<'EOF'
#!/usr/bin/env sh
case "$1" in
  *Username*) printf '%s\n' "x-access-token" ;;
  *Password*) printf '%s\n' "$GIT_AUTH_TOKEN" ;;
  *) printf '\n' ;;
esac
EOF

chmod 700 "$ASKPASS_SCRIPT"
trap 'rm -f "$ASKPASS_SCRIPT"' EXIT

export GIT_ASKPASS="$ASKPASS_SCRIPT"
export GIT_AUTH_TOKEN="$TOKEN"
export GIT_TERMINAL_PROMPT=0

add_github_rewrite() {
  local pattern="$1"

  if ! git config --global --get-all url.https://github.com/.insteadOf | grep -Fxq "$pattern"; then
    git config --global --add url.https://github.com/.insteadOf "$pattern"
  fi
}

add_github_rewrite "git@github.com:"
add_github_rewrite "ssh://git@github.com/"

pnpm install --frozen-lockfile
