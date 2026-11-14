# syntax=docker/dockerfile:1.7

# ---- build: static export with Next.js -------------------------------------
FROM node:22-alpine AS build
WORKDIR /app
ENV NEXT_TELEMETRY_DISABLED=1 NEXT_OUTPUT=export CI=true
RUN corepack enable && corepack prepare pnpm@10.34.9 --activate

COPY package.json pnpm-lock.yaml pnpm-workspace.yaml ./
RUN --mount=type=cache,id=pnpm,target=/root/.local/share/pnpm/store \
    pnpm install --frozen-lockfile

COPY . .
RUN pnpm build \
 && node deploy/gen-csp.mjs out /app/csp.conf \
 && find out -type f \( -name '*.html' -o -name '*.js' -o -name '*.css' -o -name '*.svg' -o -name '*.txt' -o -name '*.xml' -o -name '*.json' -o -name '*.webmanifest' \) \
      -size +1k -exec gzip -9 -k -n {} +

# ---- runtime: unprivileged nginx, static files only ------------------------
FROM nginxinc/nginx-unprivileged:1.27-alpine AS runtime
USER root
RUN apk upgrade --no-cache \
 && rm -f /etc/nginx/conf.d/default.conf \
 && rm -rf /usr/share/nginx/html/*
COPY deploy/nginx/nginx.conf /etc/nginx/nginx.conf
COPY deploy/nginx/security-headers.conf /etc/nginx/security-headers.conf
COPY --from=build /app/csp.conf /etc/nginx/csp.conf
COPY --from=build --chown=root:root /app/out /usr/share/nginx/html
USER 101
EXPOSE 8080
HEALTHCHECK --interval=30s --timeout=3s --start-period=5s --retries=3 \
  CMD wget -q --spider http://127.0.0.1:8080/healthz || exit 1
