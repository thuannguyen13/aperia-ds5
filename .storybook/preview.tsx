import type { Preview } from "@storybook/react"
import { TooltipProvider } from "../components/ui/tooltip/tooltip"
import "./preview.css"
import { docsTheme } from "./theme"
import { ComponentPage } from "../docs/design-language/component-page"

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
      // A component's one home: its guidance in tabs when it has a skill page, and its stories and props in Code.
      page: ComponentPage,
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
        // The docs' site map (docs/design-language/site.ts), from `node scripts/sidebar-order.mjs`; `--check` checks it.
        // sidebar-order:start
        order: [
          "Get Started",
          [
            "Overview",
            "For Designers",
            "For Developers",
            "What's New",
            "Code Connect Status",
          ],
          "Foundations",
          [
            "Overview",
            "Accessibility",
            "Layout",
            ["Scaffold", "Page Layout", "Screen Sizes", "Spacing", "Sizes"],
            "Content Design",
            ["Copy", "Message Templates", "Money and Numbers"],
            "States",
            ["Loading", "Empty States", "Disabled With a Reason"],
          ],
          "Styles",
          [
            "Overview",
            "Color",
            "Typography",
            "Border and Radius",
            "Elevation",
            "Motion",
            "Icons",
          ],
          "Components",
          [
            "Overview",
            "Actions",
            [
              "Button",
              "Button Group",
              "Toggle",
              "Toggle Group",
              "Dropdown Menu",
              "Context Menu",
              "Menubar",
            ],
            "Communication",
            [
              "Alert",
              "Badge",
              "Toast",
              "Tooltip",
              "Hover Card",
              "Progress",
              "Spinner",
              "Skeleton",
              "Empty",
              "Kbd",
            ],
            "Containment",
            [
              "Card",
              "Item",
              "Dialog",
              "Alert Dialog",
              "Sheet",
              "Drawer",
              "Popover",
              "Accordion",
              "Collapsible",
              "Tabs",
            ],
            "Navigation",
            [
              "App Shell",
              "Sidebar",
              "Breadcrumb",
              "Navigation Menu",
              "Pagination",
              "Command",
            ],
            "Selection",
            [
              "Checkbox",
              "Radio Group",
              "Switch",
              "Select",
              "Native Select",
              "Combobox",
              "Slider",
              "Calendar",
              "Day Range Fields",
            ],
            "Text Inputs",
            ["Input", "Input Group", "Input OTP", "Textarea", "Field", "Label"],
            "Files and Media",
            ["Avatar", "Attachment", "Carousel", "Aspect Ratio"],
            "Lists and Tables",
            ["Table", "Data Table"],
            "Charts",
            ["Chart"],
            "Chat",
            ["Message", "Bubble", "Marker"],
            "Layout",
            ["Separator", "Scroll Area", "Resizable", "Direction"],
          ],
          "Patterns",
          [
            "Overview",
            "Navigation",
            ["App Shell", "Search", "Notifications"],
            "Content",
            [
              "Page Header",
              "Cards and Tiles",
              "Details",
              "History",
              "People and Pictures",
            ],
            "Lists",
            [
              "List Toolbar",
              "Filters",
              "Sort",
              "Paging",
              "Tables",
              "Reordering",
            ],
            "Editing",
            [
              "Buttons and Actions",
              "Forms in Sheets",
              "Pickers",
              "Confirmations and Delete",
              "Files and Images",
              "Switches in a Grid",
            ],
          ],
          "Examples",
          [
            "Overview",
            "Apps",
            ["Titan and Sales Portal"],
            "Lists",
            [
              "List Page",
              "Board of Cards",
              "Audit Log",
              "Search and Notifications",
            ],
            "Records",
            [
              "Record Page",
              "Notes on a Record",
              "Task Checklist",
              "Status Change With a Reason",
              "Line Items With Totals",
            ],
            "Settings",
            ["Settings Page", "Roles and Permissions", "Editable Option List"],
            "Data and Charts",
            ["Dashboard", "Import Wizard", "Date Range", "Funnel Chart"],
          ],
        ],
        // sidebar-order:end
      },
    },
  },
}

export default preview
