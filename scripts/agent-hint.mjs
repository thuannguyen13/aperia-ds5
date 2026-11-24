// Puts a note for coding agents at the top of the type definitions, which agents open to see what the library exports.
import fs from "node:fs"

const HINT = `/**
 * aperia-ds5, Aperia's component library.
 * Coding agents: before building, changing or reviewing UI with it, read
 * node_modules/aperia-ds5/plugins/aperia-ds5/skills/design/SKILL.md and follow it.
 * New app? Run \`npx aperia-ds5 init\` in its root first, so every later session uses the skill too.
 */
`
for (const file of ["dist/index.d.ts", "dist/chart.d.ts", "dist/data-table.d.ts"]) {
  const text = fs.readFileSync(file, "utf8")
  if (!text.startsWith(HINT)) fs.writeFileSync(file, HINT + text)
}
