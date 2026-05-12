// This file has been automatically migrated to valid ESM format by Storybook.
import { fileURLToPath } from "node:url";
import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path, { dirname } from "path";

const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

const config: StorybookConfig = {
  stories: ["../docs/**/*.mdx", "../components/**/*.mdx", "../components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-docs"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [...(config.plugins ?? []), react({ exclude: /\.mdx?$/ }), tailwindcss()]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...((config.resolve?.alias as object) ?? {}),
        "@": path.resolve(__dirname, ".."),
      },
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
