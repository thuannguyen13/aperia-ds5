import type { Preview } from "@storybook/react"
import { TooltipProvider } from "../components/ui/tooltip/tooltip"
import "./preview.css"
import { docsTheme } from "./theme"

const preview: Preview = {
  // Apps mount TooltipProvider once at the root, so stories get it here
  // instead of each story that renders a Tooltip wrapping its own.
  decorators: [
    (Story) => (
      <TooltipProvider>
        <Story />
      </TooltipProvider>
    ),
  ],
  parameters: {
    layout: "centered",
    docs: { theme: docsTheme },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Design Language",
          [
            "Overview",
            "Foundations",
            "Patterns",
            "Best Practices",
            "Components",
            "Copy",
            "Brand Slots",
            "Drifts",
            "Compositions",
          ],
        ],
      },
    },
  },
}

export default preview
