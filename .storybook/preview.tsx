import type { Preview } from "@storybook/react"
import "./preview.css"

const preview: Preview = {
  parameters: {
    layout: "centered",
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
}

export default preview
