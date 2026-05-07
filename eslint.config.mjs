import { defineConfig } from "eslint/config"
import js from "@eslint/js"

export default defineConfig([
  js.configs.recommended,
  {
    ignores: ["dist/**", "node_modules/**"],
  },
])
