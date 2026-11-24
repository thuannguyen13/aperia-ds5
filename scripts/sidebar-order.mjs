// Prints the Storybook sidebar order (storySort.order) from the docs' site map, and with --check, fails when
// .storybook/preview.tsx or a page's Meta title disagrees with it. Run after moving or adding a docs page:
//   node scripts/sidebar-order.mjs          print the order to paste into .storybook/preview.tsx
//   node scripts/sidebar-order.mjs --check  check preview.tsx, every .mdx Meta title and every story title
import { readFileSync, readdirSync, statSync } from "node:fs"
import { join } from "node:path"

const site = readFileSync("docs/design-language/site.ts", "utf8")
const skill = "plugins/aperia-ds5/skills/design/"
const titleOf = (file) => readFileSync(skill + file, "utf8").match(/^# (.+)$/m)?.[1]?.trim()

// Walk the site map's literal: section title, group title, pages.
const sections = []
let section, group
for (const line of site.split("\n")) {
  let m
  if ((m = line.match(/^export const (\w+): Section</))) { section = { name: m[1], title: "", pages: [], groups: [] }; sections.push(section); group = null; continue }
  if (!section) continue
  if ((m = line.match(/^ {2}title: "([^"]+)"/))) { section.title = m[1]; continue }
  if ((m = line.match(/^ {6}title: "([^"]+)"/))) { group = { title: m[1], pages: [] }; section.groups.push(group); continue }
  for (const f of line.matchAll(/file: "([^"]+)"/g)) (group ?? section).pages.push(titleOf(f[1]) ?? `MISSING ${f[1]}`)
  // A component's name, whether Prettier keeps its entry on one line or splits it.
  for (const c of line.matchAll(/\bname: "([^"]+)"/g)) (group ?? section).pages.push(c[1])
}
const extra = { "Get Started": ["What's New", "Code Connect Status"] }
const order = []
for (const s of sections) {
  const inner = s.title === "Get Started" ? [] : ["Overview"]
  inner.push(...s.pages, ...(extra[s.title] ?? []))
  for (const g of s.groups) inner.push(g.title, g.pages)
  order.push(s.title, inner)
}
const ROOTS = ["Get Started", "Foundations", "Styles", "Components", "Patterns", "Examples"]

const byRoot = ROOTS.flatMap((root) => { const i = order.indexOf(root); return [root, order[i + 1]] })
const text = JSON.stringify(byRoot, null, 2)

if (!process.argv.includes("--check")) { console.log(text); process.exit(0) }

let bad = 0
const preview = readFileSync(".storybook/preview.tsx", "utf8")
const inPreview = preview.match(/\/\/ sidebar-order:start\n([\s\S]*?)\n\s*\/\/ sidebar-order:end/)?.[1]
if (!inPreview || JSON.stringify(eval(`(${inPreview.trim().replace(/^order:/, "").replace(/,$/, "")})`)) !== JSON.stringify(byRoot)) {
  console.log("preview.tsx sidebar order differs from site.ts: run node scripts/sidebar-order.mjs and paste it"); bad++
}
// Every title the site map names must exist as an .mdx Meta title or a story title.
const files = (dir) => readdirSync(dir).flatMap((f) => { const p = join(dir, f); return statSync(p).isDirectory() ? files(p) : [p] })
const titles = new Set()
for (const f of [...files("docs"), ...files("components")]) {
  if (!/\.(mdx|stories\.tsx)$/.test(f)) continue
  const t = readFileSync(f, "utf8").match(/<Meta title="([^"]+)"|title: "([^"]+)"/)
  if (t) titles.add(t[1] ?? t[2])
}
for (const s of sections) {
  const expect = []
  for (const p of s.pages) expect.push(`${s.title}/${p}`)
  for (const g of s.groups) for (const p of g.pages) expect.push(`${s.title}/${g.title}/${p}`)
  for (const t of expect) if (!titles.has(t) && !t.startsWith("Components/")) { console.log("no page titled", t); bad++ }
  for (const t of expect) if (t.startsWith("Components/") && !titles.has(t)) { console.log("no stories titled", t); bad++ }
}
console.log(bad ? `${bad} problem(s)` : "site map, sidebar and pages agree")
process.exit(bad ? 1 : 0)
