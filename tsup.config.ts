import { defineConfig } from "tsup"
import path from "path"

const shared = {
  format: ["esm"] as const,
  external: ["react", "react-dom", "next", "next-themes"],
  esbuildOptions(options: { alias?: Record<string, string> }) {
    options.alias = { "@": path.resolve("./") }
  },
  tsconfig: "tsconfig.lib.json",
  outDir: "dist",
}

export default defineConfig([
  {
    ...shared,
    entry: {
      index: "components/ui/index.ts",
      chart: "components/ui/chart/index.ts",
      "data-table": "components/ui/data-table/index.ts",
      "theme-provider": "components/theme-provider.tsx",
    },
    dts: true,
    banner: { js: '"use client";' },
  },
  {
    ...shared,
    entry: { utils: "lib/utils.ts" },
    dts: true,
  },
])
