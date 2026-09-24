#!/usr/bin/env node
/**
 * check-coverage.mjs
 *
 * Scans components/ui/ and prints a Markdown table showing which components
 * have Storybook stories (.stories.tsx) and Figma Code Connect (.figma.ts).
 *
 * Usage (from aperia-ds5/):
 *   node scripts/check-coverage.mjs
 *
 * Pipe into a file to capture the output:
 *   node scripts/check-coverage.mjs > /tmp/coverage.md
 */

import { readdirSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const UI_DIR = join(__dirname, "..", "components", "ui")
const FILE_URL = "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id="

// Figma page per component folder, same IDs as the page list in CLAUDE.md.
// Checked against the Figma API: every template node sits on its folder's page.
// Folders with no Figma page (attachment, bubble, marker, message,
// native-select) are left out and render "—".
const PAGES = {
  accordion: "1:434", alert: "21:322", "alert-dialog": "22:307", "aspect-ratio": "21:535",
  avatar: "23:988", badge: "23:995", breadcrumb: "23:1004", button: "34:6",
  "button-group": "18672:217548", calendar: "37:1900", card: "46:65", carousel: "46:66",
  chart: "449:6176", checkbox: "46:67", collapsible: "60:434", combobox: "60:435",
  command: "60:436", "context-menu": "60:437", dialog: "112:477", direction: "21192:433238",
  drawer: "112:454", "dropdown-menu": "89:189", empty: "18672:1039", field: "18684:15122",
  "hover-card": "216:2886", icon: "21003:22055", input: "65:520", "input-group": "18677:11182",
  "input-otp": "76:89", item: "18672:6033", kbd: "18665:239", label: "65:517",
  menubar: "210:2486", "navigation-menu": "209:1883", pagination: "65:516", popover: "193:1388",
  progress: "65:441", "radio-group": "64:316", resizable: "296:243", "scroll-area": "296:207",
  select: "118:1264", separator: "118:2682", sheet: "216:3314", sidebar: "5143:200",
  skeleton: "64:243", slider: "61:169", sonner: "118:2756", spinner: "18665:1996",
  switch: "60:438", table: "184:890", tabs: "183:417", textarea: "177:367",
  toggle: "132:1671", "toggle-group": "123:75", tooltip: "122:10",
}

const entries = readdirSync(UI_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const rows = entries.map((name) => {
  const dir = join(UI_DIR, name)
  const files = readdirSync(dir, { recursive: true })

  const hasStories = files.some((f) => f.endsWith(".stories.tsx"))
  const hasFigma = files.some((f) => f.endsWith(".figma.ts") || f.endsWith(".figma.batch.json"))

  const label = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")

  const storiesCell = hasStories ? "✅" : "❌"
  const figmaCell = hasFigma ? "✅" : "❌"
  const page = PAGES[name]
  const linkCell = page ? `[View Figma](${FILE_URL}${page.replace(":", "-")})` : "—"

  return { label, storiesCell, figmaCell, linkCell }
})

// Print Markdown table
const header = `| Component | Stories | Code Connect | View Figma |`
const divider = `|-----------|:-------:|:------------:|------------|`
const tableRows = rows
  .map(
    ({ label, storiesCell, figmaCell, linkCell }) =>
      `| ${label} | ${storiesCell} | ${figmaCell} | ${linkCell} |`
  )
  .join("\n")

console.log([header, divider, tableRows].join("\n"))

// Summary
const withStories = rows.filter((r) => r.storiesCell === "✅").length
const withFigma = rows.filter((r) => r.figmaCell === "✅").length
const total = rows.length

console.log(`\n**Summary:** ${total} components total`)
console.log(`- Storybook: ${withStories}/${total} covered`)
console.log(`- Code Connect: ${withFigma}/${total} covered`)
