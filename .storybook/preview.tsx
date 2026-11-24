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
    docs: {
      theme: docsTheme,
      // "On this page" beside each docs page, from its section and rule headings.
      toc: {
        headingSelector: "h2, h3",
        // Only the page's own headings: none from a live example or an embedded story.
        ignoreSelector: ".docs-story *, .skip-toc *",
        title: "On this page",
      },
    },
    options: {
      storySort: {
        method: "alphabetical",
        order: [
          "Design Language",
          [
            "Overview",
            "Foundations",
            [
              "Color",
              "Typography",
              "Spacing",
              "Shape and Edges",
              "Elevation",
              "Motion",
              "Sizes",
              "Icons",
              "Copy",
              "Message Templates",
            ],
            "Patterns",
            [
              "App Shell",
              "Page Layout",
              "Page Header",
              "List Page",
              "Filters",
              "Sort",
              "Tables",
              "Loading",
              "Empty and Missing",
              "Record Page",
              "Forms in Sheets",
              "Confirmations and Delete",
              "Pickers",
              "Disabled With a Reason",
              "Money and Numbers",
              "Files and Images",
              "Reordering",
              "Switches in a Grid",
              "Buttons and Actions",
              "Cards and Tiles",
              "People and Pictures",
              "Search",
              "Notifications",
            ],
            "Components",
            "Examples",
            "Compositions",
          ],
          "Patterns",
          "UI",
        ],
      },
    },
  },
}

export default preview
