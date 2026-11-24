import {
  COMPONENTS,
  SKILL_SECTIONS,
  GET_STARTED,
  componentTitle,
  pagesOf,
  skillTitle,
  storyId,
} from "./site"

// Which components each page uses, and which pages use each component, read from the source every time the docs load,
// so neither list can go stale. A page uses a component when its "In code" section names one of the component's
// exports in backticks (`ListToolbar`, `TableRow`), or, for an Examples page, when its live example imports one. A name
// belongs to the folder under components/ui that exports it.

/** Every component module, to learn which folder exports which name. */
const MODULES = import.meta.glob<Record<string, unknown>>(
  [
    "../../components/ui/*/*.{ts,tsx}",
    "!../../components/ui/*/*.stories.tsx",
    "!../../components/ui/*/*.figma.*",
    "!../../components/ui/icon/**",
  ],
  { eager: true }
)
const SKILL = "../../plugins/aperia-ds5/skills/design/"
const PAGES = import.meta.glob<string>(
  "../../plugins/aperia-ds5/skills/design/**/*.md",
  { query: "?raw", import: "default", eager: true }
)
/** The live example of each Examples page, by the page's name (list-page.example.tsx for examples/list-page.md). */
const SCREENS = import.meta.glob<string>("./examples/*.example.tsx", {
  query: "?raw",
  import: "default",
  eager: true,
})
/** The docs pages, to find where a pattern's own components are shown (its `PatternCode`). */
const DOCS = import.meta.glob<string>("./**/*.mdx", {
  query: "?raw",
  import: "default",
  eager: true,
})

/** A component's name (PascalCase), not a hook, a helper, or a constant. */
const isComponentName = (name: string) => /^[A-Z][a-z]/.test(name)

/** The folder under components/ui that exports each component name. */
const OWNER = new Map<string, string>()
for (const [path, exports] of Object.entries(MODULES)) {
  const dir = path.split("/").at(-2) ?? ""
  for (const name of Object.keys(exports))
    if (isComponentName(name) && !OWNER.has(name)) OWNER.set(name, dir)
}

/** "ListToolbar" → "List Toolbar". */
const spaced = (name: string) => name.replace(/([a-z0-9])([A-Z])/g, "$1 $2")

export type Home = { name: string; id: string }

/**
 * Each component folder's home: its page under Components, or, for a pattern's own component, the pattern page whose
 * Code tab shows it.
 */
const HOMES = new Map<string, Home>()
for (const group of COMPONENTS.groups ?? [])
  for (const page of group.pages)
    HOMES.set(page.dir, {
      name: page.name,
      id: storyId(componentTitle(group.title, page.name)),
    })
for (const text of Object.values(DOCS)) {
  const title = text.match(/<Meta title="([^"]+)"/)?.[1]
  if (!title || !text.includes("<PatternCode")) continue
  for (const shown of text.matchAll(
    /\{\s*name:\s*"([^"]+)",\s*stories:\s*([\w$]+)\s*\}/g
  )) {
    const from = text.match(
      new RegExp(`import \\* as ${shown[2]} from "[^"]*components/ui/([^/"]+)/`)
    )?.[1]
    const dir = from ?? OWNER.get(shown[1])
    if (dir && !HOMES.has(dir))
      HOMES.set(dir, { name: spaced(shown[1]), id: storyId(title) })
  }
}

/** A page's "## In code" section. */
const inCode = (text: string) =>
  text.split(/\n(?=## )/).find((part) => part.startsWith("## In code")) ?? ""

/** The component folders a skill page uses, in the order it first names them. */
function dirsOf(file: string) {
  const text = PAGES[SKILL + file] ?? ""
  const names: string[] = []
  for (const span of inCode(text).matchAll(/`([^`]+)`/g))
    names.push(...(span[1].match(/[A-Za-z_$][\w$]*/g) ?? []))
  const screen =
    file.startsWith("examples/") &&
    SCREENS[`./examples/${file.slice("examples/".length, -3)}.example.tsx`]
  if (screen)
    for (const imported of screen.matchAll(
      /import\s*\{([^}]*)\}\s*from\s*"aperia-ds5[^"]*"/g
    ))
      names.push(
        ...imported[1]
          .split(",")
          .map((name) => name.trim().replace(/^type\s+/, ""))
      )
  const dirs = new Set<string>()
  for (const name of names) {
    const dir = isComponentName(name) ? OWNER.get(name) : undefined
    if (dir && HOMES.has(dir)) dirs.add(dir)
  }
  return dirs
}

/** The sections whose pages can use components: every section but Get Started. */
const USING = SKILL_SECTIONS.filter((section) => section !== GET_STARTED)

/** Each using page with its title, its docs id, and the folders it uses. */
const USES = USING.flatMap((section) =>
  pagesOf(section).flatMap(({ page }) => {
    const title = PAGES[SKILL + page.file]?.match(/^# (.+)$/m)?.[1]?.trim()
    const full = title && skillTitle(page.file, title)
    if (!title || !full) return []
    return [
      {
        section: section.title,
        file: page.file,
        name: title,
        id: storyId(full),
        dirs: dirsOf(page.file),
      },
    ]
  })
)

/** The order of the components in the site map, so every list reads in the order of the Components index. */
const ORDER = [...HOMES.keys()]

/** The components a skill page uses, each with its home. Empty for a page outside Foundations, Styles, Patterns and Examples. */
export function componentsOf(file: string): Home[] {
  const page = USES.find((each) => each.file === file)
  if (!page) return []
  // Several folders can share one home, such as two pattern components on one pattern page: list that home once.
  const homes = ORDER.filter((dir) => page.dirs.has(dir)).map(
    (dir) => HOMES.get(dir) as Home
  )
  return homes.filter(
    (home, at) => homes.findIndex((each) => each.id === home.id) === at
  )
}

/** The pages that use a component, by section, in the site map's order. */
export function pagesUsing(dir: string): { section: string; pages: Home[] }[] {
  return USING.map((section) => ({
    section: section.title,
    pages: USES.filter(
      (page) => page.section === section.title && page.dirs.has(dir)
    ).map(({ name, id }) => ({ name, id })),
  })).filter((group) => group.pages.length > 0)
}
