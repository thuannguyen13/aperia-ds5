// The docs' site map: every section, group and page in the order the sidebar shows them, laid out the way Material 3
// organizes its site (Get Started, Foundations, Styles, Components, Patterns, Examples). Index pages, links between
// pages and each component's home read this list, so a page moves by changing it here, its .mdx Meta title, and the
// sidebar order in .storybook/preview.tsx (`node scripts/sidebar-order.mjs --check` checks that the three agree).

/** A page that renders a skill file, named by its path from the skill's root. */
export type SkillPage = { file: string }
/** A library component's home, named by its folder under components/ui. */
export type ComponentPage = {
  dir: string
  name: string
  lead: string
  /** The skill page that holds its guidance, shown in the home's Overview and Guidelines tabs. */
  guide?: string
}
export type Group<P> = { title: string; pages: P[] }
export type Section<P> = {
  title: string
  lead: string
  /** Pages that sit at the top of the section, outside any group. */
  pages?: P[]
  groups?: Group<P>[]
}

export const GET_STARTED: Section<SkillPage> = {
  title: "Get Started",
  lead: "Get Started explains what the Aperia design language holds and how designers and developers start using it.",
  pages: [
    { file: "overview.md" },
    { file: "get-started/for-designers.md" },
    { file: "get-started/for-developers.md" },
  ],
}

export const FOUNDATIONS: Section<SkillPage> = {
  title: "Foundations",
  lead: "Foundations are the rules that apply across every screen, such as layout, content design, states, and accessibility.",
  pages: [{ file: "foundations/accessibility.md" }],
  groups: [
    {
      title: "Layout",
      pages: [
        { file: "foundations/page-layout.md" },
        { file: "foundations/spacing.md" },
        { file: "foundations/sizes.md" },
      ],
    },
    {
      title: "Content Design",
      pages: [
        { file: "foundations/copy.md" },
        { file: "foundations/copy-templates.md" },
        { file: "foundations/money-and-numbers.md" },
      ],
    },
    {
      title: "States",
      pages: [
        { file: "foundations/loading.md" },
        { file: "foundations/empty-and-missing.md" },
        { file: "foundations/empty-state.md" },
        { file: "foundations/disabled-with-a-reason.md" },
      ],
    },
  ],
}

export const STYLES: Section<SkillPage> = {
  title: "Styles",
  lead: "Styles are the visual values that every component uses, such as color, type, shape, elevation, motion, and icons.",
  pages: [
    { file: "styles/color.md" },
    { file: "styles/typography.md" },
    { file: "styles/border-and-radius.md" },
    { file: "styles/elevation.md" },
    { file: "styles/motion.md" },
    { file: "styles/icons.md" },
  ],
}

export const COMPONENTS: Section<ComponentPage> = {
  title: "Components",
  lead: "Components are the building blocks that aperia-ds5 ships, grouped by what people do with them. The components of a pattern, such as the list toolbar, are on that pattern's page.",
  groups: [
    {
      title: "Actions",
      pages: [
        {
          dir: "button",
          name: "Button",
          lead: "A button starts an action, such as saving a form or opening a sheet.",
          guide: "components/button.md",
        },
        {
          dir: "button-group",
          name: "Button Group",
          lead: "A button group joins related buttons into one row with shared edges.",
        },
        {
          dir: "toggle",
          name: "Toggle",
          lead: "A toggle is a button that stays pressed while its option is on.",
        },
        {
          dir: "toggle-group",
          name: "Toggle Group",
          lead: "A toggle group is a row of toggles in which one or several options can be on.",
        },
        {
          dir: "dropdown-menu",
          name: "Dropdown Menu",
          lead: "A dropdown menu lists actions or options under a button.",
        },
        {
          dir: "context-menu",
          name: "Context Menu",
          lead: "A context menu lists the actions for an item when people right-click it.",
        },
        {
          dir: "menubar",
          name: "Menubar",
          lead: "A menubar is a row of menus that stays on screen, as in a desktop app.",
        },
      ],
    },
    {
      title: "Communication",
      pages: [
        {
          dir: "alert",
          name: "Alert",
          lead: "An alert shows a message about a page or a section inside its content.",
        },
        {
          dir: "badge",
          name: "Badge",
          lead: "A badge shows a short status, count, or label beside other content.",
        },
        {
          dir: "sonner",
          name: "Toast",
          lead: "A toast confirms that an action finished, in a corner of the screen.",
        },
        {
          dir: "tooltip",
          name: "Tooltip",
          lead: "A tooltip shows a short label for a control when people point at it or focus it.",
        },
        {
          dir: "hover-card",
          name: "Hover Card",
          lead: "A hover card shows a preview of a linked record when people point at the link.",
        },
        {
          dir: "progress",
          name: "Progress",
          lead: "A progress bar shows how much of a task is done.",
        },
        {
          dir: "spinner",
          name: "Spinner",
          lead: "A spinner shows that an action is running, inside a button or a small area.",
        },
        {
          dir: "skeleton",
          name: "Skeleton",
          lead: "A skeleton holds the shape of content while it loads.",
        },
        {
          dir: "empty",
          name: "Empty",
          lead: "Empty is the layout that an empty state is built from, with an icon, a title, a line of text, and actions.",
        },
        {
          dir: "kbd",
          name: "Kbd",
          lead: "Kbd shows a keyboard key or shortcut, such as ⌘K.",
        },
      ],
    },
    {
      title: "Containment",
      pages: [
        {
          dir: "card",
          name: "Card",
          lead: "A card groups the content and actions about one subject in a box.",
          guide: "components/card.md",
        },
        {
          dir: "item",
          name: "Item",
          lead: "An item is one row of content with optional media, a title, a description, and actions.",
        },
        {
          dir: "dialog",
          name: "Dialog",
          lead: "A dialog opens over the page to ask for a decision or a short input.",
          guide: "components/dialog.md",
        },
        {
          dir: "alert-dialog",
          name: "Alert Dialog",
          lead: "An alert dialog asks people to confirm an action and closes only from its buttons.",
        },
        {
          dir: "sheet",
          name: "Sheet",
          lead: "A sheet slides in from the side of the screen to hold a form or details without leaving the page.",
        },
        {
          dir: "drawer",
          name: "Drawer",
          lead: "A drawer slides up from the bottom of the screen, mostly on a phone.",
        },
        {
          dir: "popover",
          name: "Popover",
          lead: "A popover shows controls or content in a panel that opens from a button.",
        },
        {
          dir: "accordion",
          name: "Accordion",
          lead: "An accordion is a list of headings that each open to show their content.",
        },
        {
          dir: "collapsible",
          name: "Collapsible",
          lead: "A collapsible shows or hides one section of content.",
        },
        {
          dir: "tabs",
          name: "Tabs",
          lead: "Tabs switch between views of related content in one place.",
        },
      ],
    },
    {
      title: "Navigation",
      pages: [
        {
          dir: "app-shell",
          name: "App Shell",
          lead: "An app shell frames every page with a sidebar, a top bar, and a page column.",
        },
        {
          dir: "sidebar",
          name: "Sidebar",
          lead: "A sidebar lists the app's pages down the left side of the screen.",
        },
        {
          dir: "breadcrumb",
          name: "Breadcrumb",
          lead: "A breadcrumb shows where a page sits in the app and links to the pages above it.",
        },
        {
          dir: "navigation-menu",
          name: "Navigation Menu",
          lead: "A navigation menu is a row of links whose items can open panels of more links.",
        },
        {
          dir: "pagination",
          name: "Pagination",
          lead: "Pagination moves between the pages of a long list.",
        },
        {
          dir: "command",
          name: "Command",
          lead: "A command menu narrows a list of actions or records as people type.",
        },
      ],
    },
    {
      title: "Selection",
      pages: [
        {
          dir: "checkbox",
          name: "Checkbox",
          lead: "A checkbox turns one option on or off, or picks several options from a list.",
        },
        {
          dir: "radio-group",
          name: "Radio Group",
          lead: "A radio group picks one option from a short list that is always in view.",
        },
        {
          dir: "switch",
          name: "Switch",
          lead: "A switch turns a setting on or off, and the change applies at once.",
        },
        {
          dir: "select",
          name: "Select",
          lead: "A select picks one option from a list that opens under it.",
        },
        {
          dir: "native-select",
          name: "Native Select",
          lead: "A native select is the browser's own select, for places where the system list works better.",
        },
        {
          dir: "combobox",
          name: "Combobox",
          lead: "A combobox picks one or several options from a list that people narrow by typing.",
        },
        {
          dir: "slider",
          name: "Slider",
          lead: "A slider picks a value or a range by dragging along a track.",
        },
        {
          dir: "calendar",
          name: "Calendar",
          lead: "A calendar picks a day or a span of days from a month grid.",
        },
        {
          dir: "day-range-fields",
          name: "Day Range Fields",
          lead: "Day range fields pick a span of days with a From and a To, and either one can stay empty.",
        },
      ],
    },
    {
      title: "Text Inputs",
      pages: [
        {
          dir: "input",
          name: "Input",
          lead: "An input takes one line of text.",
        },
        {
          dir: "input-group",
          name: "Input Group",
          lead: "An input group joins an input with icons, text, or buttons inside one edge.",
        },
        {
          dir: "input-otp",
          name: "Input OTP",
          lead: "An OTP input takes a one-time code, one character in each slot.",
        },
        {
          dir: "textarea",
          name: "Textarea",
          lead: "A textarea takes several lines of text.",
        },
        {
          dir: "field",
          name: "Field",
          lead: "A field puts a label, a control, help text, and an error together.",
        },
        {
          dir: "label",
          name: "Label",
          lead: "A label names a control and focuses it when people click it.",
        },
      ],
    },
    {
      title: "Files and Media",
      pages: [
        {
          dir: "avatar",
          name: "Avatar",
          lead: "An avatar shows the picture of a person or a record, or its initials when it has none.",
        },
        {
          dir: "attachment",
          name: "Attachment",
          lead: "An attachment shows a file added to a message, with its name and type.",
        },
        {
          dir: "carousel",
          name: "Carousel",
          lead: "A carousel shows a set of items one view at a time, with buttons to move between them.",
        },
        {
          dir: "aspect-ratio",
          name: "Aspect Ratio",
          lead: "Aspect Ratio keeps content, such as an image, at a set ratio of width to height.",
        },
      ],
    },
    {
      title: "Lists and Tables",
      pages: [
        {
          dir: "table",
          name: "Table",
          lead: "A table shows records in rows and columns.",
          guide: "components/table.md",
        },
        {
          dir: "data-table",
          name: "Data Table",
          lead: "A data table is a table with sorting, filtering, column choice, and paging built in.",
        },
      ],
    },
    {
      title: "Charts",
      pages: [
        {
          dir: "chart",
          name: "Chart",
          lead: "A chart shows numbers as bars, lines, or areas, with the shared axes, grid, and tooltip.",
        },
      ],
    },
    {
      title: "Chat",
      pages: [
        {
          dir: "message",
          name: "Message",
          lead: "A message is one turn in a chat, with the sender's picture and the text.",
        },
        {
          dir: "bubble",
          name: "Bubble",
          lead: "A bubble holds the text of one chat message.",
        },
        {
          dir: "marker",
          name: "Marker",
          lead: "A marker labels a point in a chat, such as Today or Conversation started.",
        },
      ],
    },
    {
      title: "Layout",
      pages: [
        {
          dir: "separator",
          name: "Separator",
          lead: "A separator draws a line between groups of content.",
        },
        {
          dir: "scroll-area",
          name: "Scroll Area",
          lead: "A scroll area scrolls its content with a thin scrollbar.",
        },
        {
          dir: "resizable",
          name: "Resizable",
          lead: "Resizable panels let people drag the line between two panels to change their sizes.",
        },
        {
          dir: "direction",
          name: "Direction",
          lead: "Direction sets whether content runs left to right or right to left.",
        },
      ],
    },
  ],
}

export const PATTERNS: Section<SkillPage> = {
  title: "Patterns",
  lead: "Patterns show how components combine into the parts of a screen that every Aperia app shares, such as a list's toolbar or a record's history.",
  groups: [
    {
      title: "Navigation",
      pages: [
        { file: "patterns/app-shell.md" },
        { file: "patterns/search.md" },
        { file: "patterns/notifications.md" },
      ],
    },
    {
      title: "Content",
      pages: [
        { file: "patterns/page-header.md" },
        { file: "patterns/cards-and-tiles.md" },
        { file: "patterns/details.md" },
        { file: "patterns/history.md" },
        { file: "patterns/people-and-pictures.md" },
      ],
    },
    {
      title: "Lists",
      pages: [
        { file: "patterns/list-toolbar.md" },
        { file: "patterns/filters.md" },
        { file: "patterns/sort.md" },
        { file: "patterns/paging.md" },
        { file: "patterns/tables.md" },
        { file: "patterns/reordering.md" },
      ],
    },
    {
      title: "Editing",
      pages: [
        { file: "patterns/buttons-and-actions.md" },
        { file: "patterns/forms-in-sheets.md" },
        { file: "patterns/pickers.md" },
        { file: "patterns/confirmations-and-delete.md" },
        { file: "patterns/files-and-images.md" },
        { file: "patterns/switches-in-a-grid.md" },
      ],
    },
  ],
}

export const EXAMPLES: Section<SkillPage> = {
  title: "Examples",
  lead: "Examples are whole screens that an app builds from the patterns, each with a before and an after.",
  groups: [
    {
      title: "Lists",
      pages: [
        { file: "examples/list-page.md" },
        { file: "examples/board.md" },
        { file: "examples/audit-log.md" },
        { file: "examples/search-and-notifications.md" },
      ],
    },
    {
      title: "Records",
      pages: [
        { file: "examples/record-page.md" },
        { file: "examples/notes.md" },
        { file: "examples/task-checklist.md" },
        { file: "examples/status-change.md" },
        { file: "examples/line-items.md" },
      ],
    },
    {
      title: "Settings",
      pages: [
        { file: "examples/roles-and-permissions.md" },
        { file: "examples/option-list.md" },
      ],
    },
    {
      title: "Data and Charts",
      pages: [
        { file: "examples/import.md" },
        { file: "examples/date-range.md" },
        { file: "examples/funnel-chart.md" },
      ],
    },
  ],
}

export const SKILL_SECTIONS = [
  GET_STARTED,
  FOUNDATIONS,
  STYLES,
  PATTERNS,
  EXAMPLES,
]

/** Every page of a section, with the group it sits in ("" for none). */
export function pagesOf<P>(section: Section<P>) {
  return [
    ...(section.pages ?? []).map((page) => ({ page, group: "" })),
    ...(section.groups ?? []).flatMap((group) =>
      group.pages.map((page) => ({ page, group: group.title }))
    ),
  ]
}

/** Storybook's id for a title: lowercase, every run of other characters one dash. */
export const storyId = (title: string) =>
  title
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-|-$/g, "")

/** A skill page's sidebar title, from its section, its group and the "# Title" of its file. */
export function skillTitle(file: string, pageTitle: string) {
  for (const section of SKILL_SECTIONS)
    for (const { page, group } of pagesOf(section))
      if (page.file === file)
        return [section.title, group, pageTitle].filter(Boolean).join("/")
  return undefined
}

/** A component's sidebar title. */
export const componentTitle = (group: string, name: string) =>
  `Components/${group}/${name}`
