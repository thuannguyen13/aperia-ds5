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

import { readdirSync, readFileSync } from "fs"
import { join, dirname } from "path"
import { fileURLToPath } from "url"

const __dirname = dirname(fileURLToPath(import.meta.url))
const UI_DIR = join(__dirname, "..", "components", "ui")
const MAX_LINKS = 10

const entries = readdirSync(UI_DIR, { withFileTypes: true })
  .filter((d) => d.isDirectory())
  .map((d) => d.name)
  .sort()

const rows = entries.map((name) => {
  const dir = join(UI_DIR, name)
  const files = readdirSync(dir, { recursive: true })

  const hasStories = files.some((f) => f.endsWith(".stories.tsx"))
  const figmaUrls = [
    ...new Set(
      files
        .sort()
        .flatMap((f) => {
          if (f.endsWith(".figma.ts")) {
            return readFileSync(join(dir, f), "utf8").match(/^\/\/ url=(\S+)/m)?.[1] ?? []
          }
          // Batch templates (icons) carry one url per entry instead of a header
          if (f.endsWith(".figma.batch.json")) {
            return JSON.parse(readFileSync(join(dir, f), "utf8")).components.map((c) => c.url)
          }
          return []
        })
    ),
  ]
  const hasFigma = figmaUrls.length > 0

  const label = name
    .split("-")
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1))
    .join("")

  const storiesCell = hasStories ? "✅" : "❌"
  const figmaCell = hasFigma ? "✅" : "❌"
  const shownUrls = figmaUrls.slice(0, MAX_LINKS)
  const moreCount = figmaUrls.length - shownUrls.length
  const linkCell = hasFigma
    ? shownUrls.map((url, i) => `[${i === 0 ? "View Figma" : i + 1}](${url})`).join(" ") +
      (moreCount > 0 ? ` +${moreCount} more` : "")
    : "—"

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
