import { create } from "storybook/theming"

// Docs pages (MDX prose, headings, tables) use the same font as the stories. The font itself loads in preview.css.
export const docsTheme = create({
  base: "light",
  fontBase:
    '"Inter Variable", ui-sans-serif, system-ui, sans-serif, "Apple Color Emoji", "Segoe UI Emoji"',
})
