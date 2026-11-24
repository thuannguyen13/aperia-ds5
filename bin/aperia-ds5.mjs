#!/usr/bin/env node
// `npx aperia-ds5 init`: sets an app up so coding agents use the aperia-ds5 design skill.
// Run it in the app's root. It only adds what is missing, so running it again changes nothing.

import fs from "node:fs"
import path from "node:path"

const SKILL_PATH = "node_modules/aperia-ds5/plugins/aperia-ds5/skills/design/SKILL.md"
const MARKETPLACE = {
  source: { source: "github", repo: "thuannguyen13/aperia-ds5", ref: "main" },
  autoUpdate: true,
}
const PLUGIN = "aperia-ds5@aperia"
const CLAUDE_BLOCK = `## UI

Before building, changing or reviewing any UI, use the aperia-ds5:design skill and finish with its screenshot review.
If that skill isn't loaded, read ${SKILL_PATH} and follow it.
`
const AGENTS_BLOCK = `## UI

Before building, changing or reviewing any UI, read ${SKILL_PATH} and follow it, including its screenshot review.
`
const HELP = `Usage: npx aperia-ds5 init [--dry-run]

Sets this app up so coding agents use the aperia-ds5 design skill:
  .claude/settings.json  adds the "aperia" plugin marketplace and enables ${PLUGIN} (Claude Code)
  CLAUDE.md              tells Claude Code to use the skill on every UI change
  AGENTS.md              tells Codex, Cursor and other agents to read ${SKILL_PATH}
It only adds what is missing. --dry-run prints the changes without writing them.`

const [command, ...flags] = process.argv.slice(2)
if (command !== "init") {
  console.log(HELP)
  process.exit(command && command !== "help" && command !== "--help" ? 1 : 0)
}
const dryRun = flags.includes("--dry-run")
const root = process.cwd()
const changes = []
const notes = []

function write(file, text, what) {
  changes.push(`${what}: ${file}`)
  if (dryRun) return
  fs.mkdirSync(path.dirname(path.join(root, file)), { recursive: true })
  fs.writeFileSync(path.join(root, file), text)
}

function read(file) {
  const full = path.join(root, file)
  return fs.existsSync(full) ? fs.readFileSync(full, "utf8") : null
}

function append(file, marker, block) {
  const text = read(file)
  if (text === null) return write(file, `${block}`, "Created")
  if (text.includes(marker)) return
  const gap = text.endsWith("\n\n") ? "" : text.endsWith("\n") ? "\n" : "\n\n"
  write(file, `${text}${gap}${block}`, "Updated")
}

if (!fs.existsSync(path.join(root, "package.json"))) {
  console.error("No package.json here. Run `npx aperia-ds5 init` in the app's root folder.")
  process.exit(1)
}
if (!fs.existsSync(path.join(root, SKILL_PATH))) {
  notes.push(`aperia-ds5 isn't installed here yet: run \`npm install aperia-ds5\`, so ${SKILL_PATH} exists.`)
}

// 1. Claude Code: the plugin marketplace and the plugin, in the settings committed with the app.
const settingsFile = ".claude/settings.json"
const settingsText = read(settingsFile)
let settings = {}
let settingsOk = true
if (settingsText !== null) {
  try {
    settings = JSON.parse(settingsText)
  } catch {
    settingsOk = false
    notes.push(`${settingsFile} isn't valid JSON, so it was left alone. Add the "aperia" marketplace and ${PLUGIN} by hand (README, Agent skill).`)
  }
}
if (settingsOk) {
  const before = JSON.stringify(settings)
  settings.extraKnownMarketplaces ??= {}
  settings.extraKnownMarketplaces.aperia ??= MARKETPLACE
  settings.enabledPlugins ??= {}
  settings.enabledPlugins[PLUGIN] ??= true
  if (JSON.stringify(settings) !== before) {
    write(settingsFile, `${JSON.stringify(settings, null, 2)}\n`, settingsText === null ? "Created" : "Updated")
  }
}

// 2. CLAUDE.md and AGENTS.md: the line that makes the agent use the skill on every UI change.
append("CLAUDE.md", "aperia-ds5:design", CLAUDE_BLOCK)
append("AGENTS.md", SKILL_PATH, AGENTS_BLOCK)

// 3. rc.1 linked the skill into .claude/skills; with the plugin enabled it would load twice.
const oldLink = ".claude/skills/aperia-app-design"
const oldStat = fs.lstatSync(path.join(root, oldLink), { throwIfNoEntry: false })
if (oldStat?.isSymbolicLink()) {
  changes.push(`Removed the rc.1 skill link: ${oldLink}`)
  if (!dryRun) fs.unlinkSync(path.join(root, oldLink))
} else if (oldStat) {
  notes.push(`${oldLink} is the rc.1 copy of the skill. Delete it, or the skill loads twice.`)
}

// 4. Styles: report, never edit. The skill and README say how to set them up.
const cssFiles = ["app/globals.css", "src/app/globals.css", "styles/globals.css", "src/index.css", "src/styles/globals.css"]
const css = cssFiles.map((file) => [file, read(file)]).filter(([, text]) => text !== null)
if (!css.some(([, text]) => text.includes("aperia-ds5/base.css"))) {
  notes.push(
    `No stylesheet imports aperia-ds5 yet. In ${css[0]?.[0] ?? "the app's globals.css"}, after @import "tailwindcss", add:\n` +
      `      @import "aperia-ds5/base.css";\n` +
      `      @source "../node_modules/aperia-ds5/dist";   (path relative to that file)`
  )
}

const title = dryRun ? "aperia-ds5 init (dry run, nothing written)" : "aperia-ds5 init"
console.log(`${title}\n`)
console.log(changes.length ? changes.map((c) => `  ${c}`).join("\n") : "  Already set up: nothing to change.")
if (notes.length) console.log(`\nStill to do:\n${notes.map((n) => `  - ${n}`).join("\n")}`)
console.log(`
Next:
  - Agents in this session: read ${SKILL_PATH} now, before writing any UI.
  - Claude Code: each teammate runs \`claude plugin install ${PLUGIN} --scope project\` once (needs GitHub access to
    thuannguyen13/aperia-ds5), or accepts the prompt when they trust this folder. Commit .claude/settings.json,
    CLAUDE.md and AGENTS.md.`)
