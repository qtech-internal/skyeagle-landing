// Build-time step: hash every inline <script> in the static export and write
// an nginx include with a strict Content-Security-Policy (no 'unsafe-inline'
// for scripts). Runs in the Docker build stage after `next build`.
import { createHash } from "node:crypto"
import { readFileSync, readdirSync, writeFileSync } from "node:fs"
import { join } from "node:path"

const [outDir, dest] = process.argv.slice(2)
const hashes = new Set()
const walk = (dir) => {
  for (const e of readdirSync(dir, { withFileTypes: true })) {
    const p = join(dir, e.name)
    if (e.isDirectory()) walk(p)
    else if (e.name.endsWith(".html")) {
      const html = readFileSync(p, "utf8")
      for (const m of html.matchAll(/<script(?![^>]*\bsrc=)[^>]*>([\s\S]*?)<\/script>/gi)) {
        if (m[1].length) hashes.add(`'sha256-${createHash("sha256").update(m[1]).digest("base64")}'`)
      }
    }
  }
}
walk(outDir)

const csp = [
  "default-src 'self'",
  `script-src 'self' ${[...hashes].sort().join(" ")}`,
  "style-src 'self' 'unsafe-inline'",
  "img-src 'self' data:",
  "font-src 'self'",
  "connect-src 'self'",
  "object-src 'none'",
  "base-uri 'self'",
  "form-action 'self'",
  "frame-ancestors 'none'",
  "upgrade-insecure-requests",
].join("; ")

writeFileSync(dest, `add_header Content-Security-Policy "${csp}" always;\n`)
console.log(`CSP written with ${hashes.size} inline script hashes`)
