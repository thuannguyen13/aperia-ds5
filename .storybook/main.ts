import type { StorybookConfig } from "@storybook/react-vite"
import tailwindcss from "@tailwindcss/vite"
import react from "@vitejs/plugin-react"
import path from "path"

const config: StorybookConfig = {
  stories: ["../components/**/*.stories.@(ts|tsx)"],
  addons: ["@storybook/addon-essentials"],
  framework: {
    name: "@storybook/react-vite",
    options: {},
  },
  async viteFinal(config) {
    config.plugins = [react(), tailwindcss(), ...(config.plugins ?? [])]
    config.resolve = {
      ...config.resolve,
      alias: {
        ...((config.resolve?.alias as object) ?? {}),
        "@": path.resolve(__dirname, ".."),
      },
    }
    return config
  },
}

export default config
