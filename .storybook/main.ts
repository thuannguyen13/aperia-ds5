// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: [
    "../docs/**/*.mdx",
    "../docs/**/*.stories.@(ts|tsx)",
    "../components/**/*.mdx",
    "../components/**/*.stories.@(ts|tsx)",
  ],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), react({ exclude: /\.mdx?$/ }), tailwindcss()]
    // The skill's compositions (docs/design-language) import "aperia-ds5" as an app would; point it at the source,
    // not dist/, so they share the stories' React contexts (tooltip, sidebar).
    config.resolve = {
      ...config.resolve,
      alias: [
        { find: /^aperia-ds5$/, replacement: path.resolve(__dirname, "../components/ui/index.ts") },
        { find: /^aperia-ds5\/utils$/, replacement: path.resolve(__dirname, "../lib/utils.ts") },
        { find: "@", replacement: path.resolve(__dirname, "..") },
      ],
    }
    config.optimizeDeps = {
      ...config.optimizeDeps,
      include: [
        ...(config.optimizeDeps?.include ?? []),
        "recharts",
      ],
    }
    return config
  },
}

export default config
