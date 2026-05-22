#!/bin/bash
# Veil 官网项目的 git commit + push 辅助脚本。
#
# 用法：
#   scripts/push.sh -m "commit message"           # 加所有改动、提交、push
#   scripts/push.sh -m "msg" -S                   # 只提交已 staged 的改动（跳过 git add .）
#   scripts/push.sh -m "msg" -n                   # 只 commit，不 push
#   scripts/push.sh -m "msg" -S -n                # 只提交已 staged，不 push（拆多条 commit 时用）
#
# 说明：
#   全局 pre-commit hook (/Users/shufu/git-hooks/pre-commit → git-auth-switch.sh)
#   会按 remote URL pattern 匹配 gh CLI 账号。
#   本脚本通过 `--no-verify` 绕过 hook，并在提交前显式切换到 useveil。

set -e

COMMIT=""
NO_PUSH=0
STAGE_ALL=1

while getopts "m:nS" opt; do
  case $opt in
    m)
      COMMIT="$OPTARG"
      ;;
    n)
      NO_PUSH=1
      ;;
    S)
      STAGE_ALL=0
      ;;
    ?)
      echo "Usage: $0 -m \"commit message\" [-n (no push)] [-S (skip git add .)]"
      exit 1
      ;;
  esac
done

if [ -z "$COMMIT" ]; then
  echo "Error: Commit message is empty, please use -m to specify a message"
  exit 1
fi

# 1) 设置本仓库 identity
git config user.name "useveil"
git config user.email "useveil@users.noreply.github.com"

# 2) 切 gh CLI 活跃账号到 useveil（幂等）
gh auth switch -u useveil >/dev/null 2>&1 || true
gh auth setup-git >/dev/null 2>&1 || true

# 3) Stage
if [ "$STAGE_ALL" = "1" ]; then
  git add .
fi

# 4) 如果没有 staged 内容，友好退出
if git diff --cached --quiet; then
  echo "没有 staged 改动，跳过 commit。"
  exit 0
fi

# 5) Commit（--no-verify 绕过全局 pre-commit hook 的 HTTPS-remote 误判）
git commit --no-verify -m "$COMMIT"

# 6) 可选 push
if [ "$NO_PUSH" = "0" ]; then
  current_branch=$(git symbolic-ref --short HEAD)
  git push -u origin "$current_branch"
fi
