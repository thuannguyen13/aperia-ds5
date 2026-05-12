#!/usr/bin/env node
/**
 * check-coverage.mjs
 *
 * Scans components/ui/ and prints a Markdown table showing which components
 * have Storybook stories (.stories.tsx) and Figma Code Connect (.figma.tsx).
 *
 * Usage (from aperia-ds5/):
 *   node scripts/check-coverage.mjs
 *
 * Pipe into a file to capture the output:
 *   node scripts/check-coverage.mjs > /tmp/coverage.md
 */

import { readdirSync, existsSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const UI_DIR = join(__dirname, "..", "components", "ui")

// Known Figma URLs per component (update when Code Connect is published)
const FIGMA_URLS = {
  alert:
    "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=26-160",
  avatar:
    "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=296-5188",
  button:
    "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=37-931",
  icon: "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library",
  input:
    "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=65-533",
  "input-group":
    "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=18723-14231",
  tabs: "https://www.figma.com/design/XERddNbyfcDl7jAmRDbgqt/Aperia-Shadcn-Library?node-id=21133-27311",
}

const entries = readdirSync(UI_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const rows = entries.map((name) => {
  const dir = join(UI_DIR, name)
  const files = readdirSync(dir)

  const hasStories = files.some((f) => f.endsWith(".stories.tsx"))
  const hasFigma = files.some((f) => f.endsWith(".figma.tsx"))
  const figmaUrl = FIGMA_URLS[name]

  const label = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")

  const storiesCell = hasStories ? "✅" : "❌"
  const figmaCell = hasFigma ? "✅" : "❌"
  const linkCell = figmaUrl ? `[View Figma](${figmaUrl})` : "—"

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
