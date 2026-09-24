import type { Preview } from "@storybook/react"
import { TooltipProvider } from "../components/ui/tooltip/tooltip"
import "./preview.css"

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
    options: {
      storySort: {
        method: "alphabetical",
      },
    },
  },
}

export default preview
