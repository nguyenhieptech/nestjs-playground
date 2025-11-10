#!/usr/bin/env bash
set -e

# Detect package manager
if [ -f pnpm-lock.yaml ]; then
  PM="pnpm"
elif [ -f yarn.lock ]; then
  PM="yarn"
elif [ -f package-lock.json ]; then
  PM="npm"
else
  echo "❌ Could not detect package manager (no lockfile found)."
  echo "   Supported: npm (package-lock.json), yarn (yarn.lock), pnpm (pnpm-lock.yaml)."
  exit 1
fi

echo "📦 Detected package manager: $PM"

# Upgrade based on package manager
case $PM in
  pnpm)
    echo "⬆️  Upgrading all dependencies to latest with pnpm..."
    pnpm up --latest
    ;;
  yarn)
    echo "⬆️  Upgrading all dependencies to latest with yarn..."
    yarn upgrade --latest
    ;;
  npm)
    echo "⬆️  Upgrading all dependencies to latest with npm..."
    deps=$(jq -r '.dependencies | keys | map(. + "@latest") | join(" ")' package.json)
    devDeps=$(jq -r '.devDependencies | keys | map(. + "@latest") | join(" ")' package.json)

    if [ -n "$deps" ]; then
      npm install $deps
    fi

    if [ -n "$devDeps" ]; then
      npm install -D $devDeps
    fi
    ;;
esac

echo "✅ All dependencies upgraded to latest versions!"
