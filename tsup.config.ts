import { defineConfig } from "tsup"
import path from "path"

export default defineConfig({
  entry: {
    index: "components/ui/index.ts",
    utils: "lib/utils.ts",
    "theme-provider": "components/theme-provider.tsx",
  },
  format: ["esm"],
  dts: true,
  external: ["react", "react-dom", "next", "next-themes"],
  esbuildOptions(options) {
    options.alias = { "@": path.resolve("./") }
  },
  tsconfig: "tsconfig.lib.json",
  outDir: "dist",
  clean: true,
})
