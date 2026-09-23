/**
 * Generates Code Connect mappings for every Lucide icon component in the
 * Figma library file, as one batch file: each entry pairs a Figma node with a
 * lucide-react export, and icons.figma.batch.ts renders every entry.
 *
 * Usage:
 *   npm run generate:icons
 *
 * Requires FIGMA_ACCESS_TOKEN in .env.local
 */

import fs from "fs"
import path from "path"
import * as lucideReact from "lucide-react"

const FILE_KEY  = "XERddNbyfcDl7jAmRDbgqt"
const FILE_NAME = "Aperia-Shadcn-Library"
const OUTPUT    = "components/ui/icon/icons.figma.batch.json"
const TEMPLATE  = "./icons.figma.batch.ts"
const PREFIX    = "Lucide Icon / "

// All valid PascalCase exports from lucide-react
const VALID_ICONS = new Set(
  Object.keys(lucideReact).filter((k) => /^[A-Z]/.test(k))
)

const token = process.env.FIGMA_ACCESS_TOKEN
if (!token) {
  console.error("Error: FIGMA_ACCESS_TOKEN environment variable is required.")
  console.error("  Add FIGMA_ACCESS_TOKEN=your_token to .env.local")
  process.exit(1)
}

async function fetchComponents() {
  const url = `https://api.figma.com/v1/files/${FILE_KEY}/components`
  const res = await fetch(url, { headers: { "X-Figma-Token": token } })
  if (!res.ok) {
    const body = await res.text()
    throw new Error(`Figma API ${res.status}: ${body}`)
  }
  const { meta } = await res.json()
  return meta.components
}

function resolveIconName(figmaName) {
  // Direct match
  if (VALID_ICONS.has(figmaName)) return figmaName
  // Figma uses underscores between digits (e.g. ArrowDown0_1 → ArrowDown01)
  const normalized = figmaName.replace(/_(\d)/g, "$1").replace(/(\d)_/g, "$1")
  if (VALID_ICONS.has(normalized)) return normalized
  return null
}

async function main() {
  console.log("Fetching components from Figma…")
  const components = await fetchComponents()

  const lucideComponents = components.filter((c) => c.name.startsWith(PREFIX))
  console.log(`Found ${lucideComponents.length} Lucide icon components in Figma.`)

  const matched = []
  const skipped = []

  for (const comp of lucideComponents) {
    const figmaName = comp.name.slice(PREFIX.length)
    const codeName  = resolveIconName(figmaName)
    if (codeName) {
      matched.push({ iconName: codeName, nodeId: comp.node_id.replace(":", "-") })
    } else {
      skipped.push(figmaName)
    }
  }

  matched.sort((a, b) => a.iconName.localeCompare(b.iconName))

  if (skipped.length > 0) {
    console.warn(`Skipped ${skipped.length} icons not found in lucide-react: ${skipped.join(", ")}`)
  }
  console.log(`Generating ${matched.length} icon connections…`)

  const batch = {
    templateFile: TEMPLATE,
    components: matched.map(({ iconName, nodeId }) => ({
      url: `https://www.figma.com/design/${FILE_KEY}/${FILE_NAME}?node-id=${nodeId}`,
      component: iconName,
    })),
  }

  const outDir = path.dirname(OUTPUT)
  if (!fs.existsSync(outDir)) fs.mkdirSync(outDir, { recursive: true })

  fs.writeFileSync(OUTPUT, JSON.stringify(batch, null, 2) + "\n", "utf8")
  console.log(`✓ Written ${matched.length} icon connections → ${OUTPUT}`)
  console.log(`\nNext: npm run publish:icons`)
}

main().catch((err) => {
  console.error(err)
  process.exit(1)
})
