#!/usr/bin/env bash
# Pull the latest code, rebuild the image and replace the running container.
# Usage: ./deploy/deploy.sh [branch]   (default: main)
set -euo pipefail
cd "$(dirname "$0")/.."
BRANCH="${1:-main}"
# docker via sudo when the user is not in the docker group (git stays non-root)
docker() { if command docker info >/dev/null 2>&1; then command docker "$@"; else sudo docker "$@"; fi; }

git fetch --quiet origin "$BRANCH"
git checkout --quiet "$BRANCH"
git pull --ff-only --quiet origin "$BRANCH"

docker network inspect edge >/dev/null 2>&1 || docker network create edge >/dev/null
docker compose build --pull
docker compose up -d --remove-orphans

for i in $(seq 1 20); do
  status=$(docker inspect -f '{{.State.Health.Status}}' skyeagle-landing 2>/dev/null || echo none)
  [ "$status" = healthy ] && { echo "skyeagle-landing is healthy ($(git rev-parse --short HEAD))"; break; }
  sleep 2
done
[ "${status:-}" = healthy ] || { echo "container did not become healthy" >&2; docker compose logs --tail 50; exit 1; }

docker image prune -f >/dev/null
