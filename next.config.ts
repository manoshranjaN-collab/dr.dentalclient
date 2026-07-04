import type { NextConfig } from "next";
import { fileURLToPath } from "node:url";
import { dirname } from "node:path";

const projectRoot = dirname(fileURLToPath(import.meta.url));

const nextConfig: NextConfig = {
  output: "standalone",
  // Pin the workspace root so Turbopack doesn't misdetect a parent-directory
  // lockfile as the project root when this template lives inside another repo.
  turbopack: {
    root: projectRoot,
  },
  async rewrites() {
    return {
      // Homepage: serve the mirrored index.html at `/`.
      beforeFiles: [{ source: "/", destination: "/index.html" }],
      // Clean URLs -> mirrored .html files. afterFiles runs only when no real
      // file (asset in /klaas, _next chunk, or existing .html) matched first,
      // so it maps e.g. /treatments-1 -> /treatments-1.html and
      // /treatment/dental-hygiene -> /treatment/dental-hygiene.html.
      afterFiles: [{ source: "/:path*", destination: "/:path*.html" }],
      fallback: [],
    };
  },
};

export default nextConfig;
