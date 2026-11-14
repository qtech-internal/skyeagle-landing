import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  // The Docker image sets NEXT_OUTPUT=export and serves the static HTML with
  // nginx. Local `pnpm dev` / `pnpm start` are unaffected.
  ...(process.env.NEXT_OUTPUT === "export" ? { output: "export" as const } : {}),
  poweredByHeader: false,
  // The store listings link to /privacy/ and /delete-account/ with the slash.
  trailingSlash: true,
  experimental: {
    optimizePackageImports: ["lucide-react"],
  },
};

export default nextConfig;
